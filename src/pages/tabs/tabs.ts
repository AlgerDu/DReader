import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AccountPage } from '../account/account';
import { BookStorePage } from '../book-store/book-store';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = BookStorePage;
  tab3Root: any = AccountPage;

  constructor() {

  }
}
