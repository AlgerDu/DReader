import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { BookSotreNvoelInfo } from '../../app/model';
import { BookshelfService } from '../../app/service/bookshelf.service';

@Component({
  selector: 'page-book-detail',
  templateUrl: 'book-detail.html'
})
export class BookDetailPage {
  public book: BookSotreNvoelInfo;

  public isFabShow: boolean = false;
  public isBookInSheelf: boolean = false;

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , private bookshelfServeice: BookshelfService
  ) {
    this.book = this.navParams.get('book');
    console.log("加载 " + this.book.name + " 的详情页面");
  }

  /**处理页面以及激活事件*/
  ionViewDidEnter() {
    if (this.bookshelfServeice.ContainBook(this.book.uid)) {
      this.isBookInSheelf = true;
    } else {
      this.isBookInSheelf = false;
    }

    this.isFabShow = true;
  }

  /**将详细信息页对应的书籍加入到书架中*/
  public AddToShelf() {
    this.bookshelfServeice.Add(this.book)
      .then(() => {
        console.log("书籍加入书架成功");
        this.isBookInSheelf = true;
      })
      .catch(() => {
        console.log("书籍加入书架失败");
        this.isBookInSheelf = false;
      });
  }

  /**将详细信息页对应的书籍从书籍中移除*/
  public RemoveFromShelf() {
    this.bookshelfServeice.Remove(this.book.uid)
      .then(() => this.isBookInSheelf = false)
      .catch(() => this.isBookInSheelf = true);
  }
}
