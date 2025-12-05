import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Bell, Heart, MessageCircle, Users, Calendar } from 'lucide-react';
import { Notification } from '@/types';

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', userId: 'user1', type: 'pod_join', title: 'Welcome to TechStars!', message: 'You have successfully joined TechStars Bangalore', isRead: false, createdAt: new Date(Date.now() - 3600000) },
  { id: '2', userId: 'user1', type: 'post_like', title: 'New like', message: 'Rahul Sharma liked your post', isRead: false, createdAt: new Date(Date.now() - 7200000) },
  { id: '3', userId: 'user1', type: 'event', title: 'Event reminder', message: 'Demo Day 2024 starts in 24 hours', isRead: true, createdAt: new Date(Date.now() - 86400000) },
  { id: '4', userId: 'user1', type: 'message', title: 'New message', message: 'Priya Patel sent you a message', isRead: true, createdAt: new Date(Date.now() - 172800000) },
];

const Notifications = () => {
  const navigate = useNavigate();

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'pod_join': return <Users className="w-5 h-5" />;
      case 'post_like': return <Heart className="w-5 h-5" />;
      case 'comment': case 'message': return <MessageCircle className="w-5 h-5" />;
      case 'event': return <Calendar className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="w-5 h-5" /></Button>
          <h1 className="text-xl font-bold text-foreground">Notifications</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-4 max-w-2xl space-y-2">
        {MOCK_NOTIFICATIONS.map((notif) => (
          <Card key={notif.id} className={`${!notif.isRead ? 'border-primary/30 bg-primary/5' : ''}`}>
            <CardContent className="p-4 flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!notif.isRead ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>{getIcon(notif.type)}</div>
              <div className="flex-1">
                <p className={`font-medium ${!notif.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>{notif.title}</p>
                <p className="text-sm text-muted-foreground">{notif.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{notif.createdAt.toLocaleDateString()}</p>
              </div>
              {!notif.isRead && <div className="w-2 h-2 rounded-full bg-primary" />}
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
};

export default Notifications;
