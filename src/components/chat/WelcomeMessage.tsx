import { Bot, BarChart2, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
const examplePrompts = [
  "Analyze last year's Black Friday campaign",
  "Simulate a new campaign for a summer sale",
  "What was the ROI on our Q1 email marketing?",
];
interface WelcomeMessageProps {
  onStart: (prompt: string) => void;
}
export function WelcomeMessage({ onStart }: WelcomeMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="mb-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Bot className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-2">Welcome to InsightAgent</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          I'm your AI E-Commerce Campaign Analyst. I can analyze past performance and simulate future outcomes to help you make data-informed marketing decisions.
        </p>
      </div>
      <div className="w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Get Started</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="text-left">
            <CardContent className="p-6">
              <div className="flex items-center mb-2">
                <BarChart2 className="h-5 w-5 mr-2 text-primary" />
                <h3 className="font-semibold">Analyze Past Campaigns</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Ask me to review the performance of previous marketing efforts to uncover key insights.
              </p>
            </CardContent>
          </Card>
          <Card className="text-left">
            <CardContent className="p-6">
              <div className="flex items-center mb-2">
                <Zap className="h-5 w-5 mr-2 text-primary" />
                <h3 className="font-semibold">Simulate Future Campaigns</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Propose a new campaign, and I'll help you model its potential outcomes before you invest.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <p className="text-sm text-muted-foreground mb-3">Try an example:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {examplePrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => onStart(prompt)}
                className="px-4 py-2 bg-muted hover:bg-primary/10 text-sm rounded-full transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}