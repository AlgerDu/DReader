import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ReaderPage } from '../pages/reader/reader';
import { AccountPage } from '../pages/account/account';
import { TabsPage } from '../pages/tabs/tabs';

import { BookService } from './service/book.service';
import { ConfigService } from './service/config.service';
import { SQLiteDbService } from './service/sqlitedb.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ReaderPage,
    AccountPage,
    TabsPage
  ],
  imports: [
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
    ConfigService,
    SQLiteDbService
  ]
})
export class AppModule { }
