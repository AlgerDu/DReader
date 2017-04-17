import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BookSotreNvoelInfo } from '../../app/model';
import { BookService } from '../../app/service/book.service';

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

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , private bookServeice: BookService
  ) {
    this.book = this.navParams.get('book');
    console.log(this.book);
  }

  ionViewDidLoad() {
  }

  public AddToSheet() {
    this.bookServeice.AddBook(this.book);
  }

  public RemoveFromSheet() {
    this.bookServeice.RemoveBook(this.book);
  }
}
