import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { AccountInfo, Config, EventType } from '../model';
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
        private events: Events,
        private db: SQLiteDbService
    ) {
        this.SubscribeDbReadyEvent();
    }

    /**
     * 获取当前 app 的账户信息
     * 
     * @returns {Promise<AccountInfo>} 
     * 
     * @memberOf AccountService
     */
    public CurrAccount(): AccountInfo {
        if (this.account != null) {
            //当账户信息已经加载，不重复进行加载
            return this.account;
        } else {
            console.log('还没有加载 account 信息');
            return null;
        }
    }

    /**
     * 订阅 DB_READY
     * 发布 Account_Loadend
     * @private
     * 
     * @memberOf AccountService
     */
    private SubscribeDbReadyEvent() {
        this.events.subscribe(EventType.DB_READY.toString(), (time) => {
            console.log('account service 处理 DB_READY 事件');

            let sqlLogin = 'SELECT * FROM Account WHERE login = "true"';
            let sqlLocal = 'SELECT * FROM Account WHERE local = "true"';

            this.db.executeSql(sqlLogin, []).then((data) => {
                if (data.length == 1) {
                    this.account = this.DbRecoreToAccountModel(data[0]);
                    this.PublishAccountLoadendEvent();
                } else {
                    return this.db.executeSql(sqlLocal, []).then((data) => {
                        if (data.length == 1) {
                            this.account = this.DbRecoreToAccountModel(data[0]);
                            this.PublishAccountLoadendEvent();
                        } else {
                            return this.CreateNewLoaclAccount().then(() => {
                                this.PublishAccountLoadendEvent();
                            });
                        }
                    });
                }
            });
        })
    }

    /**
     * 发布 Account_Loadend 事件
     * @private
     * 
     * @memberOf AccountService
     */
    private PublishAccountLoadendEvent() {
        this.events.publish(EventType.Account_Loadend.toString(), Date.now());
    }

    /**
     * 将数据库表数据转换为 AccountInfo 对象
     * @private
     * @param {*} record 
     * @returns {AccountInfo} 
     * 
     * @memberOf AccountService
     */
    private DbRecoreToAccountModel(record: any): AccountInfo {
        let account = new AccountInfo();
        account.uid = record.uid;
        account.name = record.name;
        account.config = JSON.parse(record.config) as Config;

        return account;
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
            local: true,
            config: new Config()
        };

        return this.db.executeSql(
            'INSERT INTO Account VALUES ( ?, ?, ?, ?, ?)',
            [this.account.uid, this.account.name, this.account.local, 'false', JSON.stringify(this.account.config)]
        ).then(() => {
            console.log('创建本地账户并且保存成功：', this.account);
        }).catch((error) => {
            console.log('创建本地账户保存到数据库失败：' + this.account);
            console.log('失败原因：' + error);
        })
    }
}