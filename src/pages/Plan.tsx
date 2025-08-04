import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Upload, 
  Lightbulb, 
  Target, 
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';

const Plan = () => {
  const [briefContent, setBriefContent] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [hasGeneratedPlan, setHasGeneratedPlan] = useState(false);

  // Mock data for demonstration
  const mockBrief = `Campaign: Summer Fitness Challenge
Objective: Increase brand awareness and drive sales for our new line of fitness supplements
Target Audience: Health-conscious millennials aged 25-35
Budget: $50,000
Timeline: 3 months (June - August)
Key Messages: Natural ingredients, proven results, summer body ready
Deliverables: Social media posts, workout videos, product reviews`;

  const mockStrategyPlan = {
    overview: {
      recommendedInfluencers: 15,
      estimatedReach: '2.5M',
      projectedEngagement: '125K',
      campaignDuration: '12 weeks'
    },
    phases: [
      {
        name: 'Phase 1: Brand Awareness',
        duration: '4 weeks',
        objective: 'Introduce the brand and build initial awareness',
        tactics: [
          'Partner with 5 macro fitness influencers (500K+ followers)',
          'Create unboxing and first impression videos',
          'Launch branded hashtag #SummerFitChallenge',
          'Sponsored posts and stories'
        ],
        budget: '$20,000',
        kpis: ['Reach: 1M+', 'Brand mention increase: 300%', 'Hashtag usage: 5K+']
      },
      {
        name: 'Phase 2: Product Education',
        duration: '4 weeks', 
        objective: 'Educate audience about product benefits and usage',
        tactics: [
          'Partner with 8 micro fitness influencer nutritionists (50K-200K followers)',
          'Create educational content about ingredients',
          'Before/after transformation content',
          'Live Q&A sessions about fitness and nutrition'
        ],
        budget: '$18,000',
        kpis: ['Engagement rate: 6%+', 'Website clicks: 50K+', 'Educational content saves: 10K+']
      },
      {
        name: 'Phase 3: Conversion Drive',
        duration: '4 weeks',
        objective: 'Drive sales and conversions with urgency',
        tactics: [
          'Partner with 2 celebrity fitness influencers for testimonials',
          'Limited-time discount codes',
          'User-generated content campaigns',
          'Success story features'
        ],
        budget: '$12,000',
        kpis: ['Conversion rate: 4%+', 'Sales: $200K+', 'Promo code usage: 2K+']
      }
    ],
    recommendedInfluencers: [
      { name: 'FitnessMom Sarah', followers: '850K', engagement: '4.2%', niche: 'Fitness & Wellness' },
      { name: 'ProteinPro Mike', followers: '650K', engagement: '5.1%', niche: 'Bodybuilding' },
      { name: 'YogaLife Emma', followers: '420K', engagement: '6.8%', niche: 'Yoga & Mindfulness' },
      { name: 'NutritionalNinja', followers: '380K', engagement: '5.9%', niche: 'Nutrition' },
      { name: 'CardioQueen Lisa', followers: '290K', engagement: '7.2%', niche: 'Cardio & HIIT' }
    ]
  };

  const handleGeneratePlan = () => {
    setHasGeneratedPlan(true);
  };

  const handleUseMockData = () => {
    setCampaignName('Summer Fitness Challenge');
    setBriefContent(mockBrief);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Plan</h1>
        <p className="text-muted-foreground mt-1">
          Upload your campaign brief and get a comprehensive influencer marketing strategy tailored to your goals
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Brief Upload Section */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center text-standout">
              <FileText className="h-5 w-5 mr-2" />
              Campaign Brief
            </CardTitle>
            <CardDescription>
              Provide your campaign details to generate a strategic plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="campaignName">Campaign Name</Label>
              <Input
                id="campaignName"
                placeholder="Enter your campaign name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brief">Campaign Brief</Label>
              <Textarea
                id="brief"
                placeholder="Paste your campaign brief here or upload a file..."
                className="min-h-[200px]"
                value={briefContent}
                onChange={(e) => setBriefContent(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-center border-2 border-dashed border-border rounded-lg p-6">
              <div className="text-center space-y-2">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Drop files here or click to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports PDF, DOC, TXT files
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Button 
                onClick={handleUseMockData}
                variant="outline" 
                className="w-full"
              >
                Use Sample Brief
              </Button>
              
              <Button 
                onClick={handleGeneratePlan}
                className="w-full"
                disabled={!briefContent.trim() || !campaignName.trim()}
              >
                <Zap className="h-4 w-4 mr-2" />
                Generate Strategy Plan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Strategy Plan Results */}
        <div className="space-y-6">
          {hasGeneratedPlan ? (
            <>
              {/* Overview Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-standout">Strategy Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl text-kpi text-primary">{mockStrategyPlan.overview.recommendedInfluencers}</div>
                      <div className="text-sm text-muted-foreground">Recommended Influencers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-kpi text-primary">{mockStrategyPlan.overview.estimatedReach}</div>
                      <div className="text-sm text-muted-foreground">Estimated Reach</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-kpi text-primary">{mockStrategyPlan.overview.projectedEngagement}</div>
                      <div className="text-sm text-muted-foreground">Projected Engagement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-kpi text-primary">{mockStrategyPlan.overview.campaignDuration}</div>
                      <div className="text-sm text-muted-foreground">Campaign Duration</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Campaign Phases */}
              <div className="space-y-4">
                <h3 className="text-xl font-clash font-semibold">Campaign Phases</h3>
                {mockStrategyPlan.phases.map((phase, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base text-standout">{phase.name}</CardTitle>
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {phase.duration}
                        </Badge>
                      </div>
                      <CardDescription>{phase.objective}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-2">Key Tactics:</h5>
                        <ul className="space-y-1">
                          {phase.tactics.map((tactic, tacticIndex) => (
                            <li key={tacticIndex} className="flex items-start text-sm">
                              <CheckCircle className="h-3 w-3 text-primary mt-1 mr-2 flex-shrink-0" />
                              {tactic}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center text-sm">
                          <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                          Budget: {phase.budget}
                        </div>
                        <div className="flex items-center text-sm">
                          <Target className="h-4 w-4 text-muted-foreground mr-1" />
                          {phase.kpis.length} KPIs
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recommended Influencers */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-standout">Top Recommended Influencers</CardTitle>
                  <CardDescription>Based on your campaign goals and target audience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockStrategyPlan.recommendedInfluencers.map((influencer, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h5 className="font-medium">{influencer.name}</h5>
                          <p className="text-sm text-muted-foreground">{influencer.niche}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{influencer.followers} followers</div>
                          <div className="text-sm text-muted-foreground">{influencer.engagement} engagement</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="h-64 flex items-center justify-center">
              <div className="text-center space-y-3">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-clash font-medium">Ready to Plan Your Campaign?</h3>
                <p className="text-muted-foreground max-w-sm">
                  Upload your brief to get personalized strategy recommendations and influencer matches
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Plan;