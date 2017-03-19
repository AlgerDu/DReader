import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { BookService } from '../../app/service/book.service';
import { Book } from '../../app/model';

@Component({
  selector: 'page-reader',
  templateUrl: 'reader.html'
})
export class ReaderPage {
  public readerToolShow = false;
  public book: Book;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private plt: Platform,
    private bookService: BookService
  ) {
    this.book = this.navParams.get('book');

    this.plt.ready().then(() => {
      this.RegisterBackButtonAction();
    });
  }

  public ionViewDidLoad() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
    console.log('ionViewDidLoad ReaderPage');
  }

  public ionViewWillLeave() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'flex';
      });
    }
  }

  /**
   * 弹出或者关闭阅读器工具栏
   * 
   * @memberOf ReaderPage
   */
  public ToggleReaderTool() {
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
}
