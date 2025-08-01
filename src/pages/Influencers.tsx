import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical,
  Instagram,
  TrendingUp,
  Users,
  Eye,
  Heart
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const Influencers = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  // Handle URL search parameter
  useEffect(() => {
    const urlSearchTerm = searchParams.get('search');
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
    }
  }, [searchParams]);
  
  // Mock data - will be replaced with real data from Supabase
  const influencers = [
    // Empty for now - will be populated from database
  ];

  const filteredInfluencers = influencers.filter((influencer: any) =>
    influencer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    influencer.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Influencers</h1>
          <p className="text-muted-foreground mt-1">
            {searchTerm ? `Search results for "${searchTerm}"` : 'Manage and track your influencer database'}
          </p>
        </div>
        <Link to="/add">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Influencer
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search influencers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Influencers Grid */}
      {filteredInfluencers.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <Instagram className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-2">No influencers found</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchTerm 
                ? "No influencers match your search criteria. Try adjusting your search terms."
                : "Start building your influencer database by adding your first influencer. Connect with creators and track their performance metrics."
              }
            </p>
            <Link to="/add">
              <Button className="bg-gradient-to-r from-primary to-primary-glow">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Influencer
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInfluencers.map((influencer: any, index) => (
            <Card key={index} className="p-6 hover:shadow-elegant transition-all duration-200 group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {influencer.name?.charAt(0) || '?'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {influencer.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">@{influencer.username}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Followers</span>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-medium">{influencer.followers}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Engagement Rate</span>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4 text-accent" />
                    <span className="font-medium">{influencer.engagementRate}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Views</span>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4 text-success" />
                    <span className="font-medium">{influencer.avgViews}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {influencer.category || 'Lifestyle'}
                  </Badge>
                  <div className="flex items-center space-x-1 text-success">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-xs font-medium">+{influencer.growth || 0}%</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Influencers;