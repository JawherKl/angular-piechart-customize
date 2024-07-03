import { ContentChild, ContentChildren, Directive, EventEmitter, forwardRef, Inject, Input, Output, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ngbPositioning } from '../util/positioning';
import { addPopperOffset } from '../util/positioning-util';
import { ngbAutoClose } from '../util/autoclose';
import { Key } from '../util/key';
import { FOCUSABLE_ELEMENTS_SELECTOR } from '../util/focus-trap';
import { getActiveElement } from '../util/util';
import * as i0 from "@angular/core";
import * as i1 from "./dropdown-config";
/**
 * @deprecated 14.2.0 this directive isn't useful anymore. You can remove it from your imports
 */
class NgbNavbar {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavbar, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbNavbar, isStandalone: true, selector: ".navbar", ngImport: i0 }); }
}
export { NgbNavbar };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavbar, decorators: [{
            type: Directive,
            args: [{ selector: '.navbar', standalone: true }]
        }] });
/**
 * A directive you should put on a dropdown item to enable keyboard navigation.
 * Arrow keys will move focus between items marked with this directive.
 *
 * @since 4.1.0
 */
class NgbDropdownItem {
    set disabled(value) {
        this._disabled = value === '' || value === true; // accept an empty attribute as true
        // note: we don't use a host binding for disabled because when used on links, it fails because links don't have a
        // disabled property
        // setting the property using the renderer, OTOH, works fine in both cases.
        this._renderer.setProperty(this.elementRef.nativeElement, 'disabled', this._disabled);
    }
    get disabled() {
        return this._disabled;
    }
    constructor(elementRef, _renderer) {
        this.elementRef = elementRef;
        this._renderer = _renderer;
        this._disabled = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDropdownItem, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbDropdownItem, isStandalone: true, selector: "[ngbDropdownItem]", inputs: { disabled: "disabled" }, host: { properties: { "class.disabled": "disabled", "tabIndex": "disabled ? -1 : 0" }, classAttribute: "dropdown-item" }, ngImport: i0 }); }
}
export { NgbDropdownItem };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDropdownItem, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdownItem]',
                    standalone: true,
                    host: { class: 'dropdown-item', '[class.disabled]': 'disabled', '[tabIndex]': 'disabled ? -1 : 0' },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { disabled: [{
                type: Input
            }] } });
/**
 * A directive that wraps dropdown menu content and dropdown items.
 */
class NgbDropdownMenu {
    constructor(dropdown, _elementRef) {
        this.dropdown = dropdown;
        this.placement = 'bottom';
        this.isOpen = false;
        this.nativeElement = _elementRef.nativeElement;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDropdownMenu, deps: [{ token: forwardRef(() => NgbDropdown) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbDropdownMenu, isStandalone: true, selector: "[ngbDropdownMenu]", host: { listeners: { "keydown.ArrowUp": "dropdown.onKeyDown($event)", "keydown.ArrowDown": "dropdown.onKeyDown($event)", "keydown.Home": "dropdown.onKeyDown($event)", "keydown.End": "dropdown.onKeyDown($event)", "keydown.Enter": "dropdown.onKeyDown($event)", "keydown.Space": "dropdown.onKeyDown($event)", "keydown.Tab": "dropdown.onKeyDown($event)", "keydown.Shift.Tab": "dropdown.onKeyDown($event)" }, properties: { "class.dropdown-menu": "true", "class.show": "dropdown.isOpen()" } }, queries: [{ propertyName: "menuItems", predicate: NgbDropdownItem }], ngImport: i0 }); }
}
export { NgbDropdownMenu };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDropdownMenu, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdownMenu]',
                    standalone: true,
                    host: {
                        '[class.dropdown-menu]': 'true',
                        '[class.show]': 'dropdown.isOpen()',
                        '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
                        '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
                        '(keydown.Home)': 'dropdown.onKeyDown($event)',
                        '(keydown.End)': 'dropdown.onKeyDown($event)',
                        '(keydown.Enter)': 'dropdown.onKeyDown($event)',
                        '(keydown.Space)': 'dropdown.onKeyDown($event)',
                        '(keydown.Tab)': 'dropdown.onKeyDown($event)',
                        '(keydown.Shift.Tab)': 'dropdown.onKeyDown($event)',
                    },
                }]
        }], ctorParameters: function () { return [{ type: NgbDropdown, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbDropdown)]
                }] }, { type: i0.ElementRef }]; }, propDecorators: { menuItems: [{
                type: ContentChildren,
                args: [NgbDropdownItem]
            }] } });
/**
 * A directive to mark an element to which dropdown menu will be anchored.
 *
 * This is a simple version of the `NgbDropdownToggle` directive.
 * It plays the same role, but doesn't listen to click events to toggle dropdown menu thus enabling support
 * for events other than click.
 *
 * @since 1.1.0
 */
class NgbDropdownAnchor {
    constructor(dropdown, _elementRef) {
        this.dropdown = dropdown;
        this.nativeElement = _elementRef.nativeElement;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDropdownAnchor, deps: [{ token: forwardRef(() => NgbDropdown) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbDropdownAnchor, isStandalone: true, selector: "[ngbDropdownAnchor]", host: { properties: { "attr.aria-expanded": "dropdown.isOpen()" }, classAttribute: "dropdown-toggle" }, ngImport: i0 }); }
}
export { NgbDropdownAnchor };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDropdownAnchor, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdownAnchor]',
                    standalone: true,
                    host: { class: 'dropdown-toggle', '[attr.aria-expanded]': 'dropdown.isOpen()' },
                }]
        }], ctorParameters: function () { return [{ type: NgbDropdown, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbDropdown)]
                }] }, { type: i0.ElementRef }]; } });
/**
 * A directive to mark an element that will toggle dropdown via the `click` event.
 *
 * You can also use `NgbDropdownAnchor` as an alternative.
 */
class NgbDropdownToggle extends NgbDropdownAnchor {
    constructor(dropdown, elementRef) {
        super(dropdown, elementRef);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDropdownToggle, deps: [{ token: forwardRef(() => NgbDropdown) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbDropdownToggle, isStandalone: true, selector: "[ngbDropdownToggle]", host: { listeners: { "click": "dropdown.toggle()", "keydown.ArrowUp": "dropdown.onKeyDown($event)", "keydown.ArrowDown": "dropdown.onKeyDown($event)", "keydown.Home": "dropdown.onKeyDown($event)", "keydown.End": "dropdown.onKeyDown($event)", "keydown.Tab": "dropdown.onKeyDown($event)", "keydown.Shift.Tab": "dropdown.onKeyDown($event)" }, properties: { "attr.aria-expanded": "dropdown.isOpen()" }, classAttribute: "dropdown-toggle" }, providers: [{ provide: NgbDropdownAnchor, useExisting: forwardRef(() => NgbDropdownToggle) }], usesInheritance: true, ngImport: i0 }); }
}
export { NgbDropdownToggle };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDropdownToggle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdownToggle]',
                    standalone: true,
                    host: {
                        class: 'dropdown-toggle',
                        '[attr.aria-expanded]': 'dropdown.isOpen()',
                        '(click)': 'dropdown.toggle()',
                        '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
                        '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
                        '(keydown.Home)': 'dropdown.onKeyDown($event)',
                        '(keydown.End)': 'dropdown.onKeyDown($event)',
                        '(keydown.Tab)': 'dropdown.onKeyDown($event)',
                        '(keydown.Shift.Tab)': 'dropdown.onKeyDown($event)',
                    },
                    providers: [{ provide: NgbDropdownAnchor, useExisting: forwardRef(() => NgbDropdownToggle) }],
                }]
        }], ctorParameters: function () { return [{ type: NgbDropdown, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbDropdown)]
                }] }, { type: i0.ElementRef }]; } });
/**
 * A directive that provides contextual overlays for displaying lists of links and more.
 */
