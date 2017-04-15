import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { SearchResult, SerachCondition } from '../models/results';
import { BookSotreNvoelInfo } from "../model";


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


/**
 * 和 webapi 通讯
 * @export
 * @class WebsiteService
 */
@Injectable()
export class WebsiteService {

    private host: string = "/app";

    constructor(private http: Http) { }

    BookStoreNovelList(condition: SerachCondition): Promise<SearchResult<BookSotreNvoelInfo>> {

        let url = this.host + "/BookStore/Novel";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, condition, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { "code": 1 };
    }
    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}