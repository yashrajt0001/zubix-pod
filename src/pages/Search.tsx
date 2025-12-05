import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft, Search as SearchIcon, Building2, Users } from 'lucide-react';

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('all');

  const mockUsers = [
    { id: '1', name: 'Rahul Sharma', username: 'rahulsharma', role: 'Founder' },
    { id: '2', name: 'Priya Patel', username: 'priyapatel', role: 'Investor' },
  ];

  const mockPods = [
    { id: '1', name: 'TechStars Bangalore', type: 'Accelerator' },
    { id: '2', name: 'Indian Angel Network', type: 'Angel Network' },
  ];

  const filteredUsers = mockUsers.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.username.includes(query.toLowerCase()));
  const filteredPods = mockPods.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="w-5 h-5" /></Button>
          <div className="relative flex-1"><SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search users, pods..." className="pl-9" autoFocus /></div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-4 max-w-2xl">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4"><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="users">Users</TabsTrigger><TabsTrigger value="pods">Pods</TabsTrigger></TabsList>
          <TabsContent value="all" className="space-y-3">
            {filteredUsers.map((u) => <UserCard key={u.id} user={u} onClick={() => {}} />)}
            {filteredPods.map((p) => <PodCard key={p.id} pod={p} onClick={() => navigate(`/pod/${p.id}`)} />)}
          </TabsContent>
          <TabsContent value="users" className="space-y-3">{filteredUsers.map((u) => <UserCard key={u.id} user={u} onClick={() => {}} />)}</TabsContent>
          <TabsContent value="pods" className="space-y-3">{filteredPods.map((p) => <PodCard key={p.id} pod={p} onClick={() => navigate(`/pod/${p.id}`)} />)}</TabsContent>
        </Tabs>
        {query && filteredUsers.length === 0 && filteredPods.length === 0 && <p className="text-center text-muted-foreground py-8">No results found</p>}
      </main>
    </div>
  );
};

const UserCard = ({ user, onClick }: { user: any; onClick: () => void }) => (
  <Card className="cursor-pointer card-hover" onClick={onClick}><CardContent className="p-4 flex items-center gap-3"><Avatar><AvatarFallback>{user.name.charAt(0)}</AvatarFallback></Avatar><div><p className="font-medium text-foreground">{user.name}</p><p className="text-sm text-muted-foreground">@{user.username} · {user.role}</p></div></CardContent></Card>
);

const PodCard = ({ pod, onClick }: { pod: any; onClick: () => void }) => (
  <Card className="cursor-pointer card-hover" onClick={onClick}><CardContent className="p-4 flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Building2 className="w-5 h-5 text-primary" /></div><div><p className="font-medium text-foreground">{pod.name}</p><p className="text-sm text-muted-foreground">{pod.type}</p></div></CardContent></Card>
);

export default Search;
