import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BookSotreNvoelInfo } from '../../app/model';
import { WebsiteService } from '../../app/service/website.service';
import { SerachCondition } from '../../app/models/results';

/*
  Generated class for the BookStore page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-book-store',
  templateUrl: 'book-store.html'
})
export class BookStorePage {

  books: BookSotreNvoelInfo[] = [];

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , private website: WebsiteService
  ) { }

  ionViewDidLoad() {
    this.website.BookStoreNovelList(new SerachCondition(10, 1))
      .then((data) => {
        console.log(data);
        this.books = data.data;
        console.log(this.books.length);
        //this.books = data as BookSotreNvoelInfo[];
      });
  }

}
