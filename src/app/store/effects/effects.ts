import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import * as chatActions from '../actions/actions';
import { from } from 'rxjs';
import { APIService } from '../../API.service';

@Injectable()
export class ChatEffects {

  constructor(
    private actions$: Actions,
    private api: APIService,
  ) { }

  /** Load the List of Messages */
  loadMessages$ = createEffect(() => this.actions$.pipe(
    ofType(chatActions.loadMessages),
    switchMap(({ channelId }) => {
      return from(this.api.MessagesByChannelId(channelId)).pipe(
        map((res: any) => {
          return chatActions.loadMessagesSuccess({ messages: res.items });
        }),
      );
    })
  ));

  /** Send message and call no actions */
  sendMessage$ = createEffect(() => this.actions$.pipe(
    ofType(chatActions.sendMessage),
    switchMap(({ message }) => {
      return from(this.api.CreateMessage(message));
    })
  ), { dispatch: false });
}
