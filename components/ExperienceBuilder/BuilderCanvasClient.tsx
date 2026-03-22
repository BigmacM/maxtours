'use client';

import dynamic from 'next/dynamic';

const BuilderCanvas = dynamic(() => import('./BuilderCanvas'), {
  loading: () => (
    <div className="h-96 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-gold/40 border-t-gold animate-spin" />
    </div>
  ),
  ssr: false,
});

export default function BuilderCanvasClient() {
  return <BuilderCanvas />;
}
