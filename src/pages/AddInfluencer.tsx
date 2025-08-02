import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Instagram, 
  Plus, 
  X, 
  Save,
  ArrowLeft,
  Upload,
  ExternalLink,
  Youtube,
  Twitter,
  Facebook,
  Linkedin,
  Music,
  Video,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useSupabaseMutation, useAuth } from '@/hooks/useSupabase';

// Platform configuration
const PLATFORMS = {
  instagram: { name: 'Instagram', icon: Instagram, color: 'text-pink-500', placeholder: '@username' },
  tiktok: { name: 'TikTok', icon: Music, color: 'text-black', placeholder: '@username' },
  youtube: { name: 'YouTube', icon: Youtube, color: 'text-red-500', placeholder: 'channel-name' },
  twitter: { name: 'Twitter/X', icon: Twitter, color: 'text-blue-500', placeholder: '@username' },
  facebook: { name: 'Facebook', icon: Facebook, color: 'text-blue-600', placeholder: 'username' },
  linkedin: { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700', placeholder: 'username' }
} as const;

type PlatformKey = keyof typeof PLATFORMS;

interface PlatformData {
  handle: string;
  url: string;
}

const AddInfluencer = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  
  // Basic influencer information
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    category: '',
    location: ''
  });

  // Platform-specific data
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<PlatformKey>>(new Set(['instagram']));
  const [platformsData, setPlatformsData] = useState<Record<PlatformKey, PlatformData>>({
    instagram: { handle: '', url: '' },
    tiktok: { handle: '', url: '' },
    youtube: { handle: '', url: '' },
    twitter: { handle: '', url: '' },
    facebook: { handle: '', url: '' },
    linkedin: { handle: '', url: '' }
  });

  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  // Supabase mutation for creating influencers
  const { insert: insertInfluencer, loading: insertLoading, error: insertError } = useSupabaseMutation('influencers');

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

  const handlePlatformToggle = (platform: PlatformKey, checked: boolean) => {
    setSelectedPlatforms(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(platform);
      } else {
        newSet.delete(platform);
      }
      return newSet;
    });
  };

  const handlePlatformDataChange = (platform: PlatformKey, field: 'handle' | 'url', value: string) => {
    setPlatformsData(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value
      }
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
      // Check if user is authenticated
      if (!user) {
        throw new Error('You must be signed in to add influencers. Please sign in first.');
      }

      // Prepare platforms data for selected platforms only
      const activePlatforms = Array.from(selectedPlatforms).reduce((acc, platform) => {
        const data = platformsData[platform];
        if (data.handle || data.url) { // Only include platforms with data
          acc[platform] = data;
        }
        return acc;
      }, {} as Record<string, PlatformData>);

      const influencerData = {
        name: formData.name,
        email: formData.email || null,
        bio: formData.bio || null,
        category: formData.category || null,
        location: formData.location || null,
        platforms: activePlatforms,
        tags: tags
      };

      console.log('Submitting influencer data:', influencerData);

      // Insert to Supabase
      const result = await insertInfluencer(influencerData);

      if (result.error) {
        console.error('Detailed Supabase error:', result.error);
        throw new Error(result.error);
      }

      if (!result.data) {
        console.error('No data returned from insert:', result);
        throw new Error('No data returned from database insert');
      }
      
      toast({
        title: "Success!",
        description: "Influencer has been added to your database.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        bio: '',
        category: '',
        location: ''
      });
      setSelectedPlatforms(new Set(['instagram']));
      setPlatformsData({
        instagram: { handle: '', url: '' },
        tiktok: { handle: '', url: '' },
        youtube: { handle: '', url: '' },
        twitter: { handle: '', url: '' },
        facebook: { handle: '', url: '' },
        linkedin: { handle: '', url: '' }
      });
      setTags([]);
      
    } catch (error) {
      console.error('Error adding influencer:', error);
      toast({
        title: "Error",
        description: `Failed to add influencer: ${error instanceof Error ? error.message : 'Please try again.'}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Add New Influencer</h1>
        <p className="text-muted-foreground">
          Add a new influencer to your database with their platform information and contact details
        </p>
        

      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Basic Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Upload className="h-5 w-5 mr-2 text-primary" />
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

          {/* Platform Selection */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-primary" />
              Social Media Platforms
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Select which platforms this influencer is active on and provide their handles and URLs.
            </p>
            
            {/* Platform Selection Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {Object.entries(PLATFORMS).map(([key, platform]) => {
                const PlatformIcon = platform.icon;
                const isSelected = selectedPlatforms.has(key as PlatformKey);
                
                return (
                  <div key={key} className="space-y-0">
                    <div
                      className={`border rounded-lg p-3 cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-primary bg-primary/5 shadow-sm' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`platform-${key}`}
                          checked={isSelected}
                          onCheckedChange={(checked) => {
                            handlePlatformToggle(key as PlatformKey, !!checked);
                          }}
                        />
                        <label 
                          htmlFor={`platform-${key}`}
                          className="flex items-center space-x-2 cursor-pointer flex-1"
                        >
                          <PlatformIcon className={`h-5 w-5 ${platform.color}`} />
                          <span className="text-sm font-medium">{platform.name}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Platform Forms */}
            {Array.from(selectedPlatforms).map(platform => {
              const platformInfo = PLATFORMS[platform];
              const PlatformIcon = platformInfo.icon;
              const data = platformsData[platform];
              
              return (
                <div key={platform} className="border rounded-lg p-4 mb-4 bg-secondary/20">
                  <h3 className="font-medium text-foreground mb-3 flex items-center">
                    <PlatformIcon className={`h-4 w-4 mr-2 ${platformInfo.color}`} />
                    {platformInfo.name}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${platform}-handle`}>Handle/Username</Label>
                      <Input
                        id={`${platform}-handle`}
                        value={data.handle}
                        onChange={(e) => handlePlatformDataChange(platform, 'handle', e.target.value)}
                        placeholder={platformInfo.placeholder}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`${platform}-url`}>Profile URL</Label>
                      <div className="relative">
                        <Input
                          id={`${platform}-url`}
                          value={data.url}
                          onChange={(e) => handlePlatformDataChange(platform, 'url', e.target.value)}
                          placeholder={`https://${platform === 'website' ? 'example.com' : platform + '.com/username'}`}
                        />
                        {data.url && (
                          <a
                            href={data.url}
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
                </div>
              );
            })}

            {selectedPlatforms.size === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Globe className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Select at least one platform to continue</p>
              </div>
            )}
          </Card>

        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Link to="/">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button 
            type="submit" 
            disabled={loading || insertLoading || selectedPlatforms.size === 0 || !formData.name.trim()}
          >
            {(loading || insertLoading) ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Influencer
              </>
            )}
          </Button>
        </div>
        
        {/* Form Validation Messages */}
        {selectedPlatforms.size === 0 && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Please select at least one platform to continue
            </p>
          </div>
        )}
        
        {insertError && (
          <div className="text-center">
            <p className="text-sm text-red-500">
              Error: {insertError}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddInfluencer;