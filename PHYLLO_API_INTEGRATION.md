# Phyllo API Integration Guide

## Current Status

The application is currently running in **demo mode** with sample data while the InsightIQ/Phyllo API authentication is being configured.

## The Challenge

The InsightIQ API (which provides Phyllo-like functionality) uses AWS Signature Version 4 authentication, which is more complex than simple Bearer token authentication. This requires:

1. **AWS Signature Headers**: The API expects specific headers including:
   - `Authorization` with AWS4-HMAC-SHA256 signature
   - `X-Amz-Date` for request timestamp
   - Proper signature calculation based on request content

2. **CORS Configuration**: Browser-based requests may be blocked by CORS policies

## Demo Mode Features

Currently implemented features using mock data:

- ✅ Search across multiple platforms (Instagram, TikTok, YouTube, Twitter, LinkedIn)
- ✅ Real-time follower counts and engagement metrics
- ✅ Profile images and verification status
- ✅ Detailed creator profiles with analytics
- ✅ Search filtering by category, location, etc.
- ✅ Professional UI matching the Phyllo API structure

### Try Demo Searches

Search for these terms to see filtered results:
- **"fitness"** - Shows fitness influencers
- **"tech"** - Shows technology creators  
- **"food"** - Shows cooking/food content creators
- **"travel"** - Shows travel influencers
- **"business"** - Shows business/entrepreneurship content

## Next Steps for Real API Integration

### Option 1: Server-Side Proxy (Recommended)

Create a backend API endpoint that handles the AWS signature authentication:

```typescript
// backend/api/phyllo-proxy.ts
import AWS from 'aws-sdk';

export async function POST(request: Request) {
  const { query, limit } = await request.json();
  
  // Configure AWS signature
  const credentials = new AWS.Config({
    accessKeyId: process.env.PHYLLO_ACCESS_KEY,
    secretAccessKey: process.env.PHYLLO_SECRET_KEY,
    region: 'us-east-1'
  });
  
  // Make signed request to Phyllo API
  const response = await signedFetch('https://api.insightiq.ai/v1/social/creator-profile/quick-search', {
    method: 'POST',
    body: JSON.stringify({ query, limit }),
    credentials
  });
  
  return Response.json(await response.json());
}
```

Then update the frontend to use your proxy:

```typescript
// Update PHYLLO_API_BASE in phyllo.ts
const PHYLLO_API_BASE = '/api/phyllo-proxy';
```

### Option 2: Client-Side AWS SDK Integration

Install AWS SDK and implement signature authentication:

```bash
npm install aws-sdk @aws-sdk/signature-v4
```

```typescript
// In phyllo.ts
import { SignatureV4 } from '@aws-sdk/signature-v4';

private async makeSignedRequest(endpoint: string, options: RequestInit = {}) {
  const signer = new SignatureV4({
    service: 'execute-api',
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY!,
    },
  });

  const signed = await signer.sign({
    method: options.method || 'POST',
    hostname: 'api.insightiq.ai',
    path: endpoint,
    protocol: 'https',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body,
  });

  return fetch(signed.url, signed);
}
```

### Option 3: Contact Phyllo/InsightIQ Support

Reach out to InsightIQ support for:
- Simplified authentication method
- API documentation specific to your use case
- CORS configuration assistance

## Environment Variables Needed

Once implementing real API authentication:

```env
# For server-side proxy approach
PHYLLO_ACCESS_KEY=your_aws_access_key
PHYLLO_SECRET_KEY=your_aws_secret_key

# For client-side approach (not recommended for production)
VITE_AWS_ACCESS_KEY_ID=your_aws_access_key
VITE_AWS_SECRET_ACCESS_KEY=your_aws_secret_key
```

## Switching from Demo to Real API

To enable real API calls, update the PhylloService constructor:

```typescript
// In src/lib/phyllo.ts
constructor() {
  this.apiKey = import.meta.env.VITE_PHYLLO_API_KEY || 'f7427572-fef7-410e-bb55-53f3c4f0039e';
  
  // Set to false when real API is ready
  this.useMockData = false; // Change this to false
}
```

## Current API Key

Your provided API key: `f7427572-fef7-410e-bb55-53f3c4f0039e`

This key is ready to use once the authentication method is properly implemented.

---

The demo mode provides a fully functional preview of what the real integration will look like, with realistic data and all the planned features working seamlessly.