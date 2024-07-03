import { Attribute, ContentChildren, Directive, EventEmitter, forwardRef, Inject, Input, Output, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isDefined } from '../util/util';
import { Key } from '../util/key';
import * as i0 from "@angular/core";
import * as i1 from "./nav-config";
const isValidNavId = (id) => isDefined(id) && id !== '';
let navCounter = 0;
/**
 * This directive must be used to wrap content to be displayed in the nav.
 *
 * @since 5.2.0
 */
class NgbNavContent {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavContent, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbNavContent, isStandalone: true, selector: "ng-template[ngbNavContent]", ngImport: i0 }); }
}
export { NgbNavContent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavContent, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbNavContent]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * This directive applies a specific role on a non-container based ngbNavItem.
 *
 * @since 14.1.0
 */
class NgbNavItemRole {
    constructor(role, nav) {
        this.role = role;
        this.nav = nav;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavItemRole, deps: [{ token: 'role', attribute: true }, { token: forwardRef(() => NgbNav) }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbNavItemRole, isStandalone: true, selector: "[ngbNavItem]:not(ng-container)", host: { properties: { "attr.role": "role ? role : nav.roles ? 'presentation' : undefined" } }, ngImport: i0 }); }
}
export { NgbNavItemRole };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavItemRole, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbNavItem]:not(ng-container)',
                    standalone: true,
                    host: {
                        '[attr.role]': `role ? role : nav.roles ? 'presentation' : undefined`,
                    },
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['role']
                }] }, { type: NgbNav, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbNav)]
                }] }]; } });
/**
 * The directive used to group nav link and related nav content. As well as set nav identifier and some options.
 *
 * @since 5.2.0
 */
class NgbNavItem {
    constructor(_nav, elementRef) {
        this._nav = _nav;
        this.elementRef = elementRef;
        /**
         * If `true`, the current nav item is disabled and can't be toggled by user.
         *
         * Nevertheless disabled nav can be selected programmatically via the `.select()` method and the `[activeId]` binding.
         */
        this.disabled = false;
        /**
         * An event emitted when the fade in transition is finished on the related nav content
         *
         * @since 8.0.0
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the fade out transition is finished on the related nav content
         *
         * @since 8.0.0
         */
        this.hidden = new EventEmitter();
    }
    ngAfterContentChecked() {
        // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
        // only @ContentChildren allows us to specify the {descendants: false} option.
        // Without {descendants: false} we are hitting bugs described in:
        // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
        this.contentTpl = this.contentTpls.first;
    }
    ngOnInit() {
        if (!isDefined(this.domId)) {
            this.domId = `ngb-nav-${navCounter++}`;
        }
    }
    get active() {
        return this._nav.activeId === this.id;
    }
    get id() {
        return isValidNavId(this._id) ? this._id : this.domId;
    }
    get panelDomId() {
        return `${this.domId}-panel`;
    }
    isPanelInDom() {
        return (isDefined(this.destroyOnHide) ? !this.destroyOnHide : !this._nav.destroyOnHide) || this.active;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavItem, deps: [{ token: forwardRef(() => NgbNav) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbNavItem, isStandalone: true, selector: "[ngbNavItem]", inputs: { destroyOnHide: "destroyOnHide", disabled: "disabled", domId: "domId", _id: ["ngbNavItem", "_id"] }, outputs: { shown: "shown", hidden: "hidden" }, host: { properties: { "class.nav-item": "true" } }, queries: [{ propertyName: "contentTpls", predicate: NgbNavContent }], exportAs: ["ngbNavItem"], ngImport: i0 }); }
}
export { NgbNavItem };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavItem, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbNavItem]', exportAs: 'ngbNavItem', standalone: true, host: { '[class.nav-item]': 'true' } }]
        }], ctorParameters: function () { return [{ type: NgbNav, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbNav)]
                }] }, { type: i0.ElementRef }]; }, propDecorators: { destroyOnHide: [{
                type: Input
            }], disabled: [{
                type: Input
            }], domId: [{
                type: Input
            }], _id: [{
                type: Input,
                args: ['ngbNavItem']
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }], contentTpls: [{
                type: ContentChildren,
                args: [NgbNavContent, { descendants: false }]
            }] } });
/**
 * A nav directive that helps with implementing tabbed navigation components.
 *
 * @since 5.2.0
 */
