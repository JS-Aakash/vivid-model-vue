import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, LogOut, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-border/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
              <img src="/favicon.png" alt="3D Store Favicon" className="w-9 h-7" />
            </div>
            <span className="text-2xl font-bold text-gradient hidden sm:inline">
              SpinShop 360
            </span>
          </Link>


          {/* Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/wishlist')}
                  className="relative flex items-center gap-2 px-4 py-2 text-base font-medium hover:bg-accent/20 focus:ring-2 focus:ring-primary"
                >
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                  {wishlistItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 text-xs font-bold bg-primary text-white">
                      {wishlistItems.length}
                    </Badge>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => navigate('/cart')}
                  className="relative flex items-center gap-2 px-4 py-2 text-base font-medium hover:bg-accent/20 focus:ring-2 focus:ring-primary"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart</span>
                  {cartItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 text-xs font-bold bg-primary text-white">
                      {cartItems.length}
                    </Badge>
                  )}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 px-4 py-2 text-base font-medium hover:bg-accent/20 focus:ring-2 focus:ring-primary"
                    >
                      <User className="w-5 h-5" />
                      <span>Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-panel">
                    <DropdownMenuItem onClick={() => navigate('/orders')}>
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button
                onClick={() => navigate('/auth')}
                className="flex items-center gap-2 px-4 py-2 text-base font-medium hover:bg-accent/20 focus:ring-2 focus:ring-primary"
              >
                <User className="w-5 h-5" />
                <span>Sign In</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};