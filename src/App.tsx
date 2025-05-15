import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Header';
import LaunchesPage from './pages/LaunchesPage';
import SavedLaunchesPage from './pages/SavedLaunchesPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100 dark:bg-space-dark">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<LaunchesPage />} />
              <Route path="/saved" element={<SavedLaunchesPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;