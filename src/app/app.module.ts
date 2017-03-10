import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ReaderPage } from '../pages/reader/reader';
import { TabsPage } from '../pages/tabs/tabs';

import { BookService } from './service/book.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ReaderPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ReaderPage,
    TabsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BookService
  ]
})
export class AppModule { }
