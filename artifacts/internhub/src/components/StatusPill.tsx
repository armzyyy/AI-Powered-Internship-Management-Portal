type StatusVariant =
  | 'accepted'
  | 'in-progress'
  | 'interview'
  | 'rejected'
  | 'review'
  | 'pending'
  | 'open'
  | 'closed'
  | 'reviewed';

const variantStyles: Record<StatusVariant, string> = {
  accepted: 'bg-[#5eead4]/10 text-[#5eead4] border-[#5eead4]/20',
  'in-progress': 'bg-[#5eead4]/10 text-[#5eead4] border-[#5eead4]/20',
  interview: 'bg-[#9d4edd]/10 text-[#9d4edd] border-[#9d4edd]/20',
  rejected: 'bg-[#fca5a5]/10 text-[#fca5a5] border-[#fca5a5]/20',
  review: 'bg-[#c77dff]/10 text-[#c77dff] border-[#c77dff]/20',
  pending: 'bg-[#c77dff]/10 text-[#c77dff] border-[#c77dff]/20',
  open: 'bg-[#5eead4]/10 text-[#5eead4] border-[#5eead4]/20',
  closed: 'bg-[#fca5a5]/10 text-[#fca5a5] border-[#fca5a5]/20',
  reviewed: 'bg-[#5eead4]/10 text-[#5eead4] border-[#5eead4]/20',
};

export function StatusPill({
  status,
  children,
}: {
  status: StatusVariant;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[status]}`}
    >
      {children}
    </span>
  );
}
