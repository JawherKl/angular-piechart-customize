import { Component, ContentChild, Directive, EventEmitter, Input, Output, ChangeDetectionStrategy, } from '@angular/core';
import { getValueInRange, isNumber } from '../util/util';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./pagination-config";
/**
 * A directive to match the 'ellipsis' link template
 *
 * @since 4.1.0
 */
class NgbPaginationEllipsis {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPaginationEllipsis, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbPaginationEllipsis, isStandalone: true, selector: "ng-template[ngbPaginationEllipsis]", ngImport: i0 }); }
}
export { NgbPaginationEllipsis };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPaginationEllipsis, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationEllipsis]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive to match the 'first' link template
 *
 * @since 4.1.0
 */
class NgbPaginationFirst {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPaginationFirst, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbPaginationFirst, isStandalone: true, selector: "ng-template[ngbPaginationFirst]", ngImport: i0 }); }
}
export { NgbPaginationFirst };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPaginationFirst, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationFirst]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive to match the 'last' link template
 *
 * @since 4.1.0
 */
class NgbPaginationLast {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPaginationLast, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbPaginationLast, isStandalone: true, selector: "ng-template[ngbPaginationLast]", ngImport: i0 }); }
}
export { NgbPaginationLast };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPaginationLast, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationLast]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive to match the 'next' link template
 *
 * @since 4.1.0
 */
class NgbPaginationNext {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPaginationNext, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbPaginationNext, isStandalone: true, selector: "ng-template[ngbPaginationNext]", ngImport: i0 }); }
}
export { NgbPaginationNext };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPaginationNext, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationNext]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive to match the page 'number' link template
 *
 * @since 4.1.0
 */
class NgbPaginationNumber {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPaginationNumber, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbPaginationNumber, isStandalone: true, selector: "ng-template[ngbPaginationNumber]", ngImport: i0 }); }
}
export { NgbPaginationNumber };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPaginationNumber, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationNumber]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive to match the 'previous' link template
 *
 * @since 4.1.0
 */
class NgbPaginationPrevious {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPaginationPrevious, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbPaginationPrevious, isStandalone: true, selector: "ng-template[ngbPaginationPrevious]", ngImport: i0 }); }
}
export { NgbPaginationPrevious };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPaginationPrevious, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationPrevious]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive to match the 'pages' whole content
 *
 * @since 9.1.0
 */
class NgbPaginationPages {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPaginationPages, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbPaginationPages, isStandalone: true, selector: "ng-template[ngbPaginationPages]", ngImport: i0 }); }
}
export { NgbPaginationPages };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPaginationPages, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationPages]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A component that displays page numbers and allows to customize them in several ways.
 */
