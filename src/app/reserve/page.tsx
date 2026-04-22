// app/reserve/page.tsx
import dynamic from 'next/dynamic';

// Dynamically import the actual page component with SSR disabled
const ReservePageContent = dynamic(
  () => import('./ReservePageContent'),
  { ssr: false }
);

export default function ReservePage() {
  return <ReservePageContent />;
}