import { Injectable } from '@angular/core';

import { Platform, AlertController } from 'ionic-angular';
import { SQLite } from "ionic-native";

@Injectable()
export class SQLiteDbService {
    public isReady: boolean = false;
    public db: SQLite;
    constructor(
        private alertCtrl: AlertController,
        platform: Platform
    ) {
        platform.ready().then(() => {
            this.db = new SQLite();
            this.db.openDatabase({
                name: 'data.db',
                location: 'default' // the location field is required)
            })
                .then(this.initDb)
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
            tx.executeSql('DROP TABLE IF EXISTS MyTable');
            tx.executeSql('CREATE TABLE MyTable (SampleColumn)');
            tx.executeSql(`
                DROP TABLE IF EXISTS Account;
                DROP TABLE IF EXISTS BookShelf;
                DROP TABLE IF EXISTS Book;
                DROP TABLE IF EXISTS Volume;
                DROP TABLE IF EXISTS Chapter;
                CREATE TABLE Account ( uid char(36) PRIMARY KEY, name TEXT not null);
                CREATE TABLE BookShelf ( accUid char(36) PRIMARY KEY, bookUid char(36) PRIMARY KEY, readPct INT not null, updateCount INT not null);
                CREATE TABLE Book ( uid char(36) PRIMARY KEY, name TEXT not null, author TEXT not null);
                CREATE TABLE Volume ( bookUid char(36) PRIMARY KEY, index INT PRIMARY KEY, name TEXT not null);
                CREATE TABLE Chapter ( uid char(36) PRIMARY KEY, name TEXT not null, txt TEXT not null, vNo INT not null, vIndex INT not null);
            `);
        })
            .then(() => {
                this.isReady = true
            })
            .catch(() => {
                this.showAlert('数据初始化失败！');
            });
    }

    //数据库迁移
    private migrationDb() {

    }

    private showAlert(msg: string): Promise<any> {
        let alert = this.alertCtrl.create({
            subTitle: msg,
            buttons: ['确认']
        });
        return alert.present();
    }
}