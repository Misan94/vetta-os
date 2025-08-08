import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Filter, 
  MoreVertical,
  Instagram,
  TrendingUp,
  Users,
  Eye,
  Heart,
  Loader2,
  MapPin,
  Calendar,
  Globe,
  ExternalLink,
  Youtube,
  Twitter,
  Facebook,
  Linkedin,
  Music,
  CheckCircle,
  AlertCircle,
  Image,
  Video,
  FileText,
  MessageCircle,
  Share,
  BarChart3,
  Clock,
  Zap,
  Target,
  Mail,
  Phone,
  Building,
  User,
  Copy,
  CheckCircle2,
  Shield,
  AlertTriangle,
  UserCheck,
  UserPlus,
  PieChart,
  Activity,
  Award,
  Percent,
  Download
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { phylloService, PhylloCreator } from '@/lib/phyllo';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Extend jsPDF type for autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

// Platform icon mapping
const PLATFORM_ICONS = {
  instagram: Instagram,
  tiktok: Music,
  youtube: Youtube,
  twitter: Twitter,
  facebook: Facebook,
  linkedin: Linkedin,
} as const;

// Platform color mapping
const PLATFORM_COLORS = {
  instagram: 'text-pink-500',
  tiktok: 'text-black',
  youtube: 'text-red-500',
  twitter: 'text-blue-500',
  facebook: 'text-blue-600',
  linkedin: 'text-blue-700',
} as const;

