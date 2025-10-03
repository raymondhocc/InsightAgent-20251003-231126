import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useChatStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const simulationSchema = z.object({
  budget: z.coerce.number().min(100, 'Budget must be at least $100'),
  promo_type: z.enum(['percentage_discount', 'bogo', 'free_shipping']),
  channel_mix: z.object({
    instagram: z.coerce.number().min(0).max(100),
    google_ads: z.coerce.number().min(0).max(100),
    email: z.coerce.number().min(0).max(100),
  }).refine(data => data.instagram + data.google_ads + data.email === 100, {
    message: 'Channel mix percentages must add up to 100',
    path: ['instagram'],
  }),
});
type SimulationFormData = z.infer<typeof simulationSchema>;
export function SimulationForm() {
  const addMessage = useChatStore((s) => s.addMessage);
  const form = useForm<SimulationFormData>({
    resolver: zodResolver(simulationSchema),
    defaultValues: {
      budget: 5000,
      promo_type: 'percentage_discount',
      channel_mix: {
        instagram: 40,
        google_ads: 40,
        email: 20,
      },
    },
  });
  const onSubmit = (data: SimulationFormData) => {
    const userResponse = `Simulate a campaign with a budget of $${data.budget}, promo type "${data.promo_type}", and channel mix of Instagram ${data.channel_mix.instagram}%, Google Ads ${data.channel_mix.google_ads}%, and Email ${data.channel_mix.email}%.`;
    addMessage({
      id: crypto.randomUUID(),
      role: 'user',
      content: userResponse,
      timestamp: Date.now(),
    });
  };
  return (
    <Card className="w-full max-w-lg border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle>Campaign Simulation Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 5000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="promo_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Promotion Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a promotion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="percentage_discount">% Discount</SelectItem>
                      <SelectItem value="bogo">Buy One Get One</SelectItem>
                      <SelectItem value="free_shipping">Free Shipping</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Label className="mb-2 block">Channel Mix (%)</Label>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="channel_mix.instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Instagram</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="40" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="channel_mix.google_ads"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Google Ads</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="40" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="channel_mix.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Email</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="20" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormMessage>{form.formState.errors.channel_mix?.root?.message}</FormMessage>
            </div>
            <Button type="submit" className="w-full">Run Simulation</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}