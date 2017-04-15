import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BookSotreNvoelInfo } from '../../app/model';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookStorePage');
  }

}
