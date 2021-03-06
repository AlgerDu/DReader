import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { SearchResult, SerachCondition, BathOpsResult, Result } from '../models/results';
import { BookSotreNvoelInfo, NovelLastUpdateModel, NovelUpdateModel, NovelCatalogQueryModel, NovelCatalogModel, NovelChapterTextQueryModel, NovelChapterText } from '../model';


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


    /**
     * 从书店中获取
     * @param {SerachCondition} condition 
     * @returns {Promise<SearchResult<BookSotreNvoelInfo>>} 
     * 
     * @memberOf WebsiteService
     */
    public BookStoreNovelList(condition: SerachCondition): Promise<SearchResult<BookSotreNvoelInfo>> {

        let url = this.host + "/BookStore/Novel";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, condition, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }


    /**
     * 获取小说的更新信息
     * @param {NovelLastUpdateModel[]} lastInfos 
     * @returns {Promise<BathOpsResult<NovelUpdateMode>>} 
     * 
     * @memberOf WebsiteService
     */
    public NovelUpdate(lastInfos: NovelLastUpdateModel[])
        : Promise<BathOpsResult<NovelUpdateModel>> {

        let url = this.host + "/novel/update";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, lastInfos, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }


    /**
     * 获取小说某个章节前后的章节
     * @param {NovelCatalogQueryModel} query 
     * @returns {Promise<NovelCatalogModel>} 
     * 
     * @memberOf WebsiteService
     */
    public NovelCatalog(query: NovelCatalogQueryModel)
        : Promise<Result<NovelCatalogModel>> {

        let url = this.host + "/novel/catalog";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, query, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }


    /**
     * 获取小说某个章节内容
     * @param {NovelChapterTextQueryModel} query 
     * @returns {Promise<Result<NovelChapterText>>} 
     * 
     * @memberOf WebsiteService
     */
    public NovelChapterText(query: NovelChapterTextQueryModel)
        : Promise<Result<NovelChapterText>> {

        let url = this.host + "/novel/chapterText";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, query, options)
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