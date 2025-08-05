import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  LogOut,
  User,
  Telescope,
  Bookmark,
  BarChart3,
  Target,
  Settings,
  HelpCircle,
  Crown,
  ChevronUp
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
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

  // Main navigation items
  const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Watchlist', href: '/watchlist', icon: Bookmark },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Strategy', href: '/plan', icon: Target },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Fixed Sidebar with Glassmorphism */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl shadow-gray-900/10 flex flex-col z-40">
        {/* Brand Section */}
        <div className="p-6">
          <div className="flex items-center">
            <Telescope className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-2xl font-bold text-foreground">Vetta</h1>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left transition-all duration-300 rounded-xl p-3 group ${
                      isActive 
                        ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm text-indigo-700 shadow-lg shadow-indigo-500/20 border border-indigo-200/50" 
                        : "text-gray-600 hover:bg-white/60 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-gray-500/10 hover:text-gray-800 hover:border hover:border-white/30 hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                  >
                    <item.icon className={`h-5 w-5 mr-3 transition-all duration-300 ${
                      isActive 
                        ? "text-indigo-600 drop-shadow-sm" 
                        : "text-gray-500 group-hover:text-gray-700 group-hover:scale-110"
                    }`} />
                    <span className="font-medium">{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="relative">
          <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent"></div>
          {/* User Profile Dropdown */}
          {user && (
            <div className="p-4 pt-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between p-3 h-auto hover:bg-white/60 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-gray-500/10 hover:border hover:border-white/30 rounded-xl transition-all duration-300 group hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <ChevronUp className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-all duration-300 group-hover:scale-110" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  side="top" 
                  className="w-64 p-2 bg-white/90 backdrop-blur-xl shadow-2xl shadow-gray-900/20 border border-white/20 rounded-2xl"
                  sideOffset={8}
                >
                  <div className="px-3 py-2 border-b border-gray-100 mb-1">
                    <p className="text-sm font-medium text-gray-900">
                      {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/profile" 
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-white/60 hover:backdrop-blur-sm hover:shadow-sm rounded-xl cursor-pointer transition-all duration-200 group"
                    >
                      <User className="h-4 w-4 mr-3 text-gray-500 group-hover:text-gray-700 transition-colors" />
                      <span className="font-medium">Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/plan" 
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-white/60 hover:backdrop-blur-sm hover:shadow-sm rounded-xl cursor-pointer transition-all duration-200 group"
                    >
                      <Crown className="h-4 w-4 mr-3 text-amber-500 group-hover:text-amber-600 transition-colors" />
                      <span className="font-medium">Upgrade Plan</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-white/60 hover:backdrop-blur-sm hover:shadow-sm rounded-xl cursor-pointer transition-all duration-200 group">
                    <Settings className="h-4 w-4 mr-3 text-gray-500 group-hover:text-gray-700 transition-colors" />
                    <span className="font-medium">Settings</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-white/60 hover:backdrop-blur-sm hover:shadow-sm rounded-xl cursor-pointer transition-all duration-200 group">
                    <HelpCircle className="h-4 w-4 mr-3 text-blue-500 group-hover:text-blue-600 transition-colors" />
                    <span className="font-medium">Help</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator className="my-2" />
                  
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50/80 hover:backdrop-blur-sm hover:text-red-700 hover:shadow-sm rounded-xl cursor-pointer transition-all duration-200 group"
                  >
                    <LogOut className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium">Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/60 px-6 py-3 sticky top-0 z-30 h-16 flex items-center shadow-sm">
          <div className="flex items-center justify-between w-full">
            <div className="flex-1">
              {/* This can be used for page titles or breadcrumbs */}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SimpleLayout;