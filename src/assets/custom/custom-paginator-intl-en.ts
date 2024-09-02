import { MatPaginatorIntl } from '@angular/material/paginator';

export class CustomPaginatorIntlEn extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Items per page:';
  override nextPageLabel     = 'Next page';
  override previousPageLabel = 'Previous page';
  override firstPageLabel    = 'First page';
  override lastPageLabel     = 'Last page';

  override getRangeLabel = function (page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) return `0 of ${length}`;
    
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} of ${endIndex} of a total of ${length} records`;
  };
}
