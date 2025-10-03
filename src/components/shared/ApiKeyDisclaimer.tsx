import { AlertTriangle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
export function ApiKeyDisclaimer() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50 text-yellow-800 dark:text-yellow-300 text-xs flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>
              <strong>AI Features Disabled:</strong> This is a demo environment. To enable full AI capabilities, please deploy this project yourself and add your API keys.
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p>
            Due to security constraints, API keys cannot be provided in this public demo. The AI's responses are currently using mock data. For full functionality, clone the repository, add your own Cloudflare AI and other necessary API keys to the environment variables, and deploy it to your own Cloudflare account.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}