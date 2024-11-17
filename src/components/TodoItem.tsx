import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Todo } from '@/types/todo';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { EditTodoDialog } from './EditTodoDialog';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          'flex items-center gap-2 p-3 bg-white rounded-lg border border-purple-900/20',
          'shadow-sm hover:shadow-md transition-shadow duration-200',
          isDragging && 'opacity-50 cursor-grabbing shadow-lg',
          !isDragging && 'cursor-grab'
        )}
        {...attributes}
      >
        <div {...listeners} className="touch-none">
          <GripVertical className="h-5 w-5 text-purple-400" />
        </div>
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          className="data-[state=checked]:bg-purple-600 border-purple-300"
        />
        <span
          className={cn(
            'flex-1 text-purple-950',
            todo.completed && 'line-through text-purple-400'
          )}
        >
          {todo.text}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsEditing(true)}
          className="text-purple-500 hover:text-purple-600 hover:bg-purple-50"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(todo.id)}
          className="text-purple-500 hover:text-purple-600 hover:bg-purple-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <EditTodoDialog
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={(text) => onEdit(todo.id, text)}
        initialText={todo.text}
      />
    </>
  );
}