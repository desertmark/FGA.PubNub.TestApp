import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {
  @ViewChild('msg') $msg: ElementRef;
  public messages: any[] = [];
  public message: string;
  private Names = ['Fernando', 'Gabriel', 'Laura', 'Ana', 'Daniel'];
  private rnd = Math.floor((Math.random() * 5) + 1);
  public Name: string;
  constructor(public pubnub: PubNubAngular, private renderer: Renderer2) {
    this.Name = this.Names[this.rnd - 1];
    pubnub.init({
        publishKey: 'pub-c-6af48f3a-0a84-499f-bd60-cf52343176c0',
        subscribeKey: 'sub-c-d7494b5c-e711-11e7-ab5b-be68b02b0975'
    });
  }

  ngOnInit() {
    this.pubnub.subscribe({
      channels: ['my_channel'],
      triggerEvents: ['message'],
      autoload: true
    });
    this.pubnub.history({
      channel: 'my_channel',
    },
    (status, response) => {
        console.log(response);
        this.messages = response.messages.map(x => {
          return {
            message: x.entry
          };
        });
    });
    this.messages.concat(this.pubnub.getMessage('my_channel'));
  }

  send() {
    console.log(this.message);
    this.pubnub.publish(
      {
          message: {name: this.Name, text: this.message, time: new Date()},
          channel: 'my_channel',
          storeInHistory: true
      },
      (status, response) => {
          if (status.error) {
              console.log(status);
          } else {
              console.log('message Published w/ timetoken', response.timetoken);
          }
      }
  );
  this.message = '';
  }

}
