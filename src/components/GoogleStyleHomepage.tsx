import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { 
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      {/* Main Content */}
        <div className="w-full max-w-2xl text-center space-y-10">
          {/* Description */}
          <p className="text-2xl md:text-3xl font-medium text-foreground text-center md:whitespace-nowrap">
            Which influencers do you want to find?
          </p>

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

            {/* Tagline */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground italic">
                Effortless Influencer Management ❤️
              </p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default GoogleStyleHomepage;