import { Injectable } from '@angular/core';
import { AccountInfo, Config } from '../model';
import { SQLiteDbService } from './sqlitedb.service';
import { generateUUID } from '../common';

@Injectable()
export class AccountService {

    /**
     * 当前账户信息
     */
    private account: AccountInfo;

    /**
     * 当前账户的配置信息
     * @private
     * @type {Config}
     * @memberOf AccountService
     */
    private config: Config;

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
        if (this.account != null) {
            //当账户信息已经加载，不重复进行加载
            return Promise.resolve(this.account);
        } else {

            let sqlLogin = 'SELECT * FROM Account WHERE login = "true"';
            let sqlLocal = 'SELECT * FROM Account WHERE local = "true"';

            return this.db.executeSql(sqlLogin, []).then((data) => {
                if (data.length == 1) {
                    this.account = data[0] as AccountInfo;
                    return this.account;
                } else {
                    this.db.executeSql(sqlLocal, []).then((data) => {
                        if (data.length == 1) {
                            this.account = data[0] as AccountInfo;
                            return this.account;
                        } else {
                            return this.CreateNewLoaclAccount();
                        }
                    })
                }
            });
        }
    }

    /**
     * 获取当前账户配置文件
     * @returns {Promise<Config>} 
     * @memberOf AccountService
     */
    public CurrAccountConfig(): Promise<Config> {
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

        return this.db.executeSql(
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