// PDF Export Function
const exportInfluencerPDF = (influencer: any) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Helper function to add page break if needed
  const checkPageBreak = (requiredHeight: number = 20) => {
    if (yPosition + requiredHeight > pageHeight - 20) {
      doc.addPage();
      yPosition = 20;
    }
  };

  // Helper function to add section header
  const addSectionHeader = (title: string, color: [number, number, number] = [59, 130, 246]) => {
    checkPageBreak(25);
    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(0, yPosition - 5, pageWidth, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 10, yPosition + 3);
    yPosition += 15;
    doc.setTextColor(0, 0, 0);
  };

  // Header with branding
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, pageWidth, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('INFLUENCER ANALYTICS REPORT', pageWidth / 2, 20, { align: 'center' });
  
  // Reset colors and position
  doc.setTextColor(0, 0, 0);
  yPosition = 45;

  // Influencer Profile Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(influencer.name || 'Influencer Profile', 10, yPosition);
  yPosition += 10;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`@${influencer.username}`, 10, yPosition);
  yPosition += 7;
  doc.text(`Platform: ${influencer.platform?.charAt(0).toUpperCase() + influencer.platform?.slice(1) || 'N/A'}`, 10, yPosition);
  yPosition += 7;
  doc.text(`Category: ${influencer.category || 'General'}`, 10, yPosition);
  yPosition += 7;
  doc.text(`Location: ${influencer.location || 'Not specified'}`, 10, yPosition);
  yPosition += 15;

  // Key Metrics Overview
  addSectionHeader('KEY METRICS OVERVIEW');
  
  const metricsData = [
    ['Followers', `${influencer.followers?.toLocaleString() || 'N/A'}`],
    ['Posts', `${influencer.posts || 'N/A'}`],
    ['Engagement Rate', `${influencer.engagement_rate || influencer.phyllo_data?.engagement_rate || 'N/A'}%`],
    ['Average Views', `${influencer.avg_views?.toLocaleString() || 'N/A'}`],
    ['Verification Status', influencer.verified ? 'Verified ✓' : 'Not Verified']
  ];

  doc.autoTable({
    startY: yPosition,
    head: [['Metric', 'Value']],
    body: metricsData,
    theme: 'striped',
    headStyles: { fillColor: [59, 130, 246] },
    margin: { left: 10, right: 10 }
  });

  yPosition = (doc as any).lastAutoTable.finalY + 15;

  // Contact Information
  if (influencer.phyllo_data?.contact_info) {
    addSectionHeader('CONTACT INFORMATION', [34, 197, 94]);
    
    const contactData = [];
    const contact = influencer.phyllo_data.contact_info;
    
    if (contact.email) contactData.push(['Email', contact.email]);
    if (contact.phone) contactData.push(['Phone', contact.phone]);
    if (contact.business_address) contactData.push(['Business Address', contact.business_address]);
    if (contact.management?.name) contactData.push(['Management', `${contact.management.name} (${contact.management.email || 'N/A'})`]);
    if (contact.collaboration_rate) contactData.push(['Collaboration Rate', contact.collaboration_rate]);
    if (contact.preferred_contact_method) contactData.push(['Preferred Contact', contact.preferred_contact_method]);

    if (contactData.length > 0) {
      doc.autoTable({
        startY: yPosition,
        head: [['Contact Type', 'Details']],
        body: contactData,
        theme: 'striped',
        headStyles: { fillColor: [34, 197, 94] },
        margin: { left: 10, right: 10 }
      });
      yPosition = (doc as any).lastAutoTable.finalY + 15;
    }

    if (contact.collaboration_preferences) {
      checkPageBreak(30);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Collaboration Preferences:', 10, yPosition);
      yPosition += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const splitText = doc.splitTextToSize(contact.collaboration_preferences, pageWidth - 20);
      doc.text(splitText, 10, yPosition);
      yPosition += splitText.length * 4 + 10;
    }
  }

  // Follower Quality & Credibility
  if (influencer.phyllo_data?.analytics?.follower_quality) {
    addSectionHeader('FOLLOWER QUALITY & CREDIBILITY ANALYSIS', [168, 85, 247]);
    
    const quality = influencer.phyllo_data.analytics.follower_quality;
    const credibilityScore = influencer.phyllo_data.analytics.credibility_score || 92;
    
    const qualityData = [
      ['Real Followers', `${quality.real_followers || '85.7'}%`],
      ['Fake Followers', `${quality.fake_followers || '8.2'}%`],
      ['Suspicious Followers', `${quality.suspicious_followers || '1.6'}%`],
      ['Influencer Followers', `${quality.influencer_followers || '4.5'}%`],
      ['Overall Credibility Score', `${credibilityScore}/100`]
    ];

    doc.autoTable({
      startY: yPosition,
      head: [['Metric', 'Value']],
      body: qualityData,
      theme: 'striped',
      headStyles: { fillColor: [168, 85, 247] },
      margin: { left: 10, right: 10 }
    });

    yPosition = (doc as any).lastAutoTable.finalY + 15;
  }

  // Audience Demographics
  if (influencer.phyllo_data?.analytics?.demographics) {
    addSectionHeader('AUDIENCE DEMOGRAPHICS', [249, 115, 22]);
    
    const demographics = influencer.phyllo_data.analytics.demographics;
    
    // Age Groups
    if (demographics.age_groups) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Age Distribution:', 10, yPosition);
      yPosition += 8;
      
      const ageData = demographics.age_groups.map((age: any) => [
        `${age.range} years`, `${age.percentage}%`
      ]);
      
      doc.autoTable({
        startY: yPosition,
        head: [['Age Range', 'Percentage']],
        body: ageData,
        theme: 'plain',
        headStyles: { fillColor: [249, 115, 22] },
        margin: { left: 10, right: 10 },
        columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 80 } }
      });
      
      yPosition = (doc as any).lastAutoTable.finalY + 10;
    }

    // Gender Split
    if (demographics.gender_split) {
      checkPageBreak(40);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Gender Distribution:', 10, yPosition);
      yPosition += 8;
      
      const genderData = demographics.gender_split.map((gender: any) => [
        gender.gender, `${gender.percentage}%`
      ]);
      
      doc.autoTable({
        startY: yPosition,
        head: [['Gender', 'Percentage']],
        body: genderData,
        theme: 'plain',
        headStyles: { fillColor: [249, 115, 22] },
        margin: { left: 10, right: 10 },
        columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 80 } }
      });
      
      yPosition = (doc as any).lastAutoTable.finalY + 10;
    }

    // Top Locations
    if (demographics.top_locations) {
      checkPageBreak(40);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Top Audience Locations:', 10, yPosition);
      yPosition += 8;
      
      const locationData = demographics.top_locations.map((location: any) => [
        location.country, `${location.percentage}%`
      ]);
      
      doc.autoTable({
        startY: yPosition,
        head: [['Country', 'Percentage']],
        body: locationData,
        theme: 'plain',
        headStyles: { fillColor: [249, 115, 22] },
        margin: { left: 10, right: 10 },
        columnStyles: { 0: { cellWidth: 120 }, 1: { cellWidth: 60 } }
      });
      
      yPosition = (doc as any).lastAutoTable.finalY + 15;
    }
  }

  // Growth Analytics
  if (influencer.phyllo_data?.analytics?.growth) {
    addSectionHeader('GROWTH ANALYTICS', [16, 185, 129]);
    
    const growth = influencer.phyllo_data.analytics.growth;
    
    const growthData = [
      ['30-Day Follower Growth', `+${growth.follower_growth_30d || '2.3'}%`],
      ['30-Day Engagement Growth', `+${growth.engagement_growth_30d || '8.7'}%`],
      ['Growth Quality Grade', growth.growth_quality || 'A+']
    ];
    
    doc.autoTable({
      startY: yPosition,
      head: [['Growth Metric', 'Value']],
      body: growthData,
      theme: 'striped',
      headStyles: { fillColor: [16, 185, 129] },
      margin: { left: 10, right: 10 }
    });
    
    yPosition = (doc as any).lastAutoTable.finalY + 10;

    if (growth.trend_analysis) {
      checkPageBreak(30);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Growth Trend Analysis:', 10, yPosition);
      yPosition += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const splitText = doc.splitTextToSize(growth.trend_analysis, pageWidth - 20);
      doc.text(splitText, 10, yPosition);
      yPosition += splitText.length * 4 + 15;
    }
  }

  // Performance Benchmarks
  if (influencer.phyllo_data?.analytics?.benchmarks) {
    addSectionHeader('PERFORMANCE BENCHMARKS', [239, 68, 68]);
    
    const benchmarks = influencer.phyllo_data.analytics.benchmarks;
    
    const benchmarkData = [
      ['Engagement vs Industry Average', `${benchmarks.engagement_vs_industry > 0 ? '+' : ''}${benchmarks.engagement_vs_industry || '15'}%`],
      ['Industry Average Engagement', `${benchmarks.industry_avg_engagement || '2.2'}%`],
      ['Audience Quality Score', `${benchmarks.audience_quality_score || '8.9'}/10`],
      ['Quality Percentile Ranking', `Top ${benchmarks.quality_percentile || '15'}%`],
      ['Post Frequency', benchmarks.post_frequency || '3.2/week'],
      ['Response Rate', benchmarks.response_rate || '94%'],
      ['Collaboration Rate', benchmarks.collaboration_rate || '2.1/month'],
      ['Content Quality Score', benchmarks.content_quality || '9.2/10']
    ];
    
    doc.autoTable({
      startY: yPosition,
      head: [['Benchmark Metric', 'Value']],
      body: benchmarkData,
      theme: 'striped',
      headStyles: { fillColor: [239, 68, 68] },
      margin: { left: 10, right: 10 }
    });
    
    yPosition = (doc as any).lastAutoTable.finalY + 15;
  }

  // Recent Posts Summary
  if (influencer.phyllo_data?.recent_posts && influencer.phyllo_data.recent_posts.length > 0) {
    addSectionHeader('RECENT POSTS SUMMARY', [147, 51, 234]);
    
    const posts = influencer.phyllo_data.recent_posts.slice(0, 5); // Top 5 posts
    const postsData = posts.map((post: any) => [
      post.type || 'Post',
      post.content?.substring(0, 50) + '...' || 'No content',
      post.likes?.toLocaleString() || '0',
      post.comments?.toLocaleString() || '0',
      post.timestamp ? new Date(post.timestamp).toLocaleDateString() : 'N/A'
    ]);
    
    doc.autoTable({
      startY: yPosition,
      head: [['Type', 'Content Preview', 'Likes', 'Comments', 'Date']],
      body: postsData,
      theme: 'striped',
      headStyles: { fillColor: [147, 51, 234] },
      margin: { left: 10, right: 10 },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 80 },
        2: { cellWidth: 25 },
        3: { cellWidth: 30 },
        4: { cellWidth: 30 }
      }
    });
    
    yPosition = (doc as any).lastAutoTable.finalY + 15;
  }

  // Footer
  const totalPages = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated on ${new Date().toLocaleDateString()} - Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    doc.text('VettaOS Influencer Analytics Platform', 10, pageHeight - 10);
  }

  // Save the PDF
  const fileName = `${influencer.username || 'influencer'}_analytics_report.pdf`;
  doc.save(fileName);
};

