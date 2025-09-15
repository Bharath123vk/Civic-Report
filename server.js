const express = require('express');
const path = require('path');
const admin = require('firebase-admin');
const axios = require('axios'); // New dependency to make API calls

// These imports are for Firebase and Firestore
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Set up the Express server
const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data with a larger payload limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ===========================================================================
// Step 1: Initialize Firebase and Firestore
// ===========================================================================

// Path to the service account key.
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
let serviceAccount;

try {
    serviceAccount = require(serviceAccountPath);
    console.log("Firebase Admin SDK initialized using local service account file.");
    admin.initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id
    });
} catch (error) {
    console.error("Firebase Admin SDK failed to initialize. If you are running locally, you must provide a service account JSON file. Error:", error.message);
    process.exit(1);
}

const db = getFirestore();

// ===========================================================================
// Step 2: Create the API Endpoint
// ===========================================================================

// This is the main endpoint that will receive the form data from your front-end.
app.post('/api/submit-report', async (req, res) => {
    try {
        const { description, photo_data, latitude, longitude } = req.body;

        if (!description || !photo_data || !latitude || !longitude) {
            return res.status(400).json({ success: false, message: 'Missing required fields.' });
        }

        // Upload the Base64 image to a free image hosting service
        const response = await axios.post('https://api.imgbb.com/1/upload', {
            key: '221f3677751c92c0e13e6e5239a4b75d', // <-- IMPORTANT: You need to get a free API key from https://api.imgbb.com/
            image: photo_data.split(',')[1], // Remove the "data:image/jpeg;base64," part
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        const photo_url = response.data.data.url;

        // ===========================================================================
        // Save the report to Firestore
        // ===========================================================================
        const reportsRef = db.collection(`reports`);
        const docRef = await reportsRef.add({
            description: description,
            photo_url: photo_url,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });

        console.log("Report saved to Firestore with ID:", docRef.id);

        // Send a success response back to the front-end
        res.status(200).json({ success: true, message: 'Report submitted successfully!' });

    } catch (error) {
        console.error("Error processing report:", error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

// ===========================================================================
// Step 3: Serve the HTML files
// ===========================================================================

// Serve the report submission page at the /report route
app.get('/report', (req, res) => {
    res.sendFile(path.join(__dirname, 'report_issue.html'));
});

// Serve the municipality dashboard page at the /dashboard route
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'municipality_dashboard.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Report an Issue: http://localhost:${port}/report`);
    console.log(`Municipality Dashboard: http://localhost:${port}/dashboard`);
});
