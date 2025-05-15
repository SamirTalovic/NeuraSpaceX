import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { LaunchesState, SavedLaunch, SpaceXLaunch } from '../../types';

const BASE_URL = 'https://localhost:7181/api';
const SPACEX_API = 'https://api.spacexdata.com/v4/launches/query';

// Fetch SpaceX launches
export const fetchSpaceXLaunches = createAsyncThunk(
  'launches/fetchSpaceXLaunches',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(SPACEX_API, {
        query: {},
        options: {
          limit: 30,
          sort: {
            date_utc: 'desc',
          },
          select: ['id', 'flight_number', 'name', 'date_utc', 'links', 'details'],
        },
      });
      return response.data.docs as SpaceXLaunch[];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch SpaceX launches');
    }
  }
);

// Fetch saved launches
export const fetchSavedLaunches = createAsyncThunk(
  'launches/fetchSavedLaunches',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/Launch`);
      return response.data as SavedLaunch[];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch saved launches');
    }
  }
);

export const saveLaunch = createAsyncThunk(
  'launches/saveLaunch',
  async (launch: SpaceXLaunch, { rejectWithValue }) => {
    try {
      const savedLaunch: Omit<SavedLaunch, '_id'> & { id: string }  = {
        id: launch.id,
        spaceXId: launch.id,
        flight_Number: launch.flight_number,
        name: launch.name,
        date_Utc: launch.date_utc,
        links: {
          patch: {
            small: launch.links?.patch?.small || '',
            large: launch.links?.patch?.large || '',
          },
        },
        details: launch.details || 'No details available.',
      };

      const response = await axios.post(`${BASE_URL}/Launch`, savedLaunch);
      return response.data as SavedLaunch;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to save launch');
    }
  }
);


export const removeLaunch = createAsyncThunk(
  'launches/removeLaunch',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/Launch/${id}`);
      return id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to remove launch');
    }
  }
);

const initialState: LaunchesState = {
  spaceXLaunches: [],
  savedLaunches: [],
  status: 'idle',
  error: null,
};

const launchesSlice = createSlice({
  name: 'launches',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpaceXLaunches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchSpaceXLaunches.fulfilled,
        (state, action: PayloadAction<SpaceXLaunch[]>) => {
          state.status = 'succeeded';
          state.spaceXLaunches = action.payload;
        }
      )
      .addCase(fetchSpaceXLaunches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Fetch Saved Launches
      .addCase(fetchSavedLaunches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchSavedLaunches.fulfilled,
        (state, action: PayloadAction<SavedLaunch[]>) => {
          state.status = 'succeeded';
          state.savedLaunches = action.payload;
        }
      )
      .addCase(fetchSavedLaunches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Save Launch
      .addCase(saveLaunch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        saveLaunch.fulfilled,
        (state, action: PayloadAction<SavedLaunch>) => {
          state.status = 'succeeded';
          state.savedLaunches.push(action.payload);
        }
      )
      .addCase(saveLaunch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Remove Launch
      .addCase(removeLaunch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeLaunch.fulfilled, (state, action: PayloadAction<string>) => {
  state.savedLaunches = state.savedLaunches.filter(
    (launch) => launch.spaceXId !== action.payload
  );
  state.status = 'succeeded'
})
      .addCase(removeLaunch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = launchesSlice.actions;
export default launchesSlice.reducer;