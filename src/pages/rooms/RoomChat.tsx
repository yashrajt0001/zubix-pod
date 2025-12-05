import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Send, MoreVertical } from 'lucide-react';
import { Message, User } from '@/types';

// Mock messages
const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    roomId: '1',
    senderId: 'user1',
    sender: { id: 'user1', fullName: 'Rahul Sharma', username: 'rahulsharma', email: '', mobile: '', role: 'user', createdAt: new Date() },
    content: 'Hey everyone! Welcome to the general discussion room.',
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    roomId: '1',
    senderId: 'user2',
    sender: { id: 'user2', fullName: 'Priya Patel', username: 'priyapatel', email: '', mobile: '', role: 'user', createdAt: new Date() },
    content: 'Thanks for setting this up! Looking forward to connecting with everyone.',
    createdAt: new Date(Date.now() - 3000000),
  },
  {
    id: '3',
    roomId: '1',
    senderId: 'user3',
    sender: { id: 'user3', fullName: 'Amit Kumar', username: 'amitkumar', email: '', mobile: '', role: 'user', createdAt: new Date() },
    content: 'Anyone working on FinTech here? Would love to connect!',
    createdAt: new Date(Date.now() - 1800000),
  },
];

const RoomChat = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: crypto.randomUUID(),
      roomId: roomId || '',
      senderId: user?.id || '',
      sender: user as User,
      content: newMessage,
      createdAt: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/rooms')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-semibold text-foreground">General Discussion</h1>
              <p className="text-sm text-muted-foreground">3 members</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwn = message.senderId === user?.id;
          return (
            <div key={message.id} className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}>
              {!isOwn && (
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarFallback>{message.sender.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-[75%] ${isOwn ? 'items-end' : ''}`}>
                {!isOwn && (
                  <p className="text-xs text-muted-foreground mb-1">{message.sender.fullName}</p>
                )}
                <div className={`rounded-2xl px-4 py-2 ${
                  isOwn 
                    ? 'bg-primary text-primary-foreground rounded-br-md' 
                    : 'bg-secondary text-secondary-foreground rounded-bl-md'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {message.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
      </main>

      {/* Input */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <div className="flex gap-2 max-w-2xl mx-auto">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button variant="hero" size="icon" onClick={handleSend} disabled={!newMessage.trim()}>
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomChat;