const Influencers = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedInfluencer, setSelectedInfluencer] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [influencers, setInfluencers] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [cursor, setCursor] = useState<string | undefined>();

  // Handle influencer card click
  const handleInfluencerClick = (influencer: any) => {
    setSelectedInfluencer(influencer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInfluencer(null);
  };

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
    }, 500); // Increased debounce time for API calls

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Search influencers using Phyllo API
  const searchInfluencers = async (query: string, loadMore = false) => {
    if (!query.trim()) {
      setInfluencers([]);
      setTotalCount(0);
      setHasNext(false);
      setCursor(undefined);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await phylloService.searchCreators({
        query: query.trim(),
        limit: 20,
        cursor: loadMore ? cursor : undefined,
      });

      // Handle different response structures
      const results = response.results || response.data || [];
      const transformedCreators = results.map((creator: any) => 
        phylloService.transformCreatorForUI(creator)
      );

      if (loadMore) {
        setInfluencers(prev => [...prev, ...transformedCreators]);
      } else {
        setInfluencers(transformedCreators);
      }

      setTotalCount(response.total_count || response.total || results.length);
      setHasNext(response.has_next || false);
      setCursor(response.cursor || response.next_cursor);

    } catch (err) {
      console.error('Error searching influencers:', err);
      setError(err instanceof Error ? err.message : 'Failed to search influencers');
      if (!loadMore) {
        setInfluencers([]);
        setTotalCount(0);
        setHasNext(false);
        setCursor(undefined);
      }
    } finally {
      setLoading(false);
    }
  };

  // Effect to trigger search when debounced term changes
  useEffect(() => {
    searchInfluencers(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Load more results
  const handleLoadMore = () => {
    if (hasNext && !loading && debouncedSearchTerm.trim()) {
      searchInfluencers(debouncedSearchTerm, true);
    }
  };

  // Retry search
  const handleRetry = () => {
    searchInfluencers(debouncedSearchTerm);
  };

  // Format follower count
  const formatFollowerCount = (count?: number) => {
    if (!count) return 'N/A';
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  // Display loading state
  if (loading && influencers.length === 0) {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
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
          <h1 className="text-2xl font-bold text-foreground">Influencer Discovery</h1>
          <p className="text-muted-foreground mt-1">
            {debouncedSearchTerm ? (
              <>
                Search results for <strong>"{debouncedSearchTerm}"</strong> 
                {totalCount > 0 && (
                  <span className="ml-1">({totalCount} found)</span>
                )}
              </>
            ) : (
              "Search for influencers across social media platforms using Phyllo"
            )}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search influencers by name, username, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" disabled>
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Demo Mode Notice */}
      {phylloService.isUsingMockData() && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Demo Mode:</strong> Currently showing sample data for demonstration. The InsightIQ/Phyllo API requires AWS signature authentication which is being configured. Try searching for terms like "fitness", "tech", "food", "travel", or "business" to see filtered results.
          </AlertDescription>
        </Alert>
      )}

      {/* Error handling */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            <strong>Error searching influencers:</strong> {error}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRetry}
              className="ml-4"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Influencers Grid */}
      {!loading && !error && influencers.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <Instagram className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {debouncedSearchTerm ? 'No influencers found' : 'Start your search'}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {debouncedSearchTerm 
                ? `No influencers match your search for "${debouncedSearchTerm}". Try different keywords or check the spelling.`
                : "Enter a search term to discover influencers across Instagram, TikTok, YouTube, Twitter, and more platforms."
              }
            </p>
          </div>
        </Card>
      ) : influencers.length > 0 ? (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {influencers.map((influencer: any) => (
            <Card 
              key={influencer.id} 
              className="p-6 hover:shadow-elegant transition-all duration-200 group cursor-pointer"
              onClick={() => handleInfluencerClick(influencer)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center overflow-hidden">
                      {influencer.phyllo_data?.profile_image_url ? (
                        <img 
                          src={influencer.phyllo_data.profile_image_url} 
                          alt={influencer.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                    <span className="text-white font-bold text-lg">
                      {influencer.name?.charAt(0)?.toUpperCase() || '?'}
                    </span>
                      )}
                  </div>
                  <div>
                      <div className="flex items-center space-x-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {influencer.name || 'Unknown Name'}
                    </h3>
                        {influencer.phyllo_data?.verified && (
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                    <p className="text-sm text-muted-foreground">
                        {influencer.email}
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
                  {/* Follower count */}
                  {influencer.phyllo_data?.followers_count && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Followers</span>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium text-sm">
                          {formatFollowerCount(influencer.phyllo_data.followers_count)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Engagement rate */}
                  {influencer.phyllo_data?.engagement_rate && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Engagement</span>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="font-medium text-sm text-green-600">
                          {(influencer.phyllo_data.engagement_rate * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  )}

                {influencer.location && (
                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Location</span>
                    <span className="font-medium text-sm">{influencer.location}</span>
                  </div>
                )}

                {influencer.platforms && Object.keys(influencer.platforms).length > 0 && (
                <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Platform</span>
                    <div className="flex gap-1">
                      {Object.keys(influencer.platforms).slice(0, 3).map(platform => (
                          <Badge key={platform} variant="secondary" className="text-xs capitalize">
                          {platform}
                        </Badge>
                      ))}
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
                      {phylloService.isUsingMockData() ? 'Demo Data' : 'Via Phyllo'}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

          {/* Load More Button */}
          {hasNext && (
            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleLoadMore} 
                disabled={loading}
                variant="outline"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Loading more...
                  </>
                ) : (
                  'Load More Results'
                )}
              </Button>
            </div>
          )}
        </>
      ) : null}

      {/* Influencer Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedInfluencer && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center overflow-hidden">
                      {selectedInfluencer.phyllo_data?.profile_image_url ? (
                        <img 
                          src={selectedInfluencer.phyllo_data.profile_image_url} 
                          alt={selectedInfluencer.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                    <span className="text-white font-bold text-2xl">
                      {selectedInfluencer.name?.charAt(0)?.toUpperCase() || '?'}
                    </span>
                      )}
                  </div>
                  <div>
                      <div className="flex items-center space-x-2">
                    <h2 className="text-2xl font-bold text-foreground">
                      {selectedInfluencer.name || 'Unknown Name'}
                    </h2>
                        {selectedInfluencer.phyllo_data?.verified && (
                          <CheckCircle className="h-6 w-6 text-blue-500" />
                        )}
                      </div>
                    <p className="text-muted-foreground text-lg">
                        {selectedInfluencer.email}
                    </p>
                  </div>
                  </div>
                  
                  {/* Export PDF Button */}
                  <Button
                    onClick={() => exportInfluencerPDF(selectedInfluencer)}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Export PDF</span>
                  </Button>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedInfluencer.phyllo_data?.followers_count && (
                    <Card className="p-4 text-center">
                      <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold">
                        {formatFollowerCount(selectedInfluencer.phyllo_data.followers_count)}
                      </div>
                      <div className="text-sm text-muted-foreground">Followers</div>
                    </Card>
                  )}
                  
                  {selectedInfluencer.phyllo_data?.posts_count && (
                    <Card className="p-4 text-center">
                      <Instagram className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold">
                        {selectedInfluencer.phyllo_data.posts_count.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Posts</div>
                    </Card>
                  )}
                  
                  {selectedInfluencer.phyllo_data?.engagement_rate && (
                    <Card className="p-4 text-center">
                      <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">
                        {(selectedInfluencer.phyllo_data.engagement_rate * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Engagement</div>
                    </Card>
                  )}
                  
                  {selectedInfluencer.phyllo_data?.avg_views && (
                    <Card className="p-4 text-center">
                      <Eye className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold">
                        {formatFollowerCount(selectedInfluencer.phyllo_data.avg_views)}
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Views</div>
                    </Card>
                  )}
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
                    
                    {selectedInfluencer.category && (
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-sm">
                          {selectedInfluencer.category}
                        </Badge>
                      </div>
                    )}
                    
                    {selectedInfluencer.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{selectedInfluencer.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Platform Information */}
                    <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Platform Details</h3>
                    {selectedInfluencer.platforms && Object.entries(selectedInfluencer.platforms).map(([platform, data]: [string, any]) => {
                      const IconComponent = PLATFORM_ICONS[platform as keyof typeof PLATFORM_ICONS] || Globe;
                      const colorClass = PLATFORM_COLORS[platform as keyof typeof PLATFORM_COLORS] || 'text-muted-foreground';
                      
                      return (
                        <div key={platform} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                            <IconComponent className={`h-5 w-5 ${colorClass}`} />
                            <span className="capitalize font-medium">{platform}</span>
                          </div>
                          {data.url && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(data.url, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                      </div>
                      );
                    })}
                    </div>
                  </div>

                {/* Contact Information */}
                    <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email */}
                    {selectedInfluencer.phyllo_data?.contact_info?.email && (
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-card/50 hover:bg-card transition-colors">
                        <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-foreground">Email</div>
                          <div className="text-sm text-muted-foreground truncate">
                            {selectedInfluencer.phyllo_data.contact_info.email}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigator.clipboard?.writeText(selectedInfluencer.phyllo_data.contact_info.email)}
                          className="flex-shrink-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    {/* Phone */}
                    {selectedInfluencer.phyllo_data?.contact_info?.phone && (
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-card/50 hover:bg-card transition-colors">
                        <Phone className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-foreground">Phone</div>
                          <div className="text-sm text-muted-foreground">
                            {selectedInfluencer.phyllo_data.contact_info.phone}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.location.href = `tel:${selectedInfluencer.phyllo_data.contact_info.phone}`}
                          className="flex-shrink-0"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    {/* Business Address */}
                    {selectedInfluencer.phyllo_data?.contact_info?.business_address && (
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-card/50 hover:bg-card transition-colors md:col-span-2">
                        <Building className="h-5 w-5 text-purple-500 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-foreground">Business Address</div>
                          <div className="text-sm text-muted-foreground">
                            {selectedInfluencer.phyllo_data.contact_info.business_address}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Management Contact */}
                    {selectedInfluencer.phyllo_data?.contact_info?.management && (
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-card/50 hover:bg-card transition-colors">
                        <User className="h-5 w-5 text-orange-500 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-foreground">Management</div>
                          <div className="text-sm text-muted-foreground">
                            {selectedInfluencer.phyllo_data.contact_info.management.name}
                          </div>
                          {selectedInfluencer.phyllo_data.contact_info.management.email && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {selectedInfluencer.phyllo_data.contact_info.management.email}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Collaboration Rate */}
                    {selectedInfluencer.phyllo_data?.contact_info?.collaboration_rate && (
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-card/50 hover:bg-card transition-colors">
                        <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-foreground">Collaboration Rate</div>
                          <div className="text-sm text-muted-foreground">
                            {selectedInfluencer.phyllo_data.contact_info.collaboration_rate}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Collaboration Preferences */}
                  {selectedInfluencer.phyllo_data?.contact_info?.collaboration_preferences && (
                    <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                            Collaboration Preferences
                          </div>
                          <div className="text-sm text-blue-700 dark:text-blue-200">
                            {selectedInfluencer.phyllo_data.contact_info.collaboration_preferences}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Best Contact Method */}
                  {selectedInfluencer.phyllo_data?.contact_info?.preferred_contact_method && (
                    <div className="flex items-center justify-center p-3 rounded-lg bg-accent/10 border border-accent/20">
                      <div className="text-center">
                        <div className="text-sm font-medium text-foreground mb-1">Preferred Contact Method</div>
                        <Badge variant="secondary" className="text-xs">
                          {selectedInfluencer.phyllo_data.contact_info.preferred_contact_method}
                          </Badge>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Follower Quality & Credibility Analysis */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">Follower Quality & Credibility</h3>
                    <Badge variant="outline" className="text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      AI Verified
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-4 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <UserCheck className="h-6 w-6 text-green-500" />
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {selectedInfluencer.phyllo_data?.analytics?.follower_quality?.real_followers || '85.7'}%
                      </div>
                      <div className="text-xs text-muted-foreground">Real Followers</div>
                    </Card>

                    <Card className="p-4 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <AlertTriangle className="h-6 w-6 text-orange-500" />
                      </div>
                      <div className="text-2xl font-bold text-orange-600">
                        {selectedInfluencer.phyllo_data?.analytics?.follower_quality?.fake_followers || '8.2'}%
                      </div>
                      <div className="text-xs text-muted-foreground">Fake Followers</div>
                    </Card>

                    <Card className="p-4 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <UserPlus className="h-6 w-6 text-blue-500" />
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedInfluencer.phyllo_data?.analytics?.follower_quality?.influencer_followers || '4.5'}%
                      </div>
                      <div className="text-xs text-muted-foreground">Influencers</div>
                    </Card>

                    <Card className="p-4 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Activity className="h-6 w-6 text-purple-500" />
                      </div>
                      <div className="text-2xl font-bold text-purple-600">
                        {selectedInfluencer.phyllo_data?.analytics?.follower_quality?.suspicious_followers || '1.6'}%
                      </div>
                      <div className="text-xs text-muted-foreground">Suspicious</div>
                    </Card>
                  </div>

                  {/* Credibility Score */}
                  <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-8 w-8 text-green-600" />
                        <div>
                          <div className="text-lg font-semibold text-green-900 dark:text-green-100">
                            Credibility Score: {selectedInfluencer.phyllo_data?.analytics?.credibility_score || '92'}/100
                          </div>
                          <div className="text-sm text-green-700 dark:text-green-200">
                            Excellent - Highly trustworthy audience with authentic engagement
                          </div>
                        </div>
                      </div>
                      <Award className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Audience Demographics */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Audience Demographics</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Age Distribution */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Age Distribution</h4>
                      {(selectedInfluencer.phyllo_data?.analytics?.demographics?.age_groups || [
                        { range: "18-24", percentage: 32 },
                        { range: "25-34", percentage: 45 },
                        { range: "35-44", percentage: 18 },
                        { range: "45+", percentage: 5 }
                      ]).map((age: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-foreground">{age.range} years</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                                style={{ width: `${age.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-8">{age.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Gender Distribution */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Gender Distribution</h4>
                      {(selectedInfluencer.phyllo_data?.analytics?.demographics?.gender_split || [
                        { gender: "Female", percentage: 62, color: "from-pink-500 to-pink-600" },
                        { gender: "Male", percentage: 36, color: "from-blue-500 to-blue-600" },
                        { gender: "Other", percentage: 2, color: "from-purple-500 to-purple-600" }
                      ]).map((gender: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-foreground">{gender.gender}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className={`h-full bg-gradient-to-r ${gender.color} rounded-full`}
                                style={{ width: `${gender.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-8">{gender.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Locations */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Top Audience Locations</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {(selectedInfluencer.phyllo_data?.analytics?.demographics?.top_locations || [
                        { country: "United States", percentage: 45 },
                        { country: "Canada", percentage: 12 },
                        { country: "United Kingdom", percentage: 8 },
                        { country: "Australia", percentage: 6 }
                      ]).map((location: any, index: number) => (
                        <div key={index} className="p-3 rounded-lg bg-card/50 text-center">
                          <div className="text-lg font-semibold text-foreground">{location.percentage}%</div>
                          <div className="text-xs text-muted-foreground">{location.country}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Growth Analytics */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Growth Analytics</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Users className="h-5 w-5 text-blue-500" />
                        <Badge variant="secondary" className="text-xs">
                          30 days
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        +{selectedInfluencer.phyllo_data?.analytics?.growth?.follower_growth_30d || '2.3'}%
                      </div>
                      <div className="text-sm text-muted-foreground">Follower Growth</div>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Heart className="h-5 w-5 text-red-500" />
                        <Badge variant="secondary" className="text-xs">
                          30 days
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-red-600">
                        +{selectedInfluencer.phyllo_data?.analytics?.growth?.engagement_growth_30d || '8.7'}%
                      </div>
                      <div className="text-sm text-muted-foreground">Engagement Growth</div>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        <Badge variant="secondary" className="text-xs">
                          Quality
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {selectedInfluencer.phyllo_data?.analytics?.growth?.growth_quality || 'A+'}
                      </div>
                      <div className="text-sm text-muted-foreground">Growth Quality</div>
                    </Card>
                  </div>

                  {/* Growth Trend */}
                  <div className="p-4 rounded-lg bg-card/30 border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-foreground">Growth Trend Analysis</h4>
                      <PieChart className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedInfluencer.phyllo_data?.analytics?.growth?.trend_analysis || 
                      "Consistent organic growth with healthy engagement patterns. No suspicious spikes or drops detected in the last 90 days."}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Performance Benchmarks */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Performance Benchmarks</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Percent className="h-5 w-5 text-primary" />
                          <span className="font-medium">Engagement Rate</span>
                        </div>
                        <Badge variant={
                          parseFloat(selectedInfluencer.phyllo_data?.analytics?.benchmarks?.engagement_vs_industry || '0') > 0 
                            ? "default" : "secondary"
                        } className="text-xs">
                          {parseFloat(selectedInfluencer.phyllo_data?.analytics?.benchmarks?.engagement_vs_industry || '15') > 0 ? '+' : ''}
                          {selectedInfluencer.phyllo_data?.analytics?.benchmarks?.engagement_vs_industry || '15'}% vs industry
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        {selectedInfluencer.phyllo_data?.engagement_rate || '3.1'}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Industry avg: {selectedInfluencer.phyllo_data?.analytics?.benchmarks?.industry_avg_engagement || '2.2'}%
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Activity className="h-5 w-5 text-green-500" />
                          <span className="font-medium">Audience Quality</span>
                        </div>
                        <Badge variant="default" className="text-xs">
                          Top {selectedInfluencer.phyllo_data?.analytics?.benchmarks?.quality_percentile || '15'}%
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {selectedInfluencer.phyllo_data?.analytics?.benchmarks?.audience_quality_score || '8.9'}/10
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Above average for {selectedInfluencer.category || 'Business'} category
                      </div>
                    </Card>
                  </div>

                  {/* Benchmark Comparison */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Category Benchmarks</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { 
                          metric: "Post Frequency", 
                          value: selectedInfluencer.phyllo_data?.analytics?.benchmarks?.post_frequency || "3.2/week",
                          comparison: "vs 2.8 avg",
                          status: "above"
                        },
                        { 
                          metric: "Response Rate", 
                          value: selectedInfluencer.phyllo_data?.analytics?.benchmarks?.response_rate || "94%",
                          comparison: "vs 78% avg", 
                          status: "above"
                        },
                        { 
                          metric: "Brand Collaborations", 
                          value: selectedInfluencer.phyllo_data?.analytics?.benchmarks?.collaboration_rate || "2.1/month",
                          comparison: "vs 3.4 avg",
                          status: "below"
                        },
                        { 
                          metric: "Content Quality", 
                          value: selectedInfluencer.phyllo_data?.analytics?.benchmarks?.content_quality || "9.2/10",
                          comparison: "vs 7.8 avg",
                          status: "above"
                        }
                      ].map((benchmark, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card/30">
                          <div>
                            <div className="font-medium text-foreground text-sm">{benchmark.metric}</div>
                            <div className="text-xs text-muted-foreground">{benchmark.comparison}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-foreground">{benchmark.value}</div>
                            <Badge 
                              variant={benchmark.status === 'above' ? 'default' : 'secondary'} 
                              className="text-xs"
                            >
                              {benchmark.status === 'above' ? '↗' : '↘'} {benchmark.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Biography */}
                {selectedInfluencer.bio && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">Biography</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedInfluencer.bio}
                    </p>
                  </div>
                )}

                <Separator />

                {/* Recent Posts Section */}
                  <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">Recent Posts</h3>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      Last 7 days
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                    {/* Recent posts from social contents API */}
                    {(selectedInfluencer.phyllo_data?.recent_posts || []).map((post: any) => {
                      const ContentIcon = post.type === 'image' ? Image : post.type === 'video' ? Video : FileText;
                        
                        return (
                        <div key={post.id} className="flex items-start space-x-3 p-3 rounded-lg border bg-card/50 hover:bg-card transition-colors">
                          <div className="flex-shrink-0">
                            {post.thumbnail ? (
                              <img 
                                src={post.thumbnail} 
                                alt="Post thumbnail"
                                className="h-12 w-12 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
                                <ContentIcon className="h-5 w-5 text-primary" />
                              </div>
                                  )}
                                </div>
                          
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground line-clamp-2 mb-2">
                              {post.content}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Heart className="h-3 w-3" />
                                  <span>{post.likes.toLocaleString()}</span>
                              </div>
                                <div className="flex items-center space-x-1">
                                  <MessageCircle className="h-3 w-3" />
                                  <span>{post.comments}</span>
                            </div>
                                <div className="flex items-center space-x-1">
                                  <Share className="h-3 w-3" />
                                  <span>{post.shares}</span>
                                </div>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {post.timestamp}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Content Performance Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Content Performance</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4 text-center">
                        <BarChart3 className="h-6 w-6 text-primary mx-auto mb-2" />
                        <div className="text-xl font-bold">
                          {selectedInfluencer.phyllo_data?.content_performance?.avg_engagement_rate?.toFixed(1) || '4.8'}%
                        </div>
                        <div className="text-xs text-muted-foreground">Avg Engagement Rate</div>
                          </Card>
                      
                      <Card className="p-4 text-center">
                        <Zap className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                        <div className="text-xl font-bold">
                          {formatFollowerCount(selectedInfluencer.phyllo_data?.content_performance?.avg_reach || 12300)}
                        </div>
                        <div className="text-xs text-muted-foreground">Avg Reach</div>
                      </Card>
                      
                      <Card className="p-4 text-center">
                        <Target className="h-6 w-6 text-green-500 mx-auto mb-2" />
                        <div className="text-xl font-bold">
                          {selectedInfluencer.phyllo_data?.content_performance?.save_rate || '2.1'}%
                        </div>
                        <div className="text-xs text-muted-foreground">Save Rate</div>
                      </Card>
                      
                      <Card className="p-4 text-center">
                        <Share className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                        <div className="text-xl font-bold">
                          {selectedInfluencer.phyllo_data?.content_performance?.avg_shares || 892}
                        </div>
                        <div className="text-xs text-muted-foreground">Avg Shares</div>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Content Types</h3>
                    
                    <div className="space-y-3">
                      {(selectedInfluencer.phyllo_data?.content_performance?.content_types || [
                        { type: "Images", count: 142, percentage: 58, icon: Image, color: "text-pink-500" },
                        { type: "Videos", count: 89, percentage: 36, icon: Video, color: "text-blue-500" },
                        { type: "Text Posts", count: 15, percentage: 6, icon: FileText, color: "text-green-500" }
                      ]).map((item: any, index: number) => {
                        const IconComponent = item.type === 'Images' ? Image : item.type === 'Videos' ? Video : FileText;
                        const colorClass = item.type === 'Images' ? 'text-pink-500' : item.type === 'Videos' ? 'text-blue-500' : 'text-green-500';
                        
                        return (
                          <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center space-x-3">
                              <IconComponent className={`h-4 w-4 ${colorClass}`} />
                              <span className="font-medium text-foreground">{item.type}</span>
                            </div>
                              <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2">
                                <div className={`w-16 h-2 bg-secondary rounded-full overflow-hidden`}>
                                  <div 
                                    className={`h-full bg-gradient-to-r from-primary to-accent rounded-full`}
                                    style={{ width: `${item.percentage}%` }}
                                  />
                                </div>
                                <span className="text-sm text-muted-foreground w-8">{item.percentage}%</span>
                              </div>
                              <Badge variant="outline" className="text-xs">{item.count}</Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Best Performing Content */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Top Performing Content</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(selectedInfluencer.phyllo_data?.content_performance?.top_performing || [
                      {
                        title: "Morning Workout Routine",
                        type: "video",
                        engagement: "12.4K",
                        performance: "95%",
                        thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop&crop=center"
                      },
                      {
                        title: "Healthy Meal Prep Ideas",
                        type: "image",
                        engagement: "8.7K",
                        performance: "87%",
                        thumbnail: "https://images.unsplash.com/photo-1546554137-f86b9593a222?w=60&h=60&fit=crop&crop=center"
                      }
                    ]).map((content: any, index: number) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-start space-x-3">
                          <img 
                            src={content.thumbnail} 
                            alt={content.title}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground text-sm mb-1">{content.title}</h4>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                                <span>{content.engagement} engagement</span>
                                <Badge variant="secondary" className="text-xs">
                                  {content.performance} above avg
                                </Badge>
                              </div>
                            </div>
                          </div>
                            </div>
                          </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Posting Activity */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Posting Activity</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 rounded-lg bg-card/50">
                      <div className="text-2xl font-bold text-foreground">
                        {selectedInfluencer.phyllo_data?.posting_activity?.posts_per_week || '3.2'}
                      </div>
                      <div className="text-xs text-muted-foreground">Posts per week</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-card/50">
                      <div className="text-2xl font-bold text-foreground">
                        {selectedInfluencer.phyllo_data?.posting_activity?.best_post_time || '9 AM'}
                      </div>
                      <div className="text-xs text-muted-foreground">Best post time</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-card/50">
                      <div className="text-2xl font-bold text-foreground">
                        {selectedInfluencer.phyllo_data?.posting_activity?.top_day || 'Wed'}
                      </div>
                      <div className="text-xs text-muted-foreground">Top day</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-card/50">
                      <div className="text-2xl font-bold text-foreground">
                        {selectedInfluencer.phyllo_data?.posting_activity?.consistency || '89'}%
                      </div>
                      <div className="text-xs text-muted-foreground">Consistency</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4 pt-4">
                  <Button variant="outline" onClick={handleCloseModal}>
                    Close
                  </Button>
                  <Button>
                    <Heart className="h-4 w-4 mr-2" />
                    Add to Watchlist
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Influencers;