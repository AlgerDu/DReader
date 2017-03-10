import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ReaderPage } from '../reader/reader'

import { BookService } from '../../app/service/book.service';
import { Book } from '../../app/model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public books: Book[];

  constructor(
    public navCtrl: NavController,
    private bookService: BookService) {
    this.books = this.bookService.SheetList();
  }

  ReadBook(book: Book) {
    this.navCtrl.push(ReaderPage, { book: book });
  }
}
