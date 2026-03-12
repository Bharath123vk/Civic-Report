import { Link } from 'react-router-dom';
import { FlagTriangleRight, MapPin, ThumbsUp, ShieldCheck, ArrowRight } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-background">
            
            {/* Minimalist Top Navigation */}
            <nav className="absolute top-0 w-full z-10 border-b border-white/10 bg-black/10 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-2 text-white">
                            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                                <FlagTriangleRight className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">CivicSense</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <Link to="/login" className="text-white/80 hover:text-white font-medium transition-colors">
                                Sign In
                            </Link>
                            <Link to="/register" className="bg-white text-primary px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main>
                <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pb-32 overflow-hidden bg-primary">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-blue-900 z-0" />
                    
                    {/* Decorative abstract background shapes */}
                    <div className="absolute left-1/2 -top-24 w-[800px] h-[800px] bg-white/10 rounded-full blur-3xl -translate-x-1/2" />
                    <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <h1 className="text-5xl tracking-tight font-extrabold text-white sm:text-6xl md:text-7xl lg:text-8xl mb-8 leading-tight">
                            Your voice. <br className="hidden sm:block" />
                            <span className="text-white/80">Your city's future.</span>
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-xl text-primary-foreground/80 sm:text-2xl leading-relaxed">
                            A modern platform empowering citizens to report local issues, track municipality repairs, and directly shape community governance.
                        </p>
                        
                        <div className="mt-12 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center gap-4">
                            <Link to="/register" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 border border-transparent rounded-full font-bold text-lg shadow-2xl hover:bg-gray-50 transition-all hover:scale-105">
                                Start reporting now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/login" className="mt-4 sm:mt-0 w-full sm:w-auto flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
                                Track existing issues
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Feature highlights Section */}
                <div className="py-24 bg-background relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                            
                            <div className="relative group">
                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-primary opacity-0 group-hover:opacity-20 transition duration-500 blur-xl" />
                                <div className="relative bg-card border border-border/50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
                                    <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                        <MapPin className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-4">Location Tagging</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Pinpoint exact infrastructure problems on the map instantly. Help administrators deploy repair units with pinpoint accuracy.
                                    </p>
                                </div>
                            </div>

                            <div className="relative group text-left">
                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-20 transition duration-500 blur-xl" />
                                <div className="relative bg-card border border-border/50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
                                    <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                        <ThumbsUp className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-4">Community Upvoting</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Democratize urban priorities. Upvote critical issues heavily affecting your neighborhood to surface them directly to city planners.
                                    </p>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 transition duration-500 blur-xl" />
                                <div className="relative bg-card border border-border/50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
                                    <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                        <ShieldCheck className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-4">Transparent Updates</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Watch your reported infrastructure change statuses from <span className="font-semibold px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">Open</span> to <span className="font-semibold px-2 py-0.5 bg-green-100 text-green-800 rounded">Resolved</span> in real-time.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            
            {/* Minimal Footer */}
            <footer className="bg-white border-t py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 text-foreground/80">
                        <FlagTriangleRight className="w-5 h-5 text-primary" />
                        <span className="font-bold tracking-tight">CivicSense Framework</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        &copy; 2026 Designed structurally for maximum aesthetic performance.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
