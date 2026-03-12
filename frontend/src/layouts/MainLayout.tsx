import { Outlet } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { LogOut, LayoutDashboard, FlagTriangleRight } from 'lucide-react';

const MainLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <nav className="border-b bg-card/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-lg">
                <FlagTriangleRight className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight">CivicSense</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </div>
              
              <button 
                onClick={logout}
                className="flex items-center gap-2 text-sm font-medium text-destructive hover:text-destructive/80 transition-colors bg-destructive/10 px-4 py-2 rounded-full"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
            
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
