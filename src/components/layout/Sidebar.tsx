import { Plus, MessageSquare, Trash2 } from 'lucide-react';
import { useSessionStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ApiKeyDisclaimer } from '@/components/shared/ApiKeyDisclaimer';
export function Sidebar() {
  const { sessions, activeSessionId, createSession, setActiveSessionId, deleteSession } = useSessionStore();
  const handleCreateSession = async () => {
    await createSession();
  };
  return (
    <aside className="w-full lg:w-1/4 h-full bg-muted/50 flex flex-col p-4 border-r">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Sessions</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCreateSession}
          className="hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-grow overflow-y-auto -mr-2 pr-2 space-y-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            onClick={() => setActiveSessionId(session.id)}
            className={cn(
              'group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200',
              activeSessionId === session.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'hover:bg-primary/5'
            )}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="h-4 w-4" />
              <span className="truncate text-sm font-medium">{session.title}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                deleteSession(session.id);
              }}
              className={cn(
                'h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity',
                activeSessionId === session.id
                  ? 'text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                  : 'text-muted-foreground hover:bg-destructive/10 hover:text-destructive'
              )}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-4">
        <ApiKeyDisclaimer />
      </div>
    </aside>
  );
}