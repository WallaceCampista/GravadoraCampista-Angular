export interface Pagination {
    xnextpage: string;
    xpreviewpage: string;
}

export class PaginatedResult<T> {
    result?: T;
    pagination?: Pagination;
}
