import { useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { useSessionStore } from '@/lib/store';
import { Loader2 } from 'lucide-react';
export function HomePage() {
  const { fetchSessions, isLoading } = useSessionStore();
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  return (
    <main className="h-screen w-screen bg-background text-foreground flex flex-col lg:flex-row overflow-hidden">
      <div className="max-w-screen-2xl mx-auto flex h-full w-full p-0 sm:p-0 lg:p-0">
        <Sidebar />
        <ChatPanel />
      </div>
    </main>
  );
}