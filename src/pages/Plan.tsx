import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Star, 
  Zap, 
  Users, 
  BarChart3,
  Crown
} from 'lucide-react';

const Plan = () => {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small businesses starting their influencer journey",
      features: [
        "Track up to 50 influencers",
        "Basic analytics dashboard",
        "Email notifications",
        "Standard support"
      ],
      popular: false,
      icon: Users
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month", 
      description: "Ideal for growing brands and marketing agencies",
      features: [
        "Track up to 500 influencers",
        "Advanced analytics & reporting",
        "Campaign management tools",
        "API access",
        "Priority support",
        "Custom integrations"
      ],
      popular: true,
      icon: BarChart3
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For large organizations with extensive influencer programs",
      features: [
        "Unlimited influencer tracking",
        "White-label solution",
        "Dedicated account manager",
        "Custom analytics",
        "24/7 phone support",
        "Team collaboration tools",
        "Advanced security features"
      ],
      popular: false,
      icon: Crown
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center mb-4">
          <Zap className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-3xl font-clash font-semibold text-foreground">Choose Your Plan</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Scale your influencer marketing with the right plan for your business needs
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => {
          const IconComponent = plan.icon;
          return (
            <Card 
              key={plan.name} 
              className={`relative hover:shadow-lg transition-shadow ${
                plan.popular ? 'border-primary shadow-md' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-2">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-standout">{plan.name}</CardTitle>
                <CardDescription className="text-sm">
                  {plan.description}
                </CardDescription>
                <div className="flex items-baseline justify-center mt-4">
                  <span className="text-3xl text-kpi text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-3 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full mt-6 ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                  }`}
                >
                  {plan.popular ? 'Get Started' : 'Choose Plan'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="text-center pt-12 border-t">
        <h2 className="text-2xl font-clash font-semibold mb-4">Need Help Choosing?</h2>
        <p className="text-muted-foreground mb-6">
          Our team can help you find the perfect plan for your business needs.
        </p>
        <Button variant="outline">
          Contact Sales
        </Button>
      </div>
    </div>
  );
};

export default Plan;