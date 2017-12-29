import { Injectable } from '@angular/core';
import * as ChatEngineCore from 'chat-engine';

/*
  Generated class for the ChatEngineProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/ 

@Injectable()
export class ChatEngineProvider {
  private SUB_KEY = 'sub-c-f0d6b2cc-ea76-11e7-9723-66707ad51ffc';
  private PUB_KEY = 'pub-c-3c88d9c6-ac22-4905-aab5-161ae5be516f';
  public Engine: any;
  public Me: any = {
    uuid:''
  };

  constructor() {
    console.log(ChatEngineCore);
    this.Engine = ChatEngineCore.create({
      publishKey: this.PUB_KEY,
      subscribeKey: this.SUB_KEY
    });
    this.Engine.connect(this.Name());
    this.Engine.on('$.ready', (data) =>{
      console.log('Connection to pubnub ready: ', data);
      this.Me = data.me;
    });   
  }

  private Name():string {
    let names = ['Fernando','Laura','Mauricio','Leonardo','Daniel', 'Ana', 'Gabriel','Carolina','Julieta','Roberto'];
    let rnd = Math.floor(Math.random()*10);
    return names[rnd];
  }

  public createChatRoom(name: string){
    return new Promise((res,rej) =>{
      this.Engine.on('$.ready', () => {
        let chat = this.Engine.Chat(name);
        chat.on('$.connected', () => res(chat));
        chat.on('$.error.*', (err) => rej(err));
      });
    })
  }
}
