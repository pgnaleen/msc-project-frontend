export class BaseFilter {

    public static UNLIMITED_PAGE_SIZE = 1000;

    pageSize?;
    pageNo?;
    searchQuery?: string;
    sortBy?: string[];
    sortDirection?: 'ASC' | 'DESC' = 'DESC';
    tenantId?: number;
    contextAssignmentId?: number;
    activeStatus?: boolean;
}
