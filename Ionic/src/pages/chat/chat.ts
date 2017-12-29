import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatEngineProvider } from '../../providers/chat-engine/chat-engine';
import { FormControl } from '@angular/forms';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  public ChatRoomName = 'Familia';
  public history: any[] = [];
  public message: string;
  public chat: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public chatProvider: ChatEngineProvider) 
    {
      // Connect to the Room
      this.chatProvider.createChatRoom(this.ChatRoomName)
      .then(chatRoom => {
        console.log('Connected to the Room', this.chat);
        // Save Room Instance
        this.chat = chatRoom;

        // Retrieve room's history
        this.chat.search({
          reverse:true,
          event: 'message',          
        }).on('message', message => this.history.push(message));

        //Subscribe to receive new messages
        this.chat.on('message', (message) => {
          console.log('new message: ', message);
          this.history.push(message);
        });
      })
      .catch(err => console.error('Error al conectar a la sala', err));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  send(){
    this.chat.emit('message',{
      text: this.message,
      time: new Date()
    });
    this.message = '';
  }
}
