import { Injectable } from '@angular/core';

import { Book, Chapter, Content, NovelCatalogQueryModel, Volume } from '../model';

import { SQLiteDbService } from './sqlitedb.service';
import { WebsiteService } from './website.service';
import { Result } from '../models/results';
import { Content } from 'ionic-angular';

@Injectable()
export class ReadBookService {

    constructor(
        private dbService: SQLiteDbService,
        private websiteService: WebsiteService
    ) { }

    /**获取书籍的章节信息*/
    public LoadCatalog(book: Book): Promise<number> {
        if (book.chapters.length > 0) {
            return this.LoadServerCatalog(book, 10);
        } else {
            return this.LoadDBCatalog(book)
                .then((count) => {
                    if (count == 0) {
                        return this.LoadServerCatalog(book, 10);
                    } else {
                        return count;
                    }
                });
        }
    }

    /**加载书籍缓存在本地数据库中的目录*/
    private LoadDBCatalog(book: Book): Promise<number> {
        return Promise.resolve(0);
    }

    /**加载书籍服务端的章节目录*/
    private LoadServerCatalog(book: Book, queryCount: number): Promise<number> {
        let index = book.chapters.length;

        let lastChapter: Chapter = null;

        if (index > 0) {
            lastChapter = book.chapters[index - 1];
        }

        let query = index > 0
            ? new NovelCatalogQueryModel(book.uid, 1, 1)
            : new NovelCatalogQueryModel(book.uid, lastChapter.volumeNo, lastChapter.volumeIndex);

        query.backwardCount = queryCount;

        return this.websiteService.NovelCatalog(query)
            .then((result) => {
                if (result.Success()) {
                    let data = result.data;
                    for (let v of data.vs) {
                        let nv = new Volume();
                        nv.name = v.name;
                        nv.no = v.no;
                        book.volumes.push(nv);
                    }
                    for (let c of data.cs) {
                        let nc = new Chapter();
                        nc.name = c.name;
                        nc.uid = c.uid;
                        nc.volumeNo = c.volumeNo;
                        nc.volumeIndex = c.volumeIndex;
                        book.chapters.push(nc);
                    }

                    return Promise.resolve(data.cs.length);
                } else {
                    console.log("获取 " + book.name + " 的章节信息失败：" + result.message);
                    return Promise.reject(0);
                }
            })
            .catch(() => {
                return Promise.reject(0);
            });
    }

    /**加载章节内容*/
    public LoadChapterText(book: Book, chapter: Chapter): Promise<Content> {
        return this.websiteService.NovelChapterText({
            bookUid: book.uid,
            volumeNo: chapter.volumeNo,
            volumeIndex: chapter.volumeIndex
        })
            .then((result): Promise<Content> => {
                if (result.Success()) {
                    let c = new Content();
                    c.text = result.data.txt;
                    c.uid = result.data.uid;
                    return Promise.resolve(c);
                } else {
                    console.log("获取 " + book.name + " 的章节信息失败：" + result.message);
                    return Promise.reject(null);
                }
            })
            .catch(() => {
                return Promise.reject(null);
            });
    }
}