import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ReactiveFormsModule, FormsModule} from '@angular/forms'
import { MyApp } from './app.component';
// Pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ChatPage } from '../pages/chat/chat';
import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChatEngineProvider } from '../providers/chat-engine/chat-engine';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    ChatPage,
    HomePage,
    TabsPage,
    WelcomePage,
    LoginPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    ChatPage,
    HomePage,
    TabsPage,
    WelcomePage,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ChatEngineProvider
  ]
})
export class AppModule {}
