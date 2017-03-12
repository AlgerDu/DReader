import { Component, ViewChild } from '@angular/core';
import { NavController, Content, Refresher, AlertController } from 'ionic-angular';

import { ReaderPage } from '../reader/reader'

import { BookService } from '../../app/service/book.service';
import { Book } from '../../app/model';
import { ConfigService } from '../../app/service/config.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  @ViewChild(Refresher) refresher: Refresher;
  public books: Book[];

  constructor(
    public navCtrl: NavController,
    private bookService: BookService,
    private configService: ConfigService
  ) {
    this.books = this.bookService.SheetList();
  }

  ionViewDidEnter() {
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
}
