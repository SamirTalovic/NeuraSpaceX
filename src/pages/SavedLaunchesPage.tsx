import React from 'react';
import SavedLaunchGrid from '../components/SavedLaunches/SavedLaunchGrid';

const SavedLaunchesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <SavedLaunchGrid />
    </div>
  );
};

export default SavedLaunchesPage;