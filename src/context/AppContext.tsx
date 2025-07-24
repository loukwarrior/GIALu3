'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface Video {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  category: string;
  objective: string;
  videoUrl: string;
  thumbnail: string;
  tags: string[];
}

interface WatchedVideo extends Video {
  watchedAt: string;
  progress?: number;
}

interface AppState {
  favorites: Video[];
  watchedVideos: WatchedVideo[];
  currentVideo: Video | null;
  user: {
    name?: string;
    isAuthenticated: boolean;
  } | null;
}

type AppAction =
  | { type: 'ADD_FAVORITE'; payload: Video }
  | { type: 'REMOVE_FAVORITE'; payload: number }
  | { type: 'ADD_WATCHED'; payload: { video: Video; progress?: number } }
  | { type: 'SET_CURRENT_VIDEO'; payload: Video | null }
  | { type: 'SET_USER'; payload: AppState['user'] }
  | { type: 'LOAD_STATE'; payload: Partial<AppState> };

const initialState: AppState = {
  favorites: [],
  watchedVideos: [],
  currentVideo: null,
  user: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      if (state.favorites.some(fav => fav.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.id !== action.payload),
      };

    case 'ADD_WATCHED':
      const existingWatchedIndex = state.watchedVideos.findIndex(
        watched => watched.id === action.payload.video.id
      );
      
      const watchedVideo: WatchedVideo = {
        ...action.payload.video,
        watchedAt: new Date().toISOString(),
        progress: action.payload.progress || 0,
      };

      if (existingWatchedIndex >= 0) {
        const newWatchedVideos = [...state.watchedVideos];
        newWatchedVideos[existingWatchedIndex] = watchedVideo;
        return {
          ...state,
          watchedVideos: newWatchedVideos,
        };
      }

      return {
        ...state,
        watchedVideos: [watchedVideo, ...state.watchedVideos],
      };

    case 'SET_CURRENT_VIDEO':
      return {
        ...state,
        currentVideo: action.payload,
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };

    case 'LOAD_STATE':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  actions: {
    addFavorite: (video: Video) => void;
    removeFavorite: (videoId: number) => void;
    addWatchedVideo: (video: Video, progress?: number) => void;
    setCurrentVideo: (video: Video | null) => void;
    isFavorite: (videoId: number) => boolean;
    isWatched: (videoId: number) => boolean;
  };
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Persistir estado en localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('gia-app-state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  useEffect(() => {
    const stateToSave = {
      favorites: state.favorites,
      watchedVideos: state.watchedVideos,
    };
    localStorage.setItem('gia-app-state', JSON.stringify(stateToSave));
  }, [state.favorites, state.watchedVideos]);

  const actions = {
    addFavorite: (video: Video) => {
      dispatch({ type: 'ADD_FAVORITE', payload: video });
    },
    removeFavorite: (videoId: number) => {
      dispatch({ type: 'REMOVE_FAVORITE', payload: videoId });
    },
    addWatchedVideo: (video: Video, progress?: number) => {
      dispatch({ type: 'ADD_WATCHED', payload: { video, progress } });
    },
    setCurrentVideo: (video: Video | null) => {
      dispatch({ type: 'SET_CURRENT_VIDEO', payload: video });
    },
    isFavorite: (videoId: number) => {
      return state.favorites.some(fav => fav.id === videoId);
    },
    isWatched: (videoId: number) => {
      return state.watchedVideos.some(watched => watched.id === videoId);
    },
  };

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export type { Video, WatchedVideo, AppState }; 