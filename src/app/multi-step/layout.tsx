import Header from '@/app/multi-step/header';

export default function MultiStepLayoutTwo({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#2b3d1d] to-[#A3A830] @container">
      <Header />
      {children}
    </div>
  );
}
