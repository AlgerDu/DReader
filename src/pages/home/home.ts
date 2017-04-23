import { Component, ViewChild } from '@angular/core';
import { NavController, Content, Events, LoadingController } from 'ionic-angular';

import { ReaderPage } from '../reader/reader'

import { Book, Config, EventType, AccountInfo } from '../../app/model';
import { AccountService } from '../../app/service/account.service';
import { BookshelfService } from '../../app/service/bookshelf.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;

  private hasAutoUpdateBookInfo: boolean = false;

  public books: Book[] = [];
  public account: AccountInfo;

  constructor(
    private events: Events,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private bookshelfService: BookshelfService,
    private accountService: AccountService
  ) {
    this.SubscribeAccountLoadendEvent();
  }

  public ReadBook(book: Book) {
    this.navCtrl.push(ReaderPage, { book: book });
  }

  /**获取上次更新到这次现在，书架中书籍的更新信息*/
  private RefreshBookInfo(): Promise<void> {
    return this.bookshelfService.Refresh();
  }

  ionViewDidEnter() {
  }

  /**下来刷新*/
  private PullDownRefresh(refresher) {

    console.log('下拉刷新启动');
    this.RefreshBookInfo().then(() => {
      refresher.complete();
    }).catch(() => {
      refresher.complete();
    });
  }

  /**订阅并且处理 Account_Loadend 事件*/
  private SubscribeAccountLoadendEvent() {

    this.events.subscribe(EventType.Account_Loadend.toString(), (time) => {
      console.log('homepage 处理 Account_Loadend 事件');

      this.account = this.accountService.CurrAccount();

      this.bookshelfService.BookList()
        .then((books) => {
          this.books = books;

          if (this.books.length > 0
            && !this.hasAutoUpdateBookInfo
            && this.account.config.autoUpdateBookInfo
          ) {
            console.log('自动获取小说更新信息');

            let load = this.loadingCtrl.create({
              content: '自动获取小说更新...',
              dismissOnPageChange: true,
            });

            //打开 正在加载 的弹窗
            load.present();

            this.RefreshBookInfo()
              .then(() => {
                load.dismiss();
                this.hasAutoUpdateBookInfo = true;
              })
              .catch(() => {
                load.dismiss();

                console.log("自动获取更新失败");
              });
          }
        });
    });
  }
}
