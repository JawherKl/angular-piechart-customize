import { ChangeDetectorRef, ElementRef, EventEmitter, OnInit, Provider } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ConfigModel, PagesModel } from './models';
import { PageChangedEvent } from './pagination.component';
import { PaginationConfig } from './pagination.config';
import * as i0 from "@angular/core";
export declare const PAGER_CONTROL_VALUE_ACCESSOR: Provider;
export declare class PagerComponent implements ControlValueAccessor, OnInit {
    private elementRef;
    private changeDetection;
    config?: Partial<ConfigModel>;
    /** if `true` aligns each link to the sides of pager */
    align: boolean;
    /** limit number for page links in pager */
    maxSize?: number;
    /** if false first and last buttons will be hidden */
    boundaryLinks: boolean;
    /** if false previous and next buttons will be hidden */
    directionLinks: boolean;
    /** first button text */
    firstText: string;
    /** previous button text */
    previousText: string;
    /** next button text */
    nextText: string;
    /** last button text */
    lastText: string;
    /** if true current page will in the middle of pages list */
    rotate: boolean;
    /** add class to <code><li\></code> */
    pageBtnClass: string;
    /** if true pagination component will be disabled */
    disabled: boolean;
    /** fired when total pages count changes, $event:number equals to total pages count */
    numPages: EventEmitter<number>;
    /** fired when page was changed, $event:{page, itemsPerPage} equals to
     * object with current page index and number of items per page
     */
    pageChanged: EventEmitter<PageChangedEvent>;
    onChange: Function;
    onTouched: Function;
    classMap: string;
    pages?: PagesModel[];
    protected inited: boolean;
    constructor(elementRef: ElementRef, paginationConfig: PaginationConfig, changeDetection: ChangeDetectorRef);
    protected _itemsPerPage: number;
    /** maximum number of items per page. If value less than 1 will display all items on one page */
    get itemsPerPage(): number;
    set itemsPerPage(v: number);
    protected _totalItems: number;
    /** total number of items in all pages */
    get totalItems(): number;
    set totalItems(v: number);
    protected _totalPages: number;
    get totalPages(): number;
    set totalPages(v: number);
    protected _page: number;
    get page(): number;
    set page(value: number);
    configureOptions(config: Partial<ConfigModel>): void;
    ngOnInit(): void;
    writeValue(value: number): void;
    getText(key: string): string;
    noPrevious(): boolean;
    noNext(): boolean;
    registerOnChange(fn: () => void): void;
    registerOnTouched(fn: () => void): void;
    selectPage(page: number, event?: Event): void;
    protected makePage(num: number, text: string, active: boolean): {
        number: number;
        text: string;
        active: boolean;
    };
    protected getPages(currentPage: number, totalPages: number): PagesModel[];
    protected calculateTotalPages(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<PagerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PagerComponent, "pager", never, { "align": { "alias": "align"; "required": false; }; "maxSize": { "alias": "maxSize"; "required": false; }; "boundaryLinks": { "alias": "boundaryLinks"; "required": false; }; "directionLinks": { "alias": "directionLinks"; "required": false; }; "firstText": { "alias": "firstText"; "required": false; }; "previousText": { "alias": "previousText"; "required": false; }; "nextText": { "alias": "nextText"; "required": false; }; "lastText": { "alias": "lastText"; "required": false; }; "rotate": { "alias": "rotate"; "required": false; }; "pageBtnClass": { "alias": "pageBtnClass"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "itemsPerPage": { "alias": "itemsPerPage"; "required": false; }; "totalItems": { "alias": "totalItems"; "required": false; }; }, { "numPages": "numPages"; "pageChanged": "pageChanged"; }, never, never, false, never>;
}
