import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';

import { ReaderPage } from '../reader/reader'

import { BookService } from '../../app/service/book.service';
import { Book, Configer } from '../../app/model';
import { ConfigService } from '../../app/service/config.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;

  private hasLoaded: boolean = false;

  public configer: Configer;
  public books: Book[];

  constructor(
    public navCtrl: NavController,
    private bookService: BookService,
    private configService: ConfigService
  ) {
    this.configer = configService.get();
  }

  ionViewWillEnter() {
    this.bookService.SheetList().then(books => this.books = books);
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
