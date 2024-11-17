import { useState, useEffect } from 'react';
import { ListTodo } from 'lucide-react';
import { Todo, TodoStatus } from '@/types/todo';
import { AddTodo } from '@/components/AddTodo';
import { KanbanBoard } from '@/components/KanbanBoard';
import { useToast } from '@/hooks/use-toast';
import { loadTodos, saveTodos } from '@/lib/storage';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const initialTodos = loadTodos();
    setTodos(initialTodos);
  }, []);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
      status: 'todo',
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    toast({
      title: 'Task added',
      description: 'Your new task has been added successfully.',
    });
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            completed: !todo.completed,
            status: !todo.completed ? 'completed' : 'todo',
          }
        : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    toast({
      title: 'Task deleted',
      description: 'The task has been deleted successfully.',
      variant: 'destructive',
    });
  };

  const updateTodoStatus = (id: string, status: TodoStatus) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            status,
            completed: status === 'completed',
          }
        : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const editTodo = (id: string, text: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            text,
          }
        : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    toast({
      title: 'Task updated',
      description: 'The task has been updated successfully.',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img 
              src="/prizmora-logo.svg" 
              alt="Prizmora Logo" 
              className="h-12 w-auto"
            />
            <div className="flex items-center gap-2">
              <ListTodo className="h-8 w-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-900">
                Kanban Todo App
              </h1>
            </div>
          </div>
        </div>
        <AddTodo onAdd={addTodo} />
        <KanbanBoard
          todos={todos}
          onStatusChange={updateTodoStatus}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>
    </div>
  );
}

export default App;