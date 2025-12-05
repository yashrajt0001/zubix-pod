import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Plus, MessageSquare, ChevronRight, Send } from 'lucide-react';
import { Question, Answer, User } from '@/types';

// Mock questions
const MOCK_QUESTIONS: Question[] = [
  {
    id: '1',
    roomId: '2',
    authorId: 'user1',
    author: { id: 'user1', fullName: 'Rahul Sharma', username: 'rahulsharma', email: '', mobile: '', role: 'user', createdAt: new Date() },
    content: 'What are the key metrics VCs look for in a seed-stage startup?',
    answers: [
      {
        id: 'a1',
        questionId: '1',
        authorId: 'user2',
        author: { id: 'user2', fullName: 'Priya Patel', username: 'priyapatel', email: '', mobile: '', role: 'pod_owner', createdAt: new Date() },
        content: 'Key metrics include MRR, user growth rate, CAC, LTV, and retention rate. Focus on showing traction and market validation.',
        createdAt: new Date(Date.now() - 1800000),
      },
    ],
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    roomId: '2',
    authorId: 'user3',
    author: { id: 'user3', fullName: 'Amit Kumar', username: 'amitkumar', email: '', mobile: '', role: 'user', createdAt: new Date() },
    content: 'How important is having a technical co-founder for a B2B SaaS startup?',
    answers: [],
    createdAt: new Date(Date.now() - 7200000),
  },
];

const RoomQA = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [questions, setQuestions] = useState(MOCK_QUESTIONS);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);

  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return;

    const question: Question = {
      id: crypto.randomUUID(),
      roomId: roomId || '',
      authorId: user?.id || '',
      author: user as User,
      content: newQuestion,
      answers: [],
      createdAt: new Date(),
    };

    setQuestions([question, ...questions]);
    setNewQuestion('');
    setIsAddQuestionOpen(false);
  };

  const handleAddAnswer = () => {
    if (!newAnswer.trim() || !selectedQuestion) return;

    const answer: Answer = {
      id: crypto.randomUUID(),
      questionId: selectedQuestion.id,
      authorId: user?.id || '',
      author: user as User,
      content: newAnswer,
      createdAt: new Date(),
    };

    setQuestions(questions.map((q) =>
      q.id === selectedQuestion.id
        ? { ...q, answers: [...q.answers, answer] }
        : q
    ));
    setSelectedQuestion({ ...selectedQuestion, answers: [...selectedQuestion.answers, answer] });
    setNewAnswer('');
  };

  if (selectedQuestion) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center gap-3 p-4">
            <Button variant="ghost" size="icon" onClick={() => setSelectedQuestion(null)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-semibold text-foreground">Question Thread</h1>
          </div>
        </header>

        {/* Question */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 border-b border-border">
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback>{selectedQuestion.author.fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">{selectedQuestion.author.fullName}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedQuestion.createdAt.toLocaleDateString()}
                </p>
                <p className="mt-2 text-foreground">{selectedQuestion.content}</p>
              </div>
            </div>
          </div>

          {/* Answers */}
          <div className="p-4">
            <h3 className="font-semibold text-foreground mb-4">
              {selectedQuestion.answers.length} Answers
            </h3>
            <div className="space-y-4">
              {selectedQuestion.answers.map((answer) => (
                <Card key={answer.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{answer.author.fullName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground text-sm">{answer.author.fullName}</p>
                          <p className="text-xs text-muted-foreground">
                            {answer.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        <p className="mt-1 text-foreground text-sm">{answer.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>

        {/* Answer Input */}
        <div className="sticky bottom-0 bg-background border-t border-border p-4">
          <div className="flex gap-2 max-w-2xl mx-auto">
            <Input
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Write your answer..."
              className="flex-1"
              onKeyDown={(e) => e.key === 'Enter' && handleAddAnswer()}
            />
            <Button variant="hero" size="icon" onClick={handleAddAnswer} disabled={!newAnswer.trim()}>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
              <h1 className="font-semibold text-foreground">Founder Q&A</h1>
              <p className="text-sm text-muted-foreground">{questions.length} questions</p>
            </div>
          </div>
          <Dialog open={isAddQuestionOpen} onOpenChange={setIsAddQuestionOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" size="sm">
                <Plus className="w-4 h-4" />
                Ask
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ask a Question</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="What would you like to know?"
                  rows={4}
                />
                <Button variant="hero" className="w-full" onClick={handleAddQuestion}>
                  Post Question
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Questions List */}
      <main className="flex-1 overflow-y-auto p-4 space-y-3">
        {questions.map((question) => (
          <Card
            key={question.id}
            className="cursor-pointer card-hover"
            onClick={() => setSelectedQuestion(question)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10 shrink-0">
                  <AvatarFallback>{question.author.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground text-sm">{question.author.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {question.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <p className="mt-1 text-foreground line-clamp-2">{question.content}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <MessageSquare className="w-4 h-4" />
                    {question.answers.length} answers
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
              </div>
            </CardContent>
          </Card>
        ))}

        {questions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No questions yet. Be the first to ask!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default RoomQA;
