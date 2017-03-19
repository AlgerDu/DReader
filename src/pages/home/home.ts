import { Component, ViewChild } from '@angular/core';
import { NavController, Content, Events, LoadingController } from 'ionic-angular';

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

  public books: Book[] = [];
  public account: AccountInfo;

  constructor(
    private events: Events,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private bookService: BookService,
    private accountService: AccountService
  ) {

    this.events.subscribe(EventType.DB_READY.toString(), (time) => {
      console.log('homepage 处理数据加载完毕事件');

      this.accountService.CurrAccount().then((account) => {
        this.account = account;

        this.bookService.SheetList().then((books) => {
          this.books = books;

          if (this.books.length > 0 && this.account.config.autoUpdateBookInfo) {
            console.log('自动获取小说更新信息');
            let load = this.loadingCtrl.create({
              content: '正在刷新...',
              dismissOnPageChange: true,
            });
            load.present();
            this.UpdateBookInfo().then(() => {
              load.dismiss();
            }).catch(() => {
              load.dismiss();
            });
          }
        });
      });
    });
  }

  ReadBook(book: Book) {
    this.navCtrl.push(ReaderPage, { book: book });
  }

  /**
   * 获取服务器书籍更新信息
   * @private
   * @returns {Promise<any>} 
   * 
   * @memberOf HomePage
   */
  private UpdateBookInfo(): Promise<any> {
    return this.bookService.Refresh();
  }

  private RefreshBookInfo(refresher) {
    console.log('下拉刷新启动');
    this.UpdateBookInfo().then(() => {
      refresher.complete();
    }).catch(() => {
      refresher.complete();
    })
  }
}
