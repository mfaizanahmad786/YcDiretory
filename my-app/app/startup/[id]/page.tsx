import React from 'react';
import Header from '@/components/Header';
import StartupDetail from '@/components/StartupDetail';

interface StartupPageProps {
  params: {
    id: string;
  };
}

const StartupPage = ({ params }: StartupPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <StartupDetail startupId={params.id} />
    </div>
  );
};

export default StartupPage;
