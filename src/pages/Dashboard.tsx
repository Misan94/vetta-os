import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  TrendingUp, 
  Eye, 
  Heart,
  Instagram,
  ArrowUpRight,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock data for demonstration
  const stats = [
    {
      title: "Total Influencers",
      value: "0",
      change: "+0%",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Avg Engagement Rate",
      value: "0%",
      change: "+0%",
      icon: TrendingUp,
      color: "text-success"
    },
    {
      title: "Total Reach",
      value: "0M",
      change: "+0%",
      icon: Eye,
      color: "text-accent"
    },
    {
      title: "Campaigns Active",
      value: "0",
      change: "+0",
      icon: Star,
      color: "text-warning"
    }
  ];

  const recentInfluencers = [
    // Mock data - will be replaced with real data from Supabase
  ];

  const topPerformers = [
    // Mock data - will be replaced with real data from Supabase
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to your influencer analytics platform
          </p>
        </div>

      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 bg-gradient-to-br from-card to-secondary/30 border shadow-card hover:shadow-elegant transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {stat.value}
                </p>
                <p className="text-sm text-success mt-1">
                  {stat.change} from last month
                </p>
              </div>
              <div className={`h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Influencers */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Influencers</h2>
            <Link to="/influencers">
              <Button variant="outline" size="sm">
                View All
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          {recentInfluencers.length === 0 ? (
            <div className="text-center py-8">
              <Instagram className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No influencers yet</h3>
              <p className="text-muted-foreground mb-4">
                Your influencer database will appear here once you start adding contacts
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentInfluencers.map((influencer: any, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-accent"></div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{influencer.name}</p>
                    <p className="text-sm text-muted-foreground">@{influencer.username}</p>
                  </div>
                  <Badge variant="outline">{influencer.followers}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Top Performers */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Top Performers</h2>
            <Link to="/analytics">
              <Button variant="outline" size="sm">
                View Analytics
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          {topPerformers.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No data available</h3>
              <p className="text-muted-foreground mb-4">
                Analytics will appear here once you have influencer data and metrics
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {topPerformers.map((performer: any, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-success to-warning"></div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{performer.name}</p>
                    <p className="text-sm text-muted-foreground">{performer.engagementRate}% engagement</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-success">+{performer.growth}%</p>
                    <p className="text-xs text-muted-foreground">growth</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <Link to="/analytics">
            <Button variant="outline" className="h-24 flex-col space-y-2 w-full hover:bg-success/5 hover:border-success transition-all duration-200">
              <TrendingUp className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
          </Link>
          <Button variant="outline" className="h-24 flex-col space-y-2 w-full hover:bg-accent/5 hover:border-accent transition-all duration-200">
            <Heart className="h-6 w-6" />
            <span>Export Data</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;