class NgbNav {
    constructor(role, config, _cd, _document) {
        this.role = role;
        this._cd = _cd;
        this._document = _document;
        /**
         * The event emitted after the active nav changes
         * The payload of the event is the newly active nav id
         *
         * If you want to prevent nav change, you should use `(navChange)` event
         */
        this.activeIdChange = new EventEmitter();
        /**
         * An event emitted when the fade in transition is finished for one of the items.
         *
         * Payload of the event is the nav id that was just shown.
         *
         * @since 8.0.0
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the fade out transition is finished for one of the items.
         *
         * Payload of the event is the nav id that was just hidden.
         *
         * @since 8.0.0
         */
        this.hidden = new EventEmitter();
        this.destroy$ = new Subject();
        this.navItemChange$ = new Subject();
        /**
         * The nav change event emitted right before the nav change happens on user click.
         *
         * This event won't be emitted if nav is changed programmatically via `[activeId]` or `.select()`.
         *
         * See [`NgbNavChangeEvent`](#/components/nav/api#NgbNavChangeEvent) for payload details.
         */
        this.navChange = new EventEmitter();
        this.animation = config.animation;
        this.destroyOnHide = config.destroyOnHide;
        this.orientation = config.orientation;
        this.roles = config.roles;
        this.keyboard = config.keyboard;
    }
    click(item) {
        if (!item.disabled) {
            this._updateActiveId(item.id);
        }
    }
    onKeyDown(event) {
        if (this.roles !== 'tablist' || !this.keyboard) {
            return;
        }
        /* eslint-disable-next-line deprecation/deprecation */
        const key = event.which;
        const enabledLinks = this.links.filter((link) => !link.navItem.disabled);
        const { length } = enabledLinks;
        let position = -1;
        enabledLinks.forEach((link, index) => {
            if (link.elRef.nativeElement === this._document.activeElement) {
                position = index;
            }
        });
        if (length) {
            switch (key) {
                case Key.ArrowLeft:
                    if (this.orientation === 'vertical') {
                        return;
                    }
                    position = (position - 1 + length) % length;
                    break;
                case Key.ArrowRight:
                    if (this.orientation === 'vertical') {
                        return;
                    }
                    position = (position + 1) % length;
                    break;
                case Key.ArrowDown:
                    if (this.orientation === 'horizontal') {
                        return;
                    }
                    position = (position + 1) % length;
                    break;
                case Key.ArrowUp:
                    if (this.orientation === 'horizontal') {
                        return;
                    }
                    position = (position - 1 + length) % length;
                    break;
                case Key.Home:
                    position = 0;
                    break;
                case Key.End:
                    position = length - 1;
                    break;
            }
            if (this.keyboard === 'changeWithArrows') {
                this.select(enabledLinks[position].navItem.id);
            }
            enabledLinks[position].elRef.nativeElement.focus();
            event.preventDefault();
        }
    }
    /**
     * Selects the nav with the given id and shows its associated pane.
     * Any other nav that was previously selected becomes unselected and its associated pane is hidden.
     */
    select(id) {
        this._updateActiveId(id, false);
    }
    ngAfterContentInit() {
        if (!isDefined(this.activeId)) {
            const nextId = this.items.first ? this.items.first.id : null;
            if (isValidNavId(nextId)) {
                this._updateActiveId(nextId, false);
                this._cd.detectChanges();
            }
        }
        this.items.changes.pipe(takeUntil(this.destroy$)).subscribe(() => this._notifyItemChanged(this.activeId));
    }
    ngOnChanges({ activeId }) {
        if (activeId && !activeId.firstChange) {
            this._notifyItemChanged(activeId.currentValue);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
    _updateActiveId(nextId, emitNavChange = true) {
        if (this.activeId !== nextId) {
            let defaultPrevented = false;
            if (emitNavChange) {
                this.navChange.emit({
                    activeId: this.activeId,
                    nextId,
                    preventDefault: () => {
                        defaultPrevented = true;
                    },
                });
            }
            if (!defaultPrevented) {
                this.activeId = nextId;
                this.activeIdChange.emit(nextId);
                this._notifyItemChanged(nextId);
            }
        }
    }
    _notifyItemChanged(nextItemId) {
        this.navItemChange$.next(this._getItemById(nextItemId));
    }
    _getItemById(itemId) {
        return (this.items && this.items.find((item) => item.id === itemId)) || null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNav, deps: [{ token: 'role', attribute: true }, { token: i1.NgbNavConfig }, { token: i0.ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbNav, isStandalone: true, selector: "[ngbNav]", inputs: { activeId: "activeId", animation: "animation", destroyOnHide: "destroyOnHide", orientation: "orientation", roles: "roles", keyboard: "keyboard" }, outputs: { activeIdChange: "activeIdChange", shown: "shown", hidden: "hidden", navChange: "navChange" }, host: { listeners: { "keydown.arrowLeft": "onKeyDown($event)", "keydown.arrowRight": "onKeyDown($event)", "keydown.arrowDown": "onKeyDown($event)", "keydown.arrowUp": "onKeyDown($event)", "keydown.Home": "onKeyDown($event)", "keydown.End": "onKeyDown($event)" }, properties: { "class.nav": "true", "class.flex-column": "orientation === 'vertical'", "attr.aria-orientation": "orientation === 'vertical' && roles === 'tablist' ? 'vertical' : undefined", "attr.role": "role ? role : roles ? 'tablist' : undefined" } }, queries: [{ propertyName: "items", predicate: NgbNavItem }, { propertyName: "links", predicate: i0.forwardRef(function () { return NgbNavLinkBase; }), descendants: true }], exportAs: ["ngbNav"], usesOnChanges: true, ngImport: i0 }); }
}
export { NgbNav };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNav, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbNav]',
                    exportAs: 'ngbNav',
                    standalone: true,
                    host: {
                        '[class.nav]': 'true',
                        '[class.flex-column]': `orientation === 'vertical'`,
                        '[attr.aria-orientation]': `orientation === 'vertical' && roles === 'tablist' ? 'vertical' : undefined`,
                        '[attr.role]': `role ? role : roles ? 'tablist' : undefined`,
                        '(keydown.arrowLeft)': 'onKeyDown($event)',
                        '(keydown.arrowRight)': 'onKeyDown($event)',
                        '(keydown.arrowDown)': 'onKeyDown($event)',
                        '(keydown.arrowUp)': 'onKeyDown($event)',
                        '(keydown.Home)': 'onKeyDown($event)',
                        '(keydown.End)': 'onKeyDown($event)',
                    },
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['role']
                }] }, { type: i1.NgbNavConfig }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { activeId: [{
                type: Input
            }], activeIdChange: [{
                type: Output
            }], animation: [{
                type: Input
            }], destroyOnHide: [{
                type: Input
            }], orientation: [{
                type: Input
            }], roles: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }], items: [{
                type: ContentChildren,
                args: [NgbNavItem]
            }], links: [{
                type: ContentChildren,
                args: [forwardRef(() => NgbNavLinkBase), { descendants: true }]
            }], navChange: [{
                type: Output
            }] } });
class NgbNavLinkBase {
    constructor(role, navItem, nav, elRef) {
        this.role = role;
        this.navItem = navItem;
        this.nav = nav;
        this.elRef = elRef;
    }
    hasNavItemClass() {
        // with alternative markup we have to add `.nav-item` class, because `ngbNavItem` is on the ng-container
        return this.navItem.elementRef.nativeElement.nodeType === Node.COMMENT_NODE;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavLinkBase, deps: [{ token: 'role', attribute: true }, { token: NgbNavItem }, { token: NgbNav }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbNavLinkBase, isStandalone: true, selector: "[ngbNavLink]", host: { properties: { "id": "navItem.domId", "class.nav-link": "true", "class.nav-item": "hasNavItemClass()", "attr.role": "role ? role : nav.roles ? 'tab' : undefined", "class.active": "navItem.active", "class.disabled": "navItem.disabled", "attr.tabindex": "navItem.disabled ? -1 : undefined", "attr.aria-controls": "navItem.isPanelInDom() ? navItem.panelDomId : null", "attr.aria-selected": "navItem.active", "attr.aria-disabled": "navItem.disabled" } }, ngImport: i0 }); }
}
export { NgbNavLinkBase };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavLinkBase, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbNavLink]',
                    standalone: true,
                    host: {
                        '[id]': 'navItem.domId',
                        '[class.nav-link]': 'true',
                        '[class.nav-item]': 'hasNavItemClass()',
                        '[attr.role]': `role ? role : nav.roles ? 'tab' : undefined`,
                        '[class.active]': 'navItem.active',
                        '[class.disabled]': 'navItem.disabled',
                        '[attr.tabindex]': 'navItem.disabled ? -1 : undefined',
                        '[attr.aria-controls]': 'navItem.isPanelInDom() ? navItem.panelDomId : null',
                        '[attr.aria-selected]': 'navItem.active',
                        '[attr.aria-disabled]': 'navItem.disabled',
                    },
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['role']
                }] }, { type: NgbNavItem }, { type: NgbNav }, { type: i0.ElementRef }]; } });
/**
 * A directive to mark the nav link when used on a button element.
 */
