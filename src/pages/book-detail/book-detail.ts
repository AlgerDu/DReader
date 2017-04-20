import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { BookSotreNvoelInfo } from '../../app/model';
import { BookshelfService } from '../../app/service/bookshelf.service';

/*
  Generated class for the BookDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-book-detail',
  templateUrl: 'book-detail.html'
})
export class BookDetailPage {
  public book: BookSotreNvoelInfo;

  public isFabShow: boolean = false;
  public isBookInSheet: boolean = false;

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , private bookServeice: BookshelfService
  ) {
    this.book = this.navParams.get('book');
    console.log(this.book);
  }

  ionViewDidLoad() {
    this.bookServeice.ContainBook(this.book.uid).then((data) => {
      this.isFabShow = true;
      this.isBookInSheet = data;
    })
  }

  public AddToSheet() {
    this.bookServeice.AddBook(this.book);
    this.isBookInSheet = true;
  }

  public RemoveFromSheet() {
    this.bookServeice.RemoveBook(this.book);
    this.isBookInSheet = false;
  }
}
