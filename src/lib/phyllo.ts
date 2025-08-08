// Phyllo API Configuration and Service
const PHYLLO_API_BASE = 'https://api.insightiq.ai/v1';

// Types for Phyllo API responses
export interface PhylloCreator {
  id: string;
  username: string;
  display_name?: string;
  name?: string;
  bio?: string;
  platform: string;
  followers_count?: number;
  following_count?: number;
  posts_count?: number;
  profile_image_url?: string;
  profile_pic_url?: string;
  verified?: boolean;
  category?: string;
  location?: string;
  external_url?: string;
  url?: string;
  created_at?: string;
  engagement_rate?: number;
  avg_views?: number;
  avg_likes?: number;
  avg_comments?: number;
}

export interface PhylloSearchResponse {
  results?: PhylloCreator[];
  data?: PhylloCreator[];
  total_count?: number;
  total?: number;
  has_next?: boolean;
  cursor?: string;
  next_cursor?: string;
  status?: string;
  message?: string;
}

export interface PhylloSearchParams {
  query: string;
  platforms?: string[];
  min_followers?: number;
  max_followers?: number;
  location?: string;
  category?: string;
  limit?: number;
  cursor?: string;
}

class PhylloService {
  private apiKey: string;
  private useMockData: boolean;

  constructor() {
    // Use the provided API key, with fallback to environment variable
    this.apiKey = import.meta.env.VITE_PHYLLO_API_KEY || 'f7427572-fef7-410e-bb55-53f3c4f0039e';
    
    // Use mock data for now since the API requires complex AWS authentication
    this.useMockData = true;
    
    if (!this.apiKey) {
      console.warn('Phyllo API key not found. Please set VITE_PHYLLO_API_KEY environment variable.');
    }
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${PHYLLO_API_BASE}${endpoint}`;
    
    const headers = {
      'Authorization': this.apiKey,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    console.log('Making Phyllo API request to:', url);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        mode: 'cors', // Explicitly set CORS mode
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Phyllo API error:', response.status, errorData);
        throw new Error(
          errorData.message || 
          errorData.error || 
          `Phyllo API error: ${response.status} ${response.statusText}`
        );
      }

      return response.json();
    } catch (error) {
      console.error('Network error:', error);
      throw new Error('Failed to connect to Phyllo API. This may be due to CORS restrictions or authentication issues.');
    }
  }

  // Mock data for demonstration - replace with real API when properly configured
  private generateMockData(query: string): PhylloSearchResponse {
    const mockCreators: PhylloCreator[] = [
      {
        id: 'mock_1',
        username: 'john_fitness',
        display_name: 'John Fitness',
        bio: 'Fitness enthusiast helping people achieve their health goals 💪',
        platform: 'instagram',
        followers_count: 125000,
        following_count: 1500,
        posts_count: 342,
        profile_image_url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=face',
        verified: true,
        category: 'Fitness',
        location: 'Los Angeles, CA',
        external_url: 'https://instagram.com/john_fitness',
        created_at: '2020-01-15T00:00:00Z',
        engagement_rate: 0.045,
        avg_views: 8500,
        avg_likes: 5600,
        avg_comments: 230
      },
      {
        id: 'mock_2',
        username: 'sarah_tech',
        display_name: 'Sarah Tech',
        bio: 'Software engineer sharing coding tips and tech reviews',
        platform: 'youtube',
        followers_count: 89000,
        following_count: 800,
        posts_count: 156,
        profile_image_url: 'https://images.unsplash.com/photo-1494790108755-2616b7e7fb9c?w=150&h=150&fit=crop&crop=face',
        verified: false,
        category: 'Technology',
        location: 'San Francisco, CA',
        external_url: 'https://youtube.com/@sarah_tech',
        created_at: '2019-08-22T00:00:00Z',
        engagement_rate: 0.038,
        avg_views: 12500,
        avg_likes: 3200,
        avg_comments: 145
      },
      {
        id: 'mock_3',
        username: 'foodie_mike',
        display_name: 'Mike\'s Kitchen',
        bio: 'Chef sharing delicious recipes and cooking techniques 👨‍🍳',
        platform: 'tiktok',
        followers_count: 256000,
        following_count: 2100,
        posts_count: 489,
        profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        verified: true,
        category: 'Food',
        location: 'New York, NY',
        external_url: 'https://tiktok.com/@foodie_mike',
        created_at: '2021-03-10T00:00:00Z',
        engagement_rate: 0.067,
        avg_views: 15600,
        avg_likes: 9800,
        avg_comments: 420
      },
      {
        id: 'mock_4',
        username: 'travel_emma',
        display_name: 'Emma Explores',
        bio: 'Traveling the world one adventure at a time ✈️',
        platform: 'instagram',
        followers_count: 178000,
        following_count: 3400,
        posts_count: 612,
        profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        verified: true,
        category: 'Travel',
        location: 'Nomad',
        external_url: 'https://instagram.com/travel_emma',
        created_at: '2018-11-05T00:00:00Z',
        engagement_rate: 0.052,
        avg_views: 11200,
        avg_likes: 7800,
        avg_comments: 340
      },
      {
        id: 'mock_5',
        username: 'business_alex',
        display_name: 'Alex Business',
        bio: 'Entrepreneur sharing business insights and growth strategies',
        platform: 'linkedin',
        followers_count: 45000,
        following_count: 1200,
        posts_count: 234,
        profile_image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        verified: false,
        category: 'Business',
        location: 'Austin, TX',
        external_url: 'https://linkedin.com/in/business-alex',
        created_at: '2020-06-18T00:00:00Z',
        engagement_rate: 0.031,
        avg_views: 3400,
        avg_likes: 1200,
        avg_comments: 89
      }
    ];

    // Filter based on query
    const filteredCreators = mockCreators.filter(creator => 
      creator.display_name?.toLowerCase().includes(query.toLowerCase()) ||
      creator.username.toLowerCase().includes(query.toLowerCase()) ||
      creator.bio?.toLowerCase().includes(query.toLowerCase()) ||
      creator.category?.toLowerCase().includes(query.toLowerCase()) ||
      creator.platform.toLowerCase().includes(query.toLowerCase())
    );

    return {
      results: filteredCreators,
      total_count: filteredCreators.length,
      has_next: false,
      status: 'success'
    };
  }

  async searchCreators(params: PhylloSearchParams): Promise<PhylloSearchResponse> {
    // Use mock data for demonstration while API authentication is being configured
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockResponse = this.generateMockData(params.query);
      
      // Apply limit if specified
      if (params.limit && mockResponse.results) {
        mockResponse.results = mockResponse.results.slice(0, params.limit);
      }
      
      return mockResponse;
    }

    // Real API implementation (currently disabled due to authentication complexity)
    const searchParams = new URLSearchParams();
    
    searchParams.append('query', params.query);
    
    if (params.platforms?.length) {
      params.platforms.forEach(platform => {
        searchParams.append('platforms', platform);
      });
    }
    
    if (params.min_followers !== undefined) {
      searchParams.append('min_followers', params.min_followers.toString());
    }
    
    if (params.max_followers !== undefined) {
      searchParams.append('max_followers', params.max_followers.toString());
    }
    
    if (params.location) {
      searchParams.append('location', params.location);
    }
    
    if (params.category) {
      searchParams.append('category', params.category);
    }
    
    if (params.limit) {
      searchParams.append('limit', params.limit.toString());
    }
    
    if (params.cursor) {
      searchParams.append('cursor', params.cursor);
    }

    const endpoint = `/social/creator-profile/quick-search?${searchParams.toString()}`;
    
    return this.makeRequest<PhylloSearchResponse>(endpoint, {
      method: 'POST',
    });
  }

  async getCreatorById(creatorId: string): Promise<PhylloCreator> {
    const endpoint = `/social/creator-profile/${creatorId}`;
    return this.makeRequest<PhylloCreator>(endpoint);
  }

  // Transform Phyllo creator data to match the existing UI structure
  transformCreatorForUI(creator: PhylloCreator) {
    return {
      id: creator.id,
      name: creator.display_name || creator.name || creator.username,
      email: `@${creator.username}`, // Use username as email placeholder
      bio: creator.bio || '',
      category: creator.category || 'Uncategorized',
      location: creator.location || '',
      platforms: {
        [creator.platform]: {
          handle: creator.username,
          url: creator.external_url || creator.url,
          followers: creator.followers_count,
          verified: creator.verified,
        }
      },
      tags: [], // Phyllo doesn't provide tags directly, could be derived from category
      created_at: creator.created_at || new Date().toISOString(),
      // Additional Phyllo-specific data
      phyllo_data: {
        followers_count: creator.followers_count,
        following_count: creator.following_count,
        posts_count: creator.posts_count,
        profile_image_url: creator.profile_image_url || creator.profile_pic_url,
        verified: creator.verified || false,
        engagement_rate: creator.engagement_rate,
        avg_views: creator.avg_views,
        avg_likes: creator.avg_likes,
        avg_comments: creator.avg_comments,
        // Social content data (would come from social contents API)
        recent_posts: this.generateRecentPosts(creator.category, creator.platform),
        content_performance: this.generateContentPerformance(creator.engagement_rate),
        posting_activity: this.generatePostingActivity(creator.posts_count),
        // Contact information (would come from contact info API)
        contact_info: this.generateContactInfo(creator.category, creator.display_name || creator.username),
      }
    };
  }

  // Check if API key is configured
  isConfigured(): boolean {
    return !!this.apiKey;
  }

  // Enable/disable mock data (for testing and demonstration)
  setMockMode(enabled: boolean): void {
    this.useMockData = enabled;
  }

  // Check if currently using mock data
  isUsingMockData(): boolean {
    return this.useMockData;
  }

  // Generate realistic recent posts based on creator category and platform
  private generateRecentPosts(category: string = 'General', platform: string = 'instagram') {
    const contentTemplates = {
      'Fitness': [
        { content: "Just crushed another workout session! 💪 Who's ready to join me tomorrow?", type: 'image', thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&crop=center' },
        { content: "New morning routine that changed my life ✨ Link in bio for full workout plan", type: 'video', thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=80&h=80&fit=crop&crop=center' },
        { content: "Mindset Monday: Remember, progress over perfection. Every small step counts! 🚀", type: 'text', thumbnail: null }
      ],
      'Tech': [
        { content: "Breaking down the latest React 18 features 🔥 Which one excites you most?", type: 'video', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&h=80&fit=crop&crop=center' },
        { content: "Clean code principles every developer should know 👨‍💻", type: 'image', thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=80&h=80&fit=crop&crop=center' },
        { content: "Hot take: AI will make us better developers, not replace us. Thoughts? 🤖", type: 'text', thumbnail: null }
      ],
      'Food': [
        { content: "30-minute weeknight dinner that'll change your life! Recipe in stories 👇", type: 'video', thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80&h=80&fit=crop&crop=center' },
        { content: "Sunday meal prep complete! Who else is ready for the week? 🥗", type: 'image', thumbnail: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=80&h=80&fit=crop&crop=center' },
        { content: "Pro tip: Always taste as you go. Your taste buds are your best guide! 👅", type: 'text', thumbnail: null }
      ],
      'Travel': [
        { content: "Hidden gems in Bali that tourists never find 🏝️ Save this post!", type: 'image', thumbnail: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=80&h=80&fit=crop&crop=center' },
        { content: "Packing tips for digital nomads - everything fits in one backpack! 🎒", type: 'video', thumbnail: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=80&h=80&fit=crop&crop=center' },
        { content: "Culture shock moment: When trying to order coffee became an adventure ☕", type: 'text', thumbnail: null }
      ],
      'Business': [
        { content: "The mindset shift that 10x'd my productivity as an entrepreneur 📈", type: 'video', thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=80&h=80&fit=crop&crop=center' },
        { content: "Networking isn't about collecting contacts - it's about planting seeds 🌱", type: 'text', thumbnail: null },
        { content: "Behind the scenes: What a typical day looks like building a startup 💼", type: 'image', thumbnail: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=80&h=80&fit=crop&crop=center' }
      ]
    };

    const templates = contentTemplates[category as keyof typeof contentTemplates] || contentTemplates['Business'];
    
    return templates.map((template, index) => ({
      id: index + 1,
      ...template,
      timestamp: index === 0 ? '2 hours ago' : index === 1 ? '1 day ago' : '3 days ago',
      likes: Math.floor(Math.random() * 3000) + 500,
      comments: Math.floor(Math.random() * 200) + 20,
      shares: Math.floor(Math.random() * 100) + 10,
    }));
  }

  // Generate content performance metrics
  private generateContentPerformance(baseEngagementRate: number = 3.5) {
    return {
      avg_engagement_rate: baseEngagementRate,
      avg_reach: Math.floor(Math.random() * 20000) + 5000,
      save_rate: Math.round((Math.random() * 3 + 1) * 10) / 10,
      avg_shares: Math.floor(Math.random() * 1000) + 200,
      content_types: [
        { type: "Images", count: Math.floor(Math.random() * 100) + 50, percentage: Math.floor(Math.random() * 30) + 40 },
        { type: "Videos", count: Math.floor(Math.random() * 80) + 30, percentage: Math.floor(Math.random() * 30) + 25 },
        { type: "Text Posts", count: Math.floor(Math.random() * 30) + 5, percentage: Math.floor(Math.random() * 20) + 5 }
      ],
      top_performing: [
        {
          title: "Morning Routine That Changed Everything",
          engagement: `${Math.floor(Math.random() * 10) + 5}.${Math.floor(Math.random() * 9)}K`,
          performance: `${Math.floor(Math.random() * 20) + 80}%`,
          thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop&crop=center'
        },
        {
          title: "Game-Changing Productivity Tips",
          engagement: `${Math.floor(Math.random() * 8) + 3}.${Math.floor(Math.random() * 9)}K`,
          performance: `${Math.floor(Math.random() * 15) + 75}%`,
          thumbnail: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=60&h=60&fit=crop&crop=center'
        }
      ]
    };
  }

  // Generate posting activity data
  private generatePostingActivity(totalPosts: number = 150) {
    return {
      posts_per_week: Math.round((Math.random() * 4 + 1) * 10) / 10,
      best_post_time: ['9 AM', '12 PM', '6 PM', '8 PM'][Math.floor(Math.random() * 4)],
      top_day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][Math.floor(Math.random() * 7)],
      consistency: Math.floor(Math.random() * 20) + 75
    };
  }

  // Generate contact information based on category and name
  private generateContactInfo(category: string = 'General', creatorName: string = 'Creator') {
    const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'icloud.com'];
    const businessDomains = ['business.com', 'agency.co', 'media.net', 'creative.io'];
    
    // Generate realistic email based on creator name
    const nameForEmail = creatorName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const domain = Math.random() > 0.3 ? domains[Math.floor(Math.random() * domains.length)] : businessDomains[Math.floor(Math.random() * businessDomains.length)];
    const email = `${nameForEmail}@${domain}`;

    // Generate phone number
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const exchange = Math.floor(Math.random() * 900) + 100;
    const number = Math.floor(Math.random() * 9000) + 1000;
    const phone = `+1 (${areaCode}) ${exchange}-${number}`;

    // Generate addresses based on category
    const addresses = {
      'Fitness': [
        '1234 Fitness Blvd, Los Angeles, CA 90210',
        '567 Wellness Ave, Miami, FL 33101',
        '890 Gym Street, Austin, TX 78701'
      ],
      'Tech': [
        '123 Silicon Valley Dr, San Francisco, CA 94105',
        '456 Innovation Way, Seattle, WA 98101',
        '789 Tech Plaza, New York, NY 10001'
      ],
      'Food': [
        '321 Culinary Lane, New York, NY 10001',
        '654 Flavor Street, Chicago, IL 60601',
        '987 Recipe Road, Portland, OR 97201'
      ],
      'Travel': [
        '111 Adventure Ave, Denver, CO 80201',
        '222 Explorer Blvd, San Diego, CA 92101',
        '333 Journey Street, Nashville, TN 37201'
      ],
      'Business': [
        '555 Corporate Dr, New York, NY 10001',
        '777 Executive Plaza, Chicago, IL 60601',
        '999 Business Center, Los Angeles, CA 90210'
      ]
    };

    const categoryAddresses = addresses[category as keyof typeof addresses] || addresses['Business'];
    const business_address = categoryAddresses[Math.floor(Math.random() * categoryAddresses.length)];

    // Generate management info
    const managementNames = [
      'Sarah Johnson - Creative Agency',
      'Michael Chen - Talent Management',
      'Jessica Williams - Brand Partnerships',
      'David Rodriguez - Media Relations',
      'Emily Taylor - Collaboration Manager'
    ];
    
    const managementName = managementNames[Math.floor(Math.random() * managementNames.length)];
    const managementEmail = `${managementName.split(' ')[0].toLowerCase()}@management.co`;

    // Generate collaboration rates based on follower count simulation
    const rates = [
      '$500 - $1,500 per post',
      '$1,000 - $3,000 per post',
      '$2,500 - $5,000 per post',
      '$3,000 - $8,000 per post',
      '$5,000 - $15,000 per post'
    ];
    const collaboration_rate = rates[Math.floor(Math.random() * rates.length)];

    // Generate collaboration preferences based on category
    const preferences = {
      'Fitness': [
        'Specializes in health & wellness brands, workout gear, and nutrition products. Open to long-term partnerships.',
        'Focuses on authentic fitness content. Prefers brands that align with healthy lifestyle messaging.',
        'Available for workout demonstrations, product reviews, and wellness campaigns.'
      ],
      'Tech': [
        'Expertise in software reviews, tech tutorials, and gadget unboxings. Prefers innovative products.',
        'Specialized in SaaS platforms, mobile apps, and emerging technologies. Open to consulting work.',
        'Available for product demos, technical content creation, and developer-focused campaigns.'
      ],
      'Food': [
        'Passionate about culinary content, recipe development, and restaurant partnerships.',
        'Specializes in food photography, cooking tutorials, and ingredient showcases.',
        'Open to brand collaborations with food brands, kitchen equipment, and dining experiences.'
      ],
      'Travel': [
        'Travel content creator specializing in destinations, hotels, and travel gear reviews.',
        'Available for tourism board partnerships, hotel collaborations, and travel product features.',
        'Focuses on authentic travel experiences and sustainable tourism initiatives.'
      ],
      'Business': [
        'Business and entrepreneurship content. Open to B2B partnerships, productivity tools, and professional services.',
        'Specializes in business education, leadership content, and professional development.',
        'Available for corporate partnerships, speaking engagements, and business tool reviews.'
      ]
    };

    const categoryPreferences = preferences[category as keyof typeof preferences] || preferences['Business'];
    const collaboration_preferences = categoryPreferences[Math.floor(Math.random() * categoryPreferences.length)];

    // Generate preferred contact method
    const contactMethods = ['Email', 'Instagram DM', 'Management Contact', 'Business Phone', 'LinkedIn Message'];
    const preferred_contact_method = contactMethods[Math.floor(Math.random() * contactMethods.length)];

    // Simulate some creators not having all contact info (realistic)
    const hasPhone = Math.random() > 0.3;
    const hasBusinessAddress = Math.random() > 0.4;
    const hasManagement = Math.random() > 0.5;
    const hasCollaborationRate = Math.random() > 0.2;

    return {
      email,
      phone: hasPhone ? phone : null,
      business_address: hasBusinessAddress ? business_address : null,
      management: hasManagement ? {
        name: managementName,
        email: managementEmail
      } : null,
      collaboration_rate: hasCollaborationRate ? collaboration_rate : null,
      collaboration_preferences,
      preferred_contact_method,
      last_updated: new Date().toISOString(),
      verified_contact: Math.random() > 0.7 // Some contacts are verified
    };
  }
}

export const phylloService = new PhylloService();
export default phylloService;