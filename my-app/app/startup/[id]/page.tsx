import React from 'react';
import Header from '@/components/Header';
import StartupDetail from '@/components/StartupDetail';

interface StartupPageProps {
  params: {
    id: string;
  };
}

const StartupPage = async ({ params }: StartupPageProps) => {
    const {id} = await params
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <StartupDetail startupId={id} />
    </div>
  );
};

export default StartupPage;
