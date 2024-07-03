/* eslint-disable deprecation/deprecation */
import { Component, ContentChildren, Directive, EventEmitter, Host, Input, Optional, Output, ViewEncapsulation, Inject, forwardRef, } from '@angular/core';
import { isString } from '../util/util';
import { ngbRunTransition } from '../util/transition/ngbTransition';
import { ngbCollapsingTransition } from '../util/transition/ngbCollapseTransition';
import { take } from 'rxjs/operators';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./accordion-config";
let nextId = 0;
/**
 * A directive that wraps an accordion panel header with any HTML markup and a toggling button
 * marked with [`NgbPanelToggle`](#/components/accordion/api#NgbPanelToggle).
 * See the [header customization demo](#/components/accordion/examples#header) for more details.
 *
 * You can also use [`NgbPanelTitle`](#/components/accordion/api#NgbPanelTitle) to customize only the panel title.
 *
 * @since 4.1.0
 * @deprecated 14.1.0
 */
class NgbPanelHeader {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPanelHeader, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbPanelHeader, isStandalone: true, selector: "ng-template[ngbPanelHeader]", ngImport: i0 }); }
}
export { NgbPanelHeader };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPanelHeader, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPanelHeader]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive that wraps only the panel title with HTML markup inside.
 *
 * You can also use [`NgbPanelHeader`](#/components/accordion/api#NgbPanelHeader) to customize the full panel header.
 *
 * @deprecated 14.1.0
 */
class NgbPanelTitle {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPanelTitle, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbPanelTitle, isStandalone: true, selector: "ng-template[ngbPanelTitle]", ngImport: i0 }); }
}
export { NgbPanelTitle };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPanelTitle, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPanelTitle]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive that wraps the accordion panel content.
 *
 * @deprecated 14.1.0
 */
class NgbPanelContent {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPanelContent, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbPanelContent, isStandalone: true, selector: "ng-template[ngbPanelContent]", ngImport: i0 }); }
}
export { NgbPanelContent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPanelContent, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPanelContent]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * A directive that wraps an individual accordion panel with title and collapsible content.
 *
 * @deprecated 14.1.0
 */
class NgbPanel {
    constructor() {
        /**
         *  If `true`, the panel is disabled an can't be toggled.
         */
        this.disabled = false;
        /**
         *  An optional id for the panel that must be unique on the page.
         *
         *  If not provided, it will be auto-generated in the `ngb-panel-xxx` format.
         */
        this.id = `ngb-panel-${nextId++}`;
        this.isOpen = false;
        /* A flag to specified that the transition panel classes have been initialized */
        this.initClassDone = false;
        /* A flag to specified if the panel is currently being animated, to ensure its presence in the dom */
        this.transitionRunning = false;
        /**
         * An event emitted when the panel is shown, after the transition. It has no payload.
         *
         * @since 8.0.0
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the panel is hidden, after the transition. It has no payload.
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
        this.titleTpl = this.titleTpls.first;
        this.headerTpl = this.headerTpls.first;
        this.contentTpl = this.contentTpls.first;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPanel, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbPanel, isStandalone: true, selector: "ngb-panel", inputs: { disabled: "disabled", id: "id", title: "title", type: "type", cardClass: "cardClass" }, outputs: { shown: "shown", hidden: "hidden" }, queries: [{ propertyName: "titleTpls", predicate: NgbPanelTitle }, { propertyName: "headerTpls", predicate: NgbPanelHeader }, { propertyName: "contentTpls", predicate: NgbPanelContent }], ngImport: i0 }); }
}
export { NgbPanel };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPanel, decorators: [{
            type: Directive,
            args: [{ selector: 'ngb-panel', standalone: true }]
        }], propDecorators: { disabled: [{
                type: Input
            }], id: [{
                type: Input
            }], title: [{
                type: Input
            }], type: [{
                type: Input
            }], cardClass: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }], titleTpls: [{
                type: ContentChildren,
                args: [NgbPanelTitle, { descendants: false }]
            }], headerTpls: [{
                type: ContentChildren,
                args: [NgbPanelHeader, { descendants: false }]
            }], contentTpls: [{
                type: ContentChildren,
                args: [NgbPanelContent, { descendants: false }]
            }] } });
class NgbRefDirective {
    constructor(_El) {
        this._El = _El;
        this.ngbRef = new EventEmitter();
    }
    ngOnInit() {
        this.ngbRef.emit(this._El.nativeElement);
    }
    ngOnDestroy() {
        this.ngbRef.emit(null);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbRefDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbRefDirective, isStandalone: true, selector: "[ngbRef]", outputs: { ngbRef: "ngbRef" }, ngImport: i0 }); }
}
export { NgbRefDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbRefDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbRef]', standalone: true }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { ngbRef: [{
                type: Output
            }] } });
/**
 * A directive to put on a button that toggles panel opening and closing.
 *
 * To be used inside the [`NgbPanelHeader`](#/components/accordion/api#NgbPanelHeader)
 *
 * @since 4.1.0
 * @deprecated 14.1.0
 */
class NgbPanelToggle {
    set ngbPanelToggle(panel) {
        if (panel) {
            this.panel = panel;
        }
    }
    constructor(accordion, panel) {
        this.accordion = accordion;
        this.panel = panel;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPanelToggle, deps: [{ token: forwardRef(() => NgbAccordion) }, { token: NgbPanel, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.6", type: NgbPanelToggle, isStandalone: true, selector: "button[ngbPanelToggle]", inputs: { ngbPanelToggle: "ngbPanelToggle" }, host: { attributes: { "type": "button" }, listeners: { "click": "accordion.toggle(panel.id)" }, properties: { "disabled": "panel.disabled", "class.collapsed": "!panel.isOpen", "attr.aria-expanded": "panel.isOpen", "attr.aria-controls": "panel.id" } }, ngImport: i0 }); }
}
export { NgbPanelToggle };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbPanelToggle, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[ngbPanelToggle]',
                    standalone: true,
                    host: {
                        type: 'button',
                        '[disabled]': 'panel.disabled',
                        '[class.collapsed]': '!panel.isOpen',
                        '[attr.aria-expanded]': 'panel.isOpen',
                        '[attr.aria-controls]': 'panel.id',
                        '(click)': 'accordion.toggle(panel.id)',
                    },
                }]
        }], ctorParameters: function () { return [{ type: NgbAccordion, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbAccordion)]
                }] }, { type: NgbPanel, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }] }]; }, propDecorators: { ngbPanelToggle: [{
                type: Input
            }] } });
/**
 * Accordion is a collection of collapsible panels (bootstrap cards).
 *
 * It can ensure only one panel is opened at a time and allows to customize panel
 * headers.
 *
 * @deprecated 14.1.0
 */
class NgbAccordion {
    constructor(config, _ngZone, _changeDetector) {
        this._ngZone = _ngZone;
        this._changeDetector = _changeDetector;
        /**
         * An array or comma separated strings of panel ids that should be opened **initially**.
         *
         * For subsequent changes use methods like `expand()`, `collapse()`, etc. and
         * the `(panelChange)` event.
         */
        this.activeIds = [];
        /**
         * If `true`, panel content will be detached from DOM and not simply hidden when the panel is collapsed.
         */
        this.destroyOnHide = true;
        /**
         * Event emitted right before the panel toggle happens.
         *
         * See [NgbPanelChangeEvent](#/components/accordion/api#NgbPanelChangeEvent) for payload details.
         */
        this.panelChange = new EventEmitter();
        /**
         * An event emitted when the expanding animation is finished on the panel. The payload is the panel id.
         *
         * @since 8.0.0
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the collapsing animation is finished on the panel, and before the panel element is removed.
         * The payload is the panel id.
         *
         * @since 8.0.0
         */
        this.hidden = new EventEmitter();
        this.animation = config.animation;
        this.type = config.type;
        this.closeOtherPanels = config.closeOthers;
    }
    /**
     * Checks if a panel with a given id is expanded.
     */
    isExpanded(panelId) {
        return this.activeIds.indexOf(panelId) > -1;
    }
    /**
     * Expands a panel with a given id.
     *
     * Has no effect if the panel is already expanded or disabled.
     */
    expand(panelId) {
        this._changeOpenState(this._findPanelById(panelId), true);
    }
    /**
     * Expands all panels, if `[closeOthers]` is `false`.
     *
     * If `[closeOthers]` is `true`, it will expand the first panel, unless there is already a panel opened.
     */
    expandAll() {
        if (this.closeOtherPanels) {
            if (this.activeIds.length === 0 && this.panels.length) {
                this._changeOpenState(this.panels.first, true);
            }
        }
        else {
            this.panels.forEach((panel) => this._changeOpenState(panel, true));
        }
    }
    /**
     * Collapses a panel with the given id.
     *
     * Has no effect if the panel is already collapsed or disabled.
     */
    collapse(panelId) {
        this._changeOpenState(this._findPanelById(panelId), false);
    }
    /**
     * Collapses all opened panels.
     */
    collapseAll() {
        this.panels.forEach((panel) => {
            this._changeOpenState(panel, false);
        });
    }
    /**
     * Toggles a panel with the given id.
     *
     * Has no effect if the panel is disabled.
     */
    toggle(panelId) {
        const panel = this._findPanelById(panelId);
        if (panel) {
            this._changeOpenState(panel, !panel.isOpen);
        }
    }
    ngAfterContentChecked() {
        // active id updates
        if (isString(this.activeIds)) {
            this.activeIds = this.activeIds.split(/\s*,\s*/);
        }
        // update panels open states
        this.panels.forEach((panel) => {
            panel.isOpen = !panel.disabled && this.activeIds.indexOf(panel.id) > -1;
        });
        // closeOthers updates
        if (this.activeIds.length > 1 && this.closeOtherPanels) {
            this._closeOthers(this.activeIds[0], false);
            this._updateActiveIds();
        }
        // Setup the initial classes here
        this._ngZone.onStable.pipe(take(1)).subscribe(() => {
            this.panels.forEach((panel) => {
                const panelElement = panel.panelDiv;
                if (panelElement) {
                    if (!panel.initClassDone) {
                        panel.initClassDone = true;
                        ngbRunTransition(this._ngZone, panelElement, ngbCollapsingTransition, {
                            animation: false,
                            runningTransition: 'continue',
                            context: { direction: panel.isOpen ? 'show' : 'hide', dimension: 'height' },
                        });
                    }
                }
                else {
                    // Classes must be initialized next time it will be in the dom
                    panel.initClassDone = false;
                }
            });
        });
    }
    _changeOpenState(panel, nextState) {
        if (panel != null && !panel.disabled && panel.isOpen !== nextState) {
            let defaultPrevented = false;
            this.panelChange.emit({
                panelId: panel.id,
                nextState: nextState,
                preventDefault: () => {
                    defaultPrevented = true;
                },
            });
            if (!defaultPrevented) {
                panel.isOpen = nextState;
                panel.transitionRunning = true;
                if (nextState && this.closeOtherPanels) {
                    this._closeOthers(panel.id);
                }
                this._updateActiveIds();
                this._runTransitions(this.animation);
            }
        }
    }
    _closeOthers(panelId, enableTransition = true) {
        this.panels.forEach((panel) => {
            if (panel.id !== panelId && panel.isOpen) {
                panel.isOpen = false;
                panel.transitionRunning = enableTransition;
            }
        });
    }
    _findPanelById(panelId) {
        return this.panels.find((p) => p.id === panelId) || null;
    }
    _updateActiveIds() {
        this.activeIds = this.panels.filter((panel) => panel.isOpen && !panel.disabled).map((panel) => panel.id);
    }
    _runTransitions(animation) {
        // detectChanges is performed to ensure that all panels are in the dom (via transitionRunning = true)
        // before starting the animation
        this._changeDetector.detectChanges();
        this.panels.forEach((panel) => {
            // When panel.transitionRunning is true, the transition needs to be started OR reversed,
            // The direction (show or hide) is choosen by each panel.isOpen state
            if (panel.transitionRunning) {
                const panelElement = panel.panelDiv;
                ngbRunTransition(this._ngZone, panelElement, ngbCollapsingTransition, {
                    animation,
                    runningTransition: 'stop',
                    context: { direction: panel.isOpen ? 'show' : 'hide', dimension: 'height' },
                }).subscribe(() => {
                    panel.transitionRunning = false;
                    const { id } = panel;
                    if (panel.isOpen) {
                        panel.shown.emit();
                        this.shown.emit(id);
                    }
                    else {
                        panel.hidden.emit();
                        this.hidden.emit(id);
                    }
                });
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAccordion, deps: [{ token: i1.NgbAccordionConfig }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbAccordion, isStandalone: true, selector: "ngb-accordion", inputs: { animation: "animation", activeIds: "activeIds", closeOtherPanels: ["closeOthers", "closeOtherPanels"], destroyOnHide: "destroyOnHide", type: "type" }, outputs: { panelChange: "panelChange", shown: "shown", hidden: "hidden" }, host: { attributes: { "role": "tablist" }, properties: { "attr.aria-multiselectable": "!closeOtherPanels" }, classAttribute: "accordion" }, queries: [{ propertyName: "panels", predicate: NgbPanel }], exportAs: ["ngbAccordion"], ngImport: i0, template: `
		<ng-template #t ngbPanelHeader let-panel>
			<button class="accordion-button" [ngbPanelToggle]="panel">
				{{ panel.title }}
				<ng-template [ngTemplateOutlet]="panel.titleTpl?.templateRef"></ng-template>
			</button>
		</ng-template>
		<ng-template ngFor let-panel [ngForOf]="panels">
			<div [class]="'accordion-item ' + (panel.cardClass || '')">
				<div
					role="tab"
					id="{{ panel.id }}-header"
					[class]="'accordion-header ' + (panel.type ? 'bg-' + panel.type : type ? 'bg-' + type : '')"
				>
					<ng-template
						[ngTemplateOutlet]="panel.headerTpl?.templateRef || t"
						[ngTemplateOutletContext]="{ $implicit: panel, opened: panel.isOpen }"
					></ng-template>
				</div>
				<div
					id="{{ panel.id }}"
					(ngbRef)="panel.panelDiv = $event"
					role="tabpanel"
					[attr.aria-labelledby]="panel.id + '-header'"
					*ngIf="!destroyOnHide || panel.isOpen || panel.transitionRunning"
				>
					<div class="accordion-body">
						<ng-template [ngTemplateOutlet]="panel.contentTpl?.templateRef || null"></ng-template>
					</div>
				</div>
			</div>
		</ng-template>
	`, isInline: true, dependencies: [{ kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: NgbPanelToggle, selector: "button[ngbPanelToggle]", inputs: ["ngbPanelToggle"] }, { kind: "directive", type: NgbRefDirective, selector: "[ngbRef]", outputs: ["ngbRef"] }, { kind: "directive", type: NgbPanelHeader, selector: "ng-template[ngbPanelHeader]" }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbAccordion };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbAccordion, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-accordion',
                    exportAs: 'ngbAccordion',
                    standalone: true,
                    imports: [NgFor, NgTemplateOutlet, NgbPanelToggle, NgbRefDirective, NgbPanelHeader, NgIf],
                    encapsulation: ViewEncapsulation.None,
                    host: { class: 'accordion', role: 'tablist', '[attr.aria-multiselectable]': '!closeOtherPanels' },
                    template: `
		<ng-template #t ngbPanelHeader let-panel>
			<button class="accordion-button" [ngbPanelToggle]="panel">
				{{ panel.title }}
				<ng-template [ngTemplateOutlet]="panel.titleTpl?.templateRef"></ng-template>
			</button>
		</ng-template>
		<ng-template ngFor let-panel [ngForOf]="panels">
			<div [class]="'accordion-item ' + (panel.cardClass || '')">
				<div
					role="tab"
					id="{{ panel.id }}-header"
					[class]="'accordion-header ' + (panel.type ? 'bg-' + panel.type : type ? 'bg-' + type : '')"
				>
					<ng-template
						[ngTemplateOutlet]="panel.headerTpl?.templateRef || t"
						[ngTemplateOutletContext]="{ $implicit: panel, opened: panel.isOpen }"
					></ng-template>
				</div>
				<div
					id="{{ panel.id }}"
					(ngbRef)="panel.panelDiv = $event"
					role="tabpanel"
					[attr.aria-labelledby]="panel.id + '-header'"
					*ngIf="!destroyOnHide || panel.isOpen || panel.transitionRunning"
				>
					<div class="accordion-body">
						<ng-template [ngTemplateOutlet]="panel.contentTpl?.templateRef || null"></ng-template>
					</div>
				</div>
			</div>
		</ng-template>
	`,
                }]
        }], ctorParameters: function () { return [{ type: i1.NgbAccordionConfig }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { panels: [{
                type: ContentChildren,
                args: [NgbPanel]
            }], animation: [{
                type: Input
            }], activeIds: [{
                type: Input
            }], closeOtherPanels: [{
                type: Input,
                args: ['closeOthers']
            }], destroyOnHide: [{
                type: Input
            }], type: [{
                type: Input
            }], panelChange: [{
                type: Output
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FjY29yZGlvbi9hY2NvcmRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNENBQTRDO0FBQzVDLE9BQU8sRUFHTixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFFVCxZQUFZLEVBQ1osSUFBSSxFQUNKLEtBQUssRUFDTCxRQUFRLEVBQ1IsTUFBTSxFQUdOLGlCQUFpQixFQUlqQixNQUFNLEVBQ04sVUFBVSxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHeEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDbkYsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQUVoRSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFlZjs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUNhLGNBQWM7SUFDMUIsWUFBbUIsV0FBNkI7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0lBQUcsQ0FBQzs4R0FEeEMsY0FBYztrR0FBZCxjQUFjOztTQUFkLGNBQWM7MkZBQWQsY0FBYztrQkFEMUIsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSw2QkFBNkIsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFOztBQUt4RTs7Ozs7O0dBTUc7QUFDSCxNQUNhLGFBQWE7SUFDekIsWUFBbUIsV0FBNkI7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0lBQUcsQ0FBQzs4R0FEeEMsYUFBYTtrR0FBYixhQUFhOztTQUFiLGFBQWE7MkZBQWIsYUFBYTtrQkFEekIsU0FBUztt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Y2F0aW9uICovXG5pbXBvcnQge1xuXHRBZnRlckNvbnRlbnRDaGVja2VkLFxuXHRDaGFuZ2VEZXRlY3RvclJlZixcblx0Q29tcG9uZW50LFxuXHRDb250ZW50Q2hpbGRyZW4sXG5cdERpcmVjdGl2ZSxcblx0RWxlbWVudFJlZixcblx0RXZlbnRFbWl0dGVyLFxuXHRIb3N0LFxuXHRJbnB1dCxcblx0T3B0aW9uYWwsXG5cdE91dHB1dCxcblx0UXVlcnlMaXN0LFxuXHRUZW1wbGF0ZVJlZixcblx0Vmlld0VuY2Fwc3VsYXRpb24sXG5cdE5nWm9uZSxcblx0T25Jbml0LFxuXHRPbkRlc3Ryb3ksXG5cdEluamVjdCxcblx0Zm9yd2FyZFJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuaW1wb3J0IHsgTmdiQWNjb3JkaW9uQ29uZmlnIH0gZnJvbSAnLi9hY2NvcmRpb24tY29uZmlnJztcbmltcG9ydCB7IG5nYlJ1blRyYW5zaXRpb24gfSBmcm9tICcuLi91dGlsL3RyYW5zaXRpb24vbmdiVHJhbnNpdGlvbic7XG5pbXBvcnQgeyBuZ2JDb2xsYXBzaW5nVHJhbnNpdGlvbiB9IGZyb20gJy4uL3V0aWwvdHJhbnNpdGlvbi9uZ2JDb2xsYXBzZVRyYW5zaXRpb24nO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5nRm9yLCBOZ0lmLCBOZ1RlbXBsYXRlT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxubGV0IG5leHRJZCA9IDA7XG5cbi8qKlxuICogVGhlIGNvbnRleHQgZm9yIHRoZSBbTmdiUGFuZWxIZWFkZXJdKCMvY29tcG9uZW50cy9hY2NvcmRpb24vYXBpI05nYlBhbmVsSGVhZGVyKSB0ZW1wbGF0ZVxuICpcbiAqIEBzaW5jZSA0LjEuMFxuICogQGRlcHJlY2F0ZWQgMTQuMS4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiUGFuZWxIZWFkZXJDb250ZXh0IHtcblx0LyoqXG5cdCAqIGBUcnVlYCBpZiBjdXJyZW50IHBhbmVsIGlzIG9wZW5lZFxuXHQgKi9cblx0b3BlbmVkOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgd3JhcHMgYW4gYWNjb3JkaW9uIHBhbmVsIGhlYWRlciB3aXRoIGFueSBIVE1MIG1hcmt1cCBhbmQgYSB0b2dnbGluZyBidXR0b25cbiAqIG1hcmtlZCB3aXRoIFtgTmdiUGFuZWxUb2dnbGVgXSgjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FwaSNOZ2JQYW5lbFRvZ2dsZSkuXG4gKiBTZWUgdGhlIFtoZWFkZXIgY3VzdG9taXphdGlvbiBkZW1vXSgjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2V4YW1wbGVzI2hlYWRlcikgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3UgY2FuIGFsc28gdXNlIFtgTmdiUGFuZWxUaXRsZWBdKCMvY29tcG9uZW50cy9hY2NvcmRpb24vYXBpI05nYlBhbmVsVGl0bGUpIHRvIGN1c3RvbWl6ZSBvbmx5IHRoZSBwYW5lbCB0aXRsZS5cbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqIEBkZXByZWNhdGVkIDE0LjEuMFxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYW5lbEhlYWRlcl0nLCBzdGFuZGFsb25lOiB0cnVlIH0pXG5leHBvcnQgY2xhc3MgTmdiUGFuZWxIZWFkZXIge1xuXHRjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCB3cmFwcyBvbmx5IHRoZSBwYW5lbCB0aXRsZSB3aXRoIEhUTUwgbWFya3VwIGluc2lkZS5cbiAqXG4gKiBZb3UgY2FuIGFsc28gdXNlIFtgTmdiUGFuZWxIZWFkZXJgXSgjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FwaSNOZ2JQYW5lbEhlYWRlcikgdG8gY3VzdG9taXplIHRoZSBmdWxsIHBhbmVsIGhlYWRlci5cbiAqXG4gKiBAZGVwcmVjYXRlZCAxNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFuZWxUaXRsZV0nLCBzdGFuZGFsb25lOiB0cnVlIH0pXG5leHBvcnQgY2xhc3MgTmdiUGFuZWxUaXRsZSB7XG5cdGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHdyYXBzIHRoZSBhY2NvcmRpb24gcGFuZWwgY29udGVudC5cbiAqXG4gKiBAZGVwcmVjYXRlZCAxNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFuZWxDb250ZW50XScsIHN0YW5kYWxvbmU6IHRydWUgfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYW5lbENvbnRlbnQge1xuXHRjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCB3cmFwcyBhbiBpbmRpdmlkdWFsIGFjY29yZGlvbiBwYW5lbCB3aXRoIHRpdGxlIGFuZCBjb2xsYXBzaWJsZSBjb250ZW50LlxuICpcbiAqIEBkZXByZWNhdGVkIDE0LjEuMFxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZ2ItcGFuZWwnLCBzdGFuZGFsb25lOiB0cnVlIH0pXG5leHBvcnQgY2xhc3MgTmdiUGFuZWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkIHtcblx0LyoqXG5cdCAqICBJZiBgdHJ1ZWAsIHRoZSBwYW5lbCBpcyBkaXNhYmxlZCBhbiBjYW4ndCBiZSB0b2dnbGVkLlxuXHQgKi9cblx0QElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuXHQvKipcblx0ICogIEFuIG9wdGlvbmFsIGlkIGZvciB0aGUgcGFuZWwgdGhhdCBtdXN0IGJlIHVuaXF1ZSBvbiB0aGUgcGFnZS5cblx0ICpcblx0ICogIElmIG5vdCBwcm92aWRlZCwgaXQgd2lsbCBiZSBhdXRvLWdlbmVyYXRlZCBpbiB0aGUgYG5nYi1wYW5lbC14eHhgIGZvcm1hdC5cblx0ICovXG5cdEBJbnB1dCgpIGlkID0gYG5nYi1wYW5lbC0ke25leHRJZCsrfWA7XG5cblx0aXNPcGVuID0gZmFsc2U7XG5cblx0LyogQSBmbGFnIHRvIHNwZWNpZmllZCB0aGF0IHRoZSB0cmFuc2l0aW9uIHBhbmVsIGNsYXNzZXMgaGF2ZSBiZWVuIGluaXRpYWxpemVkICovXG5cdGluaXRDbGFzc0RvbmUgPSBmYWxzZTtcblxuXHQvKiBBIGZsYWcgdG8gc3BlY2lmaWVkIGlmIHRoZSBwYW5lbCBpcyBjdXJyZW50bHkgYmVpbmcgYW5pbWF0ZWQsIHRvIGVuc3VyZSBpdHMgcHJlc2VuY2UgaW4gdGhlIGRvbSAqL1xuXHR0cmFuc2l0aW9uUnVubmluZyA9IGZhbHNlO1xuXG5cdC8qKlxuXHQgKiAgVGhlIHBhbmVsIHRpdGxlLlxuXHQgKlxuXHQgKiAgWW91IGNhbiBhbHRlcm5hdGl2ZWx5IHVzZSBbYE5nYlBhbmVsVGl0bGVgXSgjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FwaSNOZ2JQYW5lbFRpdGxlKSB0byBzZXQgcGFuZWwgdGl0bGUuXG5cdCAqL1xuXHRASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUeXBlIG9mIHRoZSBjdXJyZW50IHBhbmVsLlxuXHQgKlxuXHQgKiBCb290c3RyYXAgcHJvdmlkZXMgc3R5bGVzIGZvciB0aGUgZm9sbG93aW5nIHR5cGVzOiBgJ3N1Y2Nlc3MnYCwgYCdpbmZvJ2AsIGAnd2FybmluZydgLCBgJ2RhbmdlcidgLCBgJ3ByaW1hcnknYCxcblx0ICogYCdzZWNvbmRhcnknYCwgYCdsaWdodCdgIGFuZCBgJ2RhcmsnYC5cblx0ICovXG5cdEBJbnB1dCgpIHR5cGU6IHN0cmluZztcblxuXHQvKipcblx0ICogQW4gb3B0aW9uYWwgY2xhc3MgYXBwbGllZCB0byB0aGUgYWNjb3JkaW9uIGNhcmQgZWxlbWVudCB0aGF0IHdyYXBzIGJvdGggcGFuZWwgdGl0bGUgYW5kIGNvbnRlbnQuXG5cdCAqXG5cdCAqIEBzaW5jZSA1LjMuMFxuXHQgKi9cblx0QElucHV0KCkgY2FyZENsYXNzOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgcGFuZWwgaXMgc2hvd24sIGFmdGVyIHRoZSB0cmFuc2l0aW9uLiBJdCBoYXMgbm8gcGF5bG9hZC5cblx0ICpcblx0ICogQHNpbmNlIDguMC4wXG5cdCAqL1xuXHRAT3V0cHV0KCkgc2hvd24gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cblx0LyoqXG5cdCAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgcGFuZWwgaXMgaGlkZGVuLCBhZnRlciB0aGUgdHJhbnNpdGlvbi4gSXQgaGFzIG5vIHBheWxvYWQuXG5cdCAqXG5cdCAqIEBzaW5jZSA4LjAuMFxuXHQgKi9cblx0QE91dHB1dCgpIGhpZGRlbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuXHR0aXRsZVRwbD86IE5nYlBhbmVsVGl0bGU7XG5cdGhlYWRlclRwbD86IE5nYlBhbmVsSGVhZGVyO1xuXHRjb250ZW50VHBsPzogTmdiUGFuZWxDb250ZW50O1xuXHRwYW5lbERpdjogSFRNTEVsZW1lbnQgfCBudWxsO1xuXG5cdEBDb250ZW50Q2hpbGRyZW4oTmdiUGFuZWxUaXRsZSwgeyBkZXNjZW5kYW50czogZmFsc2UgfSkgdGl0bGVUcGxzOiBRdWVyeUxpc3Q8TmdiUGFuZWxUaXRsZT47XG5cdEBDb250ZW50Q2hpbGRyZW4oTmdiUGFuZWxIZWFkZXIsIHsgZGVzY2VuZGFudHM6IGZhbHNlIH0pIGhlYWRlclRwbHM6IFF1ZXJ5TGlzdDxOZ2JQYW5lbEhlYWRlcj47XG5cdEBDb250ZW50Q2hpbGRyZW4oTmdiUGFuZWxDb250ZW50LCB7IGRlc2NlbmRhbnRzOiBmYWxzZSB9KSBjb250ZW50VHBsczogUXVlcnlMaXN0PE5nYlBhbmVsQ29udGVudD47XG5cblx0bmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuXHRcdC8vIFdlIGFyZSB1c2luZyBAQ29udGVudENoaWxkcmVuIGluc3RlYWQgb2YgQENvbnRlbnRDaGlsZCBhcyBpbiB0aGUgQW5ndWxhciB2ZXJzaW9uIGJlaW5nIHVzZWRcblx0XHQvLyBvbmx5IEBDb250ZW50Q2hpbGRyZW4gYWxsb3dzIHVzIHRvIHNwZWNpZnkgdGhlIHtkZXNjZW5kYW50czogZmFsc2V9IG9wdGlvbi5cblx0XHQvLyBXaXRob3V0IHtkZXNjZW5kYW50czogZmFsc2V9IHdlIGFyZSBoaXR0aW5nIGJ1Z3MgZGVzY3JpYmVkIGluOlxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2lzc3Vlcy8yMjQwXG5cdFx0dGhpcy50aXRsZVRwbCA9IHRoaXMudGl0bGVUcGxzLmZpcnN0O1xuXHRcdHRoaXMuaGVhZGVyVHBsID0gdGhpcy5oZWFkZXJUcGxzLmZpcnN0O1xuXHRcdHRoaXMuY29udGVudFRwbCA9IHRoaXMuY29udGVudFRwbHMuZmlyc3Q7XG5cdH1cbn1cblxuLyoqXG4gKiBBbiBldmVudCBlbWl0dGVkIHJpZ2h0IGJlZm9yZSB0b2dnbGluZyBhbiBhY2NvcmRpb24gcGFuZWwuXG4gKlxuICogQGRlcHJlY2F0ZWQgMTQuMS4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiUGFuZWxDaGFuZ2VFdmVudCB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIGFjY29yZGlvbiBwYW5lbCBiZWluZyB0b2dnbGVkLlxuXHQgKi9cblx0cGFuZWxJZDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgbmV4dCBzdGF0ZSBvZiB0aGUgcGFuZWwuXG5cdCAqXG5cdCAqIGB0cnVlYCBpZiBpdCB3aWxsIGJlIG9wZW5lZCwgYGZhbHNlYCBpZiBjbG9zZWQuXG5cdCAqL1xuXHRuZXh0U3RhdGU6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIENhbGxpbmcgdGhpcyBmdW5jdGlvbiB3aWxsIHByZXZlbnQgcGFuZWwgdG9nZ2xpbmcuXG5cdCAqL1xuXHRwcmV2ZW50RGVmYXVsdDogKCkgPT4gdm9pZDtcbn1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25nYlJlZl0nLCBzdGFuZGFsb25lOiB0cnVlIH0pXG5leHBvcnQgY2xhc3MgTmdiUmVmRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXHRAT3V0cHV0KCkgbmdiUmVmID0gbmV3IEV2ZW50RW1pdHRlcjxIVE1MRWxlbWVudCB8IG51bGw+KCk7XG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgX0VsOiBFbGVtZW50UmVmKSB7fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMubmdiUmVmLmVtaXQodGhpcy5fRWwubmF0aXZlRWxlbWVudCk7XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHR0aGlzLm5nYlJlZi5lbWl0KG51bGwpO1xuXHR9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdG8gcHV0IG9uIGEgYnV0dG9uIHRoYXQgdG9nZ2xlcyBwYW5lbCBvcGVuaW5nIGFuZCBjbG9zaW5nLlxuICpcbiAqIFRvIGJlIHVzZWQgaW5zaWRlIHRoZSBbYE5nYlBhbmVsSGVhZGVyYF0oIy9jb21wb25lbnRzL2FjY29yZGlvbi9hcGkjTmdiUGFuZWxIZWFkZXIpXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKiBAZGVwcmVjYXRlZCAxNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiAnYnV0dG9uW25nYlBhbmVsVG9nZ2xlXScsXG5cdHN0YW5kYWxvbmU6IHRydWUsXG5cdGhvc3Q6IHtcblx0XHR0eXBlOiAnYnV0dG9uJyxcblx0XHQnW2Rpc2FibGVkXSc6ICdwYW5lbC5kaXNhYmxlZCcsXG5cdFx0J1tjbGFzcy5jb2xsYXBzZWRdJzogJyFwYW5lbC5pc09wZW4nLFxuXHRcdCdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdwYW5lbC5pc09wZW4nLFxuXHRcdCdbYXR0ci5hcmlhLWNvbnRyb2xzXSc6ICdwYW5lbC5pZCcsXG5cdFx0JyhjbGljayknOiAnYWNjb3JkaW9uLnRvZ2dsZShwYW5lbC5pZCknLFxuXHR9LFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JQYW5lbFRvZ2dsZSB7XG5cdHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uZ2JQYW5lbFRvZ2dsZTogTmdiUGFuZWwgfCAnJztcblxuXHRASW5wdXQoKVxuXHRzZXQgbmdiUGFuZWxUb2dnbGUocGFuZWw6IE5nYlBhbmVsKSB7XG5cdFx0aWYgKHBhbmVsKSB7XG5cdFx0XHR0aGlzLnBhbmVsID0gcGFuZWw7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0QEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYkFjY29yZGlvbikpIHB1YmxpYyBhY2NvcmRpb246IE5nYkFjY29yZGlvbixcblx0XHRAT3B0aW9uYWwoKSBASG9zdCgpIHB1YmxpYyBwYW5lbDogTmdiUGFuZWwsXG5cdCkge31cbn1cblxuLyoqXG4gKiBBY2NvcmRpb24gaXMgYSBjb2xsZWN0aW9uIG9mIGNvbGxhcHNpYmxlIHBhbmVscyAoYm9vdHN0cmFwIGNhcmRzKS5cbiAqXG4gKiBJdCBjYW4gZW5zdXJlIG9ubHkgb25lIHBhbmVsIGlzIG9wZW5lZCBhdCBhIHRpbWUgYW5kIGFsbG93cyB0byBjdXN0b21pemUgcGFuZWxcbiAqIGhlYWRlcnMuXG4gKlxuICogQGRlcHJlY2F0ZWQgMTQuMS4wXG4gKi9cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ25nYi1hY2NvcmRpb24nLFxuXHRleHBvcnRBczogJ25nYkFjY29yZGlvbicsXG5cdHN0YW5kYWxvbmU6IHRydWUsXG5cdGltcG9ydHM6IFtOZ0ZvciwgTmdUZW1wbGF0ZU91dGxldCwgTmdiUGFuZWxUb2dnbGUsIE5nYlJlZkRpcmVjdGl2ZSwgTmdiUGFuZWxIZWFkZXIsIE5nSWZdLFxuXHRlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuXHRob3N0OiB7IGNsYXNzOiAnYWNjb3JkaW9uJywgcm9sZTogJ3RhYmxpc3QnLCAnW2F0dHIuYXJpYS1tdWx0aXNlbGVjdGFibGVdJzogJyFjbG9zZU90aGVyUGFuZWxzJyB9LFxuXHR0ZW1wbGF0ZTogYFxuXHRcdDxuZy10ZW1wbGF0ZSAjdCBuZ2JQYW5lbEhlYWRlciBsZXQtcGFuZWw+XG5cdFx0XHQ8YnV0dG9uIGNsYXNzPVwiYWNjb3JkaW9uLWJ1dHRvblwiIFtuZ2JQYW5lbFRvZ2dsZV09XCJwYW5lbFwiPlxuXHRcdFx0XHR7eyBwYW5lbC50aXRsZSB9fVxuXHRcdFx0XHQ8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwicGFuZWwudGl0bGVUcGw/LnRlbXBsYXRlUmVmXCI+PC9uZy10ZW1wbGF0ZT5cblx0XHRcdDwvYnV0dG9uPlxuXHRcdDwvbmctdGVtcGxhdGU+XG5cdFx0PG5nLXRlbXBsYXRlIG5nRm9yIGxldC1wYW5lbCBbbmdGb3JPZl09XCJwYW5lbHNcIj5cblx0XHRcdDxkaXYgW2NsYXNzXT1cIidhY2NvcmRpb24taXRlbSAnICsgKHBhbmVsLmNhcmRDbGFzcyB8fCAnJylcIj5cblx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdHJvbGU9XCJ0YWJcIlxuXHRcdFx0XHRcdGlkPVwie3sgcGFuZWwuaWQgfX0taGVhZGVyXCJcblx0XHRcdFx0XHRbY2xhc3NdPVwiJ2FjY29yZGlvbi1oZWFkZXIgJyArIChwYW5lbC50eXBlID8gJ2JnLScgKyBwYW5lbC50eXBlIDogdHlwZSA/ICdiZy0nICsgdHlwZSA6ICcnKVwiXG5cdFx0XHRcdD5cblx0XHRcdFx0XHQ8bmctdGVtcGxhdGVcblx0XHRcdFx0XHRcdFtuZ1RlbXBsYXRlT3V0bGV0XT1cInBhbmVsLmhlYWRlclRwbD8udGVtcGxhdGVSZWYgfHwgdFwiXG5cdFx0XHRcdFx0XHRbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IHBhbmVsLCBvcGVuZWQ6IHBhbmVsLmlzT3BlbiB9XCJcblx0XHRcdFx0XHQ+PC9uZy10ZW1wbGF0ZT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRpZD1cInt7IHBhbmVsLmlkIH19XCJcblx0XHRcdFx0XHQobmdiUmVmKT1cInBhbmVsLnBhbmVsRGl2ID0gJGV2ZW50XCJcblx0XHRcdFx0XHRyb2xlPVwidGFicGFuZWxcIlxuXHRcdFx0XHRcdFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJwYW5lbC5pZCArICctaGVhZGVyJ1wiXG5cdFx0XHRcdFx0Km5nSWY9XCIhZGVzdHJveU9uSGlkZSB8fCBwYW5lbC5pc09wZW4gfHwgcGFuZWwudHJhbnNpdGlvblJ1bm5pbmdcIlxuXHRcdFx0XHQ+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImFjY29yZGlvbi1ib2R5XCI+XG5cdFx0XHRcdFx0XHQ8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwicGFuZWwuY29udGVudFRwbD8udGVtcGxhdGVSZWYgfHwgbnVsbFwiPjwvbmctdGVtcGxhdGU+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9uZy10ZW1wbGF0ZT5cblx0YCxcbn0pXG5leHBvcnQgY2xhc3MgTmdiQWNjb3JkaW9uIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XG5cdEBDb250ZW50Q2hpbGRyZW4oTmdiUGFuZWwpIHBhbmVsczogUXVlcnlMaXN0PE5nYlBhbmVsPjtcblxuXHQvKipcblx0ICogSWYgYHRydWVgLCBhY2NvcmRpb24gd2lsbCBiZSBhbmltYXRlZC5cblx0ICpcblx0ICogQHNpbmNlIDguMC4wXG5cdCAqL1xuXHRASW5wdXQoKSBhbmltYXRpb247XG5cblx0LyoqXG5cdCAqIEFuIGFycmF5IG9yIGNvbW1hIHNlcGFyYXRlZCBzdHJpbmdzIG9mIHBhbmVsIGlkcyB0aGF0IHNob3VsZCBiZSBvcGVuZWQgKippbml0aWFsbHkqKi5cblx0ICpcblx0ICogRm9yIHN1YnNlcXVlbnQgY2hhbmdlcyB1c2UgbWV0aG9kcyBsaWtlIGBleHBhbmQoKWAsIGBjb2xsYXBzZSgpYCwgZXRjLiBhbmRcblx0ICogdGhlIGAocGFuZWxDaGFuZ2UpYCBldmVudC5cblx0ICovXG5cdEBJbnB1dCgpIGFjdGl2ZUlkczogc3RyaW5nIHwgcmVhZG9ubHkgc3RyaW5nW10gPSBbXTtcblxuXHQvKipcblx0ICogIElmIGB0cnVlYCwgb25seSBvbmUgcGFuZWwgY291bGQgYmUgb3BlbmVkIGF0IGEgdGltZS5cblx0ICpcblx0ICogIE9wZW5pbmcgYSBuZXcgcGFuZWwgd2lsbCBjbG9zZSBvdGhlcnMuXG5cdCAqL1xuXHRASW5wdXQoJ2Nsb3NlT3RoZXJzJykgY2xvc2VPdGhlclBhbmVsczogYm9vbGVhbjtcblxuXHQvKipcblx0ICogSWYgYHRydWVgLCBwYW5lbCBjb250ZW50IHdpbGwgYmUgZGV0YWNoZWQgZnJvbSBET00gYW5kIG5vdCBzaW1wbHkgaGlkZGVuIHdoZW4gdGhlIHBhbmVsIGlzIGNvbGxhcHNlZC5cblx0ICovXG5cdEBJbnB1dCgpIGRlc3Ryb3lPbkhpZGUgPSB0cnVlO1xuXG5cdC8qKlxuXHQgKiBUeXBlIG9mIHBhbmVscy5cblx0ICpcblx0ICogQm9vdHN0cmFwIHByb3ZpZGVzIHN0eWxlcyBmb3IgdGhlIGZvbGxvd2luZyB0eXBlczogYCdzdWNjZXNzJ2AsIGAnaW5mbydgLCBgJ3dhcm5pbmcnYCwgYCdkYW5nZXInYCwgYCdwcmltYXJ5J2AsXG5cdCAqIGAnc2Vjb25kYXJ5J2AsIGAnbGlnaHQnYCBhbmQgYCdkYXJrJ2AuXG5cdCAqL1xuXHRASW5wdXQoKSB0eXBlOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIEV2ZW50IGVtaXR0ZWQgcmlnaHQgYmVmb3JlIHRoZSBwYW5lbCB0b2dnbGUgaGFwcGVucy5cblx0ICpcblx0ICogU2VlIFtOZ2JQYW5lbENoYW5nZUV2ZW50XSgjL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FwaSNOZ2JQYW5lbENoYW5nZUV2ZW50KSBmb3IgcGF5bG9hZCBkZXRhaWxzLlxuXHQgKi9cblx0QE91dHB1dCgpIHBhbmVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JQYW5lbENoYW5nZUV2ZW50PigpO1xuXG5cdC8qKlxuXHQgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIGV4cGFuZGluZyBhbmltYXRpb24gaXMgZmluaXNoZWQgb24gdGhlIHBhbmVsLiBUaGUgcGF5bG9hZCBpcyB0aGUgcGFuZWwgaWQuXG5cdCAqXG5cdCAqIEBzaW5jZSA4LjAuMFxuXHQgKi9cblx0QE91dHB1dCgpIHNob3duID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cblx0LyoqXG5cdCAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgY29sbGFwc2luZyBhbmltYXRpb24gaXMgZmluaXNoZWQgb24gdGhlIHBhbmVsLCBhbmQgYmVmb3JlIHRoZSBwYW5lbCBlbGVtZW50IGlzIHJlbW92ZWQuXG5cdCAqIFRoZSBwYXlsb2FkIGlzIHRoZSBwYW5lbCBpZC5cblx0ICpcblx0ICogQHNpbmNlIDguMC4wXG5cdCAqL1xuXHRAT3V0cHV0KCkgaGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cblx0Y29uc3RydWN0b3IoY29uZmlnOiBOZ2JBY2NvcmRpb25Db25maWcsIHByaXZhdGUgX25nWm9uZTogTmdab25lLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcblx0XHR0aGlzLmFuaW1hdGlvbiA9IGNvbmZpZy5hbmltYXRpb247XG5cdFx0dGhpcy50eXBlID0gY29uZmlnLnR5cGU7XG5cdFx0dGhpcy5jbG9zZU90aGVyUGFuZWxzID0gY29uZmlnLmNsb3NlT3RoZXJzO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrcyBpZiBhIHBhbmVsIHdpdGggYSBnaXZlbiBpZCBpcyBleHBhbmRlZC5cblx0ICovXG5cdGlzRXhwYW5kZWQocGFuZWxJZDogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuYWN0aXZlSWRzLmluZGV4T2YocGFuZWxJZCkgPiAtMTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBhbmRzIGEgcGFuZWwgd2l0aCBhIGdpdmVuIGlkLlxuXHQgKlxuXHQgKiBIYXMgbm8gZWZmZWN0IGlmIHRoZSBwYW5lbCBpcyBhbHJlYWR5IGV4cGFuZGVkIG9yIGRpc2FibGVkLlxuXHQgKi9cblx0ZXhwYW5kKHBhbmVsSWQ6IHN0cmluZyk6IHZvaWQge1xuXHRcdHRoaXMuX2NoYW5nZU9wZW5TdGF0ZSh0aGlzLl9maW5kUGFuZWxCeUlkKHBhbmVsSWQpLCB0cnVlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBhbmRzIGFsbCBwYW5lbHMsIGlmIGBbY2xvc2VPdGhlcnNdYCBpcyBgZmFsc2VgLlxuXHQgKlxuXHQgKiBJZiBgW2Nsb3NlT3RoZXJzXWAgaXMgYHRydWVgLCBpdCB3aWxsIGV4cGFuZCB0aGUgZmlyc3QgcGFuZWwsIHVubGVzcyB0aGVyZSBpcyBhbHJlYWR5IGEgcGFuZWwgb3BlbmVkLlxuXHQgKi9cblx0ZXhwYW5kQWxsKCk6IHZvaWQge1xuXHRcdGlmICh0aGlzLmNsb3NlT3RoZXJQYW5lbHMpIHtcblx0XHRcdGlmICh0aGlzLmFjdGl2ZUlkcy5sZW5ndGggPT09IDAgJiYgdGhpcy5wYW5lbHMubGVuZ3RoKSB7XG5cdFx0XHRcdHRoaXMuX2NoYW5nZU9wZW5TdGF0ZSh0aGlzLnBhbmVscy5maXJzdCwgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMucGFuZWxzLmZvckVhY2goKHBhbmVsKSA9PiB0aGlzLl9jaGFuZ2VPcGVuU3RhdGUocGFuZWwsIHRydWUpKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ29sbGFwc2VzIGEgcGFuZWwgd2l0aCB0aGUgZ2l2ZW4gaWQuXG5cdCAqXG5cdCAqIEhhcyBubyBlZmZlY3QgaWYgdGhlIHBhbmVsIGlzIGFscmVhZHkgY29sbGFwc2VkIG9yIGRpc2FibGVkLlxuXHQgKi9cblx0Y29sbGFwc2UocGFuZWxJZDogc3RyaW5nKSB7XG5cdFx0dGhpcy5fY2hhbmdlT3BlblN0YXRlKHRoaXMuX2ZpbmRQYW5lbEJ5SWQocGFuZWxJZCksIGZhbHNlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb2xsYXBzZXMgYWxsIG9wZW5lZCBwYW5lbHMuXG5cdCAqL1xuXHRjb2xsYXBzZUFsbCgpIHtcblx0XHR0aGlzLnBhbmVscy5mb3JFYWNoKChwYW5lbCkgPT4ge1xuXHRcdFx0dGhpcy5fY2hhbmdlT3BlblN0YXRlKHBhbmVsLCBmYWxzZSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogVG9nZ2xlcyBhIHBhbmVsIHdpdGggdGhlIGdpdmVuIGlkLlxuXHQgKlxuXHQgKiBIYXMgbm8gZWZmZWN0IGlmIHRoZSBwYW5lbCBpcyBkaXNhYmxlZC5cblx0ICovXG5cdHRvZ2dsZShwYW5lbElkOiBzdHJpbmcpIHtcblx0XHRjb25zdCBwYW5lbCA9IHRoaXMuX2ZpbmRQYW5lbEJ5SWQocGFuZWxJZCk7XG5cdFx0aWYgKHBhbmVsKSB7XG5cdFx0XHR0aGlzLl9jaGFuZ2VPcGVuU3RhdGUocGFuZWwsICFwYW5lbC5pc09wZW4pO1xuXHRcdH1cblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcblx0XHQvLyBhY3RpdmUgaWQgdXBkYXRlc1xuXHRcdGlmIChpc1N0cmluZyh0aGlzLmFjdGl2ZUlkcykpIHtcblx0XHRcdHRoaXMuYWN0aXZlSWRzID0gdGhpcy5hY3RpdmVJZHMuc3BsaXQoL1xccyosXFxzKi8pO1xuXHRcdH1cblxuXHRcdC8vIHVwZGF0ZSBwYW5lbHMgb3BlbiBzdGF0ZXNcblx0XHR0aGlzLnBhbmVscy5mb3JFYWNoKChwYW5lbCkgPT4ge1xuXHRcdFx0cGFuZWwuaXNPcGVuID0gIXBhbmVsLmRpc2FibGVkICYmIHRoaXMuYWN0aXZlSWRzLmluZGV4T2YocGFuZWwuaWQpID4gLTE7XG5cdFx0fSk7XG5cblx0XHQvLyBjbG9zZU90aGVycyB1cGRhdGVzXG5cdFx0aWYgKHRoaXMuYWN0aXZlSWRzLmxlbmd0aCA+IDEgJiYgdGhpcy5jbG9zZU90aGVyUGFuZWxzKSB7XG5cdFx0XHR0aGlzLl9jbG9zZU90aGVycyh0aGlzLmFjdGl2ZUlkc1swXSwgZmFsc2UpO1xuXHRcdFx0dGhpcy5fdXBkYXRlQWN0aXZlSWRzKCk7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0dXAgdGhlIGluaXRpYWwgY2xhc3NlcyBoZXJlXG5cdFx0dGhpcy5fbmdab25lLm9uU3RhYmxlLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdHRoaXMucGFuZWxzLmZvckVhY2goKHBhbmVsKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHBhbmVsRWxlbWVudCA9IHBhbmVsLnBhbmVsRGl2O1xuXHRcdFx0XHRpZiAocGFuZWxFbGVtZW50KSB7XG5cdFx0XHRcdFx0aWYgKCFwYW5lbC5pbml0Q2xhc3NEb25lKSB7XG5cdFx0XHRcdFx0XHRwYW5lbC5pbml0Q2xhc3NEb25lID0gdHJ1ZTtcblx0XHRcdFx0XHRcdG5nYlJ1blRyYW5zaXRpb24odGhpcy5fbmdab25lLCBwYW5lbEVsZW1lbnQsIG5nYkNvbGxhcHNpbmdUcmFuc2l0aW9uLCB7XG5cdFx0XHRcdFx0XHRcdGFuaW1hdGlvbjogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdHJ1bm5pbmdUcmFuc2l0aW9uOiAnY29udGludWUnLFxuXHRcdFx0XHRcdFx0XHRjb250ZXh0OiB7IGRpcmVjdGlvbjogcGFuZWwuaXNPcGVuID8gJ3Nob3cnIDogJ2hpZGUnLCBkaW1lbnNpb246ICdoZWlnaHQnIH0sXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gQ2xhc3NlcyBtdXN0IGJlIGluaXRpYWxpemVkIG5leHQgdGltZSBpdCB3aWxsIGJlIGluIHRoZSBkb21cblx0XHRcdFx0XHRwYW5lbC5pbml0Q2xhc3NEb25lID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBfY2hhbmdlT3BlblN0YXRlKHBhbmVsOiBOZ2JQYW5lbCB8IG51bGwsIG5leHRTdGF0ZTogYm9vbGVhbikge1xuXHRcdGlmIChwYW5lbCAhPSBudWxsICYmICFwYW5lbC5kaXNhYmxlZCAmJiBwYW5lbC5pc09wZW4gIT09IG5leHRTdGF0ZSkge1xuXHRcdFx0bGV0IGRlZmF1bHRQcmV2ZW50ZWQgPSBmYWxzZTtcblxuXHRcdFx0dGhpcy5wYW5lbENoYW5nZS5lbWl0KHtcblx0XHRcdFx0cGFuZWxJZDogcGFuZWwuaWQsXG5cdFx0XHRcdG5leHRTdGF0ZTogbmV4dFN0YXRlLFxuXHRcdFx0XHRwcmV2ZW50RGVmYXVsdDogKCkgPT4ge1xuXHRcdFx0XHRcdGRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cblx0XHRcdGlmICghZGVmYXVsdFByZXZlbnRlZCkge1xuXHRcdFx0XHRwYW5lbC5pc09wZW4gPSBuZXh0U3RhdGU7XG5cdFx0XHRcdHBhbmVsLnRyYW5zaXRpb25SdW5uaW5nID0gdHJ1ZTtcblxuXHRcdFx0XHRpZiAobmV4dFN0YXRlICYmIHRoaXMuY2xvc2VPdGhlclBhbmVscykge1xuXHRcdFx0XHRcdHRoaXMuX2Nsb3NlT3RoZXJzKHBhbmVsLmlkKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl91cGRhdGVBY3RpdmVJZHMoKTtcblx0XHRcdFx0dGhpcy5fcnVuVHJhbnNpdGlvbnModGhpcy5hbmltYXRpb24pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgX2Nsb3NlT3RoZXJzKHBhbmVsSWQ6IHN0cmluZywgZW5hYmxlVHJhbnNpdGlvbiA9IHRydWUpIHtcblx0XHR0aGlzLnBhbmVscy5mb3JFYWNoKChwYW5lbCkgPT4ge1xuXHRcdFx0aWYgKHBhbmVsLmlkICE9PSBwYW5lbElkICYmIHBhbmVsLmlzT3Blbikge1xuXHRcdFx0XHRwYW5lbC5pc09wZW4gPSBmYWxzZTtcblx0XHRcdFx0cGFuZWwudHJhbnNpdGlvblJ1bm5pbmcgPSBlbmFibGVUcmFuc2l0aW9uO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBfZmluZFBhbmVsQnlJZChwYW5lbElkOiBzdHJpbmcpOiBOZ2JQYW5lbCB8IG51bGwge1xuXHRcdHJldHVybiB0aGlzLnBhbmVscy5maW5kKChwKSA9PiBwLmlkID09PSBwYW5lbElkKSB8fCBudWxsO1xuXHR9XG5cblx0cHJpdmF0ZSBfdXBkYXRlQWN0aXZlSWRzKCkge1xuXHRcdHRoaXMuYWN0aXZlSWRzID0gdGhpcy5wYW5lbHMuZmlsdGVyKChwYW5lbCkgPT4gcGFuZWwuaXNPcGVuICYmICFwYW5lbC5kaXNhYmxlZCkubWFwKChwYW5lbCkgPT4gcGFuZWwuaWQpO1xuXHR9XG5cblx0cHJpdmF0ZSBfcnVuVHJhbnNpdGlvbnMoYW5pbWF0aW9uOiBib29sZWFuKSB7XG5cdFx0Ly8gZGV0ZWN0Q2hhbmdlcyBpcyBwZXJmb3JtZWQgdG8gZW5zdXJlIHRoYXQgYWxsIHBhbmVscyBhcmUgaW4gdGhlIGRvbSAodmlhIHRyYW5zaXRpb25SdW5uaW5nID0gdHJ1ZSlcblx0XHQvLyBiZWZvcmUgc3RhcnRpbmcgdGhlIGFuaW1hdGlvblxuXHRcdHRoaXMuX2NoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcblxuXHRcdHRoaXMucGFuZWxzLmZvckVhY2goKHBhbmVsKSA9PiB7XG5cdFx0XHQvLyBXaGVuIHBhbmVsLnRyYW5zaXRpb25SdW5uaW5nIGlzIHRydWUsIHRoZSB0cmFuc2l0aW9uIG5lZWRzIHRvIGJlIHN0YXJ0ZWQgT1IgcmV2ZXJzZWQsXG5cdFx0XHQvLyBUaGUgZGlyZWN0aW9uIChzaG93IG9yIGhpZGUpIGlzIGNob29zZW4gYnkgZWFjaCBwYW5lbC5pc09wZW4gc3RhdGVcblx0XHRcdGlmIChwYW5lbC50cmFuc2l0aW9uUnVubmluZykge1xuXHRcdFx0XHRjb25zdCBwYW5lbEVsZW1lbnQgPSBwYW5lbC5wYW5lbERpdjtcblx0XHRcdFx0bmdiUnVuVHJhbnNpdGlvbih0aGlzLl9uZ1pvbmUsIHBhbmVsRWxlbWVudCEsIG5nYkNvbGxhcHNpbmdUcmFuc2l0aW9uLCB7XG5cdFx0XHRcdFx0YW5pbWF0aW9uLFxuXHRcdFx0XHRcdHJ1bm5pbmdUcmFuc2l0aW9uOiAnc3RvcCcsXG5cdFx0XHRcdFx0Y29udGV4dDogeyBkaXJlY3Rpb246IHBhbmVsLmlzT3BlbiA/ICdzaG93JyA6ICdoaWRlJywgZGltZW5zaW9uOiAnaGVpZ2h0JyB9LFxuXHRcdFx0XHR9KS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0XHRcdHBhbmVsLnRyYW5zaXRpb25SdW5uaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0Y29uc3QgeyBpZCB9ID0gcGFuZWw7XG5cdFx0XHRcdFx0aWYgKHBhbmVsLmlzT3Blbikge1xuXHRcdFx0XHRcdFx0cGFuZWwuc2hvd24uZW1pdCgpO1xuXHRcdFx0XHRcdFx0dGhpcy5zaG93bi5lbWl0KGlkKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cGFuZWwuaGlkZGVuLmVtaXQoKTtcblx0XHRcdFx0XHRcdHRoaXMuaGlkZGVuLmVtaXQoaWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cbiJdfQ==