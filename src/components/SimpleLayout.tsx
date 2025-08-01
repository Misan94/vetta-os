import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Instagram, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface SimpleLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
}

const SimpleLayout = ({ children, title, showBackButton = true }: SimpleLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header */}
      <header className="w-full py-4 px-6 border-b">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="hover:bg-secondary"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            )}
            <Link to="/" className="flex items-center space-x-2">
              <Instagram className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">Vetta</span>
            </Link>
          </div>
          {title && (
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
};

export default SimpleLayout;