import { createSelector } from '@ngrx/store';

export const selectChatState = (state) => state;

export const selectMessages = createSelector(
  selectChatState,
  (state) => state.chat.messages
);