class NgbDropdown {
    constructor(_changeDetector, config, _document, _ngZone, _elementRef, _renderer) {
        this._changeDetector = _changeDetector;
        this._document = _document;
        this._ngZone = _ngZone;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._destroyCloseHandlers$ = new Subject();
        this._bodyContainer = null;
        /**
         * Defines whether or not the dropdown menu is opened initially.
         */
        this._open = false;
        /**
         * An event fired when the dropdown is opened or closed.
         *
         * The event payload is a `boolean`:
         * * `true` - the dropdown was opened
         * * `false` - the dropdown was closed
         */
        this.openChange = new EventEmitter();
        this.placement = config.placement;
        this.popperOptions = config.popperOptions;
        this.container = config.container;
        this.autoClose = config.autoClose;
        this._positioning = ngbPositioning();
    }
    ngOnInit() {
        if (!this.display) {
            this.display = this._elementRef.nativeElement.closest('.navbar') ? 'static' : 'dynamic';
        }
    }
    ngAfterContentInit() {
        this._ngZone.onStable.pipe(take(1)).subscribe(() => {
            this._applyPlacementClasses();
            if (this._open) {
                this._setCloseHandlers();
            }
        });
    }
    ngOnChanges(changes) {
        if (changes.container && this._open) {
            this._applyContainer(this.container);
        }
        if (changes.placement && !changes.placement.firstChange) {
            this._positioning.setOptions({
                hostElement: this._anchor.nativeElement,
                targetElement: this._bodyContainer || this._menu.nativeElement,
                placement: this.placement,
                appendToBody: this.container === 'body',
            });
            this._applyPlacementClasses();
        }
        if (changes.dropdownClass) {
            const { currentValue, previousValue } = changes.dropdownClass;
            this._applyCustomDropdownClass(currentValue, previousValue);
        }
        if (changes.autoClose && this._open) {
            this.autoClose = changes.autoClose.currentValue;
            this._setCloseHandlers();
        }
    }
    /**
     * Checks if the dropdown menu is open.
     */
    isOpen() {
        return this._open;
    }
    /**
     * Opens the dropdown menu.
     */
    open() {
        if (!this._open) {
            this._open = true;
            this._applyContainer(this.container);
            this.openChange.emit(true);
            this._setCloseHandlers();
            if (this._anchor) {
                this._anchor.nativeElement.focus();
                if (this.display === 'dynamic') {
                    this._ngZone.runOutsideAngular(() => {
                        this._positioning.createPopper({
                            hostElement: this._anchor.nativeElement,
                            targetElement: this._bodyContainer || this._menu.nativeElement,
                            placement: this.placement,
                            appendToBody: this.container === 'body',
                            updatePopperOptions: (options) => this.popperOptions(addPopperOffset([0, 2])(options)),
                        });
                        this._applyPlacementClasses();
                        this._zoneSubscription = this._ngZone.onStable.subscribe(() => this._positionMenu());
                    });
                }
            }
        }
    }
    _setCloseHandlers() {
        this._destroyCloseHandlers$.next(); // destroy any existing close handlers
        ngbAutoClose(this._ngZone, this._document, this.autoClose, (source) => {
            this.close();
            if (source === 0 /* SOURCE.ESCAPE */) {
                this._anchor.nativeElement.focus();
            }
        }, this._destroyCloseHandlers$, this._menu ? [this._menu.nativeElement] : [], this._anchor ? [this._anchor.nativeElement] : [], '.dropdown-item,.dropdown-divider');
    }
    /**
     * Closes the dropdown menu.
     */
    close() {
        if (this._open) {
            this._open = false;
            this._resetContainer();
            this._positioning.destroy();
            this._zoneSubscription?.unsubscribe();
            this._destroyCloseHandlers$.next();
            this.openChange.emit(false);
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Toggles the dropdown menu.
     */
    toggle() {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    ngOnDestroy() {
        this.close();
    }
    onKeyDown(event) {
        /* eslint-disable-next-line deprecation/deprecation */
        const key = event.which;
        const itemElements = this._getMenuElements();
        let position = -1;
        let itemElement = null;
        const isEventFromToggle = this._isEventFromToggle(event);
        if (!isEventFromToggle && itemElements.length) {
            itemElements.forEach((item, index) => {
                if (item.contains(event.target)) {
                    itemElement = item;
                }
                if (item === getActiveElement(this._document)) {
                    position = index;
                }
            });
        }
        // closing on Enter / Space
        if (key === Key.Space || key === Key.Enter) {
            if (itemElement && (this.autoClose === true || this.autoClose === 'inside')) {
                // Item is either a button or a link, so click will be triggered by the browser on Enter or Space.
                // So we have to register a one-time click handler that will fire after any user defined click handlers
                // to close the dropdown
                fromEvent(itemElement, 'click')
                    .pipe(take(1))
                    .subscribe(() => this.close());
            }
            return;
        }
        if (key === Key.Tab) {
            if (event.target && this.isOpen() && this.autoClose) {
                if (this._anchor.nativeElement === event.target) {
                    if (this.container === 'body' && !event.shiftKey) {
                        /* This case is special: user is using [Tab] from the anchor/toggle.
               User expects the next focusable element in the dropdown menu to get focus.
               But the menu is not a sibling to anchor/toggle, it is at the end of the body.
               Trick is to synchronously focus the menu element, and let the [keydown.Tab] go
               so that browser will focus the proper element (first one focusable in the menu) */
                        this._renderer.setAttribute(this._menu.nativeElement, 'tabindex', '0');
                        this._menu.nativeElement.focus();
                        this._renderer.removeAttribute(this._menu.nativeElement, 'tabindex');
                    }
                    else if (event.shiftKey) {
                        this.close();
                    }
                    return;
                }
                else if (this.container === 'body') {
                    const focusableElements = this._menu.nativeElement.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
                    if (event.shiftKey && event.target === focusableElements[0]) {
                        this._anchor.nativeElement.focus();
                        event.preventDefault();
                    }
                    else if (!event.shiftKey && event.target === focusableElements[focusableElements.length - 1]) {
                        this._anchor.nativeElement.focus();
                        this.close();
                    }
                }
                else {
                    fromEvent(event.target, 'focusout')
                        .pipe(take(1))
                        .subscribe(({ relatedTarget }) => {
                        if (!this._elementRef.nativeElement.contains(relatedTarget)) {
                            this.close();
                        }
                    });
                }
            }
            return;
        }
        // opening / navigating
        if (isEventFromToggle || itemElement) {
            this.open();
            if (itemElements.length) {
                switch (key) {
                    case Key.ArrowDown:
                        position = Math.min(position + 1, itemElements.length - 1);
                        break;
                    case Key.ArrowUp:
                        if (this._isDropup() && position === -1) {
                            position = itemElements.length - 1;
                            break;
                        }
                        position = Math.max(position - 1, 0);
                        break;
                    case Key.Home:
                        position = 0;
                        break;
                    case Key.End:
                        position = itemElements.length - 1;
                        break;
                }
                itemElements[position].focus();
            }
            event.preventDefault();
        }
    }
    _isDropup() {
        return this._elementRef.nativeElement.classList.contains('dropup');
    }
    _isEventFromToggle(event) {
        return this._anchor.nativeElement.contains(event.target);
    }
    _getMenuElements() {
        const menu = this._menu;
        if (menu == null) {
            return [];
        }
        return menu.menuItems.filter((item) => !item.disabled).map((item) => item.elementRef.nativeElement);
    }
    _positionMenu() {
        const menu = this._menu;
        if (this.isOpen() && menu) {
            if (this.display === 'dynamic') {
                this._positioning.update();
                this._applyPlacementClasses();
            }
            else {
                this._applyPlacementClasses(this._getFirstPlacement(this.placement));
            }
        }
    }
    _getFirstPlacement(placement) {
        return Array.isArray(placement) ? placement[0] : placement.split(' ')[0];
    }
    _resetContainer() {
        const renderer = this._renderer;
        if (this._menu) {
            const dropdownElement = this._elementRef.nativeElement;
            const dropdownMenuElement = this._menu.nativeElement;
            renderer.appendChild(dropdownElement, dropdownMenuElement);
        }
        if (this._bodyContainer) {
            renderer.removeChild(this._document.body, this._bodyContainer);
            this._bodyContainer = null;
        }
    }
    _applyContainer(container = null) {
        this._resetContainer();
        if (container === 'body') {
            const renderer = this._renderer;
            const dropdownMenuElement = this._menu.nativeElement;
            const bodyContainer = (this._bodyContainer = this._bodyContainer || renderer.createElement('div'));
            // Override some styles to have the positioning working
            renderer.setStyle(bodyContainer, 'position', 'absolute');
            renderer.setStyle(dropdownMenuElement, 'position', 'static');
            renderer.setStyle(bodyContainer, 'z-index', '1055');
            renderer.appendChild(bodyContainer, dropdownMenuElement);
            renderer.appendChild(this._document.body, bodyContainer);
        }
        this._applyCustomDropdownClass(this.dropdownClass);
    }
    _applyCustomDropdownClass(newClass, oldClass) {
        const targetElement = this.container === 'body' ? this._bodyContainer : this._elementRef.nativeElement;
        if (targetElement) {
            if (oldClass) {
                this._renderer.removeClass(targetElement, oldClass);
            }
            if (newClass) {
                this._renderer.addClass(targetElement, newClass);
            }
        }
    }
    _applyPlacementClasses(placement) {
        const menu = this._menu;
        if (menu) {
            if (!placement) {
                placement = this._getFirstPlacement(this.placement);
            }
            const renderer = this._renderer;
            const dropdownElement = this._elementRef.nativeElement;
            // remove the current placement classes
            renderer.removeClass(dropdownElement, 'dropup');
            renderer.removeClass(dropdownElement, 'dropdown');
            const { nativeElement } = menu;
            if (this.display === 'static') {
                menu.placement = null;
                renderer.setAttribute(nativeElement, 'data-bs-popper', 'static');
            }
            else {
                menu.placement = placement;
                renderer.removeAttribute(nativeElement, 'data-bs-popper');
            }
            /*
             * apply the new placement
             * in case of top use up-arrow or down-arrow otherwise
             */
            const dropdownClass = placement.search('^top') !== -1 ? 'dropup' : 'dropdown';
            renderer.addClass(dropdownElement, dropdownClass);
            const bodyContainer = this._bodyContainer;
            if (bodyContainer) {
                renderer.removeClass(bodyContainer, 'dropup');
                renderer.removeClass(bodyContainer, 'dropdown');
                renderer.addClass(bodyContainer, dropdownClass);
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDropdown, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NgbDropdownConfig }, { token: DOCUMENT }, { token: i0.NgZone }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbDropdown, isStandalone: true, selector: "[ngbDropdown]", inputs: { autoClose: "autoClose", dropdownClass: "dropdownClass", _open: ["open", "_open"], placement: "placement", popperOptions: "popperOptions", container: "container", display: "display" }, outputs: { openChange: "openChange" }, host: { properties: { "class.show": "isOpen()" } }, queries: [{ propertyName: "_menu", first: true, predicate: NgbDropdownMenu, descendants: true }, { propertyName: "_anchor", first: true, predicate: NgbDropdownAnchor, descendants: true }], exportAs: ["ngbDropdown"], usesOnChanges: true, ngImport: i0 }); }
}
export { NgbDropdown };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDropdown, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdown]',
                    exportAs: 'ngbDropdown',
                    standalone: true,
                    host: { '[class.show]': 'isOpen()' },
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.NgbDropdownConfig }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { _menu: [{
                type: ContentChild,
                args: [NgbDropdownMenu, { static: false }]
            }], _anchor: [{
                type: ContentChild,
                args: [NgbDropdownAnchor, { static: false }]
            }], autoClose: [{
                type: Input
            }], dropdownClass: [{
                type: Input
            }], _open: [{
                type: Input,
                args: ['open']
            }], placement: [{
                type: Input
            }], popperOptions: [{
                type: Input
            }], container: [{
                type: Input
            }], display: [{
                type: Input
            }], openChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZHJvcGRvd24vZHJvcGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdOLFlBQVksRUFDWixlQUFlLEVBQ2YsU0FBUyxFQUVULFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFLTCxNQUFNLEdBSU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUN4RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxFQUFFLGNBQWMsRUFBNkIsTUFBTSxxQkFBcUIsQ0FBQztBQUVoRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBVSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHbEMsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sY0FBYyxDQUFDOzs7QUFFaEQ7O0dBRUc7QUFDSCxNQUNhLFNBQVM7OEdBQVQsU0FBUztrR0FBVCxTQUFTOztTQUFULFNBQVM7MkZBQVQsU0FBUztrQkFEckIsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTs7QUFHcEQ7Ozs7O0dBS0c7QUFDSCxNQUthLGVBQWU7SUFLM0IsSUFDSSxRQUFRLENBQUMsS0FBYztRQUMxQixJQUFJLENBQUMsU0FBUyxHQUFRLEtBQUssS0FBSyxFQUFFLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLG9DQUFv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QkFRRyxTQUFTO3NCQUFqQixLQUFLO2dCQVVHLE9BQU87c0JBQWYsS0FBSztnQkFTSSxVQUFVO3NCQUFuQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcblx0QWZ0ZXJDb250ZW50SW5pdCxcblx0Q2hhbmdlRGV0ZWN0b3JSZWYsXG5cdENvbnRlbnRDaGlsZCxcblx0Q29udGVudENoaWxkcmVuLFxuXHREaXJlY3RpdmUsXG5cdEVsZW1lbnRSZWYsXG5cdEV2ZW50RW1pdHRlcixcblx0Zm9yd2FyZFJlZixcblx0SW5qZWN0LFxuXHRJbnB1dCxcblx0Tmdab25lLFxuXHRPbkNoYW5nZXMsXG5cdE9uRGVzdHJveSxcblx0T25Jbml0LFxuXHRPdXRwdXQsXG5cdFF1ZXJ5TGlzdCxcblx0UmVuZGVyZXIyLFxuXHRTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBuZ2JQb3NpdGlvbmluZywgUGxhY2VtZW50LCBQbGFjZW1lbnRBcnJheSB9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gJ0Bwb3BwZXJqcy9jb3JlJztcbmltcG9ydCB7IGFkZFBvcHBlck9mZnNldCB9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmctdXRpbCc7XG5pbXBvcnQgeyBuZ2JBdXRvQ2xvc2UsIFNPVVJDRSB9IGZyb20gJy4uL3V0aWwvYXV0b2Nsb3NlJztcbmltcG9ydCB7IEtleSB9IGZyb20gJy4uL3V0aWwva2V5JztcblxuaW1wb3J0IHsgTmdiRHJvcGRvd25Db25maWcgfSBmcm9tICcuL2Ryb3Bkb3duLWNvbmZpZyc7XG5pbXBvcnQgeyBGT0NVU0FCTEVfRUxFTUVOVFNfU0VMRUNUT1IgfSBmcm9tICcuLi91dGlsL2ZvY3VzLXRyYXAnO1xuaW1wb3J0IHsgZ2V0QWN0aXZlRWxlbWVudCB9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgMTQuMi4wIHRoaXMgZGlyZWN0aXZlIGlzbid0IHVzZWZ1bCBhbnltb3JlLiBZb3UgY2FuIHJlbW92ZSBpdCBmcm9tIHlvdXIgaW1wb3J0c1xuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICcubmF2YmFyJywgc3RhbmRhbG9uZTogdHJ1ZSB9KVxuZXhwb3J0IGNsYXNzIE5nYk5hdmJhciB7fVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHlvdSBzaG91bGQgcHV0IG9uIGEgZHJvcGRvd24gaXRlbSB0byBlbmFibGUga2V5Ym9hcmQgbmF2aWdhdGlvbi5cbiAqIEFycm93IGtleXMgd2lsbCBtb3ZlIGZvY3VzIGJldHdlZW4gaXRlbXMgbWFya2VkIHdpdGggdGhpcyBkaXJlY3RpdmUuXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bkl0ZW1dJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aG9zdDogeyBjbGFzczogJ2Ryb3Bkb3duLWl0ZW0nLCAnW2NsYXNzLmRpc2FibGVkXSc6ICdkaXNhYmxlZCcsICdbdGFiSW5kZXhdJzogJ2Rpc2FibGVkID8gLTEgOiAwJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93bkl0ZW0ge1xuXHRzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IGJvb2xlYW4gfCAnJztcblxuXHRwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG5cdEBJbnB1dCgpXG5cdHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuXHRcdHRoaXMuX2Rpc2FibGVkID0gPGFueT52YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09IHRydWU7IC8vIGFjY2VwdCBhbiBlbXB0eSBhdHRyaWJ1dGUgYXMgdHJ1ZVxuXHRcdC8vIG5vdGU6IHdlIGRvbid0IHVzZSBhIGhvc3QgYmluZGluZyBmb3IgZGlzYWJsZWQgYmVjYXVzZSB3aGVuIHVzZWQgb24gbGlua3MsIGl0IGZhaWxzIGJlY2F1c2UgbGlua3MgZG9uJ3QgaGF2ZSBhXG5cdFx0Ly8gZGlzYWJsZWQgcHJvcGVydHlcblx0XHQvLyBzZXR0aW5nIHRoZSBwcm9wZXJ0eSB1c2luZyB0aGUgcmVuZGVyZXIsIE9UT0gsIHdvcmtzIGZpbmUgaW4gYm90aCBjYXNlcy5cblx0XHR0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgdGhpcy5fZGlzYWJsZWQpO1xuXHR9XG5cblx0Z2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9kaXNhYmxlZDtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHdyYXBzIGRyb3Bkb3duIG1lbnUgY29udGVudCBhbmQgZHJvcGRvd24gaXRlbXMuXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bk1lbnVdJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aG9zdDoge1xuXHRcdCdbY2xhc3MuZHJvcGRvd24tbWVudV0nOiAndHJ1ZScsXG5cdFx0J1tjbGFzcy5zaG93XSc6ICdkcm9wZG93bi5pc09wZW4oKScsXG5cdFx0JyhrZXlkb3duLkFycm93VXApJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcblx0XHQnKGtleWRvd24uQXJyb3dEb3duKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG5cdFx0JyhrZXlkb3duLkhvbWUpJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcblx0XHQnKGtleWRvd24uRW5kKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG5cdFx0JyhrZXlkb3duLkVudGVyKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG5cdFx0JyhrZXlkb3duLlNwYWNlKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG5cdFx0JyhrZXlkb3duLlRhYiknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxuXHRcdCcoa2V5ZG93bi5TaGlmdC5UYWIpJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcblx0fSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25NZW51IHtcblx0bmF0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cdHBsYWNlbWVudDogUGxhY2VtZW50IHwgbnVsbCA9ICdib3R0b20nO1xuXHRpc09wZW4gPSBmYWxzZTtcblxuXHRAQ29udGVudENoaWxkcmVuKE5nYkRyb3Bkb3duSXRlbSkgbWVudUl0ZW1zOiBRdWVyeUxpc3Q8TmdiRHJvcGRvd25JdGVtPjtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd24pKSBwdWJsaWMgZHJvcGRvd246IE5nYkRyb3Bkb3duLFxuXHRcdF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pixcblx0KSB7XG5cdFx0dGhpcy5uYXRpdmVFbGVtZW50ID0gX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblx0fVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIG1hcmsgYW4gZWxlbWVudCB0byB3aGljaCBkcm9wZG93biBtZW51IHdpbGwgYmUgYW5jaG9yZWQuXG4gKlxuICogVGhpcyBpcyBhIHNpbXBsZSB2ZXJzaW9uIG9mIHRoZSBgTmdiRHJvcGRvd25Ub2dnbGVgIGRpcmVjdGl2ZS5cbiAqIEl0IHBsYXlzIHRoZSBzYW1lIHJvbGUsIGJ1dCBkb2Vzbid0IGxpc3RlbiB0byBjbGljayBldmVudHMgdG8gdG9nZ2xlIGRyb3Bkb3duIG1lbnUgdGh1cyBlbmFibGluZyBzdXBwb3J0XG4gKiBmb3IgZXZlbnRzIG90aGVyIHRoYW4gY2xpY2suXG4gKlxuICogQHNpbmNlIDEuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bkFuY2hvcl0nLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRob3N0OiB7IGNsYXNzOiAnZHJvcGRvd24tdG9nZ2xlJywgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2Ryb3Bkb3duLmlzT3BlbigpJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93bkFuY2hvciB7XG5cdG5hdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd24pKSBwdWJsaWMgZHJvcGRvd246IE5nYkRyb3Bkb3duLFxuXHRcdF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pixcblx0KSB7XG5cdFx0dGhpcy5uYXRpdmVFbGVtZW50ID0gX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblx0fVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIG1hcmsgYW4gZWxlbWVudCB0aGF0IHdpbGwgdG9nZ2xlIGRyb3Bkb3duIHZpYSB0aGUgYGNsaWNrYCBldmVudC5cbiAqXG4gKiBZb3UgY2FuIGFsc28gdXNlIGBOZ2JEcm9wZG93bkFuY2hvcmAgYXMgYW4gYWx0ZXJuYXRpdmUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1tuZ2JEcm9wZG93blRvZ2dsZV0nLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRob3N0OiB7XG5cdFx0Y2xhc3M6ICdkcm9wZG93bi10b2dnbGUnLFxuXHRcdCdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdkcm9wZG93bi5pc09wZW4oKScsXG5cdFx0JyhjbGljayknOiAnZHJvcGRvd24udG9nZ2xlKCknLFxuXHRcdCcoa2V5ZG93bi5BcnJvd1VwKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG5cdFx0JyhrZXlkb3duLkFycm93RG93biknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxuXHRcdCcoa2V5ZG93bi5Ib21lKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG5cdFx0JyhrZXlkb3duLkVuZCknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxuXHRcdCcoa2V5ZG93bi5UYWIpJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcblx0XHQnKGtleWRvd24uU2hpZnQuVGFiKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG5cdH0sXG5cdHByb3ZpZGVyczogW3sgcHJvdmlkZTogTmdiRHJvcGRvd25BbmNob3IsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYkRyb3Bkb3duVG9nZ2xlKSB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25Ub2dnbGUgZXh0ZW5kcyBOZ2JEcm9wZG93bkFuY2hvciB7XG5cdGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ2JEcm9wZG93bikpIGRyb3Bkb3duOiBOZ2JEcm9wZG93biwgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcblx0XHRzdXBlcihkcm9wZG93biwgZWxlbWVudFJlZik7XG5cdH1cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHByb3ZpZGVzIGNvbnRleHR1YWwgb3ZlcmxheXMgZm9yIGRpc3BsYXlpbmcgbGlzdHMgb2YgbGlua3MgYW5kIG1vcmUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bl0nLFxuXHRleHBvcnRBczogJ25nYkRyb3Bkb3duJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aG9zdDogeyAnW2NsYXNzLnNob3ddJzogJ2lzT3BlbigpJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93biBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXHRzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYXV0b0Nsb3NlOiBib29sZWFuIHwgc3RyaW5nO1xuXHRzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzcGxheTogc3RyaW5nO1xuXHRwcml2YXRlIF9kZXN0cm95Q2xvc2VIYW5kbGVycyQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXHRwcml2YXRlIF96b25lU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cdHByaXZhdGUgX2JvZHlDb250YWluZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cdHByaXZhdGUgX3Bvc2l0aW9uaW5nOiBSZXR1cm5UeXBlPHR5cGVvZiBuZ2JQb3NpdGlvbmluZz47XG5cblx0QENvbnRlbnRDaGlsZChOZ2JEcm9wZG93bk1lbnUsIHsgc3RhdGljOiBmYWxzZSB9KSBwcml2YXRlIF9tZW51OiBOZ2JEcm9wZG93bk1lbnU7XG5cdEBDb250ZW50Q2hpbGQoTmdiRHJvcGRvd25BbmNob3IsIHsgc3RhdGljOiBmYWxzZSB9KSBwcml2YXRlIF9hbmNob3I6IE5nYkRyb3Bkb3duQW5jaG9yO1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgZHJvcGRvd24gc2hvdWxkIGJlIGNsb3NlZCB3aGVuIGNsaWNraW5nIG9uZSBvZiBkcm9wZG93biBpdGVtcyBvciBwcmVzc2luZyBFU0MuXG5cdCAqXG5cdCAqICogYHRydWVgIC0gdGhlIGRyb3Bkb3duIHdpbGwgY2xvc2Ugb24gYm90aCBvdXRzaWRlIGFuZCBpbnNpZGUgKG1lbnUpIGNsaWNrcy5cblx0ICogKiBgZmFsc2VgIC0gdGhlIGRyb3Bkb3duIGNhbiBvbmx5IGJlIGNsb3NlZCBtYW51YWxseSB2aWEgYGNsb3NlKClgIG9yIGB0b2dnbGUoKWAgbWV0aG9kcy5cblx0ICogKiBgXCJpbnNpZGVcImAgLSB0aGUgZHJvcGRvd24gd2lsbCBjbG9zZSBvbiBpbnNpZGUgbWVudSBjbGlja3MsIGJ1dCBub3Qgb3V0c2lkZSBjbGlja3MuXG5cdCAqICogYFwib3V0c2lkZVwiYCAtIHRoZSBkcm9wZG93biB3aWxsIGNsb3NlIG9ubHkgb24gdGhlIG91dHNpZGUgY2xpY2tzIGFuZCBub3Qgb24gbWVudSBjbGlja3MuXG5cdCAqL1xuXHRASW5wdXQoKSBhdXRvQ2xvc2U6IGJvb2xlYW4gfCAnb3V0c2lkZScgfCAnaW5zaWRlJztcblxuXHQvKipcblx0ICogQSBjdXN0b20gY2xhc3MgdGhhdCBpcyBhcHBsaWVkIG9ubHkgdG8gdGhlIGBuZ2JEcm9wZG93bk1lbnVgIHBhcmVudCBlbGVtZW50LlxuXHQgKiAqIEluIGNhc2Ugb2YgdGhlIGlubGluZSBkcm9wZG93biBpdCB3aWxsIGJlIHRoZSBgPGRpdiBuZ2JEcm9wZG93bj5gXG5cdCAqICogSW4gY2FzZSBvZiB0aGUgZHJvcGRvd24gd2l0aCAgYGNvbnRhaW5lcj1cImJvZHlcImAgaXQgd2lsbCBiZSB0aGUgYDxkaXYgY2xhc3M9XCJkcm9wZG93blwiPmAgYXR0YWNoZWQgdG8gdGhlIGA8Ym9keT5gXG5cdCAqXG5cdCAqIFVzZWZ1bCBtYWlubHkgd2hlbiBkcm9wZG93biBpcyBhdHRhY2hlZCB0byB0aGUgYm9keS5cblx0ICogSWYgdGhlIGRyb3Bkb3duIGlzIGlubGluZSBqdXN0IHVzZSBgPGRpdiBuZ2JEcm9wZG93biBjbGFzcz1cImN1c3RvbS1jbGFzc1wiPmAgaW5zdGVhZC5cblx0ICpcblx0ICogQHNpbmNlIDkuMS4wXG5cdCAqL1xuXHRASW5wdXQoKSBkcm9wZG93bkNsYXNzOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIERlZmluZXMgd2hldGhlciBvciBub3QgdGhlIGRyb3Bkb3duIG1lbnUgaXMgb3BlbmVkIGluaXRpYWxseS5cblx0ICovXG5cdEBJbnB1dCgnb3BlbicpIF9vcGVuID0gZmFsc2U7XG5cblx0LyoqXG5cdCAqIFRoZSBwcmVmZXJyZWQgcGxhY2VtZW50IG9mIHRoZSBkcm9wZG93biwgYW1vbmcgdGhlIFtwb3NzaWJsZSB2YWx1ZXNdKCMvZ3VpZGVzL3Bvc2l0aW9uaW5nI2FwaSkuXG5cdCAqXG5cdCAqIFRoZSBkZWZhdWx0IG9yZGVyIG9mIHByZWZlcmVuY2UgaXMgYFwiYm90dG9tLXN0YXJ0IGJvdHRvbS1lbmQgdG9wLXN0YXJ0IHRvcC1lbmRcImBcblx0ICpcblx0ICogUGxlYXNlIHNlZSB0aGUgW3Bvc2l0aW9uaW5nIG92ZXJ2aWV3XSgjL3Bvc2l0aW9uaW5nKSBmb3IgbW9yZSBkZXRhaWxzLlxuXHQgKi9cblx0QElucHV0KCkgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheTtcblxuXHQvKipcblx0ICogQWxsb3dzIHRvIGNoYW5nZSBkZWZhdWx0IFBvcHBlciBvcHRpb25zIHdoZW4gcG9zaXRpb25pbmcgdGhlIGRyb3Bkb3duLlxuXHQgKiBSZWNlaXZlcyBjdXJyZW50IHBvcHBlciBvcHRpb25zIGFuZCByZXR1cm5zIG1vZGlmaWVkIG9uZXMuXG5cdCAqXG5cdCAqIEBzaW5jZSAxMy4xLjBcblx0ICovXG5cdEBJbnB1dCgpIHBvcHBlck9wdGlvbnM6IChvcHRpb25zOiBQYXJ0aWFsPE9wdGlvbnM+KSA9PiBQYXJ0aWFsPE9wdGlvbnM+O1xuXG5cdC8qKlxuXHQgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIGRyb3Bkb3duIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cblx0ICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgXCJib2R5XCIuXG5cdCAqXG5cdCAqIEBzaW5jZSA0LjEuMFxuXHQgKi9cblx0QElucHV0KCkgY29udGFpbmVyOiBudWxsIHwgJ2JvZHknO1xuXG5cdC8qKlxuXHQgKiBFbmFibGUgb3IgZGlzYWJsZSB0aGUgZHluYW1pYyBwb3NpdGlvbmluZy4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgZHluYW1pYyB1bmxlc3MgdGhlIGRyb3Bkb3duIGlzIHVzZWRcblx0ICogaW5zaWRlIGEgQm9vdHN0cmFwIG5hdmJhci4gSWYgeW91IG5lZWQgY3VzdG9tIHBsYWNlbWVudCBmb3IgYSBkcm9wZG93biBpbiBhIG5hdmJhciwgc2V0IGl0IHRvXG5cdCAqIGR5bmFtaWMgZXhwbGljaXRseS4gU2VlIHRoZSBbcG9zaXRpb25pbmcgb2YgZHJvcGRvd25dKCMvcG9zaXRpb25pbmcjZHJvcGRvd24pXG5cdCAqIGFuZCB0aGUgW25hdmJhciBkZW1vXSgvIy9jb21wb25lbnRzL2Ryb3Bkb3duL2V4YW1wbGVzI25hdmJhcikgZm9yIG1vcmUgZGV0YWlscy5cblx0ICpcblx0ICogQHNpbmNlIDQuMi4wXG5cdCAqL1xuXHRASW5wdXQoKSBkaXNwbGF5OiAnZHluYW1pYycgfCAnc3RhdGljJztcblxuXHQvKipcblx0ICogQW4gZXZlbnQgZmlyZWQgd2hlbiB0aGUgZHJvcGRvd24gaXMgb3BlbmVkIG9yIGNsb3NlZC5cblx0ICpcblx0ICogVGhlIGV2ZW50IHBheWxvYWQgaXMgYSBgYm9vbGVhbmA6XG5cdCAqICogYHRydWVgIC0gdGhlIGRyb3Bkb3duIHdhcyBvcGVuZWRcblx0ICogKiBgZmFsc2VgIC0gdGhlIGRyb3Bkb3duIHdhcyBjbG9zZWRcblx0ICovXG5cdEBPdXRwdXQoKSBvcGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcblx0XHRjb25maWc6IE5nYkRyb3Bkb3duQ29uZmlnLFxuXHRcdEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXG5cdFx0cHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG5cdFx0cHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG5cdFx0cHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcblx0KSB7XG5cdFx0dGhpcy5wbGFjZW1lbnQgPSBjb25maWcucGxhY2VtZW50O1xuXHRcdHRoaXMucG9wcGVyT3B0aW9ucyA9IGNvbmZpZy5wb3BwZXJPcHRpb25zO1xuXHRcdHRoaXMuY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lcjtcblx0XHR0aGlzLmF1dG9DbG9zZSA9IGNvbmZpZy5hdXRvQ2xvc2U7XG5cblx0XHR0aGlzLl9wb3NpdGlvbmluZyA9IG5nYlBvc2l0aW9uaW5nKCk7XG5cdH1cblxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcblx0XHRpZiAoIXRoaXMuZGlzcGxheSkge1xuXHRcdFx0dGhpcy5kaXNwbGF5ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoJy5uYXZiYXInKSA/ICdzdGF0aWMnIDogJ2R5bmFtaWMnO1xuXHRcdH1cblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblx0XHR0aGlzLl9uZ1pvbmUub25TdGFibGUucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0dGhpcy5fYXBwbHlQbGFjZW1lbnRDbGFzc2VzKCk7XG5cdFx0XHRpZiAodGhpcy5fb3Blbikge1xuXHRcdFx0XHR0aGlzLl9zZXRDbG9zZUhhbmRsZXJzKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG5cdFx0aWYgKGNoYW5nZXMuY29udGFpbmVyICYmIHRoaXMuX29wZW4pIHtcblx0XHRcdHRoaXMuX2FwcGx5Q29udGFpbmVyKHRoaXMuY29udGFpbmVyKTtcblx0XHR9XG5cblx0XHRpZiAoY2hhbmdlcy5wbGFjZW1lbnQgJiYgIWNoYW5nZXMucGxhY2VtZW50LmZpcnN0Q2hhbmdlKSB7XG5cdFx0XHR0aGlzLl9wb3NpdGlvbmluZy5zZXRPcHRpb25zKHtcblx0XHRcdFx0aG9zdEVsZW1lbnQ6IHRoaXMuX2FuY2hvci5uYXRpdmVFbGVtZW50LFxuXHRcdFx0XHR0YXJnZXRFbGVtZW50OiB0aGlzLl9ib2R5Q29udGFpbmVyIHx8IHRoaXMuX21lbnUubmF0aXZlRWxlbWVudCxcblx0XHRcdFx0cGxhY2VtZW50OiB0aGlzLnBsYWNlbWVudCxcblx0XHRcdFx0YXBwZW5kVG9Cb2R5OiB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknLFxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLl9hcHBseVBsYWNlbWVudENsYXNzZXMoKTtcblx0XHR9XG5cblx0XHRpZiAoY2hhbmdlcy5kcm9wZG93bkNsYXNzKSB7XG5cdFx0XHRjb25zdCB7IGN1cnJlbnRWYWx1ZSwgcHJldmlvdXNWYWx1ZSB9ID0gY2hhbmdlcy5kcm9wZG93bkNsYXNzO1xuXHRcdFx0dGhpcy5fYXBwbHlDdXN0b21Ecm9wZG93bkNsYXNzKGN1cnJlbnRWYWx1ZSwgcHJldmlvdXNWYWx1ZSk7XG5cdFx0fVxuXG5cdFx0aWYgKGNoYW5nZXMuYXV0b0Nsb3NlICYmIHRoaXMuX29wZW4pIHtcblx0XHRcdHRoaXMuYXV0b0Nsb3NlID0gY2hhbmdlcy5hdXRvQ2xvc2UuY3VycmVudFZhbHVlO1xuXHRcdFx0dGhpcy5fc2V0Q2xvc2VIYW5kbGVycygpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVja3MgaWYgdGhlIGRyb3Bkb3duIG1lbnUgaXMgb3Blbi5cblx0ICovXG5cdGlzT3BlbigpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fb3Blbjtcblx0fVxuXG5cdC8qKlxuXHQgKiBPcGVucyB0aGUgZHJvcGRvd24gbWVudS5cblx0ICovXG5cdG9wZW4oKTogdm9pZCB7XG5cdFx0aWYgKCF0aGlzLl9vcGVuKSB7XG5cdFx0XHR0aGlzLl9vcGVuID0gdHJ1ZTtcblx0XHRcdHRoaXMuX2FwcGx5Q29udGFpbmVyKHRoaXMuY29udGFpbmVyKTtcblx0XHRcdHRoaXMub3BlbkNoYW5nZS5lbWl0KHRydWUpO1xuXHRcdFx0dGhpcy5fc2V0Q2xvc2VIYW5kbGVycygpO1xuXHRcdFx0aWYgKHRoaXMuX2FuY2hvcikge1xuXHRcdFx0XHR0aGlzLl9hbmNob3IubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXHRcdFx0XHRpZiAodGhpcy5kaXNwbGF5ID09PSAnZHluYW1pYycpIHtcblx0XHRcdFx0XHR0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5fcG9zaXRpb25pbmcuY3JlYXRlUG9wcGVyKHtcblx0XHRcdFx0XHRcdFx0aG9zdEVsZW1lbnQ6IHRoaXMuX2FuY2hvci5uYXRpdmVFbGVtZW50LFxuXHRcdFx0XHRcdFx0XHR0YXJnZXRFbGVtZW50OiB0aGlzLl9ib2R5Q29udGFpbmVyIHx8IHRoaXMuX21lbnUubmF0aXZlRWxlbWVudCxcblx0XHRcdFx0XHRcdFx0cGxhY2VtZW50OiB0aGlzLnBsYWNlbWVudCxcblx0XHRcdFx0XHRcdFx0YXBwZW5kVG9Cb2R5OiB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknLFxuXHRcdFx0XHRcdFx0XHR1cGRhdGVQb3BwZXJPcHRpb25zOiAob3B0aW9ucykgPT4gdGhpcy5wb3BwZXJPcHRpb25zKGFkZFBvcHBlck9mZnNldChbMCwgMl0pKG9wdGlvbnMpKSxcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0dGhpcy5fYXBwbHlQbGFjZW1lbnRDbGFzc2VzKCk7XG5cdFx0XHRcdFx0XHR0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gdGhpcy5fbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9wb3NpdGlvbk1lbnUoKSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9zZXRDbG9zZUhhbmRsZXJzKCkge1xuXHRcdHRoaXMuX2Rlc3Ryb3lDbG9zZUhhbmRsZXJzJC5uZXh0KCk7IC8vIGRlc3Ryb3kgYW55IGV4aXN0aW5nIGNsb3NlIGhhbmRsZXJzXG5cblx0XHRuZ2JBdXRvQ2xvc2UoXG5cdFx0XHR0aGlzLl9uZ1pvbmUsXG5cdFx0XHR0aGlzLl9kb2N1bWVudCxcblx0XHRcdHRoaXMuYXV0b0Nsb3NlLFxuXHRcdFx0KHNvdXJjZTogU09VUkNFKSA9PiB7XG5cdFx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHRcdFx0aWYgKHNvdXJjZSA9PT0gU09VUkNFLkVTQ0FQRSkge1xuXHRcdFx0XHRcdHRoaXMuX2FuY2hvci5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHR0aGlzLl9kZXN0cm95Q2xvc2VIYW5kbGVycyQsXG5cdFx0XHR0aGlzLl9tZW51ID8gW3RoaXMuX21lbnUubmF0aXZlRWxlbWVudF0gOiBbXSxcblx0XHRcdHRoaXMuX2FuY2hvciA/IFt0aGlzLl9hbmNob3IubmF0aXZlRWxlbWVudF0gOiBbXSxcblx0XHRcdCcuZHJvcGRvd24taXRlbSwuZHJvcGRvd24tZGl2aWRlcicsXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9zZXMgdGhlIGRyb3Bkb3duIG1lbnUuXG5cdCAqL1xuXHRjbG9zZSgpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fb3Blbikge1xuXHRcdFx0dGhpcy5fb3BlbiA9IGZhbHNlO1xuXHRcdFx0dGhpcy5fcmVzZXRDb250YWluZXIoKTtcblx0XHRcdHRoaXMuX3Bvc2l0aW9uaW5nLmRlc3Ryb3koKTtcblx0XHRcdHRoaXMuX3pvbmVTdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG5cdFx0XHR0aGlzLl9kZXN0cm95Q2xvc2VIYW5kbGVycyQubmV4dCgpO1xuXHRcdFx0dGhpcy5vcGVuQ2hhbmdlLmVtaXQoZmFsc2UpO1xuXHRcdFx0dGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFRvZ2dsZXMgdGhlIGRyb3Bkb3duIG1lbnUuXG5cdCAqL1xuXHR0b2dnbGUoKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuaXNPcGVuKCkpIHtcblx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5vcGVuKCk7XG5cdFx0fVxuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0dGhpcy5jbG9zZSgpO1xuXHR9XG5cblx0b25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG5cdFx0LyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlcHJlY2F0aW9uL2RlcHJlY2F0aW9uICovXG5cdFx0Y29uc3Qga2V5ID0gZXZlbnQud2hpY2g7XG5cdFx0Y29uc3QgaXRlbUVsZW1lbnRzID0gdGhpcy5fZ2V0TWVudUVsZW1lbnRzKCk7XG5cblx0XHRsZXQgcG9zaXRpb24gPSAtMTtcblx0XHRsZXQgaXRlbUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cdFx0Y29uc3QgaXNFdmVudEZyb21Ub2dnbGUgPSB0aGlzLl9pc0V2ZW50RnJvbVRvZ2dsZShldmVudCk7XG5cblx0XHRpZiAoIWlzRXZlbnRGcm9tVG9nZ2xlICYmIGl0ZW1FbGVtZW50cy5sZW5ndGgpIHtcblx0XHRcdGl0ZW1FbGVtZW50cy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuXHRcdFx0XHRpZiAoaXRlbS5jb250YWlucyhldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRcdFx0aXRlbUVsZW1lbnQgPSBpdGVtO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChpdGVtID09PSBnZXRBY3RpdmVFbGVtZW50KHRoaXMuX2RvY3VtZW50KSkge1xuXHRcdFx0XHRcdHBvc2l0aW9uID0gaW5kZXg7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIGNsb3Npbmcgb24gRW50ZXIgLyBTcGFjZVxuXHRcdGlmIChrZXkgPT09IEtleS5TcGFjZSB8fCBrZXkgPT09IEtleS5FbnRlcikge1xuXHRcdFx0aWYgKGl0ZW1FbGVtZW50ICYmICh0aGlzLmF1dG9DbG9zZSA9PT0gdHJ1ZSB8fCB0aGlzLmF1dG9DbG9zZSA9PT0gJ2luc2lkZScpKSB7XG5cdFx0XHRcdC8vIEl0ZW0gaXMgZWl0aGVyIGEgYnV0dG9uIG9yIGEgbGluaywgc28gY2xpY2sgd2lsbCBiZSB0cmlnZ2VyZWQgYnkgdGhlIGJyb3dzZXIgb24gRW50ZXIgb3IgU3BhY2UuXG5cdFx0XHRcdC8vIFNvIHdlIGhhdmUgdG8gcmVnaXN0ZXIgYSBvbmUtdGltZSBjbGljayBoYW5kbGVyIHRoYXQgd2lsbCBmaXJlIGFmdGVyIGFueSB1c2VyIGRlZmluZWQgY2xpY2sgaGFuZGxlcnNcblx0XHRcdFx0Ly8gdG8gY2xvc2UgdGhlIGRyb3Bkb3duXG5cdFx0XHRcdGZyb21FdmVudChpdGVtRWxlbWVudCwgJ2NsaWNrJylcblx0XHRcdFx0XHQucGlwZSh0YWtlKDEpKVxuXHRcdFx0XHRcdC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoa2V5ID09PSBLZXkuVGFiKSB7XG5cdFx0XHRpZiAoZXZlbnQudGFyZ2V0ICYmIHRoaXMuaXNPcGVuKCkgJiYgdGhpcy5hdXRvQ2xvc2UpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2FuY2hvci5uYXRpdmVFbGVtZW50ID09PSBldmVudC50YXJnZXQpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5jb250YWluZXIgPT09ICdib2R5JyAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcblx0XHRcdFx0XHRcdC8qIFRoaXMgY2FzZSBpcyBzcGVjaWFsOiB1c2VyIGlzIHVzaW5nIFtUYWJdIGZyb20gdGhlIGFuY2hvci90b2dnbGUuXG4gICAgICAgICAgICAgICBVc2VyIGV4cGVjdHMgdGhlIG5leHQgZm9jdXNhYmxlIGVsZW1lbnQgaW4gdGhlIGRyb3Bkb3duIG1lbnUgdG8gZ2V0IGZvY3VzLlxuICAgICAgICAgICAgICAgQnV0IHRoZSBtZW51IGlzIG5vdCBhIHNpYmxpbmcgdG8gYW5jaG9yL3RvZ2dsZSwgaXQgaXMgYXQgdGhlIGVuZCBvZiB0aGUgYm9keS5cbiAgICAgICAgICAgICAgIFRyaWNrIGlzIHRvIHN5bmNocm9ub3VzbHkgZm9jdXMgdGhlIG1lbnUgZWxlbWVudCwgYW5kIGxldCB0aGUgW2tleWRvd24uVGFiXSBnb1xuICAgICAgICAgICAgICAgc28gdGhhdCBicm93c2VyIHdpbGwgZm9jdXMgdGhlIHByb3BlciBlbGVtZW50IChmaXJzdCBvbmUgZm9jdXNhYmxlIGluIHRoZSBtZW51KSAqL1xuXHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuX21lbnUubmF0aXZlRWxlbWVudCwgJ3RhYmluZGV4JywgJzAnKTtcblx0XHRcdFx0XHRcdHRoaXMuX21lbnUubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMuX21lbnUubmF0aXZlRWxlbWVudCwgJ3RhYmluZGV4Jyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChldmVudC5zaGlmdEtleSkge1xuXHRcdFx0XHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5jb250YWluZXIgPT09ICdib2R5Jykge1xuXHRcdFx0XHRcdGNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzID0gdGhpcy5fbWVudS5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRk9DVVNBQkxFX0VMRU1FTlRTX1NFTEVDVE9SKTtcblx0XHRcdFx0XHRpZiAoZXZlbnQuc2hpZnRLZXkgJiYgZXZlbnQudGFyZ2V0ID09PSBmb2N1c2FibGVFbGVtZW50c1swXSkge1xuXHRcdFx0XHRcdFx0dGhpcy5fYW5jaG9yLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICghZXZlbnQuc2hpZnRLZXkgJiYgZXZlbnQudGFyZ2V0ID09PSBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxXSkge1xuXHRcdFx0XHRcdFx0dGhpcy5fYW5jaG9yLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblx0XHRcdFx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZnJvbUV2ZW50PEZvY3VzRXZlbnQ+KGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCwgJ2ZvY3Vzb3V0Jylcblx0XHRcdFx0XHRcdC5waXBlKHRha2UoMSkpXG5cdFx0XHRcdFx0XHQuc3Vic2NyaWJlKCh7IHJlbGF0ZWRUYXJnZXQgfSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoIXRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhyZWxhdGVkVGFyZ2V0IGFzIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBvcGVuaW5nIC8gbmF2aWdhdGluZ1xuXHRcdGlmIChpc0V2ZW50RnJvbVRvZ2dsZSB8fCBpdGVtRWxlbWVudCkge1xuXHRcdFx0dGhpcy5vcGVuKCk7XG5cblx0XHRcdGlmIChpdGVtRWxlbWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdHN3aXRjaCAoa2V5KSB7XG5cdFx0XHRcdFx0Y2FzZSBLZXkuQXJyb3dEb3duOlxuXHRcdFx0XHRcdFx0cG9zaXRpb24gPSBNYXRoLm1pbihwb3NpdGlvbiArIDEsIGl0ZW1FbGVtZW50cy5sZW5ndGggLSAxKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgS2V5LkFycm93VXA6XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5faXNEcm9wdXAoKSAmJiBwb3NpdGlvbiA9PT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0cG9zaXRpb24gPSBpdGVtRWxlbWVudHMubGVuZ3RoIC0gMTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRwb3NpdGlvbiA9IE1hdGgubWF4KHBvc2l0aW9uIC0gMSwgMCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIEtleS5Ib21lOlxuXHRcdFx0XHRcdFx0cG9zaXRpb24gPSAwO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBLZXkuRW5kOlxuXHRcdFx0XHRcdFx0cG9zaXRpb24gPSBpdGVtRWxlbWVudHMubGVuZ3RoIC0gMTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGl0ZW1FbGVtZW50c1twb3NpdGlvbl0uZm9jdXMoKTtcblx0XHRcdH1cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfaXNEcm9wdXAoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3B1cCcpO1xuXHR9XG5cblx0cHJpdmF0ZSBfaXNFdmVudEZyb21Ub2dnbGUoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcblx0XHRyZXR1cm4gdGhpcy5fYW5jaG9yLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KTtcblx0fVxuXG5cdHByaXZhdGUgX2dldE1lbnVFbGVtZW50cygpOiBIVE1MRWxlbWVudFtdIHtcblx0XHRjb25zdCBtZW51ID0gdGhpcy5fbWVudTtcblx0XHRpZiAobWVudSA9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gW107XG5cdFx0fVxuXHRcdHJldHVybiBtZW51Lm1lbnVJdGVtcy5maWx0ZXIoKGl0ZW0pID0+ICFpdGVtLmRpc2FibGVkKS5tYXAoKGl0ZW0pID0+IGl0ZW0uZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcblx0fVxuXG5cdHByaXZhdGUgX3Bvc2l0aW9uTWVudSgpIHtcblx0XHRjb25zdCBtZW51ID0gdGhpcy5fbWVudTtcblx0XHRpZiAodGhpcy5pc09wZW4oKSAmJiBtZW51KSB7XG5cdFx0XHRpZiAodGhpcy5kaXNwbGF5ID09PSAnZHluYW1pYycpIHtcblx0XHRcdFx0dGhpcy5fcG9zaXRpb25pbmcudXBkYXRlKCk7XG5cdFx0XHRcdHRoaXMuX2FwcGx5UGxhY2VtZW50Q2xhc3NlcygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fYXBwbHlQbGFjZW1lbnRDbGFzc2VzKHRoaXMuX2dldEZpcnN0UGxhY2VtZW50KHRoaXMucGxhY2VtZW50KSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfZ2V0Rmlyc3RQbGFjZW1lbnQocGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSk6IFBsYWNlbWVudCB7XG5cdFx0cmV0dXJuIEFycmF5LmlzQXJyYXkocGxhY2VtZW50KSA/IHBsYWNlbWVudFswXSA6IChwbGFjZW1lbnQuc3BsaXQoJyAnKVswXSBhcyBQbGFjZW1lbnQpO1xuXHR9XG5cblx0cHJpdmF0ZSBfcmVzZXRDb250YWluZXIoKSB7XG5cdFx0Y29uc3QgcmVuZGVyZXIgPSB0aGlzLl9yZW5kZXJlcjtcblx0XHRpZiAodGhpcy5fbWVudSkge1xuXHRcdFx0Y29uc3QgZHJvcGRvd25FbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXHRcdFx0Y29uc3QgZHJvcGRvd25NZW51RWxlbWVudCA9IHRoaXMuX21lbnUubmF0aXZlRWxlbWVudDtcblxuXHRcdFx0cmVuZGVyZXIuYXBwZW5kQ2hpbGQoZHJvcGRvd25FbGVtZW50LCBkcm9wZG93bk1lbnVFbGVtZW50KTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuX2JvZHlDb250YWluZXIpIHtcblx0XHRcdHJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuX2RvY3VtZW50LmJvZHksIHRoaXMuX2JvZHlDb250YWluZXIpO1xuXHRcdFx0dGhpcy5fYm9keUNvbnRhaW5lciA9IG51bGw7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfYXBwbHlDb250YWluZXIoY29udGFpbmVyOiBudWxsIHwgJ2JvZHknID0gbnVsbCkge1xuXHRcdHRoaXMuX3Jlc2V0Q29udGFpbmVyKCk7XG5cdFx0aWYgKGNvbnRhaW5lciA9PT0gJ2JvZHknKSB7XG5cdFx0XHRjb25zdCByZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyO1xuXHRcdFx0Y29uc3QgZHJvcGRvd25NZW51RWxlbWVudCA9IHRoaXMuX21lbnUubmF0aXZlRWxlbWVudDtcblx0XHRcdGNvbnN0IGJvZHlDb250YWluZXIgPSAodGhpcy5fYm9keUNvbnRhaW5lciA9IHRoaXMuX2JvZHlDb250YWluZXIgfHwgcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2JykpO1xuXG5cdFx0XHQvLyBPdmVycmlkZSBzb21lIHN0eWxlcyB0byBoYXZlIHRoZSBwb3NpdGlvbmluZyB3b3JraW5nXG5cdFx0XHRyZW5kZXJlci5zZXRTdHlsZShib2R5Q29udGFpbmVyLCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcblx0XHRcdHJlbmRlcmVyLnNldFN0eWxlKGRyb3Bkb3duTWVudUVsZW1lbnQsICdwb3NpdGlvbicsICdzdGF0aWMnKTtcblx0XHRcdHJlbmRlcmVyLnNldFN0eWxlKGJvZHlDb250YWluZXIsICd6LWluZGV4JywgJzEwNTUnKTtcblxuXHRcdFx0cmVuZGVyZXIuYXBwZW5kQ2hpbGQoYm9keUNvbnRhaW5lciwgZHJvcGRvd25NZW51RWxlbWVudCk7XG5cdFx0XHRyZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLl9kb2N1bWVudC5ib2R5LCBib2R5Q29udGFpbmVyKTtcblx0XHR9XG5cblx0XHR0aGlzLl9hcHBseUN1c3RvbURyb3Bkb3duQ2xhc3ModGhpcy5kcm9wZG93bkNsYXNzKTtcblx0fVxuXG5cdHByaXZhdGUgX2FwcGx5Q3VzdG9tRHJvcGRvd25DbGFzcyhuZXdDbGFzczogc3RyaW5nLCBvbGRDbGFzcz86IHN0cmluZykge1xuXHRcdGNvbnN0IHRhcmdldEVsZW1lbnQgPSB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknID8gdGhpcy5fYm9keUNvbnRhaW5lciA6IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblx0XHRpZiAodGFyZ2V0RWxlbWVudCkge1xuXHRcdFx0aWYgKG9sZENsYXNzKSB7XG5cdFx0XHRcdHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRhcmdldEVsZW1lbnQsIG9sZENsYXNzKTtcblx0XHRcdH1cblx0XHRcdGlmIChuZXdDbGFzcykge1xuXHRcdFx0XHR0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0YXJnZXRFbGVtZW50LCBuZXdDbGFzcyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfYXBwbHlQbGFjZW1lbnRDbGFzc2VzKHBsYWNlbWVudD86IFBsYWNlbWVudCB8IG51bGwpIHtcblx0XHRjb25zdCBtZW51ID0gdGhpcy5fbWVudTtcblx0XHRpZiAobWVudSkge1xuXHRcdFx0aWYgKCFwbGFjZW1lbnQpIHtcblx0XHRcdFx0cGxhY2VtZW50ID0gdGhpcy5fZ2V0Rmlyc3RQbGFjZW1lbnQodGhpcy5wbGFjZW1lbnQpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCByZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyO1xuXHRcdFx0Y29uc3QgZHJvcGRvd25FbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG5cdFx0XHQvLyByZW1vdmUgdGhlIGN1cnJlbnQgcGxhY2VtZW50IGNsYXNzZXNcblx0XHRcdHJlbmRlcmVyLnJlbW92ZUNsYXNzKGRyb3Bkb3duRWxlbWVudCwgJ2Ryb3B1cCcpO1xuXHRcdFx0cmVuZGVyZXIucmVtb3ZlQ2xhc3MoZHJvcGRvd25FbGVtZW50LCAnZHJvcGRvd24nKTtcblx0XHRcdGNvbnN0IHsgbmF0aXZlRWxlbWVudCB9ID0gbWVudTtcblx0XHRcdGlmICh0aGlzLmRpc3BsYXkgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdG1lbnUucGxhY2VtZW50ID0gbnVsbDtcblx0XHRcdFx0cmVuZGVyZXIuc2V0QXR0cmlidXRlKG5hdGl2ZUVsZW1lbnQsICdkYXRhLWJzLXBvcHBlcicsICdzdGF0aWMnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG1lbnUucGxhY2VtZW50ID0gcGxhY2VtZW50O1xuXHRcdFx0XHRyZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUobmF0aXZlRWxlbWVudCwgJ2RhdGEtYnMtcG9wcGVyJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8qXG5cdFx0XHQgKiBhcHBseSB0aGUgbmV3IHBsYWNlbWVudFxuXHRcdFx0ICogaW4gY2FzZSBvZiB0b3AgdXNlIHVwLWFycm93IG9yIGRvd24tYXJyb3cgb3RoZXJ3aXNlXG5cdFx0XHQgKi9cblx0XHRcdGNvbnN0IGRyb3Bkb3duQ2xhc3MgPSBwbGFjZW1lbnQuc2VhcmNoKCdedG9wJykgIT09IC0xID8gJ2Ryb3B1cCcgOiAnZHJvcGRvd24nO1xuXHRcdFx0cmVuZGVyZXIuYWRkQ2xhc3MoZHJvcGRvd25FbGVtZW50LCBkcm9wZG93bkNsYXNzKTtcblxuXHRcdFx0Y29uc3QgYm9keUNvbnRhaW5lciA9IHRoaXMuX2JvZHlDb250YWluZXI7XG5cdFx0XHRpZiAoYm9keUNvbnRhaW5lcikge1xuXHRcdFx0XHRyZW5kZXJlci5yZW1vdmVDbGFzcyhib2R5Q29udGFpbmVyLCAnZHJvcHVwJyk7XG5cdFx0XHRcdHJlbmRlcmVyLnJlbW92ZUNsYXNzKGJvZHlDb250YWluZXIsICdkcm9wZG93bicpO1xuXHRcdFx0XHRyZW5kZXJlci5hZGRDbGFzcyhib2R5Q29udGFpbmVyLCBkcm9wZG93bkNsYXNzKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiJdfQ==