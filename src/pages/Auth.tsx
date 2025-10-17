import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Particles } from '@/components/Particles';
import LiquidEther from '@/components/LiquidEther';
import { ShoppingBag, Sparkles, Shield, Zap, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, fullName);
      }
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Sparkles, text: 'Immersive 3D Shopping' },
    { icon: Shield, text: 'Secure Checkout' },
    { icon: Zap, text: 'Lightning Fast' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Liquid Ether Background */}
      <div className="fixed inset-0 z-0 opacity-60">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={40}
          cursorSize={70}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={true}
          autoDemo={true}
          autoSpeed={0.4}
          autoIntensity={2.2}
          takeoverDuration={0}
          autoResumeDelay={2000}
          autoRampDuration={0.6}
        />
      </div>

      <Particles />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Bar */}
      <div className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-black/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/50">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  SpinShop 360
                </h1>
                <p className="text-xs text-white/50">Next-Gen Shopping</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-white/70">
                  <feature.icon className="w-4 h-4" />
                  <span className="text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-72px)] p-4 py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Marketing Content */}
          <div className="hidden lg:block space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <span className="text-sm font-medium text-primary flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Revolutionary Shopping Experience
                </span>
              </div>
              <h2 className="text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                  Shop in a New
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Dimension
                </span>
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                Experience products like never before with our cutting-edge 3D visualization technology. 
                Rotate, zoom, and explore every detail before you buy.
              </p>
            </div>

            <div className="space-y-4">
              {[
                'Interactive 3D product models',
                'Real-time customization options',
                'Secure and fast checkout',
                'Premium customer support'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white/70 group-hover:text-white/90 transition-colors">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-slate-900" />
                ))}
              </div>
              <div>
                <p className="text-sm text-white/90 font-medium">Join 10,000+ happy shoppers</p>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Sparkles key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Card */}
          <Card className="w-full max-w-md mx-auto glass-panel border-white/10 shadow-2xl animate-fade-in backdrop-blur-xl bg-slate-900/40">
            <CardHeader className="space-y-6 text-center pb-8">
              <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-2xl shadow-primary/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                <ShoppingBag className="w-10 h-10 text-white relative z-10" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  {isLogin ? 'Welcome Back!' : 'Join Us Today'}
                </CardTitle>
                <CardDescription className="mt-2 text-base text-white/60">
                  {isLogin ? 'Sign in to continue your shopping journey' : 'Create your account and start exploring'}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <div className="space-y-2 relative">
                    <Label htmlFor="fullName" className="text-white/90 text-sm font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      onFocus={() => setFocusedField('fullName')}
                      onBlur={() => setFocusedField('')}
                      required
                      className={`glass-panel bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 transition-all ${
                        focusedField === 'fullName' ? 'border-primary shadow-lg shadow-primary/20' : ''
                      }`}
                    />
                  </div>
                )}
                
                <div className="space-y-2 relative">
                  <Label htmlFor="email" className="text-white/90 text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    required
                    className={`glass-panel bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 transition-all ${
                      focusedField === 'email' ? 'border-primary shadow-lg shadow-primary/20' : ''
                    }`}
                  />
                </div>

                <div className="space-y-2 relative">
                  <Label htmlFor="password" className="text-white/90 text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField('')}
                      required
                      minLength={6}
                      className={`glass-panel bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 pr-12 transition-all ${
                        focusedField === 'password' ? 'border-primary shadow-lg shadow-primary/20' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/90 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {!isLogin && (
                    <p className="text-xs text-white/40 mt-1">Must be at least 6 characters</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 relative overflow-hidden group bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 text-base font-semibold"
                  disabled={loading}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
                    {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900/80 px-2 text-white/50">or</span>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-white/60 hover:text-white transition-colors group"
                >
                  {isLogin ? "Don't have an account? " : 'Already have an account? '}
                  <span className="text-primary font-semibold group-hover:underline">
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </span>
                </button>
              </div>

              {isLogin && (
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-white/50 hover:text-primary transition-colors"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default Auth;