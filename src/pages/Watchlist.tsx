import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Filter, 
  Heart,
  MoreVertical,
  Star,
  TrendingUp,
  Users,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Watchlist = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock watchlist data - will be replaced with real data from Supabase
  const watchlistInfluencers = [
    // Empty for now - will be populated from database
  ];

  const filteredInfluencers = watchlistInfluencers.filter((influencer: any) =>
    influencer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    influencer.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Watchlist</h1>
          <p className="text-muted-foreground mt-1">
            Keep track of your favorite influencers and monitor their performance
          </p>
        </div>

      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search watchlist..."
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

      {/* Watchlist Grid */}
      {filteredInfluencers.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <Star className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Your watchlist is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchTerm 
                ? "No influencers in your watchlist match your search criteria."
                : "Start building your watchlist by adding influencers you want to monitor. Watch their performance and engagement over time."
              }
            </p>
            <Link to="/influencers">
              <Button className="bg-gradient-to-r from-primary to-primary-glow">
                <Heart className="h-4 w-4 mr-2" />
                Browse Influencers
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
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="text-yellow-500 hover:text-yellow-600">
                    <Star className="h-4 w-4 fill-current" />
                  </Button>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
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

export default Watchlist;