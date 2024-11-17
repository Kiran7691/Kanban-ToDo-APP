import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <Card className="p-4 w-full max-w-2xl mx-auto mb-4 border-purple-900/20 bg-white/80 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 border-purple-900/20 focus-visible:ring-purple-500"
        />
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </form>
    </Card>
  );
}