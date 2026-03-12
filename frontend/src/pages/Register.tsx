import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import api from '../lib/axios';
import { FlagTriangleRight, Mail, Lock, User, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        // Basic frontend validation to avoid hitting the backend unnecessarily
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await api.post('/auth/register', { name, email, password });
            const { token } = response.data;
            
            login(token); // Authenticate globally
            navigate('/dashboard');
        } catch (err: any) {
            // Our standard GlobalExceptionHandler gracefully returns mapped JSON objects
            if (err.response?.data?.error === 'MethodArgumentNotValidException') {
                setError(err.response.data.message);
            } else {
                setError(err.response?.data?.message || 'Registration failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-background">
            
            {/* Left Interactive Form Panel */}
            <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-24 xl:px-32 relative order-2 lg:order-1">
                
                {/* Mobile Header Logo */}
                <div className="flex lg:hidden items-center gap-2 mb-12 text-primary">
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <FlagTriangleRight className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">CivicSense</span>
                </div>

                <div className="w-full max-w-sm mx-auto sm:max-w-md">
                    <div className="space-y-3 mb-10">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">Create Account</h2>
                        <p className="text-muted-foreground">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                                Sign in instead
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-4 rounded-xl bg-destructive/10 text-destructive flex items-start gap-3 animate-in slide-in-from-top-2 duration-300">
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                <p className="text-sm font-medium leading-relaxed">{error}</p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-2 relative">
                                <label className="text-sm font-medium text-foreground ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-input/50 border border-border rounded-xl px-11 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 relative">
                                <label className="text-sm font-medium text-foreground ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-input/50 border border-border rounded-xl px-11 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 relative">
                                <label className="text-sm font-medium text-foreground ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-input/50 border border-border rounded-xl px-11 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                        placeholder="••••••••"
                                        minLength={6}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground ml-2">Must be at least 6 characters</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4 shadow-lg shadow-primary/20"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Create Free Account
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Brand Panel */}
            <div className="hidden relative lg:flex flex-col justify-between p-12 bg-zinc-900 overflow-hidden order-1 lg:order-2">
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-900 z-0" />
                
                {/* Decorative background circle */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />

                <div className="relative z-10 flex items-center justify-end gap-3 text-white">
                    <span className="text-xl font-medium tracking-tight opacity-80">Be the change.</span>
                </div>

                <div className="relative z-10 text-white space-y-6 max-w-md ml-auto text-right">
                    <h1 className="text-5xl font-bold leading-tight tracking-tight">
                        Empower your community.
                    </h1>
                    <p className="text-white/70 text-lg leading-relaxed">
                        Join thousands of citizens taking direct action to improve local infrastructure layer by layer. Your voice matters here.
                    </p>
                </div>
                
                <div className="relative z-10 text-white/40 text-sm text-right">
                   Secure Registration Protocol
                </div>
            </div>

        </div>
    );
};

export default Register;
