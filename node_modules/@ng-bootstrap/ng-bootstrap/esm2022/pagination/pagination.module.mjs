import { NgModule } from '@angular/core';
import { NgbPagination, NgbPaginationEllipsis, NgbPaginationFirst, NgbPaginationLast, NgbPaginationNext, NgbPaginationNumber, NgbPaginationPrevious, NgbPaginationPages, } from './pagination';
import * as i0 from "@angular/core";
export { NgbPagination, NgbPaginationEllipsis, NgbPaginationFirst, NgbPaginationLast, NgbPaginationNext, NgbPaginationNumber, NgbPaginationPrevious, NgbPaginationPages, } from './pagination';
export { NgbPaginationConfig } from './pagination-config';
const NGB_PAGINATION_DIRECTIVES = [
    NgbPagination,
    NgbPaginationEllipsis,
    NgbPaginationFirst,
    NgbPaginationLast,
    NgbPaginationNext,
    NgbPaginationNumber,
    NgbPaginationPrevious,
    NgbPaginationPages,
];
class NgbPaginationModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPaginationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.6", ngImport: i0, type: NgbPaginationModule, imports: [NgbPagination,
            NgbPaginationEllipsis,
            NgbPaginationFirst,
            NgbPaginationLast,
            NgbPaginationNext,
            NgbPaginationNumber,
            NgbPaginationPrevious,
            NgbPaginationPages], exports: [NgbPagination,
            NgbPaginationEllipsis,
            NgbPaginationFirst,
            NgbPaginationLast,
            NgbPaginationNext,
            NgbPaginationNumber,
            NgbPaginationPrevious,
            NgbPaginationPages] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPaginationModule }); }
}
export { NgbPaginationModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPaginationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: NGB_PAGINATION_DIRECTIVES,
                    exports: NGB_PAGINATION_DIRECTIVES,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFDTixhQUFhLEVBQ2IscUJBQXFCLEVBQ3JCLGtCQUFrQixFQUNsQixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLG1CQUFtQixFQUNuQixxQkFBcUIsRUFDckIsa0JBQWtCLEdBQ2xCLE1BQU0sY0FBYyxDQUFDOztBQUV0QixPQUFPLEVBQ04sYUFBYSxFQUNiLHFCQUFxQixFQUNyQixrQkFBa0IsRUFDbEIsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIscUJBQXFCLEVBQ3JCLGtCQUFrQixHQUNsQixNQUFNLGNBQWMsQ0FBQztBQUN0QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUUxRCxNQUFNLHlCQUF5QixHQUFHO0lBQ2pDLGFBQWE7SUFDYixxQkFBcUI7SUFDckIsa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsbUJBQW1CO0lBQ25CLHFCQUFxQjtJQUNyQixrQkFBa0I7Q0FDbEIsQ0FBQztBQUVGLE1BSWEsbUJBQW1COzhHQUFuQixtQkFBbUI7K0dBQW5CLG1CQUFtQixZQWQvQixhQUFhO1lBQ2IscUJBQXFCO1lBQ3JCLGtCQUFrQjtZQUNsQixpQkFBaUI7WUFDakIsaUJBQWlCO1lBQ2pCLG1CQUFtQjtZQUNuQixxQkFBcUI7WUFDckIsa0JBQWtCLGFBUGxCLGFBQWE7WUFDYixxQkFBcUI7WUFDckIsa0JBQWtCO1lBQ2xCLGlCQUFpQjtZQUNqQixpQkFBaUI7WUFDakIsbUJBQW1CO1lBQ25CLHFCQUFxQjtZQUNyQixrQkFBa0I7K0dBT04sbUJBQW1COztTQUFuQixtQkFBbUI7MkZBQW5CLG1CQUFtQjtrQkFKL0IsUUFBUTttQkFBQztvQkFDVCxPQUFPLEVBQUUseUJBQXlCO29CQUNsQyxPQUFPLEVBQUUseUJBQXlCO2lCQUNsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG5cdE5nYlBhZ2luYXRpb24sXG5cdE5nYlBhZ2luYXRpb25FbGxpcHNpcyxcblx0TmdiUGFnaW5hdGlvbkZpcnN0LFxuXHROZ2JQYWdpbmF0aW9uTGFzdCxcblx0TmdiUGFnaW5hdGlvbk5leHQsXG5cdE5nYlBhZ2luYXRpb25OdW1iZXIsXG5cdE5nYlBhZ2luYXRpb25QcmV2aW91cyxcblx0TmdiUGFnaW5hdGlvblBhZ2VzLFxufSBmcm9tICcuL3BhZ2luYXRpb24nO1xuXG5leHBvcnQge1xuXHROZ2JQYWdpbmF0aW9uLFxuXHROZ2JQYWdpbmF0aW9uRWxsaXBzaXMsXG5cdE5nYlBhZ2luYXRpb25GaXJzdCxcblx0TmdiUGFnaW5hdGlvbkxhc3QsXG5cdE5nYlBhZ2luYXRpb25OZXh0LFxuXHROZ2JQYWdpbmF0aW9uTnVtYmVyLFxuXHROZ2JQYWdpbmF0aW9uUHJldmlvdXMsXG5cdE5nYlBhZ2luYXRpb25QYWdlcyxcbn0gZnJvbSAnLi9wYWdpbmF0aW9uJztcbmV4cG9ydCB7IE5nYlBhZ2luYXRpb25Db25maWcgfSBmcm9tICcuL3BhZ2luYXRpb24tY29uZmlnJztcblxuY29uc3QgTkdCX1BBR0lOQVRJT05fRElSRUNUSVZFUyA9IFtcblx0TmdiUGFnaW5hdGlvbixcblx0TmdiUGFnaW5hdGlvbkVsbGlwc2lzLFxuXHROZ2JQYWdpbmF0aW9uRmlyc3QsXG5cdE5nYlBhZ2luYXRpb25MYXN0LFxuXHROZ2JQYWdpbmF0aW9uTmV4dCxcblx0TmdiUGFnaW5hdGlvbk51bWJlcixcblx0TmdiUGFnaW5hdGlvblByZXZpb3VzLFxuXHROZ2JQYWdpbmF0aW9uUGFnZXMsXG5dO1xuXG5ATmdNb2R1bGUoe1xuXHRpbXBvcnRzOiBOR0JfUEFHSU5BVElPTl9ESVJFQ1RJVkVTLFxuXHRleHBvcnRzOiBOR0JfUEFHSU5BVElPTl9ESVJFQ1RJVkVTLFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uTW9kdWxlIHt9XG4iXX0=