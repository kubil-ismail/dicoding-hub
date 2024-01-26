/**
 * Test scenarios for auth reducer
 *
 * - authReducer function
 *  - should return the initial state when given an unknown action
 *  - should set the profile when given the setProfile action
 * -  should return the initial state when given initial payload
 *  - should update the users list with received user data when fetchUserList is fulfilled
 */

import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect } from 'vitest';
import authReducer, { setProfile, fetchUserList } from '../../states/auth';

describe('authReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const initialState = {
      profile: null,
      users: [],
    };

    // Act
    const nextState = authReducer(initialState, { type: 'UNKNOWN_ACTION' });

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should set the profile when given the setProfile action', () => {
    // Arrange
    const initialState = {
      profile: null,
      users: [],
    };
    const profileData = { name: 'John Doe', email: 'john@example.com' };

    // Act
    const nextState = authReducer(initialState, setProfile(profileData));

    // Assert
    expect(nextState).toEqual({
      profile: profileData,
      users: [],
    });
  });

  it('should return the initial state when given initial payload', () => {
    // Arrange
    const initialState = {
      profile: { name: 'John Doe', email: 'john@example.com' },
      users: [],
    };

    // Act
    const nextState = authReducer(initialState, setProfile(null));

    // Assert
    expect(nextState).toEqual({
      profile: null,
      users: [],
    });
  });

  it('should update the users list with received user data when fetchUserList is fulfilled', async () => {
    // Arrange
    const initialState = {
      profile: null,
      users: [],
    };

    const store = configureStore({
      reducer: authReducer,
      preloadedState: initialState,
    });

    // Act
    await store.dispatch(fetchUserList());

    // Assert
    const nextState = store.getState();
    
    expect(nextState.users).toBeDefined();
    expect(nextState.users.length).toBeGreaterThan(1);
  });
});
