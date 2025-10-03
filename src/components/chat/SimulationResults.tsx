import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, DollarSign, Percent } from 'lucide-react';
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}
function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card className="bg-background/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
interface SimulationResultsProps {
  data: {
    roi: number;
    sales_lift: number;
    revenue: number;
    channel_performance: { name: string; value: number }[];
  };
}
const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];
export function SimulationResults({ data }: SimulationResultsProps) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Simulation Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Projected ROI"
            value={`${data.roi.toFixed(2)}x`}
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Estimated Sales Lift"
            value={`${data.sales_lift}%`}
            icon={<ArrowUp className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Predicted Revenue"
            value={`$${data.revenue.toLocaleString()}`}
            icon={<Percent className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Channel Performance</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.channel_performance} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.channel_performance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}