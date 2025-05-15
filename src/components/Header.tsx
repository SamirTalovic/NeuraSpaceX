import React from 'react';
import { NavLink } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-space-dark shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <Rocket className="h-8 w-8 text-space-accent mr-2" />
          <h1 className="text-2xl font-bold text-white">SpaceX Launches</h1>
        </div>
        <nav className="flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg transition-colors ${
                isActive
                  ? 'text-space-accent font-medium'
                  : 'text-gray-300 hover:text-white'
              }`
            }
          >
            Latest Launches
          </NavLink>
          <NavLink
            to="/saved"
            className={({ isActive }) =>
              `text-lg transition-colors ${
                isActive
                  ? 'text-space-accent font-medium'
                  : 'text-gray-300 hover:text-white'
              }`
            }
          >
            Saved Launches
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;