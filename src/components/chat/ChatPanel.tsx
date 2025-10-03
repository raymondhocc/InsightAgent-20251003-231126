import React, { useEffect, useRef, useState } from 'react';
import { Send, Bot, Loader2 } from 'lucide-react';
import { useChatStore, useSessionStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WelcomeMessage } from './WelcomeMessage';
import { ChatMessage } from './ChatMessage';
import { AnimatePresence, motion } from 'framer-motion';
export function ChatPanel() {
  const activeSessionId = useSessionStore((s) => s.activeSessionId);
  const { messages, streamingMessage, isProcessing, isLoadingHistory, sendMessage, loadChatHistory } = useChatStore();
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (activeSessionId) {
      loadChatHistory(activeSessionId);
    }
  }, [activeSessionId, loadChatHistory]);
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, streamingMessage]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeSessionId || isProcessing) return;
    sendMessage(input, activeSessionId);
    setInput('');
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return (
    <div className="w-full lg:w-3/4 h-full flex flex-col bg-background">
      <header className="flex items-center p-4 border-b">
        <Bot className="h-6 w-6 mr-3 text-primary" />
        <h1 className="text-xl font-bold">InsightAgent</h1>
      </header>
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" viewportRef={scrollAreaRef}>
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            {isLoadingHistory ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : messages.length === 0 ? (
              <WelcomeMessage onStart={(prompt) => {
                if (activeSessionId) sendMessage(prompt, activeSessionId);
              }} />
            ) : (
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                {streamingMessage && (
                  <ChatMessage
                    message={{
                      id: 'streaming',
                      role: 'assistant',
                      content: streamingMessage,
                      timestamp: Date.now(),
                    }}
                    isStreaming
                  />
                )}
              </AnimatePresence>
            )}
          </div>
        </ScrollArea>
      </main>
      <footer className="p-4 border-t bg-background">
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Analyze last year's Black Friday campaign or simulate a new one..."
            className="pr-16 min-h-[52px] resize-none"
            rows={1}
            disabled={isProcessing || !activeSessionId}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            disabled={!input.trim() || isProcessing || !activeSessionId}
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </footer>
    </div>
  );
}