import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import api from '../lib/axios';
import { FlagTriangleRight, Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await api.post('/auth/login', { email, password });
            const { token } = response.data;
            
            login(token);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-background">
            {/* Left Brand Panel */}
            <div className="hidden relative lg:flex flex-col justify-between p-12 bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-blue-900 z-0" />
                
                {/* Decorative background circle */}
                <div className="absolute -left-24 -top-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

                <div className="relative z-10 flex items-center gap-3 text-primary-foreground">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                        <FlagTriangleRight className="w-8 h-8" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">CivicSense</span>
                </div>

                <div className="relative z-10 text-primary-foreground space-y-6 max-w-md">
                    <h1 className="text-5xl font-bold leading-tight tracking-tight">
                        Welcome back to your city.
                    </h1>
                    <p className="text-primary-foreground/80 text-lg leading-relaxed">
                        Log in to report civic issues, track community repairs, and upvote local problems that matter most to your neighborhood.
                    </p>
                </div>
                
                <div className="relative z-10 text-primary-foreground/60 text-sm">
                    &copy; 2026 CivicSense Communities
                </div>
            </div>

            {/* Right Interactive Form Panel */}
            <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-24 xl:px-32 relative">
                {/* Mobile Header Logo */}
                <div className="flex lg:hidden items-center gap-2 mb-12 text-primary">
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <FlagTriangleRight className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">CivicSense</span>
                </div>

                <div className="w-full max-w-sm mx-auto sm:max-w-md">
                    <div className="space-y-3 mb-10">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">Sign in</h2>
                        <p className="text-muted-foreground">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                                Create one now
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
                                <label className="text-sm font-medium text-foreground ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-input/50 border border-border rounded-xl px-11 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all pb-3"
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
                                        className="w-full bg-input/50 border border-border rounded-xl px-11 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all pb-3"
                                        placeholder="••••••••"
                                    />
                                </div>
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
                                    Sign In securely
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
