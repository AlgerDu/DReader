import { Injectable } from '@angular/core';
import { AccountInfo } from '../model';
import { SQLiteDbService } from './sqlitedb.service';

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
}