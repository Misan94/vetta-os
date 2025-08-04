import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  Search, 
  Plus, 
  Users, 
  TrendingUp,
  Telescope,
  Sparkles,
  Database,
  LogOut,
  User,
  Settings
} from 'lucide-react';
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

const GoogleStyleHomepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/influencers?search=${encodeURIComponent(searchQuery)}`);
    }
  };

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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 border-b relative z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <Telescope className="h-6 w-6 text-primary" />
            <span className="text-lg font-clash font-semibold text-foreground">Vetta</span>
          </div>

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
          
          {/* User Menu */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 z-50">
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
      <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-8">
        <div className="w-full max-w-2xl text-center space-y-8">
          {/* Logo and Title */}
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Telescope className="h-16 w-16 text-primary" />
                <Sparkles className="h-6 w-6 text-accent absolute -top-1 -right-1" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-clash font-semibold text-foreground tracking-tight">
              Vetta
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Discover, manage, and analyze influencers for your marketing campaigns
            </p>
          </div>

          {/* Search Bar */}
          <div className="space-y-6">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search influencers by name, category, or location..."
                  className="w-full h-14 pl-12 pr-4 text-lg border-2 rounded-full shadow-sm focus:shadow-lg focus:border-primary transition-all duration-200 bg-card"
                />
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => navigate('/influencers')}
                className="h-11 px-6 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground"
              >
                Browse All Influencers
              </Button>
              <Button 
                onClick={() => navigate('/add')}
                className="h-11 px-6 rounded-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Track an Influencer
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-muted-foreground italic">
            Effortless Influencer Management ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GoogleStyleHomepage;