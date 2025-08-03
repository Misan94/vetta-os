import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download,
  Calendar,
  BarChart3,
  TrendingUp,
  Eye,
  Heart,
  Users,
  DollarSign
} from 'lucide-react';

const Reports = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Analytics and insights for your influencer marketing campaigns
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Time Period Selector */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Last 30 Days
        </Button>
        <Badge variant="secondary">No data available</Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Eye className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Impressions</p>
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-muted-foreground">+0% from last period</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-success/10 rounded-lg">
              <Heart className="h-4 w-4 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Engagement Rate</p>
              <p className="text-2xl font-bold">0%</p>
              <p className="text-xs text-muted-foreground">+0% from last period</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Users className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Reach</p>
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-muted-foreground">+0% from last period</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-warning/10 rounded-lg">
              <DollarSign className="h-4 w-4 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ROI</p>
              <p className="text-2xl font-bold">0%</p>
              <p className="text-xs text-muted-foreground">+0% from last period</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Performance Over Time</h3>
            <Button variant="ghost" size="sm">
              <BarChart3 className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No data to display</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Top Performing Content</h3>
            <Button variant="ghost" size="sm">
              <TrendingUp className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No content data available</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Empty State */}
      <Card className="p-12">
        <div className="text-center">
          <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-2">No report data available</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Start running campaigns and tracking influencer performance to see detailed analytics 
            and insights in your reports.
          </p>
          <Button className="bg-gradient-to-r from-primary to-primary-glow">
            <TrendingUp className="h-4 w-4 mr-2" />
            Get Started with Analytics
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Reports;