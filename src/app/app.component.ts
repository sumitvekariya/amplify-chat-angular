import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { delay } from 'rxjs/operators';
import { APIService } from './API.service';
import { addMessageToList, loadMessages, sendMessage } from './store/actions/actions';
import { IChatState } from './store/reducers/reducer';
import { selectMessages } from './store/selectors/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'amplify-chat-angular';
  username: string;
  messages = [];

  constructor(
    private api: APIService,
    private router: Router,
    private store: Store<IChatState>
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((events: RouterEvent) => {
      if (events instanceof NavigationEnd) {
        const qParams = this.router.routerState.snapshot.root.queryParams;
        if (qParams && qParams.user) {
          this.username = qParams.user;
        } else {
          this.router.navigate(['/'], { queryParams: { user: 'Dave' } });
        }
      }
    });

    this.listMessages();
    this.onCreateMessage();
  }

  send(event, inputElement: HTMLInputElement): void {
    event.preventDefault();
    event.stopPropagation();
    const input = {
      channelID: '2',
      author: this.username.trim(),
      body: inputElement.value.trim()
    };

    this.store.dispatch(sendMessage({ message: input }));
    inputElement.value = '';
  }

  listMessages(): void {
    this.store.dispatch(loadMessages({ channelId: '2' }));
    this.store.pipe(
      select(selectMessages),
      delay(10)
    ).subscribe((messages) => {
      console.log(messages);
      this.messages = messages;
    });
  }

  onCreateMessage(): void {
    this.api.OnCreateMessageListener.subscribe(
      {
        next: (val: any) => {
          console.log(val);
          this.store.dispatch(addMessageToList({ message: val.value.data.onCreateMessage }));
        }
      }
    );
  }
}