class NgbPagination {
    constructor(config) {
        this.pageCount = 0;
        this.pages = [];
        /**
         *  The current page.
         *
         *  Page numbers start with `1`.
         */
        this.page = 1;
        /**
         *  An event fired when the page is changed. Will fire only if collection size is set and all values are valid.
         *
         *  Event payload is the number of the newly selected page.
         *
         *  Page numbers start with `1`.
         */
        this.pageChange = new EventEmitter(true);
        this.disabled = config.disabled;
        this.boundaryLinks = config.boundaryLinks;
        this.directionLinks = config.directionLinks;
        this.ellipses = config.ellipses;
        this.maxSize = config.maxSize;
        this.pageSize = config.pageSize;
        this.rotate = config.rotate;
        this.size = config.size;
    }
    hasPrevious() {
        return this.page > 1;
    }
    hasNext() {
        return this.page < this.pageCount;
    }
    nextDisabled() {
        return !this.hasNext() || this.disabled;
    }
    previousDisabled() {
        return !this.hasPrevious() || this.disabled;
    }
    selectPage(pageNumber) {
        this._updatePages(pageNumber);
    }
    ngOnChanges(changes) {
        this._updatePages(this.page);
    }
    isEllipsis(pageNumber) {
        return pageNumber === -1;
    }
    /**
     * Appends ellipses and first/last page number to the displayed pages
     */
    _applyEllipses(start, end) {
        if (this.ellipses) {
            if (start > 0) {
                // The first page will always be included. If the displayed range
                // starts after the third page, then add ellipsis. But if the range
                // starts on the third page, then add the second page instead of
                // an ellipsis, because the ellipsis would only hide a single page.
                if (start > 2) {
                    this.pages.unshift(-1);
                }
                else if (start === 2) {
                    this.pages.unshift(2);
                }
                this.pages.unshift(1);
            }
            if (end < this.pageCount) {
                // The last page will always be included. If the displayed range
                // ends before the third-last page, then add ellipsis. But if the range
                // ends on third-last page, then add the second-last page instead of
                // an ellipsis, because the ellipsis would only hide a single page.
                if (end < this.pageCount - 2) {
                    this.pages.push(-1);
                }
                else if (end === this.pageCount - 2) {
                    this.pages.push(this.pageCount - 1);
                }
                this.pages.push(this.pageCount);
            }
        }
    }
    /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     */
    _applyRotation() {
        let start = 0;
        let end = this.pageCount;
        let leftOffset = Math.floor(this.maxSize / 2);
        let rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
        if (this.page <= leftOffset) {
            // very beginning, no rotation -> [0..maxSize]
            end = this.maxSize;
        }
        else if (this.pageCount - this.page < leftOffset) {
            // very end, no rotation -> [len-maxSize..len]
            start = this.pageCount - this.maxSize;
        }
        else {
            // rotate
            start = this.page - leftOffset - 1;
            end = this.page + rightOffset;
        }
        return [start, end];
    }
    /**
     * Paginates page numbers based on maxSize items per page.
     */
    _applyPagination() {
        let page = Math.ceil(this.page / this.maxSize) - 1;
        let start = page * this.maxSize;
        let end = start + this.maxSize;
        return [start, end];
    }
    _setPageInRange(newPageNo) {
        const prevPageNo = this.page;
        this.page = getValueInRange(newPageNo, this.pageCount, 1);
        if (this.page !== prevPageNo && isNumber(this.collectionSize)) {
            this.pageChange.emit(this.page);
        }
    }
    _updatePages(newPage) {
        this.pageCount = Math.ceil(this.collectionSize / this.pageSize);
        if (!isNumber(this.pageCount)) {
            this.pageCount = 0;
        }
        // fill-in model needed to render pages
        this.pages.length = 0;
        for (let i = 1; i <= this.pageCount; i++) {
            this.pages.push(i);
        }
        // set page within 1..max range
        this._setPageInRange(newPage);
        // apply maxSize if necessary
        if (this.maxSize > 0 && this.pageCount > this.maxSize) {
            let start = 0;
            let end = this.pageCount;
            // either paginating or rotating page numbers
            if (this.rotate) {
                [start, end] = this._applyRotation();
            }
            else {
                [start, end] = this._applyPagination();
            }
            this.pages = this.pages.slice(start, end);
            // adding ellipses
            this._applyEllipses(start, end);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPagination, deps: [{ token: i1.NgbPaginationConfig }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbPagination, isStandalone: true, selector: "ngb-pagination", inputs: { disabled: "disabled", boundaryLinks: "boundaryLinks", directionLinks: "directionLinks", ellipses: "ellipses", rotate: "rotate", collectionSize: "collectionSize", maxSize: "maxSize", page: "page", pageSize: "pageSize", size: "size" }, outputs: { pageChange: "pageChange" }, host: { attributes: { "role": "navigation" } }, queries: [{ propertyName: "tplEllipsis", first: true, predicate: NgbPaginationEllipsis, descendants: true }, { propertyName: "tplFirst", first: true, predicate: NgbPaginationFirst, descendants: true }, { propertyName: "tplLast", first: true, predicate: NgbPaginationLast, descendants: true }, { propertyName: "tplNext", first: true, predicate: NgbPaginationNext, descendants: true }, { propertyName: "tplNumber", first: true, predicate: NgbPaginationNumber, descendants: true }, { propertyName: "tplPrevious", first: true, predicate: NgbPaginationPrevious, descendants: true }, { propertyName: "tplPages", first: true, predicate: NgbPaginationPages, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
		<ng-template #first><span aria-hidden="true" i18n="@@ngb.pagination.first">&laquo;&laquo;</span></ng-template>
		<ng-template #previous><span aria-hidden="true" i18n="@@ngb.pagination.previous">&laquo;</span></ng-template>
		<ng-template #next><span aria-hidden="true" i18n="@@ngb.pagination.next">&raquo;</span></ng-template>
		<ng-template #last><span aria-hidden="true" i18n="@@ngb.pagination.last">&raquo;&raquo;</span></ng-template>
		<ng-template #ellipsis>...</ng-template>
		<ng-template #defaultNumber let-page let-currentPage="currentPage">{{ page }}</ng-template>
		<ng-template #defaultPages let-page let-pages="pages" let-disabled="disabled">
			<li
				*ngFor="let pageNumber of pages"
				class="page-item"
				[class.active]="pageNumber === page"
				[class.disabled]="isEllipsis(pageNumber) || disabled"
				[attr.aria-current]="pageNumber === page ? 'page' : null"
			>
				<a *ngIf="isEllipsis(pageNumber)" class="page-link" tabindex="-1" aria-disabled="true">
					<ng-template
						[ngTemplateOutlet]="tplEllipsis?.templateRef || ellipsis"
						[ngTemplateOutletContext]="{ disabled: true, currentPage: page }"
					></ng-template>
				</a>
				<a
					*ngIf="!isEllipsis(pageNumber)"
					class="page-link"
					href
					(click)="selectPage(pageNumber); $event.preventDefault()"
					[attr.tabindex]="disabled ? '-1' : null"
					[attr.aria-disabled]="disabled ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplNumber?.templateRef || defaultNumber"
						[ngTemplateOutletContext]="{ disabled: disabled, $implicit: pageNumber, currentPage: page }"
					></ng-template>
				</a>
			</li>
		</ng-template>
		<ul [class]="'pagination' + (size ? ' pagination-' + size : '')">
			<li *ngIf="boundaryLinks" class="page-item" [class.disabled]="previousDisabled()">
				<a
					aria-label="First"
					i18n-aria-label="@@ngb.pagination.first-aria"
					class="page-link"
					href
					(click)="selectPage(1); $event.preventDefault()"
					[attr.tabindex]="previousDisabled() ? '-1' : null"
					[attr.aria-disabled]="previousDisabled() ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplFirst?.templateRef || first"
						[ngTemplateOutletContext]="{ disabled: previousDisabled(), currentPage: page }"
					></ng-template>
				</a>
			</li>

			<li *ngIf="directionLinks" class="page-item" [class.disabled]="previousDisabled()">
				<a
					aria-label="Previous"
					i18n-aria-label="@@ngb.pagination.previous-aria"
					class="page-link"
					href
					(click)="selectPage(page - 1); $event.preventDefault()"
					[attr.tabindex]="previousDisabled() ? '-1' : null"
					[attr.aria-disabled]="previousDisabled() ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplPrevious?.templateRef || previous"
						[ngTemplateOutletContext]="{ disabled: previousDisabled() }"
					></ng-template>
				</a>
			</li>
			<ng-template
				[ngTemplateOutlet]="tplPages?.templateRef || defaultPages"
				[ngTemplateOutletContext]="{ $implicit: page, pages: pages, disabled: disabled }"
			>
			</ng-template>
			<li *ngIf="directionLinks" class="page-item" [class.disabled]="nextDisabled()">
				<a
					aria-label="Next"
					i18n-aria-label="@@ngb.pagination.next-aria"
					class="page-link"
					href
					(click)="selectPage(page + 1); $event.preventDefault()"
					[attr.tabindex]="nextDisabled() ? '-1' : null"
					[attr.aria-disabled]="nextDisabled() ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplNext?.templateRef || next"
						[ngTemplateOutletContext]="{ disabled: nextDisabled(), currentPage: page }"
					></ng-template>
				</a>
			</li>

			<li *ngIf="boundaryLinks" class="page-item" [class.disabled]="nextDisabled()">
				<a
					aria-label="Last"
					i18n-aria-label="@@ngb.pagination.last-aria"
					class="page-link"
					href
					(click)="selectPage(pageCount); $event.preventDefault()"
					[attr.tabindex]="nextDisabled() ? '-1' : null"
					[attr.aria-disabled]="nextDisabled() ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplLast?.templateRef || last"
						[ngTemplateOutletContext]="{ disabled: nextDisabled(), currentPage: page }"
					></ng-template>
				</a>
			</li>
		</ul>
	`, isInline: true, dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
export { NgbPagination };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPagination, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-pagination',
                    standalone: true,
                    imports: [NgIf, NgFor, NgTemplateOutlet],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: { role: 'navigation' },
                    template: `
		<ng-template #first><span aria-hidden="true" i18n="@@ngb.pagination.first">&laquo;&laquo;</span></ng-template>
		<ng-template #previous><span aria-hidden="true" i18n="@@ngb.pagination.previous">&laquo;</span></ng-template>
		<ng-template #next><span aria-hidden="true" i18n="@@ngb.pagination.next">&raquo;</span></ng-template>
		<ng-template #last><span aria-hidden="true" i18n="@@ngb.pagination.last">&raquo;&raquo;</span></ng-template>
		<ng-template #ellipsis>...</ng-template>
		<ng-template #defaultNumber let-page let-currentPage="currentPage">{{ page }}</ng-template>
		<ng-template #defaultPages let-page let-pages="pages" let-disabled="disabled">
			<li
				*ngFor="let pageNumber of pages"
				class="page-item"
				[class.active]="pageNumber === page"
				[class.disabled]="isEllipsis(pageNumber) || disabled"
				[attr.aria-current]="pageNumber === page ? 'page' : null"
			>
				<a *ngIf="isEllipsis(pageNumber)" class="page-link" tabindex="-1" aria-disabled="true">
					<ng-template
						[ngTemplateOutlet]="tplEllipsis?.templateRef || ellipsis"
						[ngTemplateOutletContext]="{ disabled: true, currentPage: page }"
					></ng-template>
				</a>
				<a
					*ngIf="!isEllipsis(pageNumber)"
					class="page-link"
					href
					(click)="selectPage(pageNumber); $event.preventDefault()"
					[attr.tabindex]="disabled ? '-1' : null"
					[attr.aria-disabled]="disabled ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplNumber?.templateRef || defaultNumber"
						[ngTemplateOutletContext]="{ disabled: disabled, $implicit: pageNumber, currentPage: page }"
					></ng-template>
				</a>
			</li>
		</ng-template>
		<ul [class]="'pagination' + (size ? ' pagination-' + size : '')">
			<li *ngIf="boundaryLinks" class="page-item" [class.disabled]="previousDisabled()">
				<a
					aria-label="First"
					i18n-aria-label="@@ngb.pagination.first-aria"
					class="page-link"
					href
					(click)="selectPage(1); $event.preventDefault()"
					[attr.tabindex]="previousDisabled() ? '-1' : null"
					[attr.aria-disabled]="previousDisabled() ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplFirst?.templateRef || first"
						[ngTemplateOutletContext]="{ disabled: previousDisabled(), currentPage: page }"
					></ng-template>
				</a>
			</li>

			<li *ngIf="directionLinks" class="page-item" [class.disabled]="previousDisabled()">
				<a
					aria-label="Previous"
					i18n-aria-label="@@ngb.pagination.previous-aria"
					class="page-link"
					href
					(click)="selectPage(page - 1); $event.preventDefault()"
					[attr.tabindex]="previousDisabled() ? '-1' : null"
					[attr.aria-disabled]="previousDisabled() ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplPrevious?.templateRef || previous"
						[ngTemplateOutletContext]="{ disabled: previousDisabled() }"
					></ng-template>
				</a>
			</li>
			<ng-template
				[ngTemplateOutlet]="tplPages?.templateRef || defaultPages"
				[ngTemplateOutletContext]="{ $implicit: page, pages: pages, disabled: disabled }"
			>
			</ng-template>
			<li *ngIf="directionLinks" class="page-item" [class.disabled]="nextDisabled()">
				<a
					aria-label="Next"
					i18n-aria-label="@@ngb.pagination.next-aria"
					class="page-link"
					href
					(click)="selectPage(page + 1); $event.preventDefault()"
					[attr.tabindex]="nextDisabled() ? '-1' : null"
					[attr.aria-disabled]="nextDisabled() ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplNext?.templateRef || next"
						[ngTemplateOutletContext]="{ disabled: nextDisabled(), currentPage: page }"
					></ng-template>
				</a>
			</li>

			<li *ngIf="boundaryLinks" class="page-item" [class.disabled]="nextDisabled()">
				<a
					aria-label="Last"
					i18n-aria-label="@@ngb.pagination.last-aria"
					class="page-link"
					href
					(click)="selectPage(pageCount); $event.preventDefault()"
					[attr.tabindex]="nextDisabled() ? '-1' : null"
					[attr.aria-disabled]="nextDisabled() ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplLast?.templateRef || last"
						[ngTemplateOutletContext]="{ disabled: nextDisabled(), currentPage: page }"
					></ng-template>
				</a>
			</li>
		</ul>
	`,
                }]
        }], ctorParameters: function () { return [{ type: i1.NgbPaginationConfig }]; }, propDecorators: { tplEllipsis: [{
                type: ContentChild,
                args: [NgbPaginationEllipsis, { static: false }]
            }], tplFirst: [{
                type: ContentChild,
                args: [NgbPaginationFirst, { static: false }]
            }], tplLast: [{
                type: ContentChild,
                args: [NgbPaginationLast, { static: false }]
            }], tplNext: [{
                type: ContentChild,
                args: [NgbPaginationNext, { static: false }]
            }], tplNumber: [{
                type: ContentChild,
                args: [NgbPaginationNumber, { static: false }]
            }], tplPrevious: [{
                type: ContentChild,
                args: [NgbPaginationPrevious, { static: false }]
            }], tplPages: [{
                type: ContentChild,
                args: [NgbPaginationPages, { static: false }]
            }], disabled: [{
                type: Input
            }], boundaryLinks: [{
                type: Input
            }], directionLinks: [{
                type: Input
            }], ellipses: [{
                type: Input
            }], rotate: [{
                type: Input
            }], collectionSize: [{
                type: Input,
                args: [{ required: true }]
            }], maxSize: [{
                type: Input
            }], page: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageChange: [{
                type: Output
            }], size: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wYWdpbmF0aW9uL3BhZ2luYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNOLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUVOLHVCQUF1QixHQUd2QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV6RCxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFnRWhFOzs7O0dBSUc7QUFDSCxNQUNhLHFCQUFxQjtJQUNqQyxZQUFtQixXQUFrRDtRQUFsRCxnQkFBVyxHQUFYLFdBQVcsQ0FBdUM7SUFBRyxDQUFDOzhHQUQ3RCxxQkFBcUI7a0dBQXJCLHFCQUFxQjs7U0FBckIscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBRGpDLFNBQVM7bUJBQUMsRUFBRSxRQUFRLEVBQUUsb0NBQW9DLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTs7QUFLL0U7Ozs7R0FJRztBQUNILE1BQ2Esa0JBQWtCO0lBQzlCLFlBQW1CLFdBQWtEO1FBQWxELGdCQUFXLEdBQVgsV0FBVyxDQUF1QztJQUFHLENBQUM7OEdBRDdELGtCQUFrQjtrR0FBbEIsa0JBQWtCOztTQUFsQixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFEOUIsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSxpQ0FBaUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFOztBQUs1RTs7OztHQUlHO0FBQ0gsTUFDYSxpQkFBaUI7SUFDN0IsWUFBbUIsV0FBa0Q7UUFBbEQsZ0JBQVcsR0FBWCxXQUFXLENBQXVDO0lBQUcsQ0FBQzs4R0FEN0QsaUJBQWlCO2tHQUFqQixpQkFBaUI7O1NBQWpCLGlCQUFpQjsy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QUUsUUFBUSxFQUFFLElBQUksRUFBRTtnQkFLaEIsT0FBTztzQkFBZixLQUFLO2dCQU9HLElBQUk7c0JBQVosS0FBSztnQkFLRyxRQUFRO3NCQUFoQixLQUFLO2dCQVNJLFVBQVU7c0JBQW5CLE1BQU07Z0JBU0UsSUFBSTtzQkFBWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcblx0Q29tcG9uZW50LFxuXHRDb250ZW50Q2hpbGQsXG5cdERpcmVjdGl2ZSxcblx0RXZlbnRFbWl0dGVyLFxuXHRJbnB1dCxcblx0T3V0cHV0LFxuXHRPbkNoYW5nZXMsXG5cdENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuXHRTaW1wbGVDaGFuZ2VzLFxuXHRUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBnZXRWYWx1ZUluUmFuZ2UsIGlzTnVtYmVyIH0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7IE5nYlBhZ2luYXRpb25Db25maWcgfSBmcm9tICcuL3BhZ2luYXRpb24tY29uZmlnJztcbmltcG9ydCB7IE5nRm9yLCBOZ0lmLCBOZ1RlbXBsYXRlT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuLyoqXG4gKiBBIGNvbnRleHQgZm9yIHRoZVxuICogKiBgTmdiUGFnaW5hdGlvbkZpcnN0YFxuICogKiBgTmdiUGFnaW5hdGlvblByZXZpb3VzYFxuICogKiBgTmdiUGFnaW5hdGlvbk5leHRgXG4gKiAqIGBOZ2JQYWdpbmF0aW9uTGFzdGBcbiAqICogYE5nYlBhZ2luYXRpb25FbGxpcHNpc2BcbiAqICogYE5nYlBhZ2luYXRpb25QYWdlc2BcbiAqXG4gKiBsaW5rIHRlbXBsYXRlcyBpbiBjYXNlIHlvdSB3YW50IHRvIG92ZXJyaWRlIG9uZS5cbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JQYWdpbmF0aW9uTGlua0NvbnRleHQge1xuXHQvKipcblx0ICogUGFnZSBudW1iZXIgZGlzcGxheWVkIGJ5IHRoZSBjdXJyZW50IGxpbmsuXG5cdCAqL1xuXHRjdXJyZW50UGFnZTogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIHRoZSBjdXJyZW50IGxpbmsgaXMgZGlzYWJsZWQuXG5cdCAqL1xuXHRkaXNhYmxlZDogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBIGNvbnRleHQgZm9yIHRoZSBgTmdiUGFnaW5hdGlvbk51bWJlcmAgbGluayB0ZW1wbGF0ZSBpbiBjYXNlIHlvdSB3YW50IHRvIG92ZXJyaWRlIG9uZS5cbiAqXG4gKiBFeHRlbmRzIGBOZ2JQYWdpbmF0aW9uTGlua0NvbnRleHRgLlxuICpcbiAqIEBzaW5jZSA0LjEuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYlBhZ2luYXRpb25OdW1iZXJDb250ZXh0IGV4dGVuZHMgTmdiUGFnaW5hdGlvbkxpbmtDb250ZXh0IHtcblx0LyoqXG5cdCAqIFRoZSBwYWdlIG51bWJlciwgZGlzcGxheWVkIGJ5IHRoZSBjdXJyZW50IHBhZ2UgbGluay5cblx0ICovXG5cdCRpbXBsaWNpdDogbnVtYmVyO1xufVxuXG4vKipcbiAqIEEgY29udGV4dCBmb3IgdGhlIGBOZ2JQYWdpbmF0aW9uUGFnZXNgIHBhZ2VzIHRlbXBsYXRlIGluIGNhc2UgeW91IHdhbnQgdG8gb3ZlcnJpZGVcbiAqIHRoZSB3YXkgYWxsIHBhZ2VzIGFyZSBkaXNwbGF5ZWQuXG4gKlxuICogQHNpbmNlIDkuMS4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiUGFnaW5hdGlvblBhZ2VzQ29udGV4dCB7XG5cdC8qKlxuXHQgKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIHBhZ2UgbnVtYmVyLlxuXHQgKi9cblx0JGltcGxpY2l0OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgcGFnaW5hdGlvbiBpcyBkaXNhYmxlZC5cblx0ICovXG5cdGRpc2FibGVkOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBQYWdlcyBudW1iZXJzIHRoYXQgc2hvdWxkIGJlIHJlbmRlcmVkIHN0YXJ0aW5nIHdpdGggMS5cblx0ICovXG5cdHBhZ2VzOiBudW1iZXJbXTtcbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXRjaCB0aGUgJ2VsbGlwc2lzJyBsaW5rIHRlbXBsYXRlXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlBhZ2luYXRpb25FbGxpcHNpc10nLCBzdGFuZGFsb25lOiB0cnVlIH0pXG5leHBvcnQgY2xhc3MgTmdiUGFnaW5hdGlvbkVsbGlwc2lzIHtcblx0Y29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxOZ2JQYWdpbmF0aW9uTGlua0NvbnRleHQ+KSB7fVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIG1hdGNoIHRoZSAnZmlyc3QnIGxpbmsgdGVtcGxhdGVcbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFnaW5hdGlvbkZpcnN0XScsIHN0YW5kYWxvbmU6IHRydWUgfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uRmlyc3Qge1xuXHRjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPE5nYlBhZ2luYXRpb25MaW5rQ29udGV4dD4pIHt9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdG8gbWF0Y2ggdGhlICdsYXN0JyBsaW5rIHRlbXBsYXRlXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlBhZ2luYXRpb25MYXN0XScsIHN0YW5kYWxvbmU6IHRydWUgfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uTGFzdCB7XG5cdGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TmdiUGFnaW5hdGlvbkxpbmtDb250ZXh0Pikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXRjaCB0aGUgJ25leHQnIGxpbmsgdGVtcGxhdGVcbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFnaW5hdGlvbk5leHRdJywgc3RhbmRhbG9uZTogdHJ1ZSB9KVxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb25OZXh0IHtcblx0Y29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxOZ2JQYWdpbmF0aW9uTGlua0NvbnRleHQ+KSB7fVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIG1hdGNoIHRoZSBwYWdlICdudW1iZXInIGxpbmsgdGVtcGxhdGVcbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFnaW5hdGlvbk51bWJlcl0nLCBzdGFuZGFsb25lOiB0cnVlIH0pXG5leHBvcnQgY2xhc3MgTmdiUGFnaW5hdGlvbk51bWJlciB7XG5cdGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TmdiUGFnaW5hdGlvbk51bWJlckNvbnRleHQ+KSB7fVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIG1hdGNoIHRoZSAncHJldmlvdXMnIGxpbmsgdGVtcGxhdGVcbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFnaW5hdGlvblByZXZpb3VzXScsIHN0YW5kYWxvbmU6IHRydWUgfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uUHJldmlvdXMge1xuXHRjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPE5nYlBhZ2luYXRpb25MaW5rQ29udGV4dD4pIHt9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdG8gbWF0Y2ggdGhlICdwYWdlcycgd2hvbGUgY29udGVudFxuICpcbiAqIEBzaW5jZSA5LjEuMFxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYWdpbmF0aW9uUGFnZXNdJywgc3RhbmRhbG9uZTogdHJ1ZSB9KVxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb25QYWdlcyB7XG5cdGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TmdiUGFnaW5hdGlvblBhZ2VzQ29udGV4dD4pIHt9XG59XG5cbi8qKlxuICogQSBjb21wb25lbnQgdGhhdCBkaXNwbGF5cyBwYWdlIG51bWJlcnMgYW5kIGFsbG93cyB0byBjdXN0b21pemUgdGhlbSBpbiBzZXZlcmFsIHdheXMuXG4gKi9cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ25nYi1wYWdpbmF0aW9uJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aW1wb3J0czogW05nSWYsIE5nRm9yLCBOZ1RlbXBsYXRlT3V0bGV0XSxcblx0Y2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG5cdGhvc3Q6IHsgcm9sZTogJ25hdmlnYXRpb24nIH0sXG5cdHRlbXBsYXRlOiBgXG5cdFx0PG5nLXRlbXBsYXRlICNmaXJzdD48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBpMThuPVwiQEBuZ2IucGFnaW5hdGlvbi5maXJzdFwiPiZsYXF1bzsmbGFxdW87PC9zcGFuPjwvbmctdGVtcGxhdGU+XG5cdFx0PG5nLXRlbXBsYXRlICNwcmV2aW91cz48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBpMThuPVwiQEBuZ2IucGFnaW5hdGlvbi5wcmV2aW91c1wiPiZsYXF1bzs8L3NwYW4+PC9uZy10ZW1wbGF0ZT5cblx0XHQ8bmctdGVtcGxhdGUgI25leHQ+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgaTE4bj1cIkBAbmdiLnBhZ2luYXRpb24ubmV4dFwiPiZyYXF1bzs8L3NwYW4+PC9uZy10ZW1wbGF0ZT5cblx0XHQ8bmctdGVtcGxhdGUgI2xhc3Q+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgaTE4bj1cIkBAbmdiLnBhZ2luYXRpb24ubGFzdFwiPiZyYXF1bzsmcmFxdW87PC9zcGFuPjwvbmctdGVtcGxhdGU+XG5cdFx0PG5nLXRlbXBsYXRlICNlbGxpcHNpcz4uLi48L25nLXRlbXBsYXRlPlxuXHRcdDxuZy10ZW1wbGF0ZSAjZGVmYXVsdE51bWJlciBsZXQtcGFnZSBsZXQtY3VycmVudFBhZ2U9XCJjdXJyZW50UGFnZVwiPnt7IHBhZ2UgfX08L25nLXRlbXBsYXRlPlxuXHRcdDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFBhZ2VzIGxldC1wYWdlIGxldC1wYWdlcz1cInBhZ2VzXCIgbGV0LWRpc2FibGVkPVwiZGlzYWJsZWRcIj5cblx0XHRcdDxsaVxuXHRcdFx0XHQqbmdGb3I9XCJsZXQgcGFnZU51bWJlciBvZiBwYWdlc1wiXG5cdFx0XHRcdGNsYXNzPVwicGFnZS1pdGVtXCJcblx0XHRcdFx0W2NsYXNzLmFjdGl2ZV09XCJwYWdlTnVtYmVyID09PSBwYWdlXCJcblx0XHRcdFx0W2NsYXNzLmRpc2FibGVkXT1cImlzRWxsaXBzaXMocGFnZU51bWJlcikgfHwgZGlzYWJsZWRcIlxuXHRcdFx0XHRbYXR0ci5hcmlhLWN1cnJlbnRdPVwicGFnZU51bWJlciA9PT0gcGFnZSA/ICdwYWdlJyA6IG51bGxcIlxuXHRcdFx0PlxuXHRcdFx0XHQ8YSAqbmdJZj1cImlzRWxsaXBzaXMocGFnZU51bWJlcilcIiBjbGFzcz1cInBhZ2UtbGlua1wiIHRhYmluZGV4PVwiLTFcIiBhcmlhLWRpc2FibGVkPVwidHJ1ZVwiPlxuXHRcdFx0XHRcdDxuZy10ZW1wbGF0ZVxuXHRcdFx0XHRcdFx0W25nVGVtcGxhdGVPdXRsZXRdPVwidHBsRWxsaXBzaXM/LnRlbXBsYXRlUmVmIHx8IGVsbGlwc2lzXCJcblx0XHRcdFx0XHRcdFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IGRpc2FibGVkOiB0cnVlLCBjdXJyZW50UGFnZTogcGFnZSB9XCJcblx0XHRcdFx0XHQ+PC9uZy10ZW1wbGF0ZT5cblx0XHRcdFx0PC9hPlxuXHRcdFx0XHQ8YVxuXHRcdFx0XHRcdCpuZ0lmPVwiIWlzRWxsaXBzaXMocGFnZU51bWJlcilcIlxuXHRcdFx0XHRcdGNsYXNzPVwicGFnZS1saW5rXCJcblx0XHRcdFx0XHRocmVmXG5cdFx0XHRcdFx0KGNsaWNrKT1cInNlbGVjdFBhZ2UocGFnZU51bWJlcik7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcblx0XHRcdFx0XHRbYXR0ci50YWJpbmRleF09XCJkaXNhYmxlZCA/ICctMScgOiBudWxsXCJcblx0XHRcdFx0XHRbYXR0ci5hcmlhLWRpc2FibGVkXT1cImRpc2FibGVkID8gJ3RydWUnIDogbnVsbFwiXG5cdFx0XHRcdD5cblx0XHRcdFx0XHQ8bmctdGVtcGxhdGVcblx0XHRcdFx0XHRcdFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRwbE51bWJlcj8udGVtcGxhdGVSZWYgfHwgZGVmYXVsdE51bWJlclwiXG5cdFx0XHRcdFx0XHRbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBkaXNhYmxlZDogZGlzYWJsZWQsICRpbXBsaWNpdDogcGFnZU51bWJlciwgY3VycmVudFBhZ2U6IHBhZ2UgfVwiXG5cdFx0XHRcdFx0PjwvbmctdGVtcGxhdGU+XG5cdFx0XHRcdDwvYT5cblx0XHRcdDwvbGk+XG5cdFx0PC9uZy10ZW1wbGF0ZT5cblx0XHQ8dWwgW2NsYXNzXT1cIidwYWdpbmF0aW9uJyArIChzaXplID8gJyBwYWdpbmF0aW9uLScgKyBzaXplIDogJycpXCI+XG5cdFx0XHQ8bGkgKm5nSWY9XCJib3VuZGFyeUxpbmtzXCIgY2xhc3M9XCJwYWdlLWl0ZW1cIiBbY2xhc3MuZGlzYWJsZWRdPVwicHJldmlvdXNEaXNhYmxlZCgpXCI+XG5cdFx0XHRcdDxhXG5cdFx0XHRcdFx0YXJpYS1sYWJlbD1cIkZpcnN0XCJcblx0XHRcdFx0XHRpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5wYWdpbmF0aW9uLmZpcnN0LWFyaWFcIlxuXHRcdFx0XHRcdGNsYXNzPVwicGFnZS1saW5rXCJcblx0XHRcdFx0XHRocmVmXG5cdFx0XHRcdFx0KGNsaWNrKT1cInNlbGVjdFBhZ2UoMSk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcblx0XHRcdFx0XHRbYXR0ci50YWJpbmRleF09XCJwcmV2aW91c0Rpc2FibGVkKCkgPyAnLTEnIDogbnVsbFwiXG5cdFx0XHRcdFx0W2F0dHIuYXJpYS1kaXNhYmxlZF09XCJwcmV2aW91c0Rpc2FibGVkKCkgPyAndHJ1ZScgOiBudWxsXCJcblx0XHRcdFx0PlxuXHRcdFx0XHRcdDxuZy10ZW1wbGF0ZVxuXHRcdFx0XHRcdFx0W25nVGVtcGxhdGVPdXRsZXRdPVwidHBsRmlyc3Q/LnRlbXBsYXRlUmVmIHx8IGZpcnN0XCJcblx0XHRcdFx0XHRcdFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IGRpc2FibGVkOiBwcmV2aW91c0Rpc2FibGVkKCksIGN1cnJlbnRQYWdlOiBwYWdlIH1cIlxuXHRcdFx0XHRcdD48L25nLXRlbXBsYXRlPlxuXHRcdFx0XHQ8L2E+XG5cdFx0XHQ8L2xpPlxuXG5cdFx0XHQ8bGkgKm5nSWY9XCJkaXJlY3Rpb25MaW5rc1wiIGNsYXNzPVwicGFnZS1pdGVtXCIgW2NsYXNzLmRpc2FibGVkXT1cInByZXZpb3VzRGlzYWJsZWQoKVwiPlxuXHRcdFx0XHQ8YVxuXHRcdFx0XHRcdGFyaWEtbGFiZWw9XCJQcmV2aW91c1wiXG5cdFx0XHRcdFx0aTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IucGFnaW5hdGlvbi5wcmV2aW91cy1hcmlhXCJcblx0XHRcdFx0XHRjbGFzcz1cInBhZ2UtbGlua1wiXG5cdFx0XHRcdFx0aHJlZlxuXHRcdFx0XHRcdChjbGljayk9XCJzZWxlY3RQYWdlKHBhZ2UgLSAxKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuXHRcdFx0XHRcdFthdHRyLnRhYmluZGV4XT1cInByZXZpb3VzRGlzYWJsZWQoKSA/ICctMScgOiBudWxsXCJcblx0XHRcdFx0XHRbYXR0ci5hcmlhLWRpc2FibGVkXT1cInByZXZpb3VzRGlzYWJsZWQoKSA/ICd0cnVlJyA6IG51bGxcIlxuXHRcdFx0XHQ+XG5cdFx0XHRcdFx0PG5nLXRlbXBsYXRlXG5cdFx0XHRcdFx0XHRbbmdUZW1wbGF0ZU91dGxldF09XCJ0cGxQcmV2aW91cz8udGVtcGxhdGVSZWYgfHwgcHJldmlvdXNcIlxuXHRcdFx0XHRcdFx0W25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgZGlzYWJsZWQ6IHByZXZpb3VzRGlzYWJsZWQoKSB9XCJcblx0XHRcdFx0XHQ+PC9uZy10ZW1wbGF0ZT5cblx0XHRcdFx0PC9hPlxuXHRcdFx0PC9saT5cblx0XHRcdDxuZy10ZW1wbGF0ZVxuXHRcdFx0XHRbbmdUZW1wbGF0ZU91dGxldF09XCJ0cGxQYWdlcz8udGVtcGxhdGVSZWYgfHwgZGVmYXVsdFBhZ2VzXCJcblx0XHRcdFx0W25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBwYWdlLCBwYWdlczogcGFnZXMsIGRpc2FibGVkOiBkaXNhYmxlZCB9XCJcblx0XHRcdD5cblx0XHRcdDwvbmctdGVtcGxhdGU+XG5cdFx0XHQ8bGkgKm5nSWY9XCJkaXJlY3Rpb25MaW5rc1wiIGNsYXNzPVwicGFnZS1pdGVtXCIgW2NsYXNzLmRpc2FibGVkXT1cIm5leHREaXNhYmxlZCgpXCI+XG5cdFx0XHRcdDxhXG5cdFx0XHRcdFx0YXJpYS1sYWJlbD1cIk5leHRcIlxuXHRcdFx0XHRcdGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnBhZ2luYXRpb24ubmV4dC1hcmlhXCJcblx0XHRcdFx0XHRjbGFzcz1cInBhZ2UtbGlua1wiXG5cdFx0XHRcdFx0aHJlZlxuXHRcdFx0XHRcdChjbGljayk9XCJzZWxlY3RQYWdlKHBhZ2UgKyAxKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuXHRcdFx0XHRcdFthdHRyLnRhYmluZGV4XT1cIm5leHREaXNhYmxlZCgpID8gJy0xJyA6IG51bGxcIlxuXHRcdFx0XHRcdFthdHRyLmFyaWEtZGlzYWJsZWRdPVwibmV4dERpc2FibGVkKCkgPyAndHJ1ZScgOiBudWxsXCJcblx0XHRcdFx0PlxuXHRcdFx0XHRcdDxuZy10ZW1wbGF0ZVxuXHRcdFx0XHRcdFx0W25nVGVtcGxhdGVPdXRsZXRdPVwidHBsTmV4dD8udGVtcGxhdGVSZWYgfHwgbmV4dFwiXG5cdFx0XHRcdFx0XHRbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBkaXNhYmxlZDogbmV4dERpc2FibGVkKCksIGN1cnJlbnRQYWdlOiBwYWdlIH1cIlxuXHRcdFx0XHRcdD48L25nLXRlbXBsYXRlPlxuXHRcdFx0XHQ8L2E+XG5cdFx0XHQ8L2xpPlxuXG5cdFx0XHQ8bGkgKm5nSWY9XCJib3VuZGFyeUxpbmtzXCIgY2xhc3M9XCJwYWdlLWl0ZW1cIiBbY2xhc3MuZGlzYWJsZWRdPVwibmV4dERpc2FibGVkKClcIj5cblx0XHRcdFx0PGFcblx0XHRcdFx0XHRhcmlhLWxhYmVsPVwiTGFzdFwiXG5cdFx0XHRcdFx0aTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IucGFnaW5hdGlvbi5sYXN0LWFyaWFcIlxuXHRcdFx0XHRcdGNsYXNzPVwicGFnZS1saW5rXCJcblx0XHRcdFx0XHRocmVmXG5cdFx0XHRcdFx0KGNsaWNrKT1cInNlbGVjdFBhZ2UocGFnZUNvdW50KTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuXHRcdFx0XHRcdFthdHRyLnRhYmluZGV4XT1cIm5leHREaXNhYmxlZCgpID8gJy0xJyA6IG51bGxcIlxuXHRcdFx0XHRcdFthdHRyLmFyaWEtZGlzYWJsZWRdPVwibmV4dERpc2FibGVkKCkgPyAndHJ1ZScgOiBudWxsXCJcblx0XHRcdFx0PlxuXHRcdFx0XHRcdDxuZy10ZW1wbGF0ZVxuXHRcdFx0XHRcdFx0W25nVGVtcGxhdGVPdXRsZXRdPVwidHBsTGFzdD8udGVtcGxhdGVSZWYgfHwgbGFzdFwiXG5cdFx0XHRcdFx0XHRbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBkaXNhYmxlZDogbmV4dERpc2FibGVkKCksIGN1cnJlbnRQYWdlOiBwYWdlIH1cIlxuXHRcdFx0XHRcdD48L25nLXRlbXBsYXRlPlxuXHRcdFx0XHQ8L2E+XG5cdFx0XHQ8L2xpPlxuXHRcdDwvdWw+XG5cdGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb24gaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXHRwYWdlQ291bnQgPSAwO1xuXHRwYWdlczogbnVtYmVyW10gPSBbXTtcblxuXHRAQ29udGVudENoaWxkKE5nYlBhZ2luYXRpb25FbGxpcHNpcywgeyBzdGF0aWM6IGZhbHNlIH0pIHRwbEVsbGlwc2lzPzogTmdiUGFnaW5hdGlvbkVsbGlwc2lzO1xuXHRAQ29udGVudENoaWxkKE5nYlBhZ2luYXRpb25GaXJzdCwgeyBzdGF0aWM6IGZhbHNlIH0pIHRwbEZpcnN0PzogTmdiUGFnaW5hdGlvbkZpcnN0O1xuXHRAQ29udGVudENoaWxkKE5nYlBhZ2luYXRpb25MYXN0LCB7IHN0YXRpYzogZmFsc2UgfSkgdHBsTGFzdD86IE5nYlBhZ2luYXRpb25MYXN0O1xuXHRAQ29udGVudENoaWxkKE5nYlBhZ2luYXRpb25OZXh0LCB7IHN0YXRpYzogZmFsc2UgfSkgdHBsTmV4dD86IE5nYlBhZ2luYXRpb25OZXh0O1xuXHRAQ29udGVudENoaWxkKE5nYlBhZ2luYXRpb25OdW1iZXIsIHsgc3RhdGljOiBmYWxzZSB9KSB0cGxOdW1iZXI/OiBOZ2JQYWdpbmF0aW9uTnVtYmVyO1xuXHRAQ29udGVudENoaWxkKE5nYlBhZ2luYXRpb25QcmV2aW91cywgeyBzdGF0aWM6IGZhbHNlIH0pIHRwbFByZXZpb3VzPzogTmdiUGFnaW5hdGlvblByZXZpb3VzO1xuXHRAQ29udGVudENoaWxkKE5nYlBhZ2luYXRpb25QYWdlcywgeyBzdGF0aWM6IGZhbHNlIH0pIHRwbFBhZ2VzPzogTmdiUGFnaW5hdGlvblBhZ2VzO1xuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIHBhZ2luYXRpb24gbGlua3Mgd2lsbCBiZSBkaXNhYmxlZC5cblx0ICovXG5cdEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIHRoZSBcIkZpcnN0XCIgYW5kIFwiTGFzdFwiIHBhZ2UgbGlua3MgYXJlIHNob3duLlxuXHQgKi9cblx0QElucHV0KCkgYm91bmRhcnlMaW5rczogYm9vbGVhbjtcblxuXHQvKipcblx0ICogSWYgYHRydWVgLCB0aGUgXCJOZXh0XCIgYW5kIFwiUHJldmlvdXNcIiBwYWdlIGxpbmtzIGFyZSBzaG93bi5cblx0ICovXG5cdEBJbnB1dCgpIGRpcmVjdGlvbkxpbmtzOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIHRoZSBlbGxpcHNpcyBzeW1ib2xzIGFuZCBmaXJzdC9sYXN0IHBhZ2UgbnVtYmVycyB3aWxsIGJlIHNob3duIHdoZW4gYG1heFNpemVgID4gbnVtYmVyIG9mIHBhZ2VzLlxuXHQgKi9cblx0QElucHV0KCkgZWxsaXBzZXM6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdG8gcm90YXRlIHBhZ2VzIHdoZW4gYG1heFNpemVgID4gbnVtYmVyIG9mIHBhZ2VzLlxuXHQgKlxuXHQgKiBUaGUgY3VycmVudCBwYWdlIGFsd2F5cyBzdGF5cyBpbiB0aGUgbWlkZGxlIGlmIGB0cnVlYC5cblx0ICovXG5cdEBJbnB1dCgpIHJvdGF0ZTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogIFRoZSBudW1iZXIgb2YgaXRlbXMgaW4geW91ciBwYWdpbmF0ZWQgY29sbGVjdGlvbi5cblx0ICpcblx0ICogIE5vdGUsIHRoYXQgdGhpcyBpcyBub3QgdGhlIG51bWJlciBvZiBwYWdlcy4gUGFnZSBudW1iZXJzIGFyZSBjYWxjdWxhdGVkIGR5bmFtaWNhbGx5IGJhc2VkIG9uXG5cdCAqICBgY29sbGVjdGlvblNpemVgIGFuZCBgcGFnZVNpemVgLiBFeC4gaWYgeW91IGhhdmUgMTAwIGl0ZW1zIGluIHlvdXIgY29sbGVjdGlvbiBhbmQgZGlzcGxheWluZyAyMCBpdGVtcyBwZXIgcGFnZSxcblx0ICogIHlvdSdsbCBlbmQgdXAgd2l0aCA1IHBhZ2VzLlxuXHQgKi9cblx0QElucHV0KHsgcmVxdWlyZWQ6IHRydWUgfSkgY29sbGVjdGlvblNpemU6IG51bWJlcjtcblxuXHQvKipcblx0ICogIFRoZSBtYXhpbXVtIG51bWJlciBvZiBwYWdlcyB0byBkaXNwbGF5LlxuXHQgKi9cblx0QElucHV0KCkgbWF4U2l6ZTogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiAgVGhlIGN1cnJlbnQgcGFnZS5cblx0ICpcblx0ICogIFBhZ2UgbnVtYmVycyBzdGFydCB3aXRoIGAxYC5cblx0ICovXG5cdEBJbnB1dCgpIHBhZ2UgPSAxO1xuXG5cdC8qKlxuXHQgKiAgVGhlIG51bWJlciBvZiBpdGVtcyBwZXIgcGFnZS5cblx0ICovXG5cdEBJbnB1dCgpIHBhZ2VTaXplOiBudW1iZXI7XG5cblx0LyoqXG5cdCAqICBBbiBldmVudCBmaXJlZCB3aGVuIHRoZSBwYWdlIGlzIGNoYW5nZWQuIFdpbGwgZmlyZSBvbmx5IGlmIGNvbGxlY3Rpb24gc2l6ZSBpcyBzZXQgYW5kIGFsbCB2YWx1ZXMgYXJlIHZhbGlkLlxuXHQgKlxuXHQgKiAgRXZlbnQgcGF5bG9hZCBpcyB0aGUgbnVtYmVyIG9mIHRoZSBuZXdseSBzZWxlY3RlZCBwYWdlLlxuXHQgKlxuXHQgKiAgUGFnZSBudW1iZXJzIHN0YXJ0IHdpdGggYDFgLlxuXHQgKi9cblx0QE91dHB1dCgpIHBhZ2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4odHJ1ZSk7XG5cblx0LyoqXG5cdCAqIFRoZSBwYWdpbmF0aW9uIGRpc3BsYXkgc2l6ZS5cblx0ICpcblx0ICogQm9vdHN0cmFwIGN1cnJlbnRseSBzdXBwb3J0cyBzbWFsbCBhbmQgbGFyZ2Ugc2l6ZXMuXG5cdCAqXG5cdCAqIElmIHRoZSBwYXNzZWQgdmFsdWUgaXMgYSBzdHJpbmcgKGV4LiAnY3VzdG9tJyksIGl0IHdpbGwganVzdCBhZGQgdGhlIGBwYWdpbmF0aW9uLWN1c3RvbWAgY3NzIGNsYXNzXG5cdCAqL1xuXHRASW5wdXQoKSBzaXplOiAnc20nIHwgJ2xnJyB8IHN0cmluZyB8IG51bGw7XG5cblx0Y29uc3RydWN0b3IoY29uZmlnOiBOZ2JQYWdpbmF0aW9uQ29uZmlnKSB7XG5cdFx0dGhpcy5kaXNhYmxlZCA9IGNvbmZpZy5kaXNhYmxlZDtcblx0XHR0aGlzLmJvdW5kYXJ5TGlua3MgPSBjb25maWcuYm91bmRhcnlMaW5rcztcblx0XHR0aGlzLmRpcmVjdGlvbkxpbmtzID0gY29uZmlnLmRpcmVjdGlvbkxpbmtzO1xuXHRcdHRoaXMuZWxsaXBzZXMgPSBjb25maWcuZWxsaXBzZXM7XG5cdFx0dGhpcy5tYXhTaXplID0gY29uZmlnLm1heFNpemU7XG5cdFx0dGhpcy5wYWdlU2l6ZSA9IGNvbmZpZy5wYWdlU2l6ZTtcblx0XHR0aGlzLnJvdGF0ZSA9IGNvbmZpZy5yb3RhdGU7XG5cdFx0dGhpcy5zaXplID0gY29uZmlnLnNpemU7XG5cdH1cblxuXHRoYXNQcmV2aW91cygpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5wYWdlID4gMTtcblx0fVxuXG5cdGhhc05leHQoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMucGFnZSA8IHRoaXMucGFnZUNvdW50O1xuXHR9XG5cblx0bmV4dERpc2FibGVkKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiAhdGhpcy5oYXNOZXh0KCkgfHwgdGhpcy5kaXNhYmxlZDtcblx0fVxuXG5cdHByZXZpb3VzRGlzYWJsZWQoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuICF0aGlzLmhhc1ByZXZpb3VzKCkgfHwgdGhpcy5kaXNhYmxlZDtcblx0fVxuXG5cdHNlbGVjdFBhZ2UocGFnZU51bWJlcjogbnVtYmVyKTogdm9pZCB7XG5cdFx0dGhpcy5fdXBkYXRlUGFnZXMocGFnZU51bWJlcik7XG5cdH1cblxuXHRuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG5cdFx0dGhpcy5fdXBkYXRlUGFnZXModGhpcy5wYWdlKTtcblx0fVxuXG5cdGlzRWxsaXBzaXMocGFnZU51bWJlcik6IGJvb2xlYW4ge1xuXHRcdHJldHVybiBwYWdlTnVtYmVyID09PSAtMTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBcHBlbmRzIGVsbGlwc2VzIGFuZCBmaXJzdC9sYXN0IHBhZ2UgbnVtYmVyIHRvIHRoZSBkaXNwbGF5ZWQgcGFnZXNcblx0ICovXG5cdHByaXZhdGUgX2FwcGx5RWxsaXBzZXMoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpIHtcblx0XHRpZiAodGhpcy5lbGxpcHNlcykge1xuXHRcdFx0aWYgKHN0YXJ0ID4gMCkge1xuXHRcdFx0XHQvLyBUaGUgZmlyc3QgcGFnZSB3aWxsIGFsd2F5cyBiZSBpbmNsdWRlZC4gSWYgdGhlIGRpc3BsYXllZCByYW5nZVxuXHRcdFx0XHQvLyBzdGFydHMgYWZ0ZXIgdGhlIHRoaXJkIHBhZ2UsIHRoZW4gYWRkIGVsbGlwc2lzLiBCdXQgaWYgdGhlIHJhbmdlXG5cdFx0XHRcdC8vIHN0YXJ0cyBvbiB0aGUgdGhpcmQgcGFnZSwgdGhlbiBhZGQgdGhlIHNlY29uZCBwYWdlIGluc3RlYWQgb2Zcblx0XHRcdFx0Ly8gYW4gZWxsaXBzaXMsIGJlY2F1c2UgdGhlIGVsbGlwc2lzIHdvdWxkIG9ubHkgaGlkZSBhIHNpbmdsZSBwYWdlLlxuXHRcdFx0XHRpZiAoc3RhcnQgPiAyKSB7XG5cdFx0XHRcdFx0dGhpcy5wYWdlcy51bnNoaWZ0KC0xKTtcblx0XHRcdFx0fSBlbHNlIGlmIChzdGFydCA9PT0gMikge1xuXHRcdFx0XHRcdHRoaXMucGFnZXMudW5zaGlmdCgyKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLnBhZ2VzLnVuc2hpZnQoMSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZW5kIDwgdGhpcy5wYWdlQ291bnQpIHtcblx0XHRcdFx0Ly8gVGhlIGxhc3QgcGFnZSB3aWxsIGFsd2F5cyBiZSBpbmNsdWRlZC4gSWYgdGhlIGRpc3BsYXllZCByYW5nZVxuXHRcdFx0XHQvLyBlbmRzIGJlZm9yZSB0aGUgdGhpcmQtbGFzdCBwYWdlLCB0aGVuIGFkZCBlbGxpcHNpcy4gQnV0IGlmIHRoZSByYW5nZVxuXHRcdFx0XHQvLyBlbmRzIG9uIHRoaXJkLWxhc3QgcGFnZSwgdGhlbiBhZGQgdGhlIHNlY29uZC1sYXN0IHBhZ2UgaW5zdGVhZCBvZlxuXHRcdFx0XHQvLyBhbiBlbGxpcHNpcywgYmVjYXVzZSB0aGUgZWxsaXBzaXMgd291bGQgb25seSBoaWRlIGEgc2luZ2xlIHBhZ2UuXG5cdFx0XHRcdGlmIChlbmQgPCB0aGlzLnBhZ2VDb3VudCAtIDIpIHtcblx0XHRcdFx0XHR0aGlzLnBhZ2VzLnB1c2goLTEpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGVuZCA9PT0gdGhpcy5wYWdlQ291bnQgLSAyKSB7XG5cdFx0XHRcdFx0dGhpcy5wYWdlcy5wdXNoKHRoaXMucGFnZUNvdW50IC0gMSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5wYWdlcy5wdXNoKHRoaXMucGFnZUNvdW50KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUm90YXRlcyBwYWdlIG51bWJlcnMgYmFzZWQgb24gbWF4U2l6ZSBpdGVtcyB2aXNpYmxlLlxuXHQgKiBDdXJyZW50bHkgc2VsZWN0ZWQgcGFnZSBzdGF5cyBpbiB0aGUgbWlkZGxlOlxuXHQgKlxuXHQgKiBFeC4gZm9yIHNlbGVjdGVkIHBhZ2UgPSA2OlxuXHQgKiBbNSwqNiosN10gZm9yIG1heFNpemUgPSAzXG5cdCAqIFs0LDUsKjYqLDddIGZvciBtYXhTaXplID0gNFxuXHQgKi9cblx0cHJpdmF0ZSBfYXBwbHlSb3RhdGlvbigpOiBbbnVtYmVyLCBudW1iZXJdIHtcblx0XHRsZXQgc3RhcnQgPSAwO1xuXHRcdGxldCBlbmQgPSB0aGlzLnBhZ2VDb3VudDtcblx0XHRsZXQgbGVmdE9mZnNldCA9IE1hdGguZmxvb3IodGhpcy5tYXhTaXplIC8gMik7XG5cdFx0bGV0IHJpZ2h0T2Zmc2V0ID0gdGhpcy5tYXhTaXplICUgMiA9PT0gMCA/IGxlZnRPZmZzZXQgLSAxIDogbGVmdE9mZnNldDtcblxuXHRcdGlmICh0aGlzLnBhZ2UgPD0gbGVmdE9mZnNldCkge1xuXHRcdFx0Ly8gdmVyeSBiZWdpbm5pbmcsIG5vIHJvdGF0aW9uIC0+IFswLi5tYXhTaXplXVxuXHRcdFx0ZW5kID0gdGhpcy5tYXhTaXplO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5wYWdlQ291bnQgLSB0aGlzLnBhZ2UgPCBsZWZ0T2Zmc2V0KSB7XG5cdFx0XHQvLyB2ZXJ5IGVuZCwgbm8gcm90YXRpb24gLT4gW2xlbi1tYXhTaXplLi5sZW5dXG5cdFx0XHRzdGFydCA9IHRoaXMucGFnZUNvdW50IC0gdGhpcy5tYXhTaXplO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyByb3RhdGVcblx0XHRcdHN0YXJ0ID0gdGhpcy5wYWdlIC0gbGVmdE9mZnNldCAtIDE7XG5cdFx0XHRlbmQgPSB0aGlzLnBhZ2UgKyByaWdodE9mZnNldDtcblx0XHR9XG5cblx0XHRyZXR1cm4gW3N0YXJ0LCBlbmRdO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBhZ2luYXRlcyBwYWdlIG51bWJlcnMgYmFzZWQgb24gbWF4U2l6ZSBpdGVtcyBwZXIgcGFnZS5cblx0ICovXG5cdHByaXZhdGUgX2FwcGx5UGFnaW5hdGlvbigpOiBbbnVtYmVyLCBudW1iZXJdIHtcblx0XHRsZXQgcGFnZSA9IE1hdGguY2VpbCh0aGlzLnBhZ2UgLyB0aGlzLm1heFNpemUpIC0gMTtcblx0XHRsZXQgc3RhcnQgPSBwYWdlICogdGhpcy5tYXhTaXplO1xuXHRcdGxldCBlbmQgPSBzdGFydCArIHRoaXMubWF4U2l6ZTtcblxuXHRcdHJldHVybiBbc3RhcnQsIGVuZF07XG5cdH1cblxuXHRwcml2YXRlIF9zZXRQYWdlSW5SYW5nZShuZXdQYWdlTm8pIHtcblx0XHRjb25zdCBwcmV2UGFnZU5vID0gdGhpcy5wYWdlO1xuXHRcdHRoaXMucGFnZSA9IGdldFZhbHVlSW5SYW5nZShuZXdQYWdlTm8sIHRoaXMucGFnZUNvdW50LCAxKTtcblxuXHRcdGlmICh0aGlzLnBhZ2UgIT09IHByZXZQYWdlTm8gJiYgaXNOdW1iZXIodGhpcy5jb2xsZWN0aW9uU2l6ZSkpIHtcblx0XHRcdHRoaXMucGFnZUNoYW5nZS5lbWl0KHRoaXMucGFnZSk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfdXBkYXRlUGFnZXMobmV3UGFnZTogbnVtYmVyKSB7XG5cdFx0dGhpcy5wYWdlQ291bnQgPSBNYXRoLmNlaWwodGhpcy5jb2xsZWN0aW9uU2l6ZSAvIHRoaXMucGFnZVNpemUpO1xuXG5cdFx0aWYgKCFpc051bWJlcih0aGlzLnBhZ2VDb3VudCkpIHtcblx0XHRcdHRoaXMucGFnZUNvdW50ID0gMDtcblx0XHR9XG5cblx0XHQvLyBmaWxsLWluIG1vZGVsIG5lZWRlZCB0byByZW5kZXIgcGFnZXNcblx0XHR0aGlzLnBhZ2VzLmxlbmd0aCA9IDA7XG5cdFx0Zm9yIChsZXQgaSA9IDE7IGkgPD0gdGhpcy5wYWdlQ291bnQ7IGkrKykge1xuXHRcdFx0dGhpcy5wYWdlcy5wdXNoKGkpO1xuXHRcdH1cblxuXHRcdC8vIHNldCBwYWdlIHdpdGhpbiAxLi5tYXggcmFuZ2Vcblx0XHR0aGlzLl9zZXRQYWdlSW5SYW5nZShuZXdQYWdlKTtcblxuXHRcdC8vIGFwcGx5IG1heFNpemUgaWYgbmVjZXNzYXJ5XG5cdFx0aWYgKHRoaXMubWF4U2l6ZSA+IDAgJiYgdGhpcy5wYWdlQ291bnQgPiB0aGlzLm1heFNpemUpIHtcblx0XHRcdGxldCBzdGFydCA9IDA7XG5cdFx0XHRsZXQgZW5kID0gdGhpcy5wYWdlQ291bnQ7XG5cblx0XHRcdC8vIGVpdGhlciBwYWdpbmF0aW5nIG9yIHJvdGF0aW5nIHBhZ2UgbnVtYmVyc1xuXHRcdFx0aWYgKHRoaXMucm90YXRlKSB7XG5cdFx0XHRcdFtzdGFydCwgZW5kXSA9IHRoaXMuX2FwcGx5Um90YXRpb24oKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFtzdGFydCwgZW5kXSA9IHRoaXMuX2FwcGx5UGFnaW5hdGlvbigpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnBhZ2VzID0gdGhpcy5wYWdlcy5zbGljZShzdGFydCwgZW5kKTtcblxuXHRcdFx0Ly8gYWRkaW5nIGVsbGlwc2VzXG5cdFx0XHR0aGlzLl9hcHBseUVsbGlwc2VzKHN0YXJ0LCBlbmQpO1xuXHRcdH1cblx0fVxufVxuIl19