import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { Book, Chapter, dContent } from '../../app/model';
import { IsEmptyOfNull } from '../../app/common';
import { BookshelfService } from '../../app/service/bookshelf.service';
import { ReadBookService } from '../../app/service/readBook.service';

@Component({
  selector: 'page-reader',
  templateUrl: 'reader.html'
})
export class ReaderPage {
  public readerToolShow = false;

  public book: Book;
  public chapter: Chapter;
  public context: dContent;
  public ps: string[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private plt: Platform,
    private bookService: BookshelfService,
    private readBookService: ReadBookService
  ) {
    this.book = this.navParams.get('book');
    this

    this.plt.ready().then(() => {
      this.RegisterBackButtonAction();
    });
  }

  public ionViewDidLoad() {
    this.HideTab();
  }

  public ionViewDidEnter() {
    this.readBookService.LoadCatalog(this.book);

    this.readBookService.LoadChapterContext(this.book, 1, 1)
      .then((context) => {
        this.context = context;
      });
  }

  public ionViewWillLeave() {
    this.ShowTab();
  }

  /**
   * 加载章节的内容
   * @param {Chapter} c 
   * 
   * @memberOf ReaderPage
   */
  public LoadChapter(c: Chapter) {
    this.chapter = c;
    this.menuCtrl.close();

    this.readBookService.LoadChapterContext(this.book, c.volumeNo, c.volumeIndex)
      .then((context) => {
        this.context = context;
        this.ps = this.context.text.split('\n');
      });
  }

  /**
   * 弹出或者关闭阅读器工具栏
   * 
   * @memberOf ReaderPage
   */
  public ToggleReaderTool() {
    if (!this.menuCtrl.isOpen())
      this.readerToolShow = !this.readerToolShow;
  }

  /**
   * 注册后退按钮事件
   * @private
   * 
   * @memberOf ReaderPage
   */
  private RegisterBackButtonAction() {
    this.plt.registerBackButtonAction(() => {
      if (this.readerToolShow) {
        this.ToggleReaderTool();
      } else if (this.menuCtrl.isOpen()) {
        this.menuCtrl.close();
      } else {
        this.navCtrl.pop();
      }
    }, 1);
  }

  /**
   * 隐藏标签页选项
   * @private
   * 
   * @memberOf ReaderPage
   */
  private HideTab() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
  }


  /**
   * 显示标签页
   * @private
   * 
   * @memberOf ReaderPage
   */
  private ShowTab() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'flex';
      });
    }
  }
}
