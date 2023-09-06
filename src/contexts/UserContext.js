import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Initial State
const initialState = {
  userData: {
    resources: {
      wood: { amount: 0, type: 'raw' },
      stone: { amount: 0, type: 'raw' },
      // ... other resources
    },
    currency: 0,
    factories: [],
    // ... other attributes
  },
  isLoading: false,
  error: null,
};

// Actions
const LOAD_USER_DATA = 'LOAD_USER_DATA';
const SET_USER_DATA = 'SET_USER_DATA';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';
const GATHER_RESOURCE = 'GATHER_RESOURCE';  // New Action

// Reducer
function userReducer(state, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, userData: action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case GATHER_RESOURCE:
      const resource = action.payload;
      if (!state.userData.resources[resource]) {
        console.error(`Resource "${resource}" not found.`);
        return state;
      }
      const updatedResource = {
        ...state.userData.resources[resource],
        amount: state.userData.resources[resource].amount + 1
      };
      return {
        ...state,
        userData: {
          ...state.userData,
          resources: {
            ...state.userData.resources,
            [resource]: updatedResource
          }
        }
      };
    default:
      return state;
  }
}

// Create Context
const UserContext = createContext();

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Load user data
  const loadUserData = useCallback(async (userId) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });

      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();

      dispatch({ type: SET_USER_DATA, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  }, []);

  // Gather resource action
  const gatherResource = (resource) => {
    dispatch({ type: GATHER_RESOURCE, payload: resource });
  }

  const value = {
    state,
    loadUserData,
    gatherResource,   // Exporting the gatherResource function
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Custom hook for easier consumption
function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export { UserProvider, useUser, UserContext };
