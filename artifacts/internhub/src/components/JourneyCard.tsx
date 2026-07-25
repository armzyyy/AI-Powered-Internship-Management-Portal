import { useState, useEffect } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const steps = [
  { id: 1, label: 'Apply', desc: 'Submit application' },
  { id: 2, label: 'Get AI-ready', desc: 'Prepare with tools' },
  { id: 3, label: 'Report weekly', desc: 'Track progress' },
  { id: 4, label: 'Get certified', desc: 'Complete internship' },
];

export function JourneyCard({ activeStep = 1 }: { activeStep?: number }) {
  const [currentStep, setCurrentStep] = useState(activeStep);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--ink-2)]/35 backdrop-blur-sm">
      <h3 className="font-display font-semibold text-base text-[var(--text-hi)] mb-5">
        Your internship journey
      </h3>
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isActive = step.id === currentStep;
          const isDone = step.id < currentStep;
          return (
            <div key={step.id} className="flex items-start gap-3">
              <div className="relative flex-shrink-0 mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-[var(--emerald)]" />
                ) : isActive ? (
                  <div className="w-5 h-5 rounded-full border-2 border-[var(--violet-2)] flex items-center justify-center bg-[var(--violet-2)]/10">
                    <div className="w-2 h-2 rounded-full bg-[var(--violet-2)] animate-pulse" />
                  </div>
                ) : (
                  <Circle className="w-5 h-5 text-[var(--text-lo)]/40" />
                )}
                {idx < steps.length - 1 && (
                  <div className="absolute left-2.5 top-6 w-px h-5 bg-[var(--line)]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${
                    isActive || isDone
                      ? 'text-[var(--text-hi)]'
                      : 'text-[var(--text-lo)]'
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-[var(--text-lo)] mt-0.5">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