class NgbNavLinkButton {
    constructor(navItem, nav) {
        this.navItem = navItem;
        this.nav = nav;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavLinkButton, deps: [{ token: NgbNavItem }, { token: NgbNav }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbNavLinkButton, isStandalone: true, selector: "button[ngbNavLink]", host: { attributes: { "type": "button" }, listeners: { "click": "nav.click(navItem)" }, properties: { "disabled": "navItem.disabled" } }, hostDirectives: [{ directive: NgbNavLinkBase }], ngImport: i0 }); }
}
export { NgbNavLinkButton };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavLinkButton, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[ngbNavLink]',
                    standalone: true,
                    hostDirectives: [NgbNavLinkBase],
                    host: {
                        type: 'button',
                        '[disabled]': 'navItem.disabled',
                        '(click)': 'nav.click(navItem)',
                    },
                }]
        }], ctorParameters: function () { return [{ type: NgbNavItem }, { type: NgbNav }]; } });
/**
 * A directive to mark the nav link when used on a link element.
 *
 * @since 5.2.0
 */
class NgbNavLink {
    constructor(navItem, nav) {
        this.navItem = navItem;
        this.nav = nav;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavLink, deps: [{ token: NgbNavItem }, { token: NgbNav }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbNavLink, isStandalone: true, selector: "a[ngbNavLink]", host: { attributes: { "href": "" }, listeners: { "click": "nav.click(navItem); $event.preventDefault()" } }, hostDirectives: [{ directive: NgbNavLinkBase }], ngImport: i0 }); }
}
export { NgbNavLink };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbNavLink, decorators: [{
            type: Directive,
            args: [{
                    selector: 'a[ngbNavLink]',
                    standalone: true,
                    hostDirectives: [NgbNavLinkBase],
                    host: {
                        href: '',
                        '(click)': 'nav.click(navItem); $event.preventDefault()',
                    },
                }]
        }], ctorParameters: function () { return [{ type: NgbNavItem }, { type: NgbNav }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25hdi9uYXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdOLFNBQVMsRUFFVCxlQUFlLEVBQ2YsU0FBUyxFQUVULFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFJTCxNQUFNLEdBSU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFekMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7O0FBRWxDLE1BQU0sWUFBWSxHQUFHLENBQUMsRUFBTyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUU3RCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFnQm5COzs7O0dBSUc7QUFDSCxNQUNhLGFBQWE7SUFDekIsWUFBbUIsV0FBNkI7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0lBQUcsQ0FBQzs4R0FEeEMsYUFBYTtrR0FBYixhQUFhOztTQUFiLGFBQWE7MkZBQWIsYUFBYTtrQkFEekIsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSw0QkFBNEIsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFOztBQUt2RTs7OztHQUlHO0FBQ0gsTUFPYSxjQUFjO0lBQzFCLFlBQXNDLElBQVksRUFBMkMsR0FBVztRQUFsRSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQTJDLFFBQUcsR0FBSCxHQUFHLENBQVE7SUFBRyxDQUFDOzhHQURoRyxjQUFjLGtCQUNILE1BQU0sOEJBQStCLFVB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QUFFLGdCQUFnQjt3QkFDeEMsc0JBQXNCLEVBQUUsa0JBQWtCO3FCQUMxQztpQkFDRDs7MEJBR0UsU0FBUzsyQkFBQyxNQUFNOztBQVluQjs7R0FFRztBQUNILE1BVWEsZ0JBQWdCO0lBQzVCLFlBQW1CLE9BQW1CLEVBQVMsR0FBVztRQUF2QyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVMsUUFBRyxHQUFILEdBQUcsQ0FBUTtJQUFHLENBQUM7OEdBRGxELGdCQUFnQjtrR0FBaEIsZ0JBQWdCLDhOQTNCaEIsY0FBYzs7U0EyQmQsZ0JBQWdCOzJGQUFoQixnQkFBZ0I7a0JBVjVCLFNBQVM7bUJBQUM7b0JBQ1YsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLGNBQWMsRUFBRSxDQUFDLGNBQWMsQ0FBQztvQkFDaEMsSUFBSSxFQUFFO3dCQUNMLElBQUksRUFBRSxRQUFRO3dCQUNkLFlBQVksRUFBRSxrQkFBa0I7d0JBQ2hDLFNBQVMsRUFBRSxvQkFBb0I7cUJBQy9CO2lCQUNEOztBQUtEOzs7O0dBSUc7QUFDSCxNQVNhLFVBQVU7SUFDdEIsWUFBbUIsT0FBbUIsRUFBUyxHQUFXO1FBQXZDLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFRO0lBQUcsQ0FBQzs4R0FEbEQsVUFBVTtrR0FBVixVQUFVLDRMQTdDVixjQUFjOztTQTZDZCxVQUFVOzJGQUFWLFVBQVU7a0JBVHRCLFNBQVM7bUJBQUM7b0JBQ1YsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixjQUFjLEVBQUUsQ0FBQyxjQUFjLENBQUM7b0JBQ2hDLElBQUksRUFBRTt3QkFDTCxJQUFJLEVBQUUsRUFBRTt3QkFDUixTQUFTLEVBQUUsNkNBQTZDO3FCQUN4RDtpQkFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdEFmdGVyQ29udGVudENoZWNrZWQsXG5cdEFmdGVyQ29udGVudEluaXQsXG5cdEF0dHJpYnV0ZSxcblx0Q2hhbmdlRGV0ZWN0b3JSZWYsXG5cdENvbnRlbnRDaGlsZHJlbixcblx0RGlyZWN0aXZlLFxuXHRFbGVtZW50UmVmLFxuXHRFdmVudEVtaXR0ZXIsXG5cdGZvcndhcmRSZWYsXG5cdEluamVjdCxcblx0SW5wdXQsXG5cdE9uQ2hhbmdlcyxcblx0T25EZXN0cm95LFxuXHRPbkluaXQsXG5cdE91dHB1dCxcblx0UXVlcnlMaXN0LFxuXHRTaW1wbGVDaGFuZ2VzLFxuXHRUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgaXNEZWZpbmVkIH0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7IE5nYk5hdkNvbmZpZyB9IGZyb20gJy4vbmF2LWNvbmZpZyc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICcuLi91dGlsL2tleSc7XG5cbmNvbnN0IGlzVmFsaWROYXZJZCA9IChpZDogYW55KSA9PiBpc0RlZmluZWQoaWQpICYmIGlkICE9PSAnJztcblxubGV0IG5hdkNvdW50ZXIgPSAwO1xuXG4vKipcbiAqIENvbnRleHQgcGFzc2VkIHRvIHRoZSBuYXYgY29udGVudCB0ZW1wbGF0ZS5cbiAqXG4gKiBTZWUgW3RoaXMgZGVtb10oIy9jb21wb25lbnRzL25hdi9leGFtcGxlcyNrZWVwLWNvbnRlbnQpIGFzIHRoZSBleGFtcGxlLlxuICpcbiAqIEBzaW5jZSA1LjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYk5hdkNvbnRlbnRDb250ZXh0IHtcblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgY3VycmVudCBuYXYgY29udGVudCBpcyB2aXNpYmxlIGFuZCBhY3RpdmVcblx0ICovXG5cdCRpbXBsaWNpdDogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSBtdXN0IGJlIHVzZWQgdG8gd3JhcCBjb250ZW50IHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgbmF2LlxuICpcbiAqIEBzaW5jZSA1LjIuMFxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JOYXZDb250ZW50XScsIHN0YW5kYWxvbmU6IHRydWUgfSlcbmV4cG9ydCBjbGFzcyBOZ2JOYXZDb250ZW50IHtcblx0Y29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG4vKipcbiAqIFRoaXMgZGlyZWN0aXZlIGFwcGxpZXMgYSBzcGVjaWZpYyByb2xlIG9uIGEgbm9uLWNvbnRhaW5lciBiYXNlZCBuZ2JOYXZJdGVtLlxuICpcbiAqIEBzaW5jZSAxNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiAnW25nYk5hdkl0ZW1dOm5vdChuZy1jb250YWluZXIpJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aG9zdDoge1xuXHRcdCdbYXR0ci5yb2xlXSc6IGByb2xlID8gcm9sZSA6IG5hdi5yb2xlcyA/ICdwcmVzZW50YXRpb24nIDogdW5kZWZpbmVkYCxcblx0fSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiTmF2SXRlbVJvbGUge1xuXHRjb25zdHJ1Y3RvcihAQXR0cmlidXRlKCdyb2xlJykgcHVibGljIHJvbGU6IHN0cmluZywgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYk5hdikpIHB1YmxpYyBuYXY6IE5nYk5hdikge31cbn1cblxuLyoqXG4gKiBUaGUgZGlyZWN0aXZlIHVzZWQgdG8gZ3JvdXAgbmF2IGxpbmsgYW5kIHJlbGF0ZWQgbmF2IGNvbnRlbnQuIEFzIHdlbGwgYXMgc2V0IG5hdiBpZGVudGlmaWVyIGFuZCBzb21lIG9wdGlvbnMuXG4gKlxuICogQHNpbmNlIDUuMi4wXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZ2JOYXZJdGVtXScsIGV4cG9ydEFzOiAnbmdiTmF2SXRlbScsIHN0YW5kYWxvbmU6IHRydWUsIGhvc3Q6IHsgJ1tjbGFzcy5uYXYtaXRlbV0nOiAndHJ1ZScgfSB9KVxuZXhwb3J0IGNsYXNzIE5nYk5hdkl0ZW0gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkLCBPbkluaXQge1xuXHQvKipcblx0ICogSWYgYHRydWVgLCBub24tYWN0aXZlIGN1cnJlbnQgbmF2IGl0ZW0gY29udGVudCB3aWxsIGJlIHJlbW92ZWQgZnJvbSBET01cblx0ICogT3RoZXJ3aXNlIGl0IHdpbGwganVzdCBiZSBoaWRkZW5cblx0ICovXG5cdEBJbnB1dCgpIGRlc3Ryb3lPbkhpZGU7XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgdGhlIGN1cnJlbnQgbmF2IGl0ZW0gaXMgZGlzYWJsZWQgYW5kIGNhbid0IGJlIHRvZ2dsZWQgYnkgdXNlci5cblx0ICpcblx0ICogTmV2ZXJ0aGVsZXNzIGRpc2FibGVkIG5hdiBjYW4gYmUgc2VsZWN0ZWQgcHJvZ3JhbW1hdGljYWxseSB2aWEgdGhlIGAuc2VsZWN0KClgIG1ldGhvZCBhbmQgdGhlIGBbYWN0aXZlSWRdYCBiaW5kaW5nLlxuXHQgKi9cblx0QElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuXHQvKipcblx0ICogVGhlIGlkIHVzZWQgZm9yIHRoZSBET00gZWxlbWVudHMuXG5cdCAqIE11c3QgYmUgdW5pcXVlIGluc2lkZSB0aGUgZG9jdW1lbnQgaW4gY2FzZSB5b3UgaGF2ZSBtdWx0aXBsZSBgbmdiTmF2YHMgb24gdGhlIHBhZ2UuXG5cdCAqXG5cdCAqIEF1dG9nZW5lcmF0ZWQgYXMgYG5nYi1uYXYtWFhYYCBpZiBub3QgcHJvdmlkZWQuXG5cdCAqL1xuXHRASW5wdXQoKSBkb21JZDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWQgdXNlZCBhcyBhIG1vZGVsIGZvciBhY3RpdmUgbmF2LlxuXHQgKiBJdCBjYW4gYmUgYW55dGhpbmcsIGJ1dCBtdXN0IGJlIHVuaXF1ZSBpbnNpZGUgb25lIGBuZ2JOYXZgLlxuXHQgKlxuXHQgKiBUaGUgb25seSBsaW1pdGF0aW9uIGlzIHRoYXQgaXQgaXMgbm90IHBvc3NpYmxlIHRvIGhhdmUgdGhlIGAnJ2AgKGVtcHR5IHN0cmluZykgYXMgaWQsXG5cdCAqIGJlY2F1c2UgYCBuZ2JOYXZJdGVtIGAsIGBuZ2JOYXZJdGVtPScnYCBhbmQgYFtuZ2JOYXZJdGVtXT1cIicnXCJgIGFyZSBpbmRpc3Rpbmd1aXNoYWJsZVxuXHQgKi9cblx0QElucHV0KCduZ2JOYXZJdGVtJykgX2lkOiBhbnk7XG5cblx0LyoqXG5cdCAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZmFkZSBpbiB0cmFuc2l0aW9uIGlzIGZpbmlzaGVkIG9uIHRoZSByZWxhdGVkIG5hdiBjb250ZW50XG5cdCAqXG5cdCAqIEBzaW5jZSA4LjAuMFxuXHQgKi9cblx0QE91dHB1dCgpIHNob3duID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG5cdC8qKlxuXHQgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIGZhZGUgb3V0IHRyYW5zaXRpb24gaXMgZmluaXNoZWQgb24gdGhlIHJlbGF0ZWQgbmF2IGNvbnRlbnRcblx0ICpcblx0ICogQHNpbmNlIDguMC4wXG5cdCAqL1xuXHRAT3V0cHV0KCkgaGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG5cdGNvbnRlbnRUcGw6IE5nYk5hdkNvbnRlbnQgfCBudWxsO1xuXG5cdEBDb250ZW50Q2hpbGRyZW4oTmdiTmF2Q29udGVudCwgeyBkZXNjZW5kYW50czogZmFsc2UgfSkgY29udGVudFRwbHM6IFF1ZXJ5TGlzdDxOZ2JOYXZDb250ZW50PjtcblxuXHRjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiTmF2KSkgcHJpdmF0ZSBfbmF2OiBOZ2JOYXYsIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPGFueT4pIHt9XG5cblx0bmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuXHRcdC8vIFdlIGFyZSB1c2luZyBAQ29udGVudENoaWxkcmVuIGluc3RlYWQgb2YgQENvbnRlbnRDaGlsZCBhcyBpbiB0aGUgQW5ndWxhciB2ZXJzaW9uIGJlaW5nIHVzZWRcblx0XHQvLyBvbmx5IEBDb250ZW50Q2hpbGRyZW4gYWxsb3dzIHVzIHRvIHNwZWNpZnkgdGhlIHtkZXNjZW5kYW50czogZmFsc2V9IG9wdGlvbi5cblx0XHQvLyBXaXRob3V0IHtkZXNjZW5kYW50czogZmFsc2V9IHdlIGFyZSBoaXR0aW5nIGJ1Z3MgZGVzY3JpYmVkIGluOlxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2lzc3Vlcy8yMjQwXG5cdFx0dGhpcy5jb250ZW50VHBsID0gdGhpcy5jb250ZW50VHBscy5maXJzdDtcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdGlmICghaXNEZWZpbmVkKHRoaXMuZG9tSWQpKSB7XG5cdFx0XHR0aGlzLmRvbUlkID0gYG5nYi1uYXYtJHtuYXZDb3VudGVyKyt9YDtcblx0XHR9XG5cdH1cblxuXHRnZXQgYWN0aXZlKCkge1xuXHRcdHJldHVybiB0aGlzLl9uYXYuYWN0aXZlSWQgPT09IHRoaXMuaWQ7XG5cdH1cblxuXHRnZXQgaWQoKSB7XG5cdFx0cmV0dXJuIGlzVmFsaWROYXZJZCh0aGlzLl9pZCkgPyB0aGlzLl9pZCA6IHRoaXMuZG9tSWQ7XG5cdH1cblxuXHRnZXQgcGFuZWxEb21JZCgpIHtcblx0XHRyZXR1cm4gYCR7dGhpcy5kb21JZH0tcGFuZWxgO1xuXHR9XG5cblx0aXNQYW5lbEluRG9tKCkge1xuXHRcdHJldHVybiAoaXNEZWZpbmVkKHRoaXMuZGVzdHJveU9uSGlkZSkgPyAhdGhpcy5kZXN0cm95T25IaWRlIDogIXRoaXMuX25hdi5kZXN0cm95T25IaWRlKSB8fCB0aGlzLmFjdGl2ZTtcblx0fVxufVxuXG4vKipcbiAqIEEgbmF2IGRpcmVjdGl2ZSB0aGF0IGhlbHBzIHdpdGggaW1wbGVtZW50aW5nIHRhYmJlZCBuYXZpZ2F0aW9uIGNvbXBvbmVudHMuXG4gKlxuICogQHNpbmNlIDUuMi4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1tuZ2JOYXZdJyxcblx0ZXhwb3J0QXM6ICduZ2JOYXYnLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRob3N0OiB7XG5cdFx0J1tjbGFzcy5uYXZdJzogJ3RydWUnLFxuXHRcdCdbY2xhc3MuZmxleC1jb2x1bW5dJzogYG9yaWVudGF0aW9uID09PSAndmVydGljYWwnYCxcblx0XHQnW2F0dHIuYXJpYS1vcmllbnRhdGlvbl0nOiBgb3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcgJiYgcm9sZXMgPT09ICd0YWJsaXN0JyA/ICd2ZXJ0aWNhbCcgOiB1bmRlZmluZWRgLFxuXHRcdCdbYXR0ci5yb2xlXSc6IGByb2xlID8gcm9sZSA6IHJvbGVzID8gJ3RhYmxpc3QnIDogdW5kZWZpbmVkYCxcblx0XHQnKGtleWRvd24uYXJyb3dMZWZ0KSc6ICdvbktleURvd24oJGV2ZW50KScsXG5cdFx0JyhrZXlkb3duLmFycm93UmlnaHQpJzogJ29uS2V5RG93bigkZXZlbnQpJyxcblx0XHQnKGtleWRvd24uYXJyb3dEb3duKSc6ICdvbktleURvd24oJGV2ZW50KScsXG5cdFx0JyhrZXlkb3duLmFycm93VXApJzogJ29uS2V5RG93bigkZXZlbnQpJyxcblx0XHQnKGtleWRvd24uSG9tZSknOiAnb25LZXlEb3duKCRldmVudCknLFxuXHRcdCcoa2V5ZG93bi5FbmQpJzogJ29uS2V5RG93bigkZXZlbnQpJyxcblx0fSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiTmF2IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXHRzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfb3JpZW50YXRpb246IHN0cmluZztcblx0c3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3JvbGVzOiBib29sZWFuIHwgc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIG5hdiB0aGF0IHNob3VsZCBiZSBhY3RpdmVcblx0ICpcblx0ICogWW91IGNvdWxkIGFsc28gdXNlIHRoZSBgLnNlbGVjdCgpYCBtZXRob2QgYW5kIHRoZSBgKG5hdkNoYW5nZSlgIGV2ZW50XG5cdCAqL1xuXHRASW5wdXQoKSBhY3RpdmVJZDogYW55O1xuXG5cdC8qKlxuXHQgKiBUaGUgZXZlbnQgZW1pdHRlZCBhZnRlciB0aGUgYWN0aXZlIG5hdiBjaGFuZ2VzXG5cdCAqIFRoZSBwYXlsb2FkIG9mIHRoZSBldmVudCBpcyB0aGUgbmV3bHkgYWN0aXZlIG5hdiBpZFxuXHQgKlxuXHQgKiBJZiB5b3Ugd2FudCB0byBwcmV2ZW50IG5hdiBjaGFuZ2UsIHlvdSBzaG91bGQgdXNlIGAobmF2Q2hhbmdlKWAgZXZlbnRcblx0ICovXG5cdEBPdXRwdXQoKSBhY3RpdmVJZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG5cdC8qKlxuXHQgKiBJZiBgdHJ1ZWAsIG5hdiBjaGFuZ2Ugd2lsbCBiZSBhbmltYXRlZC5cblx0ICpcblx0ICogQHNpbmNlIDguMC4wXG5cdCAqL1xuXHRASW5wdXQoKSBhbmltYXRpb246IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgbm9uLWFjdGl2ZSBuYXYgY29udGVudCB3aWxsIGJlIHJlbW92ZWQgZnJvbSBET01cblx0ICogT3RoZXJ3aXNlIGl0IHdpbGwganVzdCBiZSBoaWRkZW5cblx0ICovXG5cdEBJbnB1dCgpIGRlc3Ryb3lPbkhpZGU7XG5cblx0LyoqXG5cdCAqIFRoZSBvcmllbnRhdGlvbiBvZiBuYXZzLlxuXHQgKlxuXHQgKiBVc2luZyBgdmVydGljYWxgIHdpbGwgYWxzbyBhZGQgdGhlIGBhcmlhLW9yaWVudGF0aW9uYCBhdHRyaWJ1dGVcblx0ICovXG5cdEBJbnB1dCgpIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnO1xuXG5cdC8qKlxuXHQgKiBSb2xlIGF0dHJpYnV0ZSBnZW5lcmF0aW5nIHN0cmF0ZWd5OlxuXHQgKiAtIGBmYWxzZWAgLSBubyByb2xlIGF0dHJpYnV0ZXMgd2lsbCBiZSBnZW5lcmF0ZWRcblx0ICogLSBgJ3RhYmxpc3QnYCAtICd0YWJsaXN0JywgJ3RhYicgYW5kICd0YWJwYW5lbCcgd2lsbCBiZSBnZW5lcmF0ZWQgKGRlZmF1bHQpXG5cdCAqL1xuXHRASW5wdXQoKSByb2xlczogJ3RhYmxpc3QnIHwgZmFsc2U7XG5cblx0LyoqXG5cdCAqIEtleWJvYXJkIHN1cHBvcnQgZm9yIG5hdiBmb2N1cy9zZWxlY3Rpb24gdXNpbmcgYXJyb3cga2V5cy5cblx0ICpcblx0ICogKiBgZmFsc2VgIC0gbm8ga2V5Ym9hcmQgc3VwcG9ydC5cblx0ICogKiBgdHJ1ZWAgLSBuYXZzIHdpbGwgYmUgZm9jdXNlZCB1c2luZyBrZXlib2FyZCBhcnJvdyBrZXlzXG5cdCAqICogYCdjaGFuZ2VXaXRoQXJyb3dzJ2AgLSAgbmF2IHdpbGwgYmUgc2VsZWN0ZWQgdXNpbmcga2V5Ym9hcmQgYXJyb3cga2V5c1xuXHQgKlxuXHQgKiBTZWUgdGhlIFtsaXN0IG9mIGF2YWlsYWJsZSBrZXlib2FyZCBzaG9ydGN1dHNdKCMvY29tcG9uZW50cy9uYXYvb3ZlcnZpZXcja2V5Ym9hcmQtc2hvcnRjdXRzKS5cblx0ICpcblx0ICogQHNpbmNlIDYuMS4wXG5cdCAqL1xuXHRASW5wdXQoKSBrZXlib2FyZDogYm9vbGVhbiB8ICdjaGFuZ2VXaXRoQXJyb3dzJztcblxuXHQvKipcblx0ICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBmYWRlIGluIHRyYW5zaXRpb24gaXMgZmluaXNoZWQgZm9yIG9uZSBvZiB0aGUgaXRlbXMuXG5cdCAqXG5cdCAqIFBheWxvYWQgb2YgdGhlIGV2ZW50IGlzIHRoZSBuYXYgaWQgdGhhdCB3YXMganVzdCBzaG93bi5cblx0ICpcblx0ICogQHNpbmNlIDguMC4wXG5cdCAqL1xuXHRAT3V0cHV0KCkgc2hvd24gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuXHQvKipcblx0ICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBmYWRlIG91dCB0cmFuc2l0aW9uIGlzIGZpbmlzaGVkIGZvciBvbmUgb2YgdGhlIGl0ZW1zLlxuXHQgKlxuXHQgKiBQYXlsb2FkIG9mIHRoZSBldmVudCBpcyB0aGUgbmF2IGlkIHRoYXQgd2FzIGp1c3QgaGlkZGVuLlxuXHQgKlxuXHQgKiBAc2luY2UgOC4wLjBcblx0ICovXG5cdEBPdXRwdXQoKSBoaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuXHRAQ29udGVudENoaWxkcmVuKE5nYk5hdkl0ZW0pIGl0ZW1zOiBRdWVyeUxpc3Q8TmdiTmF2SXRlbT47XG5cdEBDb250ZW50Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBOZ2JOYXZMaW5rQmFzZSksIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgbGlua3M6IFF1ZXJ5TGlzdDxOZ2JOYXZMaW5rQmFzZT47XG5cblx0ZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXHRuYXZJdGVtQ2hhbmdlJCA9IG5ldyBTdWJqZWN0PE5nYk5hdkl0ZW0gfCBudWxsPigpO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdEBBdHRyaWJ1dGUoJ3JvbGUnKSBwdWJsaWMgcm9sZTogc3RyaW5nLFxuXHRcdGNvbmZpZzogTmdiTmF2Q29uZmlnLFxuXHRcdHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZixcblx0XHRASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxuXHQpIHtcblx0XHR0aGlzLmFuaW1hdGlvbiA9IGNvbmZpZy5hbmltYXRpb247XG5cdFx0dGhpcy5kZXN0cm95T25IaWRlID0gY29uZmlnLmRlc3Ryb3lPbkhpZGU7XG5cdFx0dGhpcy5vcmllbnRhdGlvbiA9IGNvbmZpZy5vcmllbnRhdGlvbjtcblx0XHR0aGlzLnJvbGVzID0gY29uZmlnLnJvbGVzO1xuXHRcdHRoaXMua2V5Ym9hcmQgPSBjb25maWcua2V5Ym9hcmQ7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG5hdiBjaGFuZ2UgZXZlbnQgZW1pdHRlZCByaWdodCBiZWZvcmUgdGhlIG5hdiBjaGFuZ2UgaGFwcGVucyBvbiB1c2VyIGNsaWNrLlxuXHQgKlxuXHQgKiBUaGlzIGV2ZW50IHdvbid0IGJlIGVtaXR0ZWQgaWYgbmF2IGlzIGNoYW5nZWQgcHJvZ3JhbW1hdGljYWxseSB2aWEgYFthY3RpdmVJZF1gIG9yIGAuc2VsZWN0KClgLlxuXHQgKlxuXHQgKiBTZWUgW2BOZ2JOYXZDaGFuZ2VFdmVudGBdKCMvY29tcG9uZW50cy9uYXYvYXBpI05nYk5hdkNoYW5nZUV2ZW50KSBmb3IgcGF5bG9hZCBkZXRhaWxzLlxuXHQgKi9cblx0QE91dHB1dCgpIG5hdkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiTmF2Q2hhbmdlRXZlbnQ+KCk7XG5cblx0Y2xpY2soaXRlbTogTmdiTmF2SXRlbSkge1xuXHRcdGlmICghaXRlbS5kaXNhYmxlZCkge1xuXHRcdFx0dGhpcy5fdXBkYXRlQWN0aXZlSWQoaXRlbS5pZCk7XG5cdFx0fVxuXHR9XG5cblx0b25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG5cdFx0aWYgKHRoaXMucm9sZXMgIT09ICd0YWJsaXN0JyB8fCAhdGhpcy5rZXlib2FyZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHQvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVwcmVjYXRpb24vZGVwcmVjYXRpb24gKi9cblx0XHRjb25zdCBrZXkgPSBldmVudC53aGljaDtcblx0XHRjb25zdCBlbmFibGVkTGlua3MgPSB0aGlzLmxpbmtzLmZpbHRlcigobGluaykgPT4gIWxpbmsubmF2SXRlbS5kaXNhYmxlZCk7XG5cdFx0Y29uc3QgeyBsZW5ndGggfSA9IGVuYWJsZWRMaW5rcztcblxuXHRcdGxldCBwb3NpdGlvbiA9IC0xO1xuXG5cdFx0ZW5hYmxlZExpbmtzLmZvckVhY2goKGxpbmssIGluZGV4KSA9PiB7XG5cdFx0XHRpZiAobGluay5lbFJlZi5uYXRpdmVFbGVtZW50ID09PSB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG5cdFx0XHRcdHBvc2l0aW9uID0gaW5kZXg7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpZiAobGVuZ3RoKSB7XG5cdFx0XHRzd2l0Y2ggKGtleSkge1xuXHRcdFx0XHRjYXNlIEtleS5BcnJvd0xlZnQ6XG5cdFx0XHRcdFx0aWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cG9zaXRpb24gPSAocG9zaXRpb24gLSAxICsgbGVuZ3RoKSAlIGxlbmd0aDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBLZXkuQXJyb3dSaWdodDpcblx0XHRcdFx0XHRpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwb3NpdGlvbiA9IChwb3NpdGlvbiArIDEpICUgbGVuZ3RoO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIEtleS5BcnJvd0Rvd246XG5cdFx0XHRcdFx0aWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwb3NpdGlvbiA9IChwb3NpdGlvbiArIDEpICUgbGVuZ3RoO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIEtleS5BcnJvd1VwOlxuXHRcdFx0XHRcdGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cG9zaXRpb24gPSAocG9zaXRpb24gLSAxICsgbGVuZ3RoKSAlIGxlbmd0aDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBLZXkuSG9tZTpcblx0XHRcdFx0XHRwb3NpdGlvbiA9IDA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgS2V5LkVuZDpcblx0XHRcdFx0XHRwb3NpdGlvbiA9IGxlbmd0aCAtIDE7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5rZXlib2FyZCA9PT0gJ2NoYW5nZVdpdGhBcnJvd3MnKSB7XG5cdFx0XHRcdHRoaXMuc2VsZWN0KGVuYWJsZWRMaW5rc1twb3NpdGlvbl0ubmF2SXRlbS5pZCk7XG5cdFx0XHR9XG5cdFx0XHRlbmFibGVkTGlua3NbcG9zaXRpb25dLmVsUmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU2VsZWN0cyB0aGUgbmF2IHdpdGggdGhlIGdpdmVuIGlkIGFuZCBzaG93cyBpdHMgYXNzb2NpYXRlZCBwYW5lLlxuXHQgKiBBbnkgb3RoZXIgbmF2IHRoYXQgd2FzIHByZXZpb3VzbHkgc2VsZWN0ZWQgYmVjb21lcyB1bnNlbGVjdGVkIGFuZCBpdHMgYXNzb2NpYXRlZCBwYW5lIGlzIGhpZGRlbi5cblx0ICovXG5cdHNlbGVjdChpZDogYW55KSB7XG5cdFx0dGhpcy5fdXBkYXRlQWN0aXZlSWQoaWQsIGZhbHNlKTtcblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblx0XHRpZiAoIWlzRGVmaW5lZCh0aGlzLmFjdGl2ZUlkKSkge1xuXHRcdFx0Y29uc3QgbmV4dElkID0gdGhpcy5pdGVtcy5maXJzdCA/IHRoaXMuaXRlbXMuZmlyc3QuaWQgOiBudWxsO1xuXHRcdFx0aWYgKGlzVmFsaWROYXZJZChuZXh0SWQpKSB7XG5cdFx0XHRcdHRoaXMuX3VwZGF0ZUFjdGl2ZUlkKG5leHRJZCwgZmFsc2UpO1xuXHRcdFx0XHR0aGlzLl9jZC5kZXRlY3RDaGFuZ2VzKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5pdGVtcy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fbm90aWZ5SXRlbUNoYW5nZWQodGhpcy5hY3RpdmVJZCkpO1xuXHR9XG5cblx0bmdPbkNoYW5nZXMoeyBhY3RpdmVJZCB9OiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG5cdFx0aWYgKGFjdGl2ZUlkICYmICFhY3RpdmVJZC5maXJzdENoYW5nZSkge1xuXHRcdFx0dGhpcy5fbm90aWZ5SXRlbUNoYW5nZWQoYWN0aXZlSWQuY3VycmVudFZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHR0aGlzLmRlc3Ryb3kkLm5leHQoKTtcblx0fVxuXG5cdHByaXZhdGUgX3VwZGF0ZUFjdGl2ZUlkKG5leHRJZDogYW55LCBlbWl0TmF2Q2hhbmdlID0gdHJ1ZSkge1xuXHRcdGlmICh0aGlzLmFjdGl2ZUlkICE9PSBuZXh0SWQpIHtcblx0XHRcdGxldCBkZWZhdWx0UHJldmVudGVkID0gZmFsc2U7XG5cblx0XHRcdGlmIChlbWl0TmF2Q2hhbmdlKSB7XG5cdFx0XHRcdHRoaXMubmF2Q2hhbmdlLmVtaXQoe1xuXHRcdFx0XHRcdGFjdGl2ZUlkOiB0aGlzLmFjdGl2ZUlkLFxuXHRcdFx0XHRcdG5leHRJZCxcblx0XHRcdFx0XHRwcmV2ZW50RGVmYXVsdDogKCkgPT4ge1xuXHRcdFx0XHRcdFx0ZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghZGVmYXVsdFByZXZlbnRlZCkge1xuXHRcdFx0XHR0aGlzLmFjdGl2ZUlkID0gbmV4dElkO1xuXHRcdFx0XHR0aGlzLmFjdGl2ZUlkQ2hhbmdlLmVtaXQobmV4dElkKTtcblx0XHRcdFx0dGhpcy5fbm90aWZ5SXRlbUNoYW5nZWQobmV4dElkKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9ub3RpZnlJdGVtQ2hhbmdlZChuZXh0SXRlbUlkOiBhbnkpIHtcblx0XHR0aGlzLm5hdkl0ZW1DaGFuZ2UkLm5leHQodGhpcy5fZ2V0SXRlbUJ5SWQobmV4dEl0ZW1JZCkpO1xuXHR9XG5cblx0cHJpdmF0ZSBfZ2V0SXRlbUJ5SWQoaXRlbUlkOiBhbnkpOiBOZ2JOYXZJdGVtIHwgbnVsbCB7XG5cdFx0cmV0dXJuICh0aGlzLml0ZW1zICYmIHRoaXMuaXRlbXMuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gaXRlbUlkKSkgfHwgbnVsbDtcblx0fVxufVxuXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6ICdbbmdiTmF2TGlua10nLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRob3N0OiB7XG5cdFx0J1tpZF0nOiAnbmF2SXRlbS5kb21JZCcsXG5cdFx0J1tjbGFzcy5uYXYtbGlua10nOiAndHJ1ZScsXG5cdFx0J1tjbGFzcy5uYXYtaXRlbV0nOiAnaGFzTmF2SXRlbUNsYXNzKCknLFxuXHRcdCdbYXR0ci5yb2xlXSc6IGByb2xlID8gcm9sZSA6IG5hdi5yb2xlcyA/ICd0YWInIDogdW5kZWZpbmVkYCxcblx0XHQnW2NsYXNzLmFjdGl2ZV0nOiAnbmF2SXRlbS5hY3RpdmUnLFxuXHRcdCdbY2xhc3MuZGlzYWJsZWRdJzogJ25hdkl0ZW0uZGlzYWJsZWQnLFxuXHRcdCdbYXR0ci50YWJpbmRleF0nOiAnbmF2SXRlbS5kaXNhYmxlZCA/IC0xIDogdW5kZWZpbmVkJyxcblx0XHQnW2F0dHIuYXJpYS1jb250cm9sc10nOiAnbmF2SXRlbS5pc1BhbmVsSW5Eb20oKSA/IG5hdkl0ZW0ucGFuZWxEb21JZCA6IG51bGwnLFxuXHRcdCdbYXR0ci5hcmlhLXNlbGVjdGVkXSc6ICduYXZJdGVtLmFjdGl2ZScsXG5cdFx0J1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ25hdkl0ZW0uZGlzYWJsZWQnLFxuXHR9LFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JOYXZMaW5rQmFzZSB7XG5cdGNvbnN0cnVjdG9yKFxuXHRcdEBBdHRyaWJ1dGUoJ3JvbGUnKSBwdWJsaWMgcm9sZTogc3RyaW5nLFxuXHRcdHB1YmxpYyBuYXZJdGVtOiBOZ2JOYXZJdGVtLFxuXHRcdHB1YmxpYyBuYXY6IE5nYk5hdixcblx0XHRwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWYsXG5cdCkge31cblxuXHRoYXNOYXZJdGVtQ2xhc3MoKSB7XG5cdFx0Ly8gd2l0aCBhbHRlcm5hdGl2ZSBtYXJrdXAgd2UgaGF2ZSB0byBhZGQgYC5uYXYtaXRlbWAgY2xhc3MsIGJlY2F1c2UgYG5nYk5hdkl0ZW1gIGlzIG9uIHRoZSBuZy1jb250YWluZXJcblx0XHRyZXR1cm4gdGhpcy5uYXZJdGVtLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ub2RlVHlwZSA9PT0gTm9kZS5DT01NRU5UX05PREU7XG5cdH1cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXJrIHRoZSBuYXYgbGluayB3aGVuIHVzZWQgb24gYSBidXR0b24gZWxlbWVudC5cbiAqL1xuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiAnYnV0dG9uW25nYk5hdkxpbmtdJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aG9zdERpcmVjdGl2ZXM6IFtOZ2JOYXZMaW5rQmFzZV0sXG5cdGhvc3Q6IHtcblx0XHR0eXBlOiAnYnV0dG9uJyxcblx0XHQnW2Rpc2FibGVkXSc6ICduYXZJdGVtLmRpc2FibGVkJyxcblx0XHQnKGNsaWNrKSc6ICduYXYuY2xpY2sobmF2SXRlbSknLFxuXHR9LFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JOYXZMaW5rQnV0dG9uIHtcblx0Y29uc3RydWN0b3IocHVibGljIG5hdkl0ZW06IE5nYk5hdkl0ZW0sIHB1YmxpYyBuYXY6IE5nYk5hdikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXJrIHRoZSBuYXYgbGluayB3aGVuIHVzZWQgb24gYSBsaW5rIGVsZW1lbnQuXG4gKlxuICogQHNpbmNlIDUuMi4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ2FbbmdiTmF2TGlua10nLFxuXHRzdGFuZGFsb25lOiB0cnVlLFxuXHRob3N0RGlyZWN0aXZlczogW05nYk5hdkxpbmtCYXNlXSxcblx0aG9zdDoge1xuXHRcdGhyZWY6ICcnLFxuXHRcdCcoY2xpY2spJzogJ25hdi5jbGljayhuYXZJdGVtKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KCknLFxuXHR9LFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JOYXZMaW5rIHtcblx0Y29uc3RydWN0b3IocHVibGljIG5hdkl0ZW06IE5nYk5hdkl0ZW0sIHB1YmxpYyBuYXY6IE5nYk5hdikge31cbn1cblxuLyoqXG4gKiBUaGUgcGF5bG9hZCBvZiB0aGUgY2hhbmdlIGV2ZW50IGVtaXR0ZWQgcmlnaHQgYmVmb3JlIHRoZSBuYXYgY2hhbmdlIGhhcHBlbnMgb24gdXNlciBjbGljay5cbiAqXG4gKiBUaGlzIGV2ZW50IHdvbid0IGJlIGVtaXR0ZWQgaWYgbmF2IGlzIGNoYW5nZWQgcHJvZ3JhbW1hdGljYWxseSB2aWEgYFthY3RpdmVJZF1gIG9yIGAuc2VsZWN0KClgLlxuICpcbiAqIEBzaW5jZSA1LjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYk5hdkNoYW5nZUV2ZW50PFQgPSBhbnk+IHtcblx0LyoqXG5cdCAqIElkIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIG5hdi5cblx0ICovXG5cdGFjdGl2ZUlkOiBUO1xuXG5cdC8qKlxuXHQgKiBJZCBvZiB0aGUgbmV3bHkgc2VsZWN0ZWQgbmF2LlxuXHQgKi9cblx0bmV4dElkOiBUO1xuXG5cdC8qKlxuXHQgKiBGdW5jdGlvbiB0aGF0IHdpbGwgcHJldmVudCBuYXYgY2hhbmdlIGlmIGNhbGxlZC5cblx0ICovXG5cdHByZXZlbnREZWZhdWx0OiAoKSA9PiB2b2lkO1xufVxuIl19