import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical,
  Instagram,
  TrendingUp,
  Users,
  Eye,
  Heart,
  Loader2
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSupabaseQuery } from '@/hooks/useSupabase';
import { supabase } from '@/lib/supabase';

const Influencers = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Handle URL search parameter
  useEffect(() => {
    const urlSearchTerm = searchParams.get('search');
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
      setDebouncedSearchTerm(urlSearchTerm);
    }
  }, [searchParams]);
  
  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch influencers data from Supabase
  const {
    data: influencers,
    loading,
    error,
    refetch
  } = useSupabaseQuery('influencers', {
    select: 'id, name, email, bio, category, location, platforms, tags, created_at',
    filter: (query) => {
      // Apply search filter if search term exists
      if (debouncedSearchTerm.trim()) {
        const searchValue = debouncedSearchTerm.trim();
        // Search across name, email, bio, category, and location
        // Note: For tags array search, we use a different approach
        query = query.or(`name.ilike.%${searchValue}%,email.ilike.%${searchValue}%,bio.ilike.%${searchValue}%,category.ilike.%${searchValue}%,location.ilike.%${searchValue}%`);
      }
      
      // Always order by created_at
      return query.order('created_at', { ascending: false });
    },
    dependencies: [debouncedSearchTerm]
  });

  // Additional client-side filtering for tags (since array search is complex in Supabase)
  const filteredInfluencers = influencers?.filter(influencer => {
    if (!debouncedSearchTerm.trim()) return true;
    
    const searchValue = debouncedSearchTerm.toLowerCase();
    
    // Check if search term matches any tag
    const matchesTags = influencer.tags?.some((tag: string) => 
      tag.toLowerCase().includes(searchValue)
    );
    
    // If the influencer was already returned by Supabase (server-side match)
    // OR if it matches tags (client-side match), include it
    // Since Supabase already filtered server-side, we just need to add tag matches
    return true || matchesTags; // For now, return all server results + do tag filtering separately
  }) || influencers || [];

  // If there's a search term, also add tag-based filtering
  const finalFilteredInfluencers = debouncedSearchTerm.trim() 
    ? filteredInfluencers.filter(influencer => {
        const searchValue = debouncedSearchTerm.toLowerCase();
        
        // Check direct field matches (already done by server)
        const directMatch = [
          influencer.name,
          influencer.email,
          influencer.bio,
          influencer.category,
          influencer.location
        ].some(field => field?.toLowerCase().includes(searchValue));
        
        // Check tag matches
        const tagMatch = influencer.tags?.some((tag: string) => 
          tag.toLowerCase().includes(searchValue)
        );
        
        return directMatch || tagMatch;
      })
    : filteredInfluencers;

  // Display loading state
  if (loading) {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Search */}
        <Skeleton className="h-10 w-full max-w-md" />

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-6">
              <div className="flex items-start space-x-3 mb-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Influencers</h1>
          <p className="text-muted-foreground mt-1">
            {debouncedSearchTerm ? (
              <>
                Search results for <strong>"{debouncedSearchTerm}"</strong> 
                {finalFilteredInfluencers && (
                  <span className="ml-1">({finalFilteredInfluencers.length} found)</span>
                )}
              </>
            ) : (
              <>
                Manage and track your influencer database
                {influencers && (
                  <span className="ml-1">({influencers.length} total)</span>
                )}
              </>
            )}
          </p>
        </div>
        <Link to="/add">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Influencer
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search influencers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Error handling */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            <strong>Error loading influencers:</strong> {error}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refetch}
              className="ml-4"
            >
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Influencers Grid */}
      {!loading && !error && finalFilteredInfluencers && finalFilteredInfluencers.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <Instagram className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-2">No influencers found</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {debouncedSearchTerm 
                ? `No influencers match your search for "${debouncedSearchTerm}". Try adjusting your search terms.`
                : "Start building your influencer database by adding your first influencer. Connect with creators and track their performance metrics."
              }
            </p>
            <Link to="/add">
              <Button className="bg-gradient-to-r from-primary to-primary-glow">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Influencer
              </Button>
            </Link>
          </div>
        </Card>
      ) : finalFilteredInfluencers && finalFilteredInfluencers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {finalFilteredInfluencers.map((influencer: any) => (
            <Card key={influencer.id} className="p-6 hover:shadow-elegant transition-all duration-200 group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {influencer.name?.charAt(0)?.toUpperCase() || '?'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {influencer.name || 'Unknown Name'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {influencer.email || 'No email'}
                    </p>
                    {influencer.bio && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {influencer.bio}
                      </p>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {influencer.location && (
                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Location</span>
                    <span className="font-medium text-sm">{influencer.location}</span>
                  </div>
                )}

                {influencer.platforms && Object.keys(influencer.platforms).length > 0 && (
                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Platforms</span>
                    <div className="flex gap-1">
                      {Object.keys(influencer.platforms).slice(0, 3).map(platform => (
                        <Badge key={platform} variant="secondary" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                      {Object.keys(influencer.platforms).length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{Object.keys(influencer.platforms).length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {influencer.tags && influencer.tags.length > 0 && (
                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tags</span>
                    <div className="flex gap-1">
                      {influencer.tags.slice(0, 2).map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {influencer.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{influencer.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {influencer.category || 'Uncategorized'}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Added {new Date(influencer.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Influencers;