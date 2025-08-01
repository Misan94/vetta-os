import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  Search, 
  Plus, 
  Users, 
  TrendingUp,
  Instagram,
  Sparkles,
  Database
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const GoogleStyleHomepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/influencers?search=${encodeURIComponent(searchQuery)}`);
    }
  };


  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <Instagram className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">InfluencerDB</span>
          </div>
          <Button variant="ghost" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Account
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-16">
        <div className="w-full max-w-2xl text-center space-y-8">
          {/* Logo and Title */}
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Instagram className="h-16 w-16 text-primary" />
                <Sparkles className="h-6 w-6 text-accent absolute -top-1 -right-1" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-foreground tracking-tight">
              Influencer<span className="font-medium text-primary">DB</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Discover, manage, and analyze influencers in your database
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
                Add New Influencer
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