import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { HttpModule, JsonpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ReaderPage } from '../pages/reader/reader';
import { AccountPage } from '../pages/account/account';
import { TabsPage } from '../pages/tabs/tabs';

import { BookService } from './service/book.service';
import { SQLiteDbService } from './service/sqlitedb.service';
import { AccountService } from './service/account.service';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ReaderPage,
    AccountPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ReaderPage,
    AccountPage,
    TabsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BookService,
    SQLiteDbService,
    AccountService
  ]
})
export class AppModule { }
