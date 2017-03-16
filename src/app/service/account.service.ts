import { Injectable } from '@angular/core';
import { AccountInfo } from '../model';
import { SQLiteDbService } from './sqlitedb.service';
import { generateUUID } from '../common';

@Injectable()
export class AccountService {

    /**
     * 当前账户信息
     */
    private account: AccountInfo;

    constructor(
        private db: SQLiteDbService
    ) { }


    /**
     * 获取当前 app 的账户信息
     * 
     * @returns {Promise<AccountInfo>} 
     * 
     * @memberOf AccountService
     */
    public CurrAccount(): Promise<AccountInfo> {
        return Promise.resolve(null);
    }


    /**
     * 创建一个本地账户，用来在用户没有登陆的时候使用
     * @private
     * 
     * @memberOf AccountService
     */
    private CreateNewLoaclAccount(): Promise<any> {
        this.account = {
            uid: generateUUID(),
            name: '本地',
            local: true
        };

        this.db.executeSql(
            'INSERT INTO Account VALUES ( ?, ?, ?, ?)',
            [this.account.uid, this.account.name, this.account.local, 'false']
        ).then(() => {
            console.log('创建本地账户并且保存成功：' + this.account);
            return this.account;
        }).catch((error) => {
            console.log('创建本地账户保存到数据库失败：' + this.account);
            console.log('失败原因：' + error);
            return null;
        })
    }
}