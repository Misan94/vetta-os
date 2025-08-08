import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Heart, 
  Eye, 
  MessageCircle,
  Calendar,
  Download,
  Filter,
  Search,
  Loader2,
  Image,
  Video,
  FileText,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { phylloService } from '@/lib/phyllo';

const Analytics = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Handle search functionality
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearching(true);
      // Navigate to influencers page with search query
      navigate(`/influencers?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearching(false);
    }
  };

  // Mock data for demonstration
  const overviewStats = [
    {
      title: "Total Reach",
      value: "0M",
      change: "+0%",
      trend: "up",
      icon: Eye,
      color: "text-primary"
    },
    {
      title: "Total Engagement",
      value: "0K",
      change: "+0%",
      trend: "up",
      icon: Heart,
      color: "text-accent"
    },
    {
      title: "Avg Engagement Rate",
      value: "0%",
      change: "+0%",
      trend: "up",
      icon: TrendingUp,
      color: "text-success"
    },
    {
      title: "Active Influencers",
      value: "0",
      change: "+0",
      trend: "up",
      icon: Users,
      color: "text-warning"
    }
  ];

  const latestPosts = [
    {
      id: 1,
      author: "John Fitness",
      platform: "instagram",
      content: "Just crushed a new PR at the gym! 💪 Who's ready to join me for tomorrow's workout?",
      type: "image",
      timestamp: "2 hours ago",
      likes: 1247,
      comments: 89,
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop&crop=center"
    },
    {
      id: 2,
      author: "Sarah Tech",
      platform: "youtube",
      content: "New video: 'React 18 Features You Need to Know' is now live! 🚀",
      type: "video",
      timestamp: "4 hours ago",
      likes: 892,
      comments: 156,
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=60&h=60&fit=crop&crop=center"
    },
    {
      id: 3,
      author: "Mike's Kitchen",
      platform: "tiktok",
      content: "30-second pasta recipe that will change your life 🍝✨",
      type: "video",
      timestamp: "6 hours ago",
      likes: 3456,
      comments: 234,
      thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=60&h=60&fit=crop&crop=center"
    },
    {
      id: 4,
      author: "Emma Explores",
      platform: "instagram",
      content: "Sunrise over Santorini never gets old 🌅 What's your favorite travel destination?",
      type: "image",
      timestamp: "8 hours ago",
      likes: 2198,
      comments: 145,
      thumbnail: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=60&h=60&fit=crop&crop=center"
    },
    {
      id: 5,
      author: "Alex Business",
      platform: "linkedin",
      content: "5 strategies that helped me scale my startup to $1M ARR in 18 months",
      type: "text",
      timestamp: "12 hours ago",
      likes: 567,
      comments: 78,
      thumbnail: null
    }
  ];

  const engagementTrends = [
    // Mock data for chart - will be populated with real data
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Detailed insights into your influencer performance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative group max-w-md">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors ${
              isSearching ? 'text-primary animate-pulse' : 'text-muted-foreground group-focus-within:text-primary'
            }`} />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-primary" />
            )}
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for influencers by name, category, or platform..."
              className="pl-10 pr-10 h-10 bg-background border-muted-foreground/20 focus:border-primary transition-all duration-200"
              disabled={isSearching}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Search will take you to the Influencers page with your query. Try "fitness", "tech", "food", "travel", or "business"
          </p>
        </form>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="p-6 bg-gradient-to-br from-card to-secondary/30 border shadow-card hover:shadow-elegant transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {stat.value}
                </p>
                <div className="flex items-center mt-1">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-success mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive mr-1" />
                  )}
                  <p className={`text-sm ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    {stat.change} from last month
                  </p>
                </div>
              </div>
              <div className={`h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Trends */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Engagement Trends</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-1" />
                Last 30 days
              </Button>
            </div>
          </div>
          
          {engagementTrends.length === 0 ? (
            <div className="text-center py-12">
              <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No trend data available</h3>
              <p className="text-muted-foreground">
                Engagement trends will appear here once you have influencers with metrics
              </p>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              [Chart will be displayed here with real data]
            </div>
          )}
        </Card>

        {/* Latest Posts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Latest Posts</h2>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-1" />
              View All
            </Button>
          </div>
          
          {latestPosts.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No recent posts</h3>
              <p className="text-muted-foreground">
                Latest posts from your tracked influencers will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {latestPosts.map((post) => {
                const ContentIcon = post.type === 'image' ? Image : post.type === 'video' ? Video : FileText;
                const platformColors = {
                  instagram: 'text-pink-500',
                  youtube: 'text-red-500',
                  tiktok: 'text-black',
                  linkedin: 'text-blue-700'
                };
                
                return (
                  <div key={post.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    {/* Author Avatar/Thumbnail */}
                    <div className="flex-shrink-0">
                      {post.thumbnail ? (
                        <img 
                          src={post.thumbnail} 
                          alt={post.author}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {post.author.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Post Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-foreground text-sm">
                          {post.author}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {post.platform}
                        </Badge>
                        <ContentIcon className={`h-3 w-3 ${platformColors[post.platform as keyof typeof platformColors] || 'text-muted-foreground'}`} />
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {post.content}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3" />
                            <span>{post.likes.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {post.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Performance Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-lg bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
            <TrendingUp className="h-12 w-12 text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Best Performing Time</h3>
            <p className="text-muted-foreground">No data available yet</p>
          </div>

          <div className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Top Content Type</h3>
            <p className="text-muted-foreground">No data available yet</p>
          </div>

          <div className="text-center p-6 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
            <MessageCircle className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Avg Response Rate</h3>
            <p className="text-muted-foreground">No data available yet</p>
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
        
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No recent activity</h3>
          <p className="text-muted-foreground">
            Activity feed will show updates when you start tracking influencer metrics
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;