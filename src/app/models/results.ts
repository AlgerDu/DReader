export class Result<T>{

}

export class BathOpsResultItem<T>{
    success: boolean;
    index: number;
    message: string;
    data: T;
}

export class BathOpsResult<T>{
    code: number;
    opsCount: number;
    items: BathOpsResultItem<T>[];
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