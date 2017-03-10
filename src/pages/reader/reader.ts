import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

/*
  Generated class for the Reader page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reader',
  templateUrl: 'reader.html'
})
export class ReaderPage {
  public readerToolShow = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public plt: Platform) {

    this.plt.ready().then(() => {
      this.registerBackButtonAction();//注册返回按键事件
    });

  }

  ionViewDidLoad() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
    console.log('ionViewDidLoad ReaderPage');
  }

  ionViewWillLeave() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'flex';
      });
    }
  }

  //toggle 阅读器的工具栏
  toggleReaderTool() {
    this.readerToolShow = !this.readerToolShow;
  }

  //注册页面的 后退按钮事件
  registerBackButtonAction() {
    this.plt.registerBackButtonAction(() => {
      if (this.readerToolShow) {
        this.readerToolShow = !this.readerToolShow;
      } else {
        this.navCtrl.pop();
      }
    }, 1);
  }
}
