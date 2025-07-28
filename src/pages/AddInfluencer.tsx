import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Instagram, 
  Plus, 
  X, 
  Save,
  ArrowLeft,
  Upload,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const AddInfluencer = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    bio: '',
    category: '',
    location: '',
    profileUrl: '',
    followers: '',
    following: '',
    posts: '',
    engagementRate: '',
    avgLikes: '',
    avgComments: '',
    avgViews: ''
  });

  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const categories = [
    'Fashion', 'Beauty', 'Lifestyle', 'Fitness', 'Food', 'Travel', 
    'Technology', 'Gaming', 'Business', 'Entertainment', 'Art', 'Music'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here we'll add the Supabase integration
      console.log('Form data:', { ...formData, tags });
      
      toast({
        title: "Success!",
        description: "Influencer has been added to your database.",
      });

      // Reset form
      setFormData({
        name: '',
        username: '',
        email: '',
        bio: '',
        category: '',
        location: '',
        profileUrl: '',
        followers: '',
        following: '',
        posts: '',
        engagementRate: '',
        avgLikes: '',
        avgComments: '',
        avgViews: ''
      });
      setTags([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add influencer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Link to="/influencers">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Influencer</h1>
          <p className="text-muted-foreground mt-1">
            Add a new influencer to your database and start tracking their metrics
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <Card className="lg:col-span-2 p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Instagram className="h-5 w-5 mr-2 text-primary" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Instagram Username *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="johndoe"
                    className="pl-7"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Fashion, Beauty, Lifestyle..."
                  list="categories"
                />
                <datalist id="categories">
                  {categories.map(cat => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="New York, USA"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileUrl">Profile URL</Label>
                <div className="relative">
                  <Input
                    id="profileUrl"
                    name="profileUrl"
                    value={formData.profileUrl}
                    onChange={handleInputChange}
                    placeholder="https://instagram.com/johndoe"
                  />
                  {formData.profileUrl && (
                    <a
                      href={formData.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Brief description about the influencer..."
                rows={3}
              />
            </div>

            {/* Tags */}
            <div className="mt-4 space-y-2">
              <Label>Tags</Label>
              <div className="flex items-center space-x-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Add tag..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Metrics */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Metrics</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="followers">Followers</Label>
                <Input
                  id="followers"
                  name="followers"
                  type="number"
                  value={formData.followers}
                  onChange={handleInputChange}
                  placeholder="10000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="following">Following</Label>
                <Input
                  id="following"
                  name="following"
                  type="number"
                  value={formData.following}
                  onChange={handleInputChange}
                  placeholder="500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="posts">Posts</Label>
                <Input
                  id="posts"
                  name="posts"
                  type="number"
                  value={formData.posts}
                  onChange={handleInputChange}
                  placeholder="250"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="engagementRate">Engagement Rate (%)</Label>
                <Input
                  id="engagementRate"
                  name="engagementRate"
                  type="number"
                  step="0.01"
                  value={formData.engagementRate}
                  onChange={handleInputChange}
                  placeholder="3.5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avgLikes">Avg Likes</Label>
                <Input
                  id="avgLikes"
                  name="avgLikes"
                  type="number"
                  value={formData.avgLikes}
                  onChange={handleInputChange}
                  placeholder="1500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avgComments">Avg Comments</Label>
                <Input
                  id="avgComments"
                  name="avgComments"
                  type="number"
                  value={formData.avgComments}
                  onChange={handleInputChange}
                  placeholder="50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avgViews">Avg Views</Label>
                <Input
                  id="avgViews"
                  name="avgViews"
                  type="number"
                  value={formData.avgViews}
                  onChange={handleInputChange}
                  placeholder="5000"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Link to="/influencers">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-gradient-to-r from-primary to-primary-glow"
          >
            {loading ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Influencer
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddInfluencer;