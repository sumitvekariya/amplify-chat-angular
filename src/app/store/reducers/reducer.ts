import { Action, createReducer, on } from '@ngrx/store';
import * as chatActions from '../actions/actions';

export interface IChatState {
  messages: any[];
}

/** Initial State */
export const initialState: IChatState = {
  messages: [],
};

export function chatReducer(state: IChatState | undefined, action: Action): IChatState {
  return reducer(state, action);
}

const reducer = createReducer<IChatState>(
  initialState,

  /** Loaded Messafes */
  on(chatActions.loadMessagesSuccess, (state, { messages }) => ({
    ...state,
    messages
  })),

  /** Add message to the messages array */
  on(chatActions.addMessageToList, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message]
  })),
);
