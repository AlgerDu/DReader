import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { SQLiteDbService } from './service/sqlitedb.service';
import { AccountService } from './service/account.service';
import { WebsiteService } from './service/website.service';
import { BookshelfService } from './service/bookshelf.service';

import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ReaderPage } from '../pages/reader/reader';
import { AccountPage } from '../pages/account/account';
import { BookStorePage } from '../pages/book-store/book-store';
import { BookDetailPage } from '../pages/book-detail/book-detail';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ReaderPage,
    AccountPage,
    BookStorePage,
    BookDetailPage,
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
    BookStorePage,
    BookDetailPage,
    TabsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BookshelfService,
    SQLiteDbService,
    AccountService,
    WebsiteService
  ]
})
export class AppModule { }
