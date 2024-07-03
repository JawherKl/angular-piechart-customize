import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, QueryList, Renderer2, SimpleChanges } from '@angular/core';
import { Placement, PlacementArray } from '../util/positioning';
import { Options } from '@popperjs/core';
import { NgbDropdownConfig } from './dropdown-config';
import * as i0 from "@angular/core";
/**
 * @deprecated 14.2.0 this directive isn't useful anymore. You can remove it from your imports
 */
export declare class NgbNavbar {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbNavbar, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbNavbar, ".navbar", never, {}, {}, never, never, true, never>;
}
/**
 * A directive you should put on a dropdown item to enable keyboard navigation.
 * Arrow keys will move focus between items marked with this directive.
 *
 * @since 4.1.0
 */
export declare class NgbDropdownItem {
    elementRef: ElementRef<HTMLElement>;
    private _renderer;
    static ngAcceptInputType_disabled: boolean | '';
    private _disabled;
    set disabled(value: boolean);
    get disabled(): boolean;
    constructor(elementRef: ElementRef<HTMLElement>, _renderer: Renderer2);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDropdownItem, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbDropdownItem, "[ngbDropdownItem]", never, { "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, true, never>;
}
/**
 * A directive that wraps dropdown menu content and dropdown items.
 */
export declare class NgbDropdownMenu {
    dropdown: NgbDropdown;
    nativeElement: HTMLElement;
    placement: Placement | null;
    isOpen: boolean;
    menuItems: QueryList<NgbDropdownItem>;
    constructor(dropdown: NgbDropdown, _elementRef: ElementRef<HTMLElement>);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDropdownMenu, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbDropdownMenu, "[ngbDropdownMenu]", never, {}, {}, ["menuItems"], never, true, never>;
}
/**
 * A directive to mark an element to which dropdown menu will be anchored.
 *
 * This is a simple version of the `NgbDropdownToggle` directive.
 * It plays the same role, but doesn't listen to click events to toggle dropdown menu thus enabling support
 * for events other than click.
 *
 * @since 1.1.0
 */
export declare class NgbDropdownAnchor {
    dropdown: NgbDropdown;
    nativeElement: HTMLElement;
    constructor(dropdown: NgbDropdown, _elementRef: ElementRef<HTMLElement>);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDropdownAnchor, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbDropdownAnchor, "[ngbDropdownAnchor]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive to mark an element that will toggle dropdown via the `click` event.
 *
 * You can also use `NgbDropdownAnchor` as an alternative.
 */
export declare class NgbDropdownToggle extends NgbDropdownAnchor {
    constructor(dropdown: NgbDropdown, elementRef: ElementRef<HTMLElement>);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDropdownToggle, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbDropdownToggle, "[ngbDropdownToggle]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive that provides contextual overlays for displaying lists of links and more.
 */
export declare class NgbDropdown implements OnInit, AfterContentInit, OnChanges, OnDestroy {
    private _changeDetector;
    private _document;
    private _ngZone;
    private _elementRef;
    private _renderer;
    static ngAcceptInputType_autoClose: boolean | string;
    static ngAcceptInputType_display: string;
    private _destroyCloseHandlers$;
    private _zoneSubscription;
    private _bodyContainer;
    private _positioning;
    private _menu;
    private _anchor;
    /**
     * Indicates whether the dropdown should be closed when clicking one of dropdown items or pressing ESC.
     *
     * * `true` - the dropdown will close on both outside and inside (menu) clicks.
     * * `false` - the dropdown can only be closed manually via `close()` or `toggle()` methods.
     * * `"inside"` - the dropdown will close on inside menu clicks, but not outside clicks.
     * * `"outside"` - the dropdown will close only on the outside clicks and not on menu clicks.
     */
    autoClose: boolean | 'outside' | 'inside';
    /**
     * A custom class that is applied only to the `ngbDropdownMenu` parent element.
     * * In case of the inline dropdown it will be the `<div ngbDropdown>`
     * * In case of the dropdown with  `container="body"` it will be the `<div class="dropdown">` attached to the `<body>`
     *
     * Useful mainly when dropdown is attached to the body.
     * If the dropdown is inline just use `<div ngbDropdown class="custom-class">` instead.
     *
     * @since 9.1.0
     */
    dropdownClass: string;
    /**
     * Defines whether or not the dropdown menu is opened initially.
     */
    _open: boolean;
    /**
     * The preferred placement of the dropdown, among the [possible values](#/guides/positioning#api).
     *
     * The default order of preference is `"bottom-start bottom-end top-start top-end"`
     *
     * Please see the [positioning overview](#/positioning) for more details.
     */
    placement: PlacementArray;
    /**
     * Allows to change default Popper options when positioning the dropdown.
     * Receives current popper options and returns modified ones.
     *
     * @since 13.1.0
     */
    popperOptions: (options: Partial<Options>) => Partial<Options>;
    /**
     * A selector specifying the element the dropdown should be appended to.
     * Currently only supports "body".
     *
     * @since 4.1.0
     */
    container: null | 'body';
    /**
     * Enable or disable the dynamic positioning. The default value is dynamic unless the dropdown is used
     * inside a Bootstrap navbar. If you need custom placement for a dropdown in a navbar, set it to
     * dynamic explicitly. See the [positioning of dropdown](#/positioning#dropdown)
     * and the [navbar demo](/#/components/dropdown/examples#navbar) for more details.
     *
     * @since 4.2.0
     */
    display: 'dynamic' | 'static';
    /**
     * An event fired when the dropdown is opened or closed.
     *
     * The event payload is a `boolean`:
     * * `true` - the dropdown was opened
     * * `false` - the dropdown was closed
     */
    openChange: EventEmitter<boolean>;
    constructor(_changeDetector: ChangeDetectorRef, config: NgbDropdownConfig, _document: any, _ngZone: NgZone, _elementRef: ElementRef<HTMLElement>, _renderer: Renderer2);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Checks if the dropdown menu is open.
     */
    isOpen(): boolean;
    /**
     * Opens the dropdown menu.
     */
    open(): void;
    private _setCloseHandlers;
    /**
     * Closes the dropdown menu.
     */
    close(): void;
    /**
     * Toggles the dropdown menu.
     */
    toggle(): void;
    ngOnDestroy(): void;
    onKeyDown(event: KeyboardEvent): void;
    private _isDropup;
    private _isEventFromToggle;
    private _getMenuElements;
    private _positionMenu;
    private _getFirstPlacement;
    private _resetContainer;
    private _applyContainer;
    private _applyCustomDropdownClass;
    private _applyPlacementClasses;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDropdown, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbDropdown, "[ngbDropdown]", ["ngbDropdown"], { "autoClose": { "alias": "autoClose"; "required": false; }; "dropdownClass": { "alias": "dropdownClass"; "required": false; }; "_open": { "alias": "open"; "required": false; }; "placement": { "alias": "placement"; "required": false; }; "popperOptions": { "alias": "popperOptions"; "required": false; }; "container": { "alias": "container"; "required": false; }; "display": { "alias": "display"; "required": false; }; }, { "openChange": "openChange"; }, ["_menu", "_anchor"], never, true, never>;
}
