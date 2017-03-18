import { Component, ViewChild } from '@angular/core';
import { NavController, Content, Events } from 'ionic-angular';

import { ReaderPage } from '../reader/reader'

import { BookService } from '../../app/service/book.service';
import { Book, Config, EventType, AccountInfo } from '../../app/model';
import { ConfigService } from '../../app/service/config.service';
import { AccountService } from '../../app/service/account.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;

  private hasLoaded: boolean = false;

  public configer: Config;
  public books: Book[] = [];
  public account: AccountInfo;

  constructor(
    private events: Events,
    private navCtrl: NavController,
    private bookService: BookService,
    private configService: ConfigService,
    private accountService: AccountService
  ) {
    this.configer = configService.get();

    this.events.subscribe(EventType.DB_READY.toString(), (time) => {
      console.log('homepage 处理数据加载完毕事件');

      this.accountService.CurrAccount().then((account) => {
        this.account = account;
      })

      this.bookService.SheetList().then((books) => {
        this.books = books;
      });
    });
  }

  ReadBook(book: Book) {
    this.navCtrl.push(ReaderPage, { book: book });
  }

  RefreshLocalInfo(refresher) {
    this.bookService.Refresh()
      .then(() => {
        refresher.complete();
      });
  }


  /**
   * 处理数据加载完成事件
   * @private
   * @param {any} time 
   * 
   * @memberOf HomePage
   */
  private DbReadyEventHandler(time) {
    console.log('homepage 处理数据加载完毕事件');
    this.bookService.SheetList().then((books) => {
      this.books = books;
    });
  }
}
