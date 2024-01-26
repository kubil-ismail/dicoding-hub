/**
 * Test scenarios ThreadListItem Component
 *
 * - ThreadListItem Component
 *  - should render thread with valid data
 *  - should render thread with unknown data
 */

import { describe, expect, test, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import ThreadListItem from '../../components/ThreadListItem';
import { store, persistor } from '../../store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('ThreadListItem Component', () => {
  afterEach(() => {
    cleanup();
  });

  test('should render thread with valid data', () => {
    // Arrange
    const validThread = {
      id: 'thread-Np47p4jhUXYhrhRn',
      title: 'Bagaimana pengalamanmu belajar Redux?',
      body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
      category: 'redux',
      createdAt: '2023-05-29T07:55:52.266Z',
      ownerId: 'user-mQhLzINW_w5TxxYf',
      totalComments: 0,
      upVotesBy: [],
      downVotesBy: [],
    };

    render(
      <Provider store={store} serverState={store}>
        <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
          <BrowserRouter>
            <ThreadListItem item={validThread} />
          </BrowserRouter>
        </PersistGate>
      </Provider>,
    );

    // Assert
    expect(screen.getByText(validThread.title)).toBeDefined();
    expect(screen.getByText(validThread.body)).toBeDefined();
    expect(screen.getByText(validThread.category)).toBeDefined();
    expect(
      screen.getByText(`${validThread.totalComments} Comments`),
    ).toBeDefined();
  });

  test('should render thread with unknown data', () => {
    // Arrange
    render(
      <Provider store={store} serverState={store}>
        <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
          <BrowserRouter>
            <ThreadListItem item={{}} />
          </BrowserRouter>
        </PersistGate>
      </Provider>,
    );

    // Assert
    expect(screen.getByText('Title not found')).toBeDefined();
    expect(screen.getByText('Content not found')).toBeDefined();
    expect(screen.getByText('uncategorized')).toBeDefined();
    expect(screen.getByText(`0 Comments`)).toBeDefined();
  });
});
