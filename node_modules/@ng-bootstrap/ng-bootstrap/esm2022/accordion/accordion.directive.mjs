import { ApplicationRef, ChangeDetectorRef, ContentChild, ContentChildren, DestroyRef, Directive, ElementRef, EventEmitter, inject, Input, Output, TemplateRef, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgbCollapse } from '../collapse/collapse';
import { isString } from '../util/util';
import * as i0 from "@angular/core";
import * as i1 from "../collapse/collapse";
import * as i2 from "./accordion-config";
let nextId = 0;
/**
 * A directive that wraps the content of an accordion item's collapsible body.
 *
 * The actual content is provided in a child `ng-template` element.
 * Depending on the state of the accordion, the template will be either inserted or removed from the DOM.
 *
 * @since 14.1.0
 */
class NgbAccordionBody {
    constructor() {
        this._appRef = inject(ApplicationRef);
        this._element = inject((ElementRef)).nativeElement;
        this._item = inject(NgbAccordionItem);
        this._viewRef = null;
    }
    ngAfterContentChecked() {
        if (this._bodyTpl) {
            if (this._item._shouldBeInDOM) {
                this._createViewIfNotExists();
            }
            else {
                this._destroyViewIfExists();
            }
        }
    }
    ngOnDestroy() {
        this._destroyViewIfExists();
    }
    _destroyViewIfExists() {
        if (this._viewRef) {
            this._appRef.detachView(this._viewRef);
            this._viewRef.destroy();
            this._viewRef = null;
        }
    }
    _createViewIfNotExists() {
        if (!this._viewRef) {
            this._viewRef = this._bodyTpl.createEmbeddedView(null);
            this._viewRef.detectChanges();
            this._appRef.attachView(this._viewRef);
            for (const node of this._viewRef.rootNodes) {
                this._element.appendChild(node);
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAccordionBody, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbAccordionBody, isStandalone: true, selector: "[ngbAccordionBody]", host: { properties: { "class.accordion-body": "true" } }, queries: [{ propertyName: "_bodyTpl", first: true, predicate: TemplateRef, descendants: true, static: true }], ngImport: i0 }); }
}
export { NgbAccordionBody };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAccordionBody, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbAccordionBody]',
                    standalone: true,
                    host: { '[class.accordion-body]': 'true' },
                }]
        }], propDecorators: { _bodyTpl: [{
                type: ContentChild,
                args: [TemplateRef, { static: true }]
            }] } });
/**
 * A directive that wraps the collapsible item's content of the accordion.
 *
 * Internally it reuses the [`NgbCollapse` directive](#/components/collapse)
 *
 * @since 14.1.0
 */
class NgbAccordionCollapse {
    constructor() {
        this.item = inject(NgbAccordionItem);
        this.ngbCollapse = inject(NgbCollapse);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAccordionCollapse, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbAccordionCollapse, isStandalone: true, selector: "[ngbAccordionCollapse]", host: { attributes: { "role": "region" }, properties: { "class.accordion-collapse": "true", "id": "item.collapseId", "attr.aria-labelledby": "item.toggleId" } }, exportAs: ["ngbAccordionCollapse"], hostDirectives: [{ directive: i1.NgbCollapse }], ngImport: i0 }); }
}
export { NgbAccordionCollapse };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAccordionCollapse, decorators: [{
            type: Directive,
            args: [{
                    exportAs: 'ngbAccordionCollapse',
                    standalone: true,
                    selector: '[ngbAccordionCollapse]',
                    host: {
                        role: 'region',
                        '[class.accordion-collapse]': 'true',
                        '[id]': 'item.collapseId',
                        '[attr.aria-labelledby]': 'item.toggleId',
                    },
                    hostDirectives: [NgbCollapse],
                }]
        }] });
/**
 * A directive to put on a toggling element inside the accordion item's header.
 * It will register click handlers that toggle the associated panel and will handle accessibility attributes.
 *
 * This directive is used internally by the [`NgbAccordionButton` directive](#/components/accordion/api#NgbAccordionButton).
 *
 * @since 14.1.0
 */
class NgbAccordionToggle {
    constructor() {
        this.item = inject(NgbAccordionItem);
        this.accordion = inject(NgbAccordionDirective);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAccordionToggle, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbAccordionToggle, isStandalone: true, selector: "[ngbAccordionToggle]", host: { listeners: { "click": "!item.disabled && accordion.toggle(item.id)" }, properties: { "id": "item.toggleId", "class.collapsed": "item.collapsed", "attr.aria-controls": "item.collapseId", "attr.aria-expanded": "!item.collapsed" } }, ngImport: i0 }); }
}
export { NgbAccordionToggle };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAccordionToggle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbAccordionToggle]',
                    standalone: true,
                    host: {
                        '[id]': 'item.toggleId',
                        '[class.collapsed]': 'item.collapsed',
                        '[attr.aria-controls]': 'item.collapseId',
                        '[attr.aria-expanded]': '!item.collapsed',
                        '(click)': '!item.disabled && accordion.toggle(item.id)',
                    },
                }]
        }] });
/**
 * A directive to put on a button element inside an accordion item's header.
 *
 * If you want a custom markup for the header, you can also use the [`NgbAccordionToggle` directive](#/components/accordion/api#NgbAccordionToggle).
 *
 * @since 14.1.0
 */
class NgbAccordionButton {
    constructor() {
        this.item = inject(NgbAccordionItem);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAccordionButton, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbAccordionButton, isStandalone: true, selector: "button[ngbAccordionButton]", host: { attributes: { "type": "button" }, properties: { "disabled": "item.disabled", "class.accordion-button": "true" } }, hostDirectives: [{ directive: NgbAccordionToggle }], ngImport: i0 }); }
}
export { NgbAccordionButton };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAccordionButton, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[ngbAccordionButton]',
                    standalone: true,
                    host: {
                        '[disabled]': 'item.disabled',
                        '[class.accordion-button]': 'true',
                        type: 'button',
                    },
                    hostDirectives: [NgbAccordionToggle],
                }]
        }] });
/**
 * A directive that wraps an accordion item's header.
 *
 * @since 14.1.0
 */
class NgbAccordionHeader {
    constructor() {
        this.item = inject(NgbAccordionItem);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAccordionHeader, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbAccordionHeader, isStandalone: true, selector: "[ngbAccordionHeader]", host: { attributes: { "role": "heading" }, properties: { "class.accordion-header": "true", "class.collapsed": "item.collapsed" } }, ngImport: i0 }); }
}
export { NgbAccordionHeader };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAccordionHeader, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbAccordionHeader]',
                    standalone: true,
                    host: {
                        role: 'heading',
                        '[class.accordion-header]': 'true',
                        '[class.collapsed]': 'item.collapsed',
                    },
                }]
        }] });
/**
 * A directive that wraps an accordion item: a toggleable header + body that collapses.
 *
 * You can get hold of the `NgbAccordionItem` instance in the template with `#item="ngbAccordionItem"`.
 * It allows to check if the item is collapsed or not, toggle the collapse state, etc.
 *
 * Every accordion item has a string ID that is automatically generated in the `ngb-accordion-item-XX` format, unless provided explicitly.
 *
 * @since 14.1.0
 */
