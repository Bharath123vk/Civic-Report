import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import api from '../lib/axios';
import type { Issue, IssueStatus } from '../lib/types';
import { Loader2, AlertCircle, Plus, MapPin, ThumbsUp, CheckCircle2, Clock, CheckCircle, X, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Dashboard = () => {
    const { token } = useAuth();
    const isAdmin = token ? JSON.parse(atob(token.split('.')[1])).role === 'ROLE_ADMIN' : false;

    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState<'ALL' | IssueStatus>('ALL');
    
    // Modal Form States
    const [isReporting, setIsReporting] = useState(false);
    const [newIssue, setNewIssue] = useState({ title: '', description: '', location: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchIssues = async () => {
        setLoading(true);
        try {
            const endpoint = filter === 'ALL' ? '/issues' : `/issues?status=${filter}`;
            const response = await api.get(endpoint);
            setIssues(response.data);
            setError('');
        } catch (err) {
            setError('Failed to load issues. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, [filter]);

    const handleUpvote = async (issueId: number) => {
        try {
            const response = await api.post(`/issues/${issueId}/upvote`);
            setIssues(issues.map(issue => issue.id === issueId ? response.data : issue));
        } catch (err: any) {
            if (err.response?.status === 409) {
                alert("You have already upvoted this specific issue!");
            } else {
                alert("Something went wrong with your upvote.");
            }
        }
    };

    const handleResolve = async (issueId: number, status: IssueStatus) => {
        if (!isAdmin) return;
        try {
            const response = await api.put(`/issues/${issueId}/resolve?status=${status}`);
            setIssues(issues.map(issue => issue.id === issueId ? response.data : issue));
        } catch (err) {
            alert("Failed to update issue status.");
        }
    };

    const submitIssue = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await api.post('/issues', newIssue);
            setIssues([response.data, ...issues]); // Optimistic load
            setIsReporting(false);
            setNewIssue({ title: '', description: '', location: '' });
        } catch (err) {
            alert('Failed to report issue. Ensure all fields are filled.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const StatusBadge = ({ status }: { status: IssueStatus }) => {
        switch (status) {
            case 'OPEN':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800"><AlertCircle className="w-3.5 h-3.5" /> OPEN</span>;
            case 'IN_PROGRESS':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800"><Clock className="w-3.5 h-3.5" /> IN PROGRESS</span>;
            case 'RESOLVED':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800"><CheckCircle2 className="w-3.5 h-3.5" /> RESOLVED</span>;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 relative">
            
            {/* Report Issue Modal Overlay */}
            {isReporting && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsReporting(false)} />
                    <div className="relative bg-background rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-border/50 bg-muted/30">
                            <h2 className="text-xl font-bold">Report New Issue</h2>
                            <button onClick={() => setIsReporting(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><X className="w-5 h-5 text-muted-foreground" /></button>
                        </div>
                        <form onSubmit={submitIssue} className="p-6 space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Title</label>
                                <input required value={newIssue.title} onChange={e => setNewIssue({...newIssue, title: e.target.value})} className="w-full bg-input/50 border rounded-xl px-4 py-3" placeholder="Pothole on Main St..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Location</label>
                                <input required value={newIssue.location} onChange={e => setNewIssue({...newIssue, location: e.target.value})} className="w-full bg-input/50 border rounded-xl px-4 py-3" placeholder="123 Main St, New York" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Description</label>
                                <textarea required value={newIssue.description} onChange={e => setNewIssue({...newIssue, description: e.target.value})} className="w-full bg-input/50 border rounded-xl px-4 py-3 min-h-[100px]" placeholder="Detailed description of the problem..." />
                            </div>
                            <div className="pt-2 flex gap-3">
                                <button type="button" onClick={() => setIsReporting(false)} className="flex-1 py-3 font-semibold hover:bg-muted rounded-xl transition-colors">Cancel</button>
                                <button type="submit" disabled={isSubmitting} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-xl font-semibold transition-colors flex justify-center items-center">
                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Report'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card rounded-3xl p-6 sm:p-8 border shadow-sm">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Community Issues</h1>
                    <p className="text-muted-foreground mt-1">Browse, track, and support infrastructure incidents in your area.</p>
                </div>
                <button onClick={() => setIsReporting(true)} className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all shadow-lg hover:scale-105 active:scale-95 whitespace-nowrap">
                    <Plus className="w-5 h-5" />
                    Report Issue
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                <div className="inline-flex bg-muted/50 p-1.5 rounded-full border">
                    {(['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED'] as const).map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                                filter === status 
                                    ? 'bg-background text-foreground shadow-sm ring-1 ring-border' 
                                    : 'text-muted-foreground hover:text-foreground hover:bg-black/5'
                            }`}
                        >
                            {status.replace('_', ' ')}
                            {filter === status && <Check className="w-4 h-4 text-primary" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Feed Grid */}
            {error && <div className="p-4 rounded-2xl bg-destructive/10 text-destructive flex items-center gap-3"><AlertCircle className="w-5 h-5 shrink-0" /><p className="font-medium">{error}</p></div>}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                    <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
                    <p className="font-medium">Syncing with municipality records...</p>
                </div>
            ) : issues.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center px-4">
                    <div className="bg-primary/10 p-4 rounded-full mb-6">
                        <CheckCircle className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">You're all caught up!</h3>
                    <p className="text-muted-foreground max-w-md">There are currently no civic infrastructure issues reported under this filter category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {issues.map((issue) => (
                        <div key={issue.id} className="group bg-card rounded-3xl border border-border/50 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                            
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4 gap-4">
                                    <StatusBadge status={issue.status} />
                                    <span className="text-xs font-medium text-muted-foreground whitespace-nowrap bg-muted/50 px-3 py-1 rounded-full">
                                        ID: #{issue.id} • {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
                                    </span>
                                </div>
                                
                                <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">{issue.title}</h3>
                                <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed flex-1">
                                    {issue.description}
                                </p>

                                <div className="space-y-3 pt-6 border-t border-border/50 mt-auto">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                                        <span className="truncate">{issue.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                                            {issue.reportedBy.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="truncate">Reported by {issue.reportedBy.name}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-muted/30 p-6 flex flex-col gap-3 border-t border-border/50">
                                <div className="flex justify-between items-center w-full">
                                    <button 
                                        onClick={() => handleUpvote(issue.id)}
                                        className="flex items-center gap-2 text-sm font-bold text-primary bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-full transition-colors"
                                    >
                                        <ThumbsUp className="w-4 h-4" />
                                        Upvote
                                    </button>
                                    <div className="flex items-center gap-1.5 font-bold text-foreground bg-white px-4 py-2 rounded-full shadow-sm border">
                                        <span className="text-primary">{issue.upvoteCount}</span>
                                        <span className="text-muted-foreground font-medium text-sm">votes</span>
                                    </div>
                                </div>

                                {/* ADMIN ONLY ACTIONS */}
                                {isAdmin && issue.status !== 'RESOLVED' && (
                                    <div className="flex gap-2 pt-3 mt-1 border-t border-border/50">
                                        {issue.status === 'OPEN' && (
                                            <button onClick={() => handleResolve(issue.id, 'IN_PROGRESS')} className="flex-1 text-xs font-bold text-blue-700 bg-blue-100 hover:bg-blue-200 py-2 rounded-lg transition-colors">
                                                Mark In Progress
                                            </button>
                                        )}
                                        <button onClick={() => handleResolve(issue.id, 'RESOLVED')} className="flex-1 text-xs font-bold text-green-700 bg-green-100 hover:bg-green-200 py-2 rounded-lg transition-colors">
                                            Mark Resolved
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
