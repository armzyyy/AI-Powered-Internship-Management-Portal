import { GraduationCap } from 'lucide-react';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="w-[30px] h-[30px] rounded-lg bg-gradient-to-br from-[#7b2cbf] to-[#9d4edd] flex items-center justify-center">
        <GraduationCap className="w-4 h-4 text-white" strokeWidth={2.5} />
      </div>
      <span className="font-display font-bold text-lg text-[var(--text-hi)]">
        InternHub
      </span>
    </div>
  );
}
