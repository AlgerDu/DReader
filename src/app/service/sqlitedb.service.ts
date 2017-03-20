import { Injectable } from '@angular/core';

import { Platform, AlertController, Events } from 'ionic-angular';
import { SQLite } from "ionic-native";
import { EventType } from '../model';

@Injectable()
export class SQLiteDbService {
    public isReady: boolean = false;
    db: SQLite;
    constructor(
        private plt: Platform,
        private events: Events,
        private alertCtrl: AlertController
    ) {
        plt.ready().then(() => {

            if (plt.is('core')) {
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
        if (this.plt.is('core')) {
            console.log('桌面调试不执行 sql 语句：' + sql);
            return Promise.resolve([]);
        } else {
            return this.db.executeSql(sql, params).then((rs) => {
                let array: any[] = [];
                for (let i = 0; i < rs.rows.length; i++) {
                    array.push(rs.rows.item(i));
                }
                console.log('sql is ' + sql);
                console.log('reault : ' + JSON.stringify(array));
                return array;
            }).catch((error) => {
                console.log('sql is ' + sql);
                console.log('执行失败：' + error);
                return Promise.reject('sql 语句执行失败');
            });
        }
    }

    //初始化一个新的数据库
    private initDb() {
        this.db.transaction(function (tx) {
            this.db.executeSql('DROP TABLE IF EXISTS Account', []);
            this.db.executeSql('DROP TABLE IF EXISTS BookShelf', []);
            this.db.executeSql('DROP TABLE IF EXISTS Book', []);
            this.db.executeSql('DROP TABLE IF EXISTS Volume', []);
            this.db.executeSql('DROP TABLE IF EXISTS Chapter', []);
            this.db.executeSql('DROP TABLE IF EXISTS Content', []);
            this.db.executeSql('CREATE TABLE Account ( uid char(36) PRIMARY KEY, name TEXT not null, local BOOLEAN not null, login BOOLEAN not null, config TEXT not null)', []);
            this.db.executeSql('CREATE TABLE BookShelf ( accUid char(36), bookUid char(36), readPct INT not null, updateCount INT not null, PRIMARY KEY(accUid,bookUid))', []);
            this.db.executeSql('CREATE TABLE Book ( uid char(36) PRIMARY KEY, name TEXT not null, author TEXT not null)', []);
            this.db.executeSql('CREATE TABLE Volume ( bookUid char(36), vNo INT, name TEXT not null, PRIMARY KEY(bookUid,vNo))', []);
            this.db.executeSql('CREATE TABLE Chapter ( uid char(36) PRIMARY KEY, bookUid char(36) not null, name TEXT not null, contentUid char(36), vNo INT not null, vIndex INT not null)', []);
            this.db.executeSql('CREATE TABLE Content ( uid char(36) PRIMARY KEY, txt TEXT not null)', []);
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
            this.db.executeSql('INSERT INTO Account VALUES ( ?, ?, ?, ?)', ['a1', 'ace', 'true', 'false', '{}']);
            this.db.executeSql('INSERT INTO Book VALUES ( ?, ?, ?)', ['b1', '修真聊天群', '圣骑士的传说']);
            this.db.executeSql('INSERT INTO Book VALUES ( ?, ?, ?)', ['b2', '神级英雄', '']);
            this.db.executeSql('INSERT INTO BookShelf VALUES ( ?, ?, ?, ?)', ['a1', 'b1', 90, 3]);
            this.db.executeSql('INSERT INTO BookShelf VALUES ( ?, ?, ?, ?)', ['a1', 'b2', 0, 0]);
        }).then(() => {
            console.log('添加部分模拟数据');
            this.dbReadyEvent();
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
        this.events.publish(EventType.DB_READY.toString(), Date.now());
    }
}