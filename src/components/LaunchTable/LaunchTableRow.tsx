import React from 'react';
import { format } from 'date-fns';
import { Check, Save } from 'lucide-react';
import { SpaceXLaunch } from '../../types';

interface LaunchTableRowProps {
  launch: SpaceXLaunch;
  onSave: () => void;
  isSaved: boolean;
}

const LaunchTableRow: React.FC<LaunchTableRowProps> = ({
  launch,
  onSave,
  isSaved,
}) => {
  const formatDate = (dateString: string): string => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return 'Unknown date';
    }
  };

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
        {launch.flight_number}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
        {launch.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
        {formatDate(launch.date_utc)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {isSaved ? (
          <span className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <Check className="h-4 w-4 mr-1" />
            Saved
          </span>
        ) : (
          <button
            onClick={onSave}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-space-accent hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
          >
            <Save className="h-4 w-4 mr-1" />
            Save
          </button>
        )}
      </td>
    </tr>
  );
};

export default LaunchTableRow;