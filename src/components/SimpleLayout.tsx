import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Telescope, LogOut, User, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useSupabase';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SimpleLayoutProps {
  children: ReactNode;
  title?: string;
}

const SimpleLayout = ({ children }: SimpleLayoutProps) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Clean Header */}
      <header className="w-full py-4 px-6 border-b">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Clean Logo - Left Side */}
          <Link to="/" className="flex items-center space-x-2">
            <Telescope className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">Vetta</span>
          </Link>

          {/* Navigation Menu - Center */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Search
            </Link>
            <Link 
              to="/watchlist" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Watchlist
            </Link>
            <Link 
              to="/analytics" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Analytics
            </Link>
            <Link 
              to="/plan" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Plan
            </Link>
          </nav>
          
          {/* User Menu - Right Side */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Signed in since {new Date(user.created_at || '').toLocaleDateString()}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
};

export default SimpleLayout;