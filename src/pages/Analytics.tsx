import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Heart, 
  Eye, 
  MessageCircle,
  Calendar,
  Download,
  Filter
} from 'lucide-react';

const Analytics = () => {
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

  const topCategories = [
    // Mock data - will be populated from database
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

        {/* Top Categories */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Top Categories</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          
          {topCategories.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No category data</h3>
              <p className="text-muted-foreground">
                Category breakdown will appear once you add influencers
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {topCategories.map((category: any, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 w-3 rounded-full bg-gradient-to-r from-primary to-accent"></div>
                    <span className="font-medium text-foreground">{category.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline">{category.count} influencers</Badge>
                    <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                  </div>
                </div>
              ))}
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