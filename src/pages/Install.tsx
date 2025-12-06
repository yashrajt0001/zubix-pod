import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Smartphone, Share, MoreVertical, PlusSquare, Check } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for install prompt (Android/Desktop)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Listen for app installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">App Installed!</h1>
            <p className="text-muted-foreground">
              Zubix is already installed on your device. Open it from your home screen to get started.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
            <Smartphone className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Install Zubix</h1>
          <p className="text-muted-foreground">
            Add Zubix to your home screen for a faster, app-like experience with offline support.
          </p>
        </div>

        {/* Install Button for Android/Desktop */}
        {deferredPrompt && (
          <Button 
            variant="hero" 
            size="lg" 
            className="w-full"
            onClick={handleInstallClick}
          >
            <Download className="w-5 h-5 mr-2" />
            Install App
          </Button>
        )}

        {/* iOS Instructions */}
        {isIOS && !deferredPrompt && (
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <Share className="w-5 h-5 text-primary" />
                Install on iPhone/iPad
              </h2>
              <ol className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold shrink-0">1</span>
                  <span className="text-muted-foreground">
                    Tap the <Share className="w-4 h-4 inline text-primary" /> Share button at the bottom of Safari
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold shrink-0">2</span>
                  <span className="text-muted-foreground">
                    Scroll down and tap <PlusSquare className="w-4 h-4 inline text-primary" /> "Add to Home Screen"
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold shrink-0">3</span>
                  <span className="text-muted-foreground">
                    Tap "Add" in the top right corner
                  </span>
                </li>
              </ol>
            </CardContent>
          </Card>
        )}

        {/* Android Instructions (fallback) */}
        {!isIOS && !deferredPrompt && (
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <MoreVertical className="w-5 h-5 text-primary" />
                Install on Android
              </h2>
              <ol className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold shrink-0">1</span>
                  <span className="text-muted-foreground">
                    Tap the <MoreVertical className="w-4 h-4 inline text-primary" /> menu button in your browser (top right)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold shrink-0">2</span>
                  <span className="text-muted-foreground">
                    Tap "Install app" or "Add to Home Screen"
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold shrink-0">3</span>
                  <span className="text-muted-foreground">
                    Tap "Install" to confirm
                  </span>
                </li>
              </ol>
            </CardContent>
          </Card>
        )}

        {/* Benefits */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-foreground mb-4">Why install?</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                Quick access from your home screen
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                Works offline
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                Faster loading times
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                Full-screen app experience
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Install;
