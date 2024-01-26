/**
 * Test scenarios for thread reducer
 *
 * - threadReducer function
 *  - should return the initial state when given an unknown action
 *  - should set the thread when given the setSelectedThread action
 * -  should return the initial state when given initial payload
 *  - should update the thread list with received list data when fetchThreadList is fulfilled
 *  - should update the thread selected with received selected data when fetchThreadDetail is fulfilled
 */

import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect } from 'vitest';
import threadReducer, {
  setSelectedThread,
  fetchThreadList,
  fetchThreadDetail,
} from '../../states/thread';

describe('threadReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const initialState = {
      selected: null,
      list: null,
      isLoading: false,
    };

    // Act
    const nextState = threadReducer(initialState, { type: 'UNKNOWN_ACTION' });

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should set the thread when given the setSelectedThread action', () => {
    // Arrange
    const initialState = {
      selected: null,
      list: null,
      isLoading: false,
    };

    const selectedThread = {
      id: 'thread-Np47p4jhUXYhrhRn',
      title: 'Bagaimana pengalamanmu belajar Redux?',
      body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
      createdAt: '2023-05-29T07:55:52.266Z',
      owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        avatar:
          'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
      },
      category: 'redux',
      comments: [],
      upVotesBy: [],
      downVotesBy: [],
    };

    // Act
    const nextState = threadReducer(
      initialState,
      setSelectedThread(selectedThread),
    );

    // Assert
    expect(nextState).toEqual({
      selected: selectedThread,
      list: null,
      isLoading: false,
    });
  });

  it('should return the initial state when given initial payload', () => {
    // Arrange
    const initialState = {
      selected: null,
      list: null,
      isLoading: false,
    };

    // Act
    const nextState = threadReducer(initialState, setSelectedThread(null));

    // Assert
    expect(nextState).toEqual({
      selected: null,
      list: null,
      isLoading: false,
    });
  });

  it('should update the thread list with received list data when fetchThreadList is fulfilled', async () => {
    // Arrange
    const initialState = {
      selected: null,
      list: null,
      isLoading: false,
    };

    const store = configureStore({
      reducer: threadReducer,
      preloadedState: initialState,
    });

    // Act
    expect(store.getState()).toBe(initialState);
    const request = await store.dispatch(fetchThreadList());

    // Assert
    const nextState = store.getState();

    expect(nextState.list).toBeDefined();
    expect(nextState.list.length).toBeGreaterThan(1);
    expect(store.getState()).toStrictEqual({
      selected: null,
      list: request.payload,
      isLoading: false,
    });
  });

  it('should update the thread list with received list data when fetchThreadList is fulfilled', async () => {
    // Arrange
    const initialState = {
      selected: null,
      list: null,
      isLoading: false,
    };

    const store = configureStore({
      reducer: threadReducer,
      preloadedState: initialState,
    });

    // Act
    expect(store.getState()).toBe(initialState);
    const request = await store.dispatch(
      fetchThreadDetail('thread-Np47p4jhUXYhrhRn'),
    );

    // Assert
    const nextState = store.getState();
    const selected = nextState.selected;

    expect(selected).toBeDefined();
    expect(selected.id).toBe('thread-Np47p4jhUXYhrhRn');
    expect(store.getState()).toStrictEqual({
      selected: request.payload,
      list: null,
      isLoading: false,
    });
  });
});
