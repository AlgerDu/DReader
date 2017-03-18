import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Config } from '../model';

@Injectable()
export class ConfigService {
    private configerStorageName: string = 'configer';

    private configer: Config;

    constructor(
        private storage: Storage
    ) {
        storage.ready().then(() => {
            storage.get(this.configerStorageName).then((val) => {
                console.log(val);
                if (val == null) {
                    this.configer = new Config();
                } else {
                    this.configer = val;
                }
            })
        });
    }

    save() {
        this.storage.set(this.configerStorageName, this.configer);
    }

    get(): Config {
        return this.configer;
    }
}