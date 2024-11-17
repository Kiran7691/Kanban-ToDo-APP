import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';
import { Todo, TodoStatus } from '@/types/todo';
import { KanbanColumn } from './KanbanColumn';
import { TodoItem } from './TodoItem';

interface KanbanBoardProps {
  todos: Todo[];
  onStatusChange: (id: string, status: TodoStatus) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function KanbanBoard({
  todos,
  onStatusChange,
  onToggle,
  onDelete,
  onEdit,
}: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const todoItems = todos.filter((todo) => todo.status === 'todo');
  const inProgressItems = todos.filter((todo) => todo.status === 'in-progress');
  const completedItems = todos.filter((todo) => todo.status === 'completed');

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = active.data.current?.sortable?.containerId;
    const overContainer = over.data.current?.sortable?.containerId || over.id;

    if (activeContainer !== overContainer) {
      onStatusChange(active.id as string, overContainer as TodoStatus);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
  }

  const activeTodo = activeId ? todos.find((todo) => todo.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl mx-auto">
        <KanbanColumn
          title="To Do"
          todos={todoItems}
          status="todo"
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
        <KanbanColumn
          title="In Progress"
          todos={inProgressItems}
          status="in-progress"
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
        <KanbanColumn
          title="Completed"
          todos={completedItems}
          status="completed"
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
      <DragOverlay>
        {activeTodo && (
          <div className="w-[calc(100vw-2rem)] md:w-[350px]">
            <TodoItem
              todo={activeTodo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}