import React from 'react';
import { format, parseISO, isValid } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { SavedLaunch } from '../../types';

interface SavedLaunchCardProps {
  launch: SavedLaunch;
  onRemove: (spaceXId: string) => void;
}

const SavedLaunchCard: React.FC<SavedLaunchCardProps> = ({ launch, onRemove }) => {
  const formatDate = (dateString: string): string => {
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, 'MMMM d, yyyy') : 'Invalid date';
    } catch {
      return 'Unknown date';
    }
  };

  const defaultImage = 'https://images.pexels.com/photos/23764/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600';

  return (
    <div className="bg-white dark:bg-space-light rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg transform hover:-translate-y-1">
      <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
        <img
          src={launch?.links?.patch?.large || launch?.links?.patch?.small || defaultImage}
          alt={`${launch.name} mission patch`}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultImage;
          }}
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {launch.flight_Number ? `Flight #${launch.flight_Number}` : 'Flight number not available'}
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {launch.name}
            </h3>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            {launch.date_Utc ? formatDate(launch.date_Utc) : 'Date not available'}
          </span>
        </div>
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
          {launch.details || 'No details available for this mission.'}
        </p>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => onRemove(launch.spaceXId)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedLaunchCard;
