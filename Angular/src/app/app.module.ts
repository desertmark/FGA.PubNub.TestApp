import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// libs
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PubNubAngular } from 'pubnub-angular2';
// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ChatViewComponent } from './views/chat-view/chat-view.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChatViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [PubNubAngular],
  bootstrap: [AppComponent]
})
export class AppModule { }
