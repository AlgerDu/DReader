import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ReaderPage } from '../reader/reader'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  ReadBook(uuid: string) {
    this.navCtrl.push(ReaderPage);
  }

}
