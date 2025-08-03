import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus,
  Calendar,
  Target,
  DollarSign,
  BarChart3,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Campaigns = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage your influencer marketing campaigns
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Target className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Campaigns</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-success/10 rounded-lg">
              <DollarSign className="h-4 w-4 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <p className="text-2xl font-bold">$0</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Users className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Influencers</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-warning/10 rounded-lg">
              <BarChart3 className="h-4 w-4 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Reach</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Empty State */}
      <Card className="p-12">
        <div className="text-center">
          <Target className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-2">No campaigns yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Start your first influencer marketing campaign. Connect with creators, set your budget, 
            and track performance all in one place.
          </p>
          <Button className="bg-gradient-to-r from-primary to-primary-glow">
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Campaign
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Campaigns;