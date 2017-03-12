import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Configer } from '../model';

@Injectable()
export class ConfigService {
    private configerStorageName: string = 'configer';

    private configer: Configer;

    constructor(
        private storage: Storage
    ) {
        storage.ready().then(() => {
            storage.get(this.configerStorageName).then((val) => {
                console.log(val);
                if (val == null) {
                    this.configer = new Configer();
                } else {
                    this.configer = val;
                }
            })
        });
    }

    save() {
        this.storage.set(this.configerStorageName, this.configer);
    }

    get(): Configer {
        return this.configer;
    }
}