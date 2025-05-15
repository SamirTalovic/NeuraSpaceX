import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchSpaceXLaunches, saveLaunch } from '../../store/slices/launchesSlice';
import { SpaceXLaunch } from '../../types';
import LoadingIndicator from '../LoadingIndicator';
import ErrorMessage from '../ErrorMessage';
import LaunchTableRow from './LaunchTableRow';
import TableHeader from './TableHeader';

const LaunchTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { spaceXLaunches, savedLaunches, status, error } = useAppSelector((state) => state.launches);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSpaceXLaunches());
    }
  }, [status, dispatch]);

  const handleSave = (launch: SpaceXLaunch) => {
    dispatch(saveLaunch(launch));
  };

  const isLaunchSaved = (id: string): boolean => {
    return savedLaunches.some((savedLaunch) => savedLaunch.spaceXId === id);
  };

  const filteredLaunches = spaceXLaunches.filter((launch) => {
    const search = filter.toLowerCase();
    return (
      launch.name.toLowerCase().includes(search) ||
      launch.flight_number.toString().includes(search) ||
      launch.date_utc.toLowerCase().includes(search)
    );
  });

  if (status === 'loading' && spaceXLaunches.length === 0) {
    return (
      <div className="bg-white dark:bg-space-light rounded-lg shadow p-6 my-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Latest SpaceX Launches
        </h2>
        <div className="flex justify-center items-center h-64">
          <LoadingIndicator size="large" />
        </div>
      </div>
    );
  }

  if (status === 'failed' && error) {
    return (
      <div className="bg-white dark:bg-space-light rounded-lg shadow p-6 my-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Latest SpaceX Launches
        </h2>
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-space-light rounded-lg shadow my-6 overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Latest SpaceX Launches
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Showing the 30 most recent SpaceX launches. Click "Save" to add a launch to your collection.
        </p>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by name, flight number or date"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-900 dark:text-white dark:border-gray-700"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <TableHeader />
          <tbody className="bg-white dark:bg-space-light divide-y divide-gray-200 dark:divide-gray-700">
            {filteredLaunches.map((launch) => (
              <LaunchTableRow
                key={launch.id}
                launch={launch}
                onSave={() => handleSave(launch)}
                isSaved={isLaunchSaved(launch.id)}
              />
            ))}
            {filteredLaunches.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {status === 'loading' && spaceXLaunches.length > 0 && (
        <div className="p-4 bg-gray-50 dark:bg-space-dark border-t dark:border-gray-700">
          <LoadingIndicator size="small" />
        </div>
      )}
    </div>
  );
};

export default LaunchTable;
