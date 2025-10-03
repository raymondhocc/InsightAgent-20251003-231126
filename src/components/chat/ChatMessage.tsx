import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Message } from '../../../worker/types';
import { SimulationForm } from './SimulationForm';
import { SimulationResults } from './SimulationResults';
interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}
// Helper to check if content is a JSON string for a specific component
const isComponentJson = (content: string, componentName: string) => {
  try {
    const parsed = JSON.parse(content);
    return parsed.component === componentName;
  } catch (e) {
    return false;
  }
};
// Helper to parse JSON safely
const safeJsonParse = (content: string) => {
  try {
    return JSON.parse(content);
  } catch {
    return null;
  }
};
export function ChatMessage({ message, isStreaming = false }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const renderContent = () => {
    if (isComponentJson(message.content, 'simulation_form')) {
      return <SimulationForm />;
    }
    if (isComponentJson(message.content, 'simulation_results')) {
      const data = safeJsonParse(message.content);
      return data ? <SimulationResults data={data.props} /> : <p>{message.content}</p>;
    }
    return (
      <p className="whitespace-pre-wrap leading-relaxed">
        {message.content}
        {isStreaming && <span className="animate-pulse">▍</span>}
      </p>
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={cn('flex items-start gap-4', isUser ? 'justify-end' : 'justify-start')}
    >
      {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="h-5 w-5 text-primary" />
        </div>
      )}
      <div
        className={cn(
          'max-w-xl rounded-2xl px-4 py-3 shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-muted rounded-bl-none'
        )}
      >
        {renderContent()}
      </div>
      {isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          <User className="h-5 w-5 text-muted-foreground" />
        </div>
      )}
    </motion.div>
  );
}