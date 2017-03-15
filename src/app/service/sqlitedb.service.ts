import { Injectable } from '@angular/core';

import { Platform, AlertController, Events } from 'ionic-angular';
import { SQLite } from "ionic-native";

@Injectable()
export class SQLiteDbService {
    public isReady: boolean = false;
    public db: SQLite;
    constructor(
        platform: Platform,
        public events: Events,
        private alertCtrl: AlertController
    ) {
        platform.ready().then(() => {

            if (platform.is('core')) {
                console.log('桌面调试时不使用 sqlite');
                this.isReady = true;
                this.dbReadyEvent();
                return;
            }

            this.db = new SQLite();
            this.db.openDatabase({
                name: 'data.db',
                location: 'default'
            })
                .then(() => {
                    this.initDb();
                })
                .catch(() => {
                    this.showAlert('读取本地数据失败！');
                });
        });
    }

    public executeSql(sql: string, params: any): Promise<any> {
        return this.db.executeSql(sql, params);
    }

    //初始化一个新的数据库
    private initDb() {
        this.db.transaction(function (tx) {
            this.db.executeSql('DROP TABLE IF EXISTS Account', []);
            this.db.executeSql('DROP TABLE IF EXISTS BookShelf', []);
            this.db.executeSql('DROP TABLE IF EXISTS Book', []);
            this.db.executeSql('DROP TABLE IF EXISTS Volume', []);
            this.db.executeSql('DROP TABLE IF EXISTS Chapter', []);
            this.db.executeSql('CREATE TABLE Account ( uid char(36) PRIMARY KEY, name TEXT not null)', []);
            this.db.executeSql('CREATE TABLE BookShelf ( accUid char(36), bookUid char(36), readPct INT not null, updateCount INT not null, PRIMARY KEY(accUid,bookUid))', []);
            this.db.executeSql('CREATE TABLE Book ( uid char(36) PRIMARY KEY, name TEXT not null, author TEXT not null)', []);
            this.db.executeSql(' CREATE TABLE Volume ( bookUid char(36), vIndex INT, name TEXT not null, PRIMARY KEY(bookUid,vIndex))', []);
            this.db.executeSql('CREATE TABLE Chapter ( uid char(36) PRIMARY KEY, name TEXT not null, txt TEXT not null, vNo INT not null, vIndex INT not null)', []);
        }).then(() => {
            this.isReady = true;
            console.log('创建数据库成功');
            this.insertMockData();
        }).catch(() => {
            this.showAlert('数据初始化失败！');
        });
    }

    //添加模拟数据
    private insertMockData() {
        this.db.transaction(function (tx) {
            this.db.executeSql(' INSERT INTO Account VALUES ( ?, ?)', ['a1', 'ace']);
            this.db.executeSql('INSERT INTO Book VALUES ( ?, ?, ?)', ['b1', '修真聊天群', '圣骑士的传说']);
            this.db.executeSql('INSERT INTO Book VALUES ( ?, ?, ?)', ['b2', '神级英雄', '']);
            this.db.executeSql('INSERT INTO BookShelf VALUES ( ?, ?, ?, ?)', ['a1', 'b1', 90, 3]);
            this.db.executeSql('INSERT INTO BookShelf VALUES ( ?, ?, ?, ?)', ['a1', 'b2', 0, 0]);
        }).catch((error) => {
            console.log(error);
            this.showAlert('添加模拟数据失败：' + error);
        });
    }

    private showAlert(msg: string): Promise<any> {
        let alert = this.alertCtrl.create({
            subTitle: msg,
            buttons: ['确认']
        });
        return alert.present();
    }

    private dbReadyEvent() {
        //发布 本地数据加载完成事件
        this.events.publish('db:ready', Date.now());
    }
}