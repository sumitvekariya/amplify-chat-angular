import { createAction, props } from '@ngrx/store';

export const loadMessages = createAction('[Chat] Load Messages', props<{ channelId: string }>());
export const loadMessagesSuccess = createAction('[Chat] Load Messages Success', props<{ messages: any[] }>());

export const sendMessage = createAction('[Chat] Send Message', props<{ message }>());
export const addMessageToList = createAction('[Chat] Add Message To List', props<{ message }>());

