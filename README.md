# SpaceX Launches

A full-stack MERN application that displays and allows users to save their favorite SpaceX launches. Built with React, Express, MongoDB, and Node.js.

![SpaceX Launches App](https://images.pexels.com/photos/23764/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200)

## Features

- View the 30 most recent SpaceX launches
- Save favorite launches to your collection
- Responsive design that works on desktop and mobile
- Dark mode support
- Real-time updates using Redux for state management

## Tech Stack

- **Frontend:**
  - React 18
  - Redux Toolkit
  - TypeScript
  - Tailwind CSS
  - Lucide React Icons
  - React Router DOM

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - CORS
  - ASP.NET

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB installed locally or a MongoDB Atlas account
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd spacex-launches-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   ```

4. Start the development server:
   ```bash
   # Run frontend and backend concurrently
   npm run dev:full

   # Or run them separately
   npm run dev     # Frontend
   npm run server  # Backend
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## API Endpoints

- `GET /api/launches` - Get all saved launches
- `POST /api/launches` - Save a new launch
- `DELETE /api/launches/:id` - Delete a saved launch

## Project Structure

```
spacex-launches-app/
├── src/                    # Frontend source files
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── store/             # Redux store and slices
│   ├── types/             # TypeScript types
│   └── hooks/             # Custom React hooks
└── public/                # Static files
```

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [SpaceX API](https://github.com/r-spacex/SpaceX-API) for providing launch data
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Lucide](https://lucide.dev/) for the beautiful icons
