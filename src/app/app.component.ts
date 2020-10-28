import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { APIService } from './API.service';

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
    private router: Router
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
    this.api.CreateMessage(input).then((val) => {
      console.log('Send Message Success =>', val);
      inputElement.value = '';
    });
  }

  listMessages(): void {
    this.api.MessagesByChannelId('2').then((val) => {
      console.log(val);
      this.messages = val.items;
    });
  }

  onCreateMessage(): void {
    this.api.OnCreateMessageListener.subscribe(
      {
        next: (val: any) => {
          console.log(val);
          this.messages.push(val.value.data.onCreateMessage);
        }
      }
    );
  }
}
