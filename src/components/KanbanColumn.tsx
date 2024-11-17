import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Todo, TodoStatus } from '@/types/todo';
import { TodoItem } from './TodoItem';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  title: string;
  todos: Todo[];
  status: TodoStatus;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function KanbanColumn({
  title,
  todos,
  status,
  onToggle,
  onDelete,
  onEdit,
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-black/5 rounded-lg backdrop-blur-sm border border-purple-900/20">
      <div className="p-4 border-b border-purple-900/20">
        <h2 className="text-lg font-semibold text-purple-900">
          {title} ({todos.length})
        </h2>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          'flex-1 p-4 overflow-y-auto space-y-2',
          'scrollbar-thin scrollbar-thumb-purple-900/20 scrollbar-track-transparent'
        )}
      >
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}