class NgbAccordionItem {
    constructor() {
        this._accordion = inject(NgbAccordionDirective);
        this._cd = inject(ChangeDetectorRef);
        this._destroyRef = inject(DestroyRef);
        this._collapsed = true;
        this._id = `ngb-accordion-item-${nextId++}`;
        this._collapseAnimationRunning = false;
        /**
         * If `true`, the accordion item will be disabled.
         * It won't react to user's clicks, but still will be toggelable programmatically.
         */
        this.disabled = false;
        /**
         * Event emitted before the expanding animation starts. It has no payload.
         *
         * @since 15.1.0
         */
        this.show = new EventEmitter();
        /**
         * Event emitted when the expanding animation is finished. It has no payload.
         */
        this.shown = new EventEmitter();
        /**
         * Event emitted before the collapsing animation starts. It has no payload.
         *
         * @since 15.1.0
         */
        this.hide = new EventEmitter();
        /**
         * Event emitted when the collapsing animation is finished and before the content is removed from DOM.
         * It has no payload.
         */
        this.hidden = new EventEmitter();
    }
    /**
     * Sets the custom ID of the accordion item. It must be unique for the document.
     *
     * @param id The ID of the accordion item, must be a non-empty string
     */
    set id(id) {
        if (isString(id) && id !== '') {
            this._id = id;
        }
    }
    /**
     * If `true`, the content of the accordion item's body will be removed from the DOM. It will be just hidden otherwise.
     *
     * This property can also be set up on the parent [`NgbAccordion` directive](#/components/accordion/api#NgbAccordionDirective).
     */
    set destroyOnHide(destroyOnHide) {
        this._destroyOnHide = destroyOnHide;
    }
    get destroyOnHide() {
        return this._destroyOnHide === undefined ? this._accordion.destroyOnHide : this._destroyOnHide;
    }
    /**
     *	If `true`, the accordion item will be collapsed. Otherwise, it will be expanded.
     *
     * @param collapsed New state of the accordion item.
     */
    set collapsed(collapsed) {
        if (collapsed) {
            this.collapse();
        }
        else {
            this.expand();
        }
    }
    get collapsed() {
        return this._collapsed;
    }
    get id() {
        return `${this._id}`;
    }
    get toggleId() {
        return `${this.id}-toggle`;
    }
    get collapseId() {
        return `${this.id}-collapse`;
    }
    get _shouldBeInDOM() {
        return !this.collapsed || this._collapseAnimationRunning || !this.destroyOnHide;
    }
    ngAfterContentInit() {
        const { ngbCollapse } = this._collapse;
        // we need to disable the animation for the first init
        ngbCollapse.animation = false;
        ngbCollapse.collapsed = this.collapsed;
        // we set the animation to the default of the accordion
        ngbCollapse.animation = this._accordion.animation;
        // event forwarding from 'ngbCollapse' to 'ngbAccordion'
        ngbCollapse.hidden.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            // when the animation finishes we can remove the template from DOM
            this._collapseAnimationRunning = false;
            this.hidden.emit();
            this._accordion.hidden.emit(this.id);
        });
        ngbCollapse.shown.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this.shown.emit();
            this._accordion.shown.emit(this.id);
        });
    }
    /**
     * Toggles an accordion item.
     */
    toggle() {
        this.collapsed = !this.collapsed;
    }
    /**
     * Expands an accordion item.
     */
    expand() {
        if (this.collapsed) {
            // checking if accordion allows to expand the panel in respect to 'closeOthers' flag
            if (!this._accordion._ensureCanExpand(this)) {
                return;
            }
            this._collapsed = false;
            // need if the accordion is used inside a component having OnPush change detection strategy
            this._cd.markForCheck();
            // we need force CD to get template into DOM before starting animation to calculate its height correctly
            // this will synchronously put the item body into DOM, because `this._collapsed` was flipped to `false`
            this._cd.detectChanges();
            // firing events before starting animations
            this.show.emit();
            this._accordion.show.emit(this.id);
            // we also need to make sure 'animation' flag is up-to- date
            this._collapse.ngbCollapse.animation = this._accordion.animation;
            this._collapse.ngbCollapse.collapsed = false;
        }
    }
    /**
     * Collapses an accordion item.
     */
    collapse() {
        if (!this.collapsed) {
            this._collapsed = true;
            this._collapseAnimationRunning = true;
            // need if the accordion is used inside a component having OnPush change detection strategy
            this._cd.markForCheck();
            // firing events before starting animations
            this.hide.emit();
            this._accordion.hide.emit(this.id);
            // we also need to make sure 'animation' flag is up-to- date
            this._collapse.ngbCollapse.animation = this._accordion.animation;
            this._collapse.ngbCollapse.collapsed = true;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAccordionItem, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbAccordionItem, isStandalone: true, selector: "[ngbAccordionItem]", inputs: { id: ["ngbAccordionItem", "id"], destroyOnHide: "destroyOnHide", disabled: "disabled", collapsed: "collapsed" }, outputs: { show: "show", shown: "shown", hide: "hide", hidden: "hidden" }, host: { properties: { "class.accordion-item": "true", "id": "id" } }, queries: [{ propertyName: "_collapse", first: true, predicate: NgbAccordionCollapse, descendants: true, static: true }], exportAs: ["ngbAccordionItem"], ngImport: i0 }); }
}
export { NgbAccordionItem };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAccordionItem, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbAccordionItem]',
                    exportAs: 'ngbAccordionItem',
                    standalone: true,
                    host: {
                        '[class.accordion-item]': 'true',
                        '[id]': 'id',
                    },
                }]
        }], propDecorators: { _collapse: [{
                type: ContentChild,
                args: [NgbAccordionCollapse, { static: true }]
            }], id: [{
                type: Input,
                args: ['ngbAccordionItem']
            }], destroyOnHide: [{
                type: Input
            }], disabled: [{
                type: Input
            }], collapsed: [{
                type: Input
            }], show: [{
                type: Output
            }], shown: [{
                type: Output
            }], hide: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });
/**
 * Accordion is a stack of cards that have a header and collapsible body.
 *
 * This directive is a container for these items and provides an API to handle them.
 *
 * @since 14.1.0
 */
