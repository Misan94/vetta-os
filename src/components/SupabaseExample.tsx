import { useState } from 'react'
import { useAuth, useSupabaseQuery, useSupabaseMutation } from '@/hooks/useSupabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

export default function SupabaseExample() {
  const { user, loading: authLoading, signIn, signUp, signOut } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  // Test connection to your influencers table
  const {
    data: influencers,
    loading: influencersLoading,
    error: influencersError,
    refetch: refetchInfluencers
  } = useSupabaseQuery('influencers', {
    select: 'id, name, email, category, platforms, tags, created_at',
    dependencies: [user] // Refetch when user changes
  })

  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
    refetch: refetchPosts
  } = useSupabaseQuery('posts', {
    dependencies: [user]
  })

  const {
    data: influencerMetrics,
    loading: metricsLoading,
    error: metricsError,
    refetch: refetchMetrics
  } = useSupabaseQuery('influencer_metrics', {
    dependencies: [user]
  })



  const handleAuth = async () => {
    try {
      if (isSignUp) {
        const result = await signUp(email, password)
        if (result.error) {
          console.error('Sign up error:', result.error.message)
        }
      } else {
        const result = await signIn(email, password)
        if (result.error) {
          console.error('Sign in error:', result.error.message)
        }
      }
    } catch (error) {
      console.error('Auth error:', error)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }



  if (authLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading...</span>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Supabase Integration Example</CardTitle>
          <CardDescription>
            This demonstrates authentication and database operations with Supabase
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!user ? (
            // Authentication form
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={!isSignUp ? "default" : "outline"}
                  onClick={() => setIsSignUp(false)}
                >
                  Sign In
                </Button>
                <Button
                  variant={isSignUp ? "default" : "outline"}
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </Button>
              </div>
              
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleAuth} className="w-full">
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </Button>
              </div>
            </div>
          ) : (
            // User is authenticated
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Welcome, {user.email}!</p>
                  <p className="text-sm text-muted-foreground">User ID: {user.id}</p>
                </div>
                <Button onClick={handleSignOut} variant="outline">
                  Sign Out
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Database Connection Test */}
      <Card>
        <CardHeader>
          <CardTitle>Database Connection Test</CardTitle>
          <CardDescription>
            Testing connection to your Supabase tables: influencers, posts, influencer_metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Influencers Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Influencers Table</h3>
              <Button onClick={refetchInfluencers} variant="outline" size="sm">
                Refresh
              </Button>
            </div>
            
            {influencersLoading ? (
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading influencers...
              </div>
            ) : influencersError ? (
              <Alert variant="destructive">
                <AlertDescription>
                  <strong>Influencers Error:</strong> {influencersError}
                </AlertDescription>
              </Alert>
            ) : (
              <Alert>
                <AlertDescription>
                  ✅ <strong>Influencers table accessible!</strong> Found {influencers?.length || 0} records
                  {influencers?.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="font-medium">Recent Influencers:</h4>
                      {influencers.slice(0, 3).map((influencer: any) => (
                        <div key={influencer.id} className="bg-muted/50 p-3 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{influencer.name}</p>
                              {influencer.category && (
                                <p className="text-sm text-muted-foreground">{influencer.category}</p>
                              )}
                              {influencer.platforms && Object.keys(influencer.platforms).length > 0 && (
                                <div className="flex gap-1 mt-1">
                                  {Object.keys(influencer.platforms).map(platform => (
                                    <span key={platform} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                      {platform}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {new Date(influencer.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      <details className="mt-2">
                        <summary className="cursor-pointer text-sm">View raw data structure</summary>
                        <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto">
                          {JSON.stringify(influencers[0], null, 2)}
                        </pre>
                      </details>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Posts Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Posts Table</h3>
              <Button onClick={refetchPosts} variant="outline" size="sm">
                Refresh
              </Button>
            </div>
            
            {postsLoading ? (
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading posts...
              </div>
            ) : postsError ? (
              <Alert variant="destructive">
                <AlertDescription>
                  <strong>Posts Error:</strong> {postsError}
                </AlertDescription>
              </Alert>
            ) : (
              <Alert>
                <AlertDescription>
                  ✅ <strong>Posts table accessible!</strong> Found {posts?.length || 0} records
                  {posts?.length > 0 && (
                    <details className="mt-2">
                      <summary className="cursor-pointer">View first record structure</summary>
                      <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto">
                        {JSON.stringify(posts[0], null, 2)}
                      </pre>
                    </details>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Influencer Metrics Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Influencer Metrics Table</h3>
              <Button onClick={refetchMetrics} variant="outline" size="sm">
                Refresh
              </Button>
            </div>
            
            {metricsLoading ? (
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading metrics...
              </div>
            ) : metricsError ? (
              <Alert variant="destructive">
                <AlertDescription>
                  <strong>Metrics Error:</strong> {metricsError}
                </AlertDescription>
              </Alert>
            ) : (
              <Alert>
                <AlertDescription>
                  ✅ <strong>Influencer metrics table accessible!</strong> Found {influencerMetrics?.length || 0} records
                  {influencerMetrics?.length > 0 && (
                    <details className="mt-2">
                      <summary className="cursor-pointer">View first record structure</summary>
                      <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto">
                        {JSON.stringify(influencerMetrics[0], null, 2)}
                      </pre>
                    </details>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Summary */}
          <div className="pt-4 border-t">
            <h3 className="font-medium mb-2">Connection Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-3">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${influencersError ? 'text-red-500' : 'text-green-500'}`}>
                    {influencersError ? '❌' : '✅'}
                  </div>
                  <p className="text-sm font-medium">Influencers</p>
                  <p className="text-xs text-muted-foreground">{influencers?.length || 0} records</p>
                </div>
              </Card>
              <Card className="p-3">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${postsError ? 'text-red-500' : 'text-green-500'}`}>
                    {postsError ? '❌' : '✅'}
                  </div>
                  <p className="text-sm font-medium">Posts</p>
                  <p className="text-xs text-muted-foreground">{posts?.length || 0} records</p>
                </div>
              </Card>
              <Card className="p-3">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${metricsError ? 'text-red-500' : 'text-green-500'}`}>
                    {metricsError ? '❌' : '✅'}
                  </div>
                  <p className="text-sm font-medium">Metrics</p>
                  <p className="text-xs text-muted-foreground">{influencerMetrics?.length || 0} records</p>
                </div>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}