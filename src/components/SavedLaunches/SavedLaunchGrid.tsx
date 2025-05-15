import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  fetchSavedLaunches,
  removeLaunch,
  clearError,
} from '../../store/slices/launchesSlice';
import SavedLaunchCard from './SavedLaunchCard';
import LoadingIndicator from '../LoadingIndicator';
import ErrorMessage from '../ErrorMessage';
import { Database } from 'lucide-react';

const SavedLaunchGrid: React.FC = () => {
  const dispatch = useAppDispatch();
  const { savedLaunches , status, error } = useAppSelector((state) => state.launches);

  const [sortBy, setSortBy] = useState<'flightAsc' | 'flightDesc' | 'dateAsc' | 'dateDesc'>('dateDesc');

  useEffect(() => {
    dispatch(fetchSavedLaunches());
  }, [dispatch]);

  const handleRemove = (id: string) => {
    if (id) {
      dispatch(removeLaunch(id));
    }
  };

  const handleDismissError = () => {
    dispatch(clearError());
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as any);
  };

  const sortedLaunches = [...savedLaunches].sort((a, b) => {
    switch (sortBy) {
      case 'flightAsc':
        return (a.flight_Number || 0) - (b.flight_Number || 0);
      case 'flightDesc':
        return (b.flight_Number || 0) - (a.flight_Number || 0);
      case 'dateAsc':
        return new Date(a.date_Utc).getTime() - new Date(b.date_Utc).getTime();
      case 'dateDesc':
        return new Date(b.date_Utc).getTime() - new Date(a.date_Utc).getTime();
      default:
        return 0;
    }
  });

  if (status === 'loading' && savedLaunches.length === 0) {
    return (
      <div className="bg-white dark:bg-space-light rounded-lg shadow p-6 my-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Your Saved Launches
        </h2>
        <div className="flex justify-center items-center h-64">
          <LoadingIndicator size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-space-light rounded-lg shadow p-6 my-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Your Saved Launches
        </h2>

        <select
          value={sortBy}
          onChange={handleSortChange}
          className="px-3 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white"
        >
          <option value="dateDesc">Date ↓</option>
          <option value="dateAsc">Date ↑</option>
          <option value="flightDesc">Flight Number ↓</option>
          <option value="flightAsc">Flight Number ↑</option>
        </select>
      </div>

      {error && <ErrorMessage message={error} onDismiss={handleDismissError} />}

      {status === 'loading' && savedLaunches.length > 0 && (
        <div className="my-4">
          <LoadingIndicator />
        </div>
      )}

      {savedLaunches.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Database className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            No saved launches yet
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Head over to the Latest Launches page to save some SpaceX missions.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedLaunches.map((launch) => (
            <SavedLaunchCard
              key={launch.spaceXId}
              launch={launch}
              onRemove={() => handleRemove(launch.spaceXId || '')}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedLaunchGrid;