class NgbAccordionDirective {
    constructor(config) {
        /**
         * Event emitted before expanding animation starts. The payload is the id of shown accordion item.
         *
         * @since 15.1.0
         */
        this.show = new EventEmitter();
        /**
         * Event emitted when the expanding animation is finished. The payload is the id of shown accordion item.
         */
        this.shown = new EventEmitter();
        /**
         * Event emitted before the collapsing animation starts. The payload is the id of hidden accordion item.
         *
         * @since 15.1.0
         */
        this.hide = new EventEmitter();
        /**
         * Event emitted when the collapsing animation is finished and before the content is removed from DOM.
         * The payload is the id of hidden accordion item.
         */
        this.hidden = new EventEmitter();
        this._anItemWasAlreadyExpandedDuringInitialisation = false;
        this.animation = config.animation;
        this.closeOthers = config.closeOthers;
        this.destroyOnHide = config.destroyOnHide;
    }
    /**
     * Toggles an item with the given id.
     *
     * It will toggle an item, even if it is disabled.
     *
     * @param itemId The id of the item to toggle.
     */
    toggle(itemId) {
        this._getItem(itemId)?.toggle();
    }
    /**
     * Expands an item with the given id.
     *
     * If `closeOthers` is `true`, it will collapse other panels.
     *
     * @param itemId The id of the item to expand.
     */
    expand(itemId) {
        this._getItem(itemId)?.expand();
    }
    /**
     * Expands all items.
     *
     * If `closeOthers` is `true` and all items are closed, it will open the first one. Otherwise, it will keep the opened one.
     */
    expandAll() {
        if (this._items) {
            if (this.closeOthers) {
                // we check if there is an item open and if it is not we can expand the first item
                // (otherwise we toggle nothing)
                if (!this._items.find((item) => !item.collapsed)) {
                    this._items.first.expand();
                }
            }
            else {
                this._items.forEach((item) => item.expand());
            }
        }
    }
    /**
     * Collapses an item with the given id.
     *
     * Has no effect if the `itemId` does not correspond to any item.
     *
     * @param itemId The id of the item to collapse.
     */
    collapse(itemId) {
        this._getItem(itemId)?.collapse();
    }
    /**
     * Collapses all items.
     */
    collapseAll() {
        this._items?.forEach((item) => item.collapse());
    }
    /**
     * Checks if an item with the given id is expanded.
     *
     * If the `itemId` does not correspond to any item, it returns `false`.
     *
     * @param itemId The id of the item to check.
     */
    isExpanded(itemId) {
        const item = this._getItem(itemId);
        return item ? !item.collapsed : false;
    }
    /**
     * It checks, if the item can be expanded in the current state of the accordion.
     * With `closeOthers` there can be only one expanded item at a time.
     *
     * @internal
     */
    _ensureCanExpand(toExpand) {
        if (!this.closeOthers) {
            return true;
        }
        // special case during the initialization of the [collapse]="false" inputs
        // `this._items` QueryList is not yet initialized, but we need to ensure only one item can be expanded at a time
        if (!this._items) {
            if (!this._anItemWasAlreadyExpandedDuringInitialisation) {
                this._anItemWasAlreadyExpandedDuringInitialisation = true;
                return true;
            }
            return false;
        }
        // if there is an expanded item, we need to collapse it first
        this._items.find((item) => !item.collapsed && toExpand !== item)?.collapse();
        return true;
    }
    _getItem(itemId) {
        return this._items?.find((item) => item.id === itemId);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAccordionDirective, deps: [{ token: i2.NgbAccordionConfig }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbAccordionDirective, isStandalone: true, selector: "[ngbAccordion]", inputs: { animation: "animation", closeOthers: "closeOthers", destroyOnHide: "destroyOnHide" }, outputs: { show: "show", shown: "shown", hide: "hide", hidden: "hidden" }, host: { properties: { "class.accordion": "true" } }, queries: [{ propertyName: "_items", predicate: NgbAccordionItem }], exportAs: ["ngbAccordion"], ngImport: i0 }); }
}
export { NgbAccordionDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAccordionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbAccordion]',
                    standalone: true,
                    exportAs: 'ngbAccordion',
                    host: { '[class.accordion]': 'true' },
                }]
        }], ctorParameters: function () { return [{ type: i2.NgbAccordionConfig }]; }, propDecorators: { _items: [{
                type: ContentChildren,
                args: [NgbAccordionItem, { descendants: false }]
            }], animation: [{
                type: Input
            }], closeOthers: [{
                type: Input
            }], destroyOnHide: [{
                type: Input
            }], show: [{
                type: Output
            }], shown: [{
                type: Output
            }], hide: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hY2NvcmRpb24vYWNjb3JkaW9uLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR04sY0FBYyxFQUNkLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFDVixTQUFTLEVBQ1QsVUFBVSxFQUVWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLE1BQU0sRUFFTixXQUFXLEdBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7QUFFeEMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWY7Ozs7Ozs7R0FPRztBQUNILE1BS2EsZ0JBQWdCO0lBTDdCO1FBTVMsWUFBTyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNqQyxhQUFRLEdBQUcsTUFBTSxDQUFDLENBQUEsVUFBdUIsQ0FBQSxDQUFDLENBQUMsYUFBYSxDQUFDO1FBQ3pELFVBQUssR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUVqQyxhQUFRLEdBQWdDLElBQUksQ0FBQztLQW9DckQ7SUFoQ0EscUJBQXFCO1FBQ3BCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFO2dCQUM5QixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQzthQUM5QjtpQkFBTTtnQkFDTixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzthQUM1QjtTQUNEO0lBQ0YsQ0FBQztJQUVELFdBQVc7UUFDVixJQUFJLENBQUMsb0JBQW9CLEVB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O2tHQUFyQixxQkFBcUIsaVVBQ2hCLGdCQUFnQjs7U0FEckIscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBTmpDLFNBQVM7bUJBQUM7b0JBQ1YsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxjQUFjO29CQUN4QixJQUFJLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLEVBQUU7aUJBQ3JDO3lHQUVtRSxNQUFNO3NCQUF4RSxlQUFlO3VCQUFDLGdCQUFnQixFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtnQkFJaEQsU0FBUztzQkFBakIsS0FBSztnQkFLRyxXQUFXO3NCQUFuQixLQUFLO2dCQU9HLGFBQWE7c0JBQXJCLEtBQUs7Z0JBT0ksSUFBSTtzQkFBYixNQUFNO2dCQUtHLEtBQUs7c0JBQWQsTUFBTTtnQkFPRyxJQUFJO3NCQUFiLE1BQU07Z0JBTUcsTUFBTTtzQkFBZixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcblx0QWZ0ZXJDb250ZW50Q2hlY2tlZCxcblx0QWZ0ZXJDb250ZW50SW5pdCxcblx0QXBwbGljYXRpb25SZWYsXG5cdENoYW5nZURldGVjdG9yUmVmLFxuXHRDb250ZW50Q2hpbGQsXG5cdENvbnRlbnRDaGlsZHJlbixcblx0RGVzdHJveVJlZixcblx0RGlyZWN0aXZlLFxuXHRFbGVtZW50UmVmLFxuXHRFbWJlZGRlZFZpZXdSZWYsXG5cdEV2ZW50RW1pdHRlcixcblx0aW5qZWN0LFxuXHRJbnB1dCxcblx0T25EZXN0cm95LFxuXHRPdXRwdXQsXG5cdFF1ZXJ5TGlzdCxcblx0VGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsRGVzdHJveWVkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuaW1wb3J0IHsgTmdiQWNjb3JkaW9uQ29uZmlnIH0gZnJvbSAnLi9hY2NvcmRpb24tY29uZmlnJztcbmltcG9ydCB7IE5nYkNvbGxhcHNlIH0gZnJvbSAnLi4vY29sbGFwc2UvY29sbGFwc2UnO1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHdyYXBzIHRoZSBjb250ZW50IG9mIGFuIGFjY29yZGlvbiBpdGVtJ3MgY29sbGFwc2libGUgYm9keS5cbiAqXG4gKiBUaGUgYWN0dWFsIGNvbnRlbnQgaXMgcHJvdmlkZWQgaW4gYSBjaGlsZCBgbmctdGVtcGxhdGVgIGVsZW1lbnQuXG4gKiBEZXBlbmRpbmcgb24gdGhlIHN0YXRlIG9mIHRoZSBhY2NvcmRpb24sIHRoZSB0ZW1wbGF0ZSB3aWxsIGJlIGVpdGhlciBpbnNlcnRlZCBvciByZW1vdmVkIGZyb20gdGhlIERPTS5cbiAqXG4gKiBAc2luY2UgMTQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1tuZ2JBY2NvcmRpb25Cb2R5XScsXG5cdHN0YW5kYWxvbmU6IHRydWUsXG5cdGhvc3Q6IHsgJ1tjbGFzcy5hY2NvcmRpb24tYm9keV0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiQWNjb3JkaW9uQm9keSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQsIE9uRGVzdHJveSB7XG5cdHByaXZhdGUgX2FwcFJlZiA9IGluamVjdChBcHBsaWNhdGlvblJlZik7XG5cdHByaXZhdGUgX2VsZW1lbnQgPSBpbmplY3QoRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pLm5hdGl2ZUVsZW1lbnQ7XG5cdHByaXZhdGUgX2l0ZW0gPSBpbmplY3QoTmdiQWNjb3JkaW9uSXRlbSk7XG5cblx0cHJpdmF0ZSBfdmlld1JlZjogRW1iZWRkZWRWaWV3UmVmPGFueT4gfCBudWxsID0gbnVsbDtcblxuXHRAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmLCB7IHN0YXRpYzogdHJ1ZSB9KSBwcml2YXRlIF9ib2R5VHBsOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cdG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fYm9keVRwbCkge1xuXHRcdFx0aWYgKHRoaXMuX2l0ZW0uX3Nob3VsZEJlSW5ET00pIHtcblx0XHRcdFx0dGhpcy5fY3JlYXRlVmlld0lmTm90RXhpc3RzKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9kZXN0cm95Vmlld0lmRXhpc3RzKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0bmdPbkRlc3Ryb3koKTogdm9pZCB7XG5cdFx0dGhpcy5fZGVzdHJveVZpZXdJZkV4aXN0cygpO1xuXHR9XG5cblx0cHJpdmF0ZSBfZGVzdHJveVZpZXdJZkV4aXN0cygpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fdmlld1JlZikge1xuXHRcdFx0dGhpcy5fYXBwUmVmLmRldGFjaFZpZXcodGhpcy5fdmlld1JlZik7XG5cdFx0XHR0aGlzLl92aWV3UmVmLmRlc3Ryb3koKTtcblx0XHRcdHRoaXMuX3ZpZXdSZWYgPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgX2NyZWF0ZVZpZXdJZk5vdEV4aXN0cygpOiB2b2lkIHtcblx0XHRpZiAoIXRoaXMuX3ZpZXdSZWYpIHtcblx0XHRcdHRoaXMuX3ZpZXdSZWYgPSB0aGlzLl9ib2R5VHBsLmNyZWF0ZUVtYmVkZGVkVmlldyhudWxsKTtcblx0XHRcdHRoaXMuX3ZpZXdSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXHRcdFx0dGhpcy5fYXBwUmVmLmF0dGFjaFZpZXcodGhpcy5fdmlld1JlZik7XG5cdFx0XHRmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5fdmlld1JlZi5yb290Tm9kZXMpIHtcblx0XHRcdFx0dGhpcy5fZWxlbWVudC5hcHBlbmRDaGlsZChub2RlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHdyYXBzIHRoZSBjb2xsYXBzaWJsZSBpdGVtJ3MgY29udGVudCBvZiB0aGUgYWNjb3JkaW9uLlxuICpcbiAqIEludGVybmFsbHkgaXQgcmV1c2VzIHRoZSBbYE5nYkNvbGxhcHNlYCBkaXJlY3RpdmVdKCMvY29tcG9uZW50cy9jb2xsYXBzZSlcbiAqXG4gKiBAc2luY2UgMTQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRleHBvcnRBczogJ25nYkFjY29yZGlvbkNvbGxhcHNlJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0c2VsZWN0b3I6ICdbbmdiQWNjb3JkaW9uQ29sbGFwc2VdJyxcblx0aG9zdDoge1xuXHRcdHJvbGU6ICdyZWdpb24nLFxuXHRcdCdbY2xhc3MuYWNjb3JkaW9uLWNvbGxhcHNlXSc6ICd0cnVlJyxcblx0XHQnW2lkXSc6ICdpdGVtLmNvbGxhcHNlSWQnLFxuXHRcdCdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ2l0ZW0udG9nZ2xlSWQnLFxuXHR9LFxuXHRob3N0RGlyZWN0aXZlczogW05nYkNvbGxhcHNlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiQWNjb3JkaW9uQ29sbGFwc2Uge1xuXHRpdGVtID0gaW5qZWN0KE5nYkFjY29yZGlvbkl0ZW0pO1xuXHRuZ2JDb2xsYXBzZSA9IGluamVjdChOZ2JDb2xsYXBzZSk7XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdG8gcHV0IG9uIGEgdG9nZ2xpbmcgZWxlbWVudCBpbnNpZGUgdGhlIGFjY29yZGlvbiBpdGVtJ3MgaGVhZGVyLlxuICogSXQgd2lsbCByZWdpc3RlciBjbGljayBoYW5kbGVycyB0aGF0IHRvZ2dsZSB0aGUgYXNzb2NpYXRlZCBwYW5lbCBhbmQgd2lsbCBoYW5kbGUgYWNjZXNzaWJpbGl0eSBhdHRyaWJ1dGVzLlxuICpcbiAqIFRoaXMgZGlyZWN0aXZlIGlzIHVzZWQgaW50ZXJuYWxseSBieSB0aGUgW2BOZ2JBY2NvcmRpb25CdXR0b25gIGRpcmVjdGl2ZV0oIy9jb21wb25lbnRzL2FjY29yZGlvbi9hcGkjTmdiQWNjb3JkaW9uQnV0dG9uKS5cbiAqXG4gKiBAc2luY2UgMTQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1tuZ2JBY2NvcmRpb25Ub2dnbGVdJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aG9zdDoge1xuXHRcdCdbaWRdJzogJ2l0ZW0udG9nZ2xlSWQnLFxuXHRcdCdbY2xhc3MuY29sbGFwc2VkXSc6ICdpdGVtLmNvbGxhcHNlZCcsXG5cdFx0J1thdHRyLmFyaWEtY29udHJvbHNdJzogJ2l0ZW0uY29sbGFwc2VJZCcsXG5cdFx0J1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJyFpdGVtLmNvbGxhcHNlZCcsXG5cdFx0JyhjbGljayknOiAnIWl0ZW0uZGlzYWJsZWQgJiYgYWNjb3JkaW9uLnRvZ2dsZShpdGVtLmlkKScsXG5cdH0sXG59KVxuZXhwb3J0IGNsYXNzIE5nYkFjY29yZGlvblRvZ2dsZSB7XG5cdGl0ZW0gPSBpbmplY3QoTmdiQWNjb3JkaW9uSXRlbSk7XG5cdGFjY29yZGlvbiA9IGluamVjdChOZ2JBY2NvcmRpb25EaXJlY3RpdmUpO1xufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIHB1dCBvbiBhIGJ1dHRvbiBlbGVtZW50IGluc2lkZSBhbiBhY2NvcmRpb24gaXRlbSdzIGhlYWRlci5cbiAqXG4gKiBJZiB5b3Ugd2FudCBhIGN1c3RvbSBtYXJrdXAgZm9yIHRoZSBoZWFkZXIsIHlvdSBjYW4gYWxzbyB1c2UgdGhlIFtgTmdiQWNjb3JkaW9uVG9nZ2xlYCBkaXJlY3RpdmVdKCMvY29tcG9uZW50cy9hY2NvcmRpb24vYXBpI05nYkFjY29yZGlvblRvZ2dsZSkuXG4gKlxuICogQHNpbmNlIDE0LjEuMFxuICovXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6ICdidXR0b25bbmdiQWNjb3JkaW9uQnV0dG9uXScsXG5cdHN0YW5kYWxvbmU6IHRydWUsXG5cdGhvc3Q6IHtcblx0XHQnW2Rpc2FibGVkXSc6ICdpdGVtLmRpc2FibGVkJyxcblx0XHQnW2NsYXNzLmFjY29yZGlvbi1idXR0b25dJzogJ3RydWUnLFxuXHRcdHR5cGU6ICdidXR0b24nLFxuXHR9LFxuXHRob3N0RGlyZWN0aXZlczogW05nYkFjY29yZGlvblRvZ2dsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5nYkFjY29yZGlvbkJ1dHRvbiB7XG5cdGl0ZW0gPSBpbmplY3QoTmdiQWNjb3JkaW9uSXRlbSk7XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCB3cmFwcyBhbiBhY2NvcmRpb24gaXRlbSdzIGhlYWRlci5cbiAqXG4gKiBAc2luY2UgMTQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1tuZ2JBY2NvcmRpb25IZWFkZXJdJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aG9zdDoge1xuXHRcdHJvbGU6ICdoZWFkaW5nJyxcblx0XHQnW2NsYXNzLmFjY29yZGlvbi1oZWFkZXJdJzogJ3RydWUnLFxuXHRcdCdbY2xhc3MuY29sbGFwc2VkXSc6ICdpdGVtLmNvbGxhcHNlZCcsXG5cdH0sXG59KVxuZXhwb3J0IGNsYXNzIE5nYkFjY29yZGlvbkhlYWRlciB7XG5cdGl0ZW0gPSBpbmplY3QoTmdiQWNjb3JkaW9uSXRlbSk7XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCB3cmFwcyBhbiBhY2NvcmRpb24gaXRlbTogYSB0b2dnbGVhYmxlIGhlYWRlciArIGJvZHkgdGhhdCBjb2xsYXBzZXMuXG4gKlxuICogWW91IGNhbiBnZXQgaG9sZCBvZiB0aGUgYE5nYkFjY29yZGlvbkl0ZW1gIGluc3RhbmNlIGluIHRoZSB0ZW1wbGF0ZSB3aXRoIGAjaXRlbT1cIm5nYkFjY29yZGlvbkl0ZW1cImAuXG4gKiBJdCBhbGxvd3MgdG8gY2hlY2sgaWYgdGhlIGl0ZW0gaXMgY29sbGFwc2VkIG9yIG5vdCwgdG9nZ2xlIHRoZSBjb2xsYXBzZSBzdGF0ZSwgZXRjLlxuICpcbiAqIEV2ZXJ5IGFjY29yZGlvbiBpdGVtIGhhcyBhIHN0cmluZyBJRCB0aGF0IGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGluIHRoZSBgbmdiLWFjY29yZGlvbi1pdGVtLVhYYCBmb3JtYXQsIHVubGVzcyBwcm92aWRlZCBleHBsaWNpdGx5LlxuICpcbiAqIEBzaW5jZSAxNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiAnW25nYkFjY29yZGlvbkl0ZW1dJyxcblx0ZXhwb3J0QXM6ICduZ2JBY2NvcmRpb25JdGVtJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aG9zdDoge1xuXHRcdCdbY2xhc3MuYWNjb3JkaW9uLWl0ZW1dJzogJ3RydWUnLFxuXHRcdCdbaWRdJzogJ2lkJyxcblx0fSxcbn0pXG5leHBvcnQgY2xhc3MgTmdiQWNjb3JkaW9uSXRlbSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuXHRwcml2YXRlIF9hY2NvcmRpb24gPSBpbmplY3QoTmdiQWNjb3JkaW9uRGlyZWN0aXZlKTtcblx0cHJpdmF0ZSBfY2QgPSBpbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuXHRwcml2YXRlIF9kZXN0cm95UmVmID0gaW5qZWN0KERlc3Ryb3lSZWYpO1xuXG5cdHByaXZhdGUgX2NvbGxhcHNlZCA9IHRydWU7XG5cdHByaXZhdGUgX2lkID0gYG5nYi1hY2NvcmRpb24taXRlbS0ke25leHRJZCsrfWA7XG5cdHByaXZhdGUgX2Rlc3Ryb3lPbkhpZGU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cblx0cHJpdmF0ZSBfY29sbGFwc2VBbmltYXRpb25SdW5uaW5nID0gZmFsc2U7XG5cblx0QENvbnRlbnRDaGlsZChOZ2JBY2NvcmRpb25Db2xsYXBzZSwgeyBzdGF0aWM6IHRydWUgfSkgcHJpdmF0ZSBfY29sbGFwc2U6IE5nYkFjY29yZGlvbkNvbGxhcHNlO1xuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSBjdXN0b20gSUQgb2YgdGhlIGFjY29yZGlvbiBpdGVtLiBJdCBtdXN0IGJlIHVuaXF1ZSBmb3IgdGhlIGRvY3VtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0gaWQgVGhlIElEIG9mIHRoZSBhY2NvcmRpb24gaXRlbSwgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmdcblx0ICovXG5cdEBJbnB1dCgnbmdiQWNjb3JkaW9uSXRlbScpIHNldCBpZChpZDogc3RyaW5nKSB7XG5cdFx0aWYgKGlzU3RyaW5nKGlkKSAmJiBpZCAhPT0gJycpIHtcblx0XHRcdHRoaXMuX2lkID0gaWQ7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgdGhlIGNvbnRlbnQgb2YgdGhlIGFjY29yZGlvbiBpdGVtJ3MgYm9keSB3aWxsIGJlIHJlbW92ZWQgZnJvbSB0aGUgRE9NLiBJdCB3aWxsIGJlIGp1c3QgaGlkZGVuIG90aGVyd2lzZS5cblx0ICpcblx0ICogVGhpcyBwcm9wZXJ0eSBjYW4gYWxzbyBiZSBzZXQgdXAgb24gdGhlIHBhcmVudCBbYE5nYkFjY29yZGlvbmAgZGlyZWN0aXZlXSgjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FwaSNOZ2JBY2NvcmRpb25EaXJlY3RpdmUpLlxuXHQgKi9cblx0QElucHV0KCkgc2V0IGRlc3Ryb3lPbkhpZGUoZGVzdHJveU9uSGlkZTogYm9vbGVhbikge1xuXHRcdHRoaXMuX2Rlc3Ryb3lPbkhpZGUgPSBkZXN0cm95T25IaWRlO1xuXHR9XG5cblx0Z2V0IGRlc3Ryb3lPbkhpZGUoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX2Rlc3Ryb3lPbkhpZGUgPT09IHVuZGVmaW5lZCA/IHRoaXMuX2FjY29yZGlvbi5kZXN0cm95T25IaWRlIDogdGhpcy5fZGVzdHJveU9uSGlkZSE7XG5cdH1cblxuXHQvKipcblx0ICogSWYgYHRydWVgLCB0aGUgYWNjb3JkaW9uIGl0ZW0gd2lsbCBiZSBkaXNhYmxlZC5cblx0ICogSXQgd29uJ3QgcmVhY3QgdG8gdXNlcidzIGNsaWNrcywgYnV0IHN0aWxsIHdpbGwgYmUgdG9nZ2VsYWJsZSBwcm9ncmFtbWF0aWNhbGx5LlxuXHQgKi9cblx0QElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuXHQvKipcblx0ICpcdElmIGB0cnVlYCwgdGhlIGFjY29yZGlvbiBpdGVtIHdpbGwgYmUgY29sbGFwc2VkLiBPdGhlcndpc2UsIGl0IHdpbGwgYmUgZXhwYW5kZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSBjb2xsYXBzZWQgTmV3IHN0YXRlIG9mIHRoZSBhY2NvcmRpb24gaXRlbS5cblx0ICovXG5cdEBJbnB1dCgpIHNldCBjb2xsYXBzZWQoY29sbGFwc2VkOiBib29sZWFuKSB7XG5cdFx0aWYgKGNvbGxhcHNlZCkge1xuXHRcdFx0dGhpcy5jb2xsYXBzZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmV4cGFuZCgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBFdmVudCBlbWl0dGVkIGJlZm9yZSB0aGUgZXhwYW5kaW5nIGFuaW1hdGlvbiBzdGFydHMuIEl0IGhhcyBubyBwYXlsb2FkLlxuXHQgKlxuXHQgKiBAc2luY2UgMTUuMS4wXG5cdCAqL1xuXHRAT3V0cHV0KCkgc2hvdyA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuXHQvKipcblx0ICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBleHBhbmRpbmcgYW5pbWF0aW9uIGlzIGZpbmlzaGVkLiBJdCBoYXMgbm8gcGF5bG9hZC5cblx0ICovXG5cdEBPdXRwdXQoKSBzaG93biA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuXHQvKipcblx0ICogRXZlbnQgZW1pdHRlZCBiZWZvcmUgdGhlIGNvbGxhcHNpbmcgYW5pbWF0aW9uIHN0YXJ0cy4gSXQgaGFzIG5vIHBheWxvYWQuXG5cdCAqXG5cdCAqIEBzaW5jZSAxNS4xLjBcblx0ICovXG5cdEBPdXRwdXQoKSBoaWRlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG5cdC8qKlxuXHQgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGNvbGxhcHNpbmcgYW5pbWF0aW9uIGlzIGZpbmlzaGVkIGFuZCBiZWZvcmUgdGhlIGNvbnRlbnQgaXMgcmVtb3ZlZCBmcm9tIERPTS5cblx0ICogSXQgaGFzIG5vIHBheWxvYWQuXG5cdCAqL1xuXHRAT3V0cHV0KCkgaGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG5cdGdldCBjb2xsYXBzZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2NvbGxhcHNlZDtcblx0fVxuXG5cdGdldCBpZCgpIHtcblx0XHRyZXR1cm4gYCR7dGhpcy5faWR9YDtcblx0fVxuXG5cdGdldCB0b2dnbGVJZCgpIHtcblx0XHRyZXR1cm4gYCR7dGhpcy5pZH0tdG9nZ2xlYDtcblx0fVxuXG5cdGdldCBjb2xsYXBzZUlkKCkge1xuXHRcdHJldHVybiBgJHt0aGlzLmlkfS1jb2xsYXBzZWA7XG5cdH1cblxuXHRnZXQgX3Nob3VsZEJlSW5ET00oKSB7XG5cdFx0cmV0dXJuICF0aGlzLmNvbGxhcHNlZCB8fCB0aGlzLl9jb2xsYXBzZUFuaW1hdGlvblJ1bm5pbmcgfHwgIXRoaXMuZGVzdHJveU9uSGlkZTtcblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblx0XHRjb25zdCB7IG5nYkNvbGxhcHNlIH0gPSB0aGlzLl9jb2xsYXBzZTtcblx0XHQvLyB3ZSBuZWVkIHRvIGRpc2FibGUgdGhlIGFuaW1hdGlvbiBmb3IgdGhlIGZpcnN0IGluaXRcblx0XHRuZ2JDb2xsYXBzZS5hbmltYXRpb24gPSBmYWxzZTtcblx0XHRuZ2JDb2xsYXBzZS5jb2xsYXBzZWQgPSB0aGlzLmNvbGxhcHNlZDtcblx0XHQvLyB3ZSBzZXQgdGhlIGFuaW1hdGlvbiB0byB0aGUgZGVmYXVsdCBvZiB0aGUgYWNjb3JkaW9uXG5cdFx0bmdiQ29sbGFwc2UuYW5pbWF0aW9uID0gdGhpcy5fYWNjb3JkaW9uLmFuaW1hdGlvbjtcblx0XHQvLyBldmVudCBmb3J3YXJkaW5nIGZyb20gJ25nYkNvbGxhcHNlJyB0byAnbmdiQWNjb3JkaW9uJ1xuXHRcdG5nYkNvbGxhcHNlLmhpZGRlbi5waXBlKHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLl9kZXN0cm95UmVmKSkuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdC8vIHdoZW4gdGhlIGFuaW1hdGlvbiBmaW5pc2hlcyB3ZSBjYW4gcmVtb3ZlIHRoZSB0ZW1wbGF0ZSBmcm9tIERPTVxuXHRcdFx0dGhpcy5fY29sbGFwc2VBbmltYXRpb25SdW5uaW5nID0gZmFsc2U7XG5cdFx0XHR0aGlzLmhpZGRlbi5lbWl0KCk7XG5cdFx0XHR0aGlzLl9hY2NvcmRpb24uaGlkZGVuLmVtaXQodGhpcy5pZCk7XG5cdFx0fSk7XG5cdFx0bmdiQ29sbGFwc2Uuc2hvd24ucGlwZSh0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5fZGVzdHJveVJlZikpLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHR0aGlzLnNob3duLmVtaXQoKTtcblx0XHRcdHRoaXMuX2FjY29yZGlvbi5zaG93bi5lbWl0KHRoaXMuaWQpO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRvZ2dsZXMgYW4gYWNjb3JkaW9uIGl0ZW0uXG5cdCAqL1xuXHR0b2dnbGUoKSB7XG5cdFx0dGhpcy5jb2xsYXBzZWQgPSAhdGhpcy5jb2xsYXBzZWQ7XG5cdH1cblxuXHQvKipcblx0ICogRXhwYW5kcyBhbiBhY2NvcmRpb24gaXRlbS5cblx0ICovXG5cdGV4cGFuZCgpIHtcblx0XHRpZiAodGhpcy5jb2xsYXBzZWQpIHtcblx0XHRcdC8vIGNoZWNraW5nIGlmIGFjY29yZGlvbiBhbGxvd3MgdG8gZXhwYW5kIHRoZSBwYW5lbCBpbiByZXNwZWN0IHRvICdjbG9zZU90aGVycycgZmxhZ1xuXHRcdFx0aWYgKCF0aGlzLl9hY2NvcmRpb24uX2Vuc3VyZUNhbkV4cGFuZCh0aGlzKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX2NvbGxhcHNlZCA9IGZhbHNlO1xuXG5cdFx0XHQvLyBuZWVkIGlmIHRoZSBhY2NvcmRpb24gaXMgdXNlZCBpbnNpZGUgYSBjb21wb25lbnQgaGF2aW5nIE9uUHVzaCBjaGFuZ2UgZGV0ZWN0aW9uIHN0cmF0ZWd5XG5cdFx0XHR0aGlzLl9jZC5tYXJrRm9yQ2hlY2soKTtcblxuXHRcdFx0Ly8gd2UgbmVlZCBmb3JjZSBDRCB0byBnZXQgdGVtcGxhdGUgaW50byBET00gYmVmb3JlIHN0YXJ0aW5nIGFuaW1hdGlvbiB0byBjYWxjdWxhdGUgaXRzIGhlaWdodCBjb3JyZWN0bHlcblx0XHRcdC8vIHRoaXMgd2lsbCBzeW5jaHJvbm91c2x5IHB1dCB0aGUgaXRlbSBib2R5IGludG8gRE9NLCBiZWNhdXNlIGB0aGlzLl9jb2xsYXBzZWRgIHdhcyBmbGlwcGVkIHRvIGBmYWxzZWBcblx0XHRcdHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKTtcblxuXHRcdFx0Ly8gZmlyaW5nIGV2ZW50cyBiZWZvcmUgc3RhcnRpbmcgYW5pbWF0aW9uc1xuXHRcdFx0dGhpcy5zaG93LmVtaXQoKTtcblx0XHRcdHRoaXMuX2FjY29yZGlvbi5zaG93LmVtaXQodGhpcy5pZCk7XG5cblx0XHRcdC8vIHdlIGFsc28gbmVlZCB0byBtYWtlIHN1cmUgJ2FuaW1hdGlvbicgZmxhZyBpcyB1cC10by0gZGF0ZVxuXHRcdFx0dGhpcy5fY29sbGFwc2UubmdiQ29sbGFwc2UuYW5pbWF0aW9uID0gdGhpcy5fYWNjb3JkaW9uLmFuaW1hdGlvbjtcblx0XHRcdHRoaXMuX2NvbGxhcHNlLm5nYkNvbGxhcHNlLmNvbGxhcHNlZCA9IGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb2xsYXBzZXMgYW4gYWNjb3JkaW9uIGl0ZW0uXG5cdCAqL1xuXHRjb2xsYXBzZSgpIHtcblx0XHRpZiAoIXRoaXMuY29sbGFwc2VkKSB7XG5cdFx0XHR0aGlzLl9jb2xsYXBzZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5fY29sbGFwc2VBbmltYXRpb25SdW5uaW5nID0gdHJ1ZTtcblxuXHRcdFx0Ly8gbmVlZCBpZiB0aGUgYWNjb3JkaW9uIGlzIHVzZWQgaW5zaWRlIGEgY29tcG9uZW50IGhhdmluZyBPblB1c2ggY2hhbmdlIGRldGVjdGlvbiBzdHJhdGVneVxuXHRcdFx0dGhpcy5fY2QubWFya0ZvckNoZWNrKCk7XG5cblx0XHRcdC8vIGZpcmluZyBldmVudHMgYmVmb3JlIHN0YXJ0aW5nIGFuaW1hdGlvbnNcblx0XHRcdHRoaXMuaGlkZS5lbWl0KCk7XG5cdFx0XHR0aGlzLl9hY2NvcmRpb24uaGlkZS5lbWl0KHRoaXMuaWQpO1xuXG5cdFx0XHQvLyB3ZSBhbHNvIG5lZWQgdG8gbWFrZSBzdXJlICdhbmltYXRpb24nIGZsYWcgaXMgdXAtdG8tIGRhdGVcblx0XHRcdHRoaXMuX2NvbGxhcHNlLm5nYkNvbGxhcHNlLmFuaW1hdGlvbiA9IHRoaXMuX2FjY29yZGlvbi5hbmltYXRpb247XG5cdFx0XHR0aGlzLl9jb2xsYXBzZS5uZ2JDb2xsYXBzZS5jb2xsYXBzZWQgPSB0cnVlO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEFjY29yZGlvbiBpcyBhIHN0YWNrIG9mIGNhcmRzIHRoYXQgaGF2ZSBhIGhlYWRlciBhbmQgY29sbGFwc2libGUgYm9keS5cbiAqXG4gKiBUaGlzIGRpcmVjdGl2ZSBpcyBhIGNvbnRhaW5lciBmb3IgdGhlc2UgaXRlbXMgYW5kIHByb3ZpZGVzIGFuIEFQSSB0byBoYW5kbGUgdGhlbS5cbiAqXG4gKiBAc2luY2UgMTQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1tuZ2JBY2NvcmRpb25dJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0ZXhwb3J0QXM6ICduZ2JBY2NvcmRpb24nLFxuXHRob3N0OiB7ICdbY2xhc3MuYWNjb3JkaW9uXSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JBY2NvcmRpb25EaXJlY3RpdmUge1xuXHRAQ29udGVudENoaWxkcmVuKE5nYkFjY29yZGlvbkl0ZW0sIHsgZGVzY2VuZGFudHM6IGZhbHNlIH0pIHByaXZhdGUgX2l0ZW1zPzogUXVlcnlMaXN0PE5nYkFjY29yZGlvbkl0ZW0+O1xuXHQvKipcblx0ICogSWYgYHRydWVgLCBhY2NvcmRpb24gd2lsbCBiZSBhbmltYXRlZC5cblx0ICovXG5cdEBJbnB1dCgpIGFuaW1hdGlvbjogYm9vbGVhbjtcblxuXHQvKipcblx0ICogSWYgYHRydWVgLCBvbmx5IG9uZSBpdGVtIGF0IHRoZSB0aW1lIGNhbiBzdGF5IG9wZW4uXG5cdCAqL1xuXHRASW5wdXQoKSBjbG9zZU90aGVyczogYm9vbGVhbjtcblxuXHQvKipcblx0ICogSWYgYHRydWVgLCB0aGUgY29udGVudCBvZiB0aGUgYWNjb3JkaW9uIGl0ZW1zIGJvZHkgd2lsbCBiZSByZW1vdmVkIGZyb20gdGhlIERPTS4gSXQgd2lsbCBiZSBqdXN0IGhpZGRlbiBvdGhlcndpc2UuXG5cdCAqXG5cdCAqIFRoaXMgcHJvcGVydHkgY2FuIGJlIG92ZXJ3cml0dGVuIGF0IHRoZSBbYE5nYkFjY29yZGlvbkl0ZW1gXSgjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FwaSNOZ2JBY2NvcmRpb25JdGVtKSBsZXZlbFxuXHQgKi9cblx0QElucHV0KCkgZGVzdHJveU9uSGlkZTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRXZlbnQgZW1pdHRlZCBiZWZvcmUgZXhwYW5kaW5nIGFuaW1hdGlvbiBzdGFydHMuIFRoZSBwYXlsb2FkIGlzIHRoZSBpZCBvZiBzaG93biBhY2NvcmRpb24gaXRlbS5cblx0ICpcblx0ICogQHNpbmNlIDE1LjEuMFxuXHQgKi9cblx0QE91dHB1dCgpIHNob3cgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuXHQvKipcblx0ICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBleHBhbmRpbmcgYW5pbWF0aW9uIGlzIGZpbmlzaGVkLiBUaGUgcGF5bG9hZCBpcyB0aGUgaWQgb2Ygc2hvd24gYWNjb3JkaW9uIGl0ZW0uXG5cdCAqL1xuXHRAT3V0cHV0KCkgc2hvd24gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuXHQvKipcblx0ICogRXZlbnQgZW1pdHRlZCBiZWZvcmUgdGhlIGNvbGxhcHNpbmcgYW5pbWF0aW9uIHN0YXJ0cy4gVGhlIHBheWxvYWQgaXMgdGhlIGlkIG9mIGhpZGRlbiBhY2NvcmRpb24gaXRlbS5cblx0ICpcblx0ICogQHNpbmNlIDE1LjEuMFxuXHQgKi9cblx0QE91dHB1dCgpIGhpZGUgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuXHQvKipcblx0ICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjb2xsYXBzaW5nIGFuaW1hdGlvbiBpcyBmaW5pc2hlZCBhbmQgYmVmb3JlIHRoZSBjb250ZW50IGlzIHJlbW92ZWQgZnJvbSBET00uXG5cdCAqIFRoZSBwYXlsb2FkIGlzIHRoZSBpZCBvZiBoaWRkZW4gYWNjb3JkaW9uIGl0ZW0uXG5cdCAqL1xuXHRAT3V0cHV0KCkgaGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cblx0cHJpdmF0ZSBfYW5JdGVtV2FzQWxyZWFkeUV4cGFuZGVkRHVyaW5nSW5pdGlhbGlzYXRpb24gPSBmYWxzZTtcblxuXHRjb25zdHJ1Y3Rvcihjb25maWc6IE5nYkFjY29yZGlvbkNvbmZpZykge1xuXHRcdHRoaXMuYW5pbWF0aW9uID0gY29uZmlnLmFuaW1hdGlvbjtcblx0XHR0aGlzLmNsb3NlT3RoZXJzID0gY29uZmlnLmNsb3NlT3RoZXJzO1xuXHRcdHRoaXMuZGVzdHJveU9uSGlkZSA9IGNvbmZpZy5kZXN0cm95T25IaWRlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRvZ2dsZXMgYW4gaXRlbSB3aXRoIHRoZSBnaXZlbiBpZC5cblx0ICpcblx0ICogSXQgd2lsbCB0b2dnbGUgYW4gaXRlbSwgZXZlbiBpZiBpdCBpcyBkaXNhYmxlZC5cblx0ICpcblx0ICogQHBhcmFtIGl0ZW1JZCBUaGUgaWQgb2YgdGhlIGl0ZW0gdG8gdG9nZ2xlLlxuXHQgKi9cblx0dG9nZ2xlKGl0ZW1JZDogc3RyaW5nKSB7XG5cdFx0dGhpcy5fZ2V0SXRlbShpdGVtSWQpPy50b2dnbGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBhbmRzIGFuIGl0ZW0gd2l0aCB0aGUgZ2l2ZW4gaWQuXG5cdCAqXG5cdCAqIElmIGBjbG9zZU90aGVyc2AgaXMgYHRydWVgLCBpdCB3aWxsIGNvbGxhcHNlIG90aGVyIHBhbmVscy5cblx0ICpcblx0ICogQHBhcmFtIGl0ZW1JZCBUaGUgaWQgb2YgdGhlIGl0ZW0gdG8gZXhwYW5kLlxuXHQgKi9cblx0ZXhwYW5kKGl0ZW1JZDogc3RyaW5nKSB7XG5cdFx0dGhpcy5fZ2V0SXRlbShpdGVtSWQpPy5leHBhbmQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBhbmRzIGFsbCBpdGVtcy5cblx0ICpcblx0ICogSWYgYGNsb3NlT3RoZXJzYCBpcyBgdHJ1ZWAgYW5kIGFsbCBpdGVtcyBhcmUgY2xvc2VkLCBpdCB3aWxsIG9wZW4gdGhlIGZpcnN0IG9uZS4gT3RoZXJ3aXNlLCBpdCB3aWxsIGtlZXAgdGhlIG9wZW5lZCBvbmUuXG5cdCAqL1xuXHRleHBhbmRBbGwoKSB7XG5cdFx0aWYgKHRoaXMuX2l0ZW1zKSB7XG5cdFx0XHRpZiAodGhpcy5jbG9zZU90aGVycykge1xuXHRcdFx0XHQvLyB3ZSBjaGVjayBpZiB0aGVyZSBpcyBhbiBpdGVtIG9wZW4gYW5kIGlmIGl0IGlzIG5vdCB3ZSBjYW4gZXhwYW5kIHRoZSBmaXJzdCBpdGVtXG5cdFx0XHRcdC8vIChvdGhlcndpc2Ugd2UgdG9nZ2xlIG5vdGhpbmcpXG5cdFx0XHRcdGlmICghdGhpcy5faXRlbXMuZmluZCgoaXRlbSkgPT4gIWl0ZW0uY29sbGFwc2VkKSkge1xuXHRcdFx0XHRcdHRoaXMuX2l0ZW1zLmZpcnN0LmV4cGFuZCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmV4cGFuZCgpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ29sbGFwc2VzIGFuIGl0ZW0gd2l0aCB0aGUgZ2l2ZW4gaWQuXG5cdCAqXG5cdCAqIEhhcyBubyBlZmZlY3QgaWYgdGhlIGBpdGVtSWRgIGRvZXMgbm90IGNvcnJlc3BvbmQgdG8gYW55IGl0ZW0uXG5cdCAqXG5cdCAqIEBwYXJhbSBpdGVtSWQgVGhlIGlkIG9mIHRoZSBpdGVtIHRvIGNvbGxhcHNlLlxuXHQgKi9cblx0Y29sbGFwc2UoaXRlbUlkOiBzdHJpbmcpIHtcblx0XHR0aGlzLl9nZXRJdGVtKGl0ZW1JZCk/LmNvbGxhcHNlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29sbGFwc2VzIGFsbCBpdGVtcy5cblx0ICovXG5cdGNvbGxhcHNlQWxsKCkge1xuXHRcdHRoaXMuX2l0ZW1zPy5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNvbGxhcHNlKCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrcyBpZiBhbiBpdGVtIHdpdGggdGhlIGdpdmVuIGlkIGlzIGV4cGFuZGVkLlxuXHQgKlxuXHQgKiBJZiB0aGUgYGl0ZW1JZGAgZG9lcyBub3QgY29ycmVzcG9uZCB0byBhbnkgaXRlbSwgaXQgcmV0dXJucyBgZmFsc2VgLlxuXHQgKlxuXHQgKiBAcGFyYW0gaXRlbUlkIFRoZSBpZCBvZiB0aGUgaXRlbSB0byBjaGVjay5cblx0ICovXG5cdGlzRXhwYW5kZWQoaXRlbUlkOiBzdHJpbmcpIHtcblx0XHRjb25zdCBpdGVtID0gdGhpcy5fZ2V0SXRlbShpdGVtSWQpO1xuXHRcdHJldHVybiBpdGVtID8gIWl0ZW0uY29sbGFwc2VkIDogZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogSXQgY2hlY2tzLCBpZiB0aGUgaXRlbSBjYW4gYmUgZXhwYW5kZWQgaW4gdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGFjY29yZGlvbi5cblx0ICogV2l0aCBgY2xvc2VPdGhlcnNgIHRoZXJlIGNhbiBiZSBvbmx5IG9uZSBleHBhbmRlZCBpdGVtIGF0IGEgdGltZS5cblx0ICpcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRfZW5zdXJlQ2FuRXhwYW5kKHRvRXhwYW5kOiBOZ2JBY2NvcmRpb25JdGVtKSB7XG5cdFx0aWYgKCF0aGlzLmNsb3NlT3RoZXJzKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBzcGVjaWFsIGNhc2UgZHVyaW5nIHRoZSBpbml0aWFsaXphdGlvbiBvZiB0aGUgW2NvbGxhcHNlXT1cImZhbHNlXCIgaW5wdXRzXG5cdFx0Ly8gYHRoaXMuX2l0ZW1zYCBRdWVyeUxpc3QgaXMgbm90IHlldCBpbml0aWFsaXplZCwgYnV0IHdlIG5lZWQgdG8gZW5zdXJlIG9ubHkgb25lIGl0ZW0gY2FuIGJlIGV4cGFuZGVkIGF0IGEgdGltZVxuXHRcdGlmICghdGhpcy5faXRlbXMpIHtcblx0XHRcdGlmICghdGhpcy5fYW5JdGVtV2FzQWxyZWFkeUV4cGFuZGVkRHVyaW5nSW5pdGlhbGlzYXRpb24pIHtcblx0XHRcdFx0dGhpcy5fYW5JdGVtV2FzQWxyZWFkeUV4cGFuZGVkRHVyaW5nSW5pdGlhbGlzYXRpb24gPSB0cnVlO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBpZiB0aGVyZSBpcyBhbiBleHBhbmRlZCBpdGVtLCB3ZSBuZWVkIHRvIGNvbGxhcHNlIGl0IGZpcnN0XG5cdFx0dGhpcy5faXRlbXMuZmluZCgoaXRlbSkgPT4gIWl0ZW0uY29sbGFwc2VkICYmIHRvRXhwYW5kICE9PSBpdGVtKT8uY29sbGFwc2UoKTtcblxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0cHJpdmF0ZSBfZ2V0SXRlbShpdGVtSWQ6IHN0cmluZyk6IE5nYkFjY29yZGlvbkl0ZW0gfCB1bmRlZmluZWQge1xuXHRcdHJldHVybiB0aGlzLl9pdGVtcz8uZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gaXRlbUlkKTtcblx0fVxufVxuIl19