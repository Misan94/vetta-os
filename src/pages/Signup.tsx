import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Eye, EyeOff, Telescope } from 'lucide-react';
import { useAuth } from '@/hooks/useSupabase';
import { useToast } from '@/components/ui/use-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [receiveUpdates, setReceiveUpdates] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination or default to dashboard
  const from = location.state?.from?.pathname || '/';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const result = await signUp(formData.email, formData.password);
      
      if (result.error) {
        setError(result.error.message);
        return;
      }

      toast({
        title: "Account created successfully!",
        description: "Please check your email to verify your account.",
      });

      // Redirect to login or intended destination
      navigate('/login', { 
        replace: true,
        state: { from: location.state?.from }
      });
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center">
              <Telescope className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-2xl font-bold text-foreground">Vetta</h1>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Hi there!</h2>
            <p className="text-lg text-foreground mb-1">Get started with your free account today.</p>
            <p className="text-sm text-muted-foreground">No credit card required.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="h-12 text-base"
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="h-12 text-base pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Updates Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="updates"
                checked={receiveUpdates}
                onCheckedChange={setReceiveUpdates}
              />
              <Label
                htmlFor="updates"
                className="text-sm text-foreground cursor-pointer"
              >
                I want to receive updates about Vetta
              </Label>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Creating account...
                </>
              ) : (
                'Create my free account'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-muted-foreground">OR</span>
              </div>
            </div>
          </div>

          {/* Google Sign Up */}
          <div className="mt-6">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base font-medium border-gray-300 hover:border-gray-400"
              disabled={loading}
            >
              <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </Button>
          </div>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-medium text-foreground hover:underline"
                state={{ from }}
              >
                Log in
              </Link>
            </p>
          </div>

          {/* Terms */}
          <div className="mt-8">
            <p className="text-xs text-muted-foreground">
              By signing up, I agree to Vetta's{' '}
              <a href="#" className="underline hover:no-underline">
                terms & conditions
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Video Background */}
      <div className="hidden lg:block relative flex-1 overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://cdn.midjourney.com/video/fd7a5ad8-a033-41f1-acb2-9054f58a219f/3.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="text-white z-10 max-w-lg">
            {/* Main Headline */}
            <h3 className="text-4xl font-bold mb-6 drop-shadow-lg font-clash">
              Tired of Guesswork?
            </h3>
            
            {/* Subheading */}
            <p className="text-xl font-semibold mb-8 drop-shadow-md">
              <strong>Start making smarter influencer decisions.</strong>
            </p>

            {/* Features List */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 drop-shadow-md">What you can do with Vetta:</h4>
              <ul className="space-y-3 text-base drop-shadow-md">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  <span><strong>Find high-fit influencers</strong> faster — no more hours of manual scrolling</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  <span><strong>Track key metrics</strong> like engagement, audience quality, and growth</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  <span><strong>Set alerts</strong> for spikes, drops, or brand safety signals</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  <span><strong>Plan campaigns</strong> with briefs that sync seamlessly across your team</span>
                </li>
              </ul>
            </div>

            {/* Quote */}
            <div className="mb-8 p-4 bg-black bg-opacity-30 rounded-lg">
              <p className="text-base italic drop-shadow-md">
                "60% of marketers say measuring influencer ROI is their #1 challenge. Vetta fixes that."
              </p>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;