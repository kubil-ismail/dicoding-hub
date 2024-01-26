/**
 * Test scenarios CommentListItem Component
 *
 * - CommentListItem Component
 *  - should render comment with valid data
 *  - should render comment with unknown data
 */

import { describe, expect, test, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import CommentListItem from '../../components/CommentListItem';
import { store, persistor } from '../../store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('CommentListItem Component', () => {
  afterEach(() => {
    cleanup();
  });

  test('should render comment with valid data', () => {
    // Arrange
    const validComment = {
      id: 'comment-XhqYiuyhZm1mWHqn',
      content: 'Halo! Perkanalkan, nama saya Dimas.',
      createdAt: '2023-05-29T07:59:04.689Z',
      owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        avatar:
          'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
      },
      upVotesBy: [],
      downVotesBy: [],
    };

    render(
      <Provider store={store} serverState={store}>
        <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
          <BrowserRouter>
            <CommentListItem item={validComment} />
          </BrowserRouter>
        </PersistGate>
      </Provider>,
    );

    // Assert
    expect(screen.getByText(validComment.owner.name)).toBeDefined();
    expect(screen.getByText(validComment.content)).toBeDefined();
  });

  test('should render comment with unknown data', () => {
    // Arrange
    render(
      <Provider store={store} serverState={store}>
        <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
          <BrowserRouter>
            <CommentListItem item={{}} />
          </BrowserRouter>
        </PersistGate>
      </Provider>,
    );

    // Assert
    expect(screen.getByText('Name not found')).toBeDefined();
    expect(screen.getByText('Comment not found')).toBeDefined();
  });
});
