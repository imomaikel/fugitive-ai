import { Blocks, Brain, Database } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SectionOne = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">AI-Powered Intelligence & Prediction</h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-300">
            Transform your investigative capabilities with cutting-edge artificial intelligence
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-slate-800 bg-slate-900 shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader>
              <Brain className="text-primary mb-2 h-12 w-12" />
              <CardTitle className="text-slate-100">Behavioral Forecasting</CardTitle>
              <CardDescription className="text-slate-400">
                Predict next moves using psychological profiling and historical patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Our AI does not just track - it anticipates. By analyzing behavioral patterns, travel history, and known
                affiliations, FugitiveAI predicts likely locations with remarkable accuracy.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900 shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader>
              <Database className="text-primary mb-2 h-12 w-12" />
              <CardTitle className="text-slate-100">Comprehensive Analytics</CardTitle>
              <CardDescription className="text-slate-400">
                Turn complex data into actionable intelligence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Process vast amounts of structured and unstructured data to identify patterns invisible to the human
                eye. Our system continuously learns from new information to improve predictions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900 shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader>
              <Blocks className="text-primary mb-2 h-12 w-12" />
              <CardTitle className="text-slate-100">Unified Dashboard</CardTitle>
              <CardDescription className="text-slate-400">Full operational awareness in one interface</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Access all case insights, fugitive status tracking, and live updates through a centralized interface
                designed for both field agents and crime analysts.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SectionOne;
