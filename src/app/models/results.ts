export class Result<T>{

}


/**
 * 查询条件
 * @export
 * @class SerachCondition
 */
export class SerachCondition {
    constructor(
        public pageSize: number
        , public pageIndex: number
    ) { }
}


/**
 * 查询结果
 * @export
 * @class SearchResult
 * @template T 
 */
export class SearchResult<T>{
    code: number;
    pageSize: number;
    pageIndex: number;
    recordCount: number;
    message: string;
    data: T[];

    success(): boolean {
        return this.code == 0;
    }
}