import { EventEmitter, TemplateRef, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { TabsetComponent } from './tabset.component';
import * as i0 from "@angular/core";
export declare class TabDirective implements OnInit, OnDestroy {
    elementRef: ElementRef;
    renderer: Renderer2;
    /** tab header text */
    heading?: string;
    /** tab id. The same id with suffix '-link' will be added to the corresponding &lt;li&gt; element  */
    id?: string;
    /** if true tab can not be activated */
    disabled: boolean;
    /** if true tab can be removable, additional button will appear */
    removable: boolean;
    /** if set, will be added to the tab's class attribute. Multiple classes are supported. */
    get customClass(): string | undefined;
    set customClass(customClass: string | undefined);
    /** tab active state toggle */
    get active(): boolean | undefined;
    set active(active: boolean | undefined);
    /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
    selectTab: EventEmitter<TabDirective>;
    /** fired when tab became inactive, $event:Tab equals to deselected instance of Tab component */
    deselect: EventEmitter<TabDirective>;
    /** fired before tab will be removed, $event:Tab equals to instance of removed tab */
    removed: EventEmitter<TabDirective>;
    addClass: boolean;
    role: string;
    get ariaLabelledby(): string;
    headingRef?: TemplateRef<any>;
    tabset: TabsetComponent;
    protected _active?: boolean | undefined;
    protected _customClass: string;
    constructor(tabset: TabsetComponent, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TabDirective, "tab, [tab]", ["tab"], { "heading": { "alias": "heading"; "required": false; }; "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "removable": { "alias": "removable"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "active": { "alias": "active"; "required": false; }; }, { "selectTab": "selectTab"; "deselect": "deselect"; "removed": "removed"; }, never, never, false, never>;
}
