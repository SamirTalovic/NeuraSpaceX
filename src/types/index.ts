// SpaceX Launch Types
export interface SpaceXLaunch {
  id: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  success?: boolean;
  links: {
    patch: {
      small?: string;
      large?: string;
    };
    webcast?: string;
    article?: string;
    wikipedia?: string;
  };
  details?: string;
}

// Saved Launch Types (for MongoDB)
export interface SavedLaunch {
  _id?: string;
  spaceXId: string;
  flight_Number: number;
  name: string;
  date_Utc: string;
  links: {
    patch: {
      small?: string;
      large?: string;
    };
  };
  details?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

// Redux State Types
export interface LaunchesState {
  spaceXLaunches: SpaceXLaunch[];
  savedLaunches: SavedLaunch[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}