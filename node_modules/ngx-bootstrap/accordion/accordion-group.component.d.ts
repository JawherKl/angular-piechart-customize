import { OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { AccordionComponent } from './accordion.component';
import * as i0 from "@angular/core";
/**
 * ### Accordion heading
 * Instead of using `heading` attribute on the `accordion-group`, you can use
 * an `accordion-heading` attribute on `any` element inside of a group that
 * will be used as group's header template.
 */
export declare class AccordionPanelComponent implements OnInit, OnDestroy {
    /** turn on/off animation */
    isAnimated: boolean;
    /** Clickable text in accordion's group header, check `accordion heading` below for using html in header */
    heading: string;
    /** Provides an ability to use Bootstrap's contextual panel classes
     * (`panel-primary`, `panel-success`, `panel-info`, etc...).
     * List of all available classes [available here]
     * (https://getbootstrap.com/docs/3.3/components/#panels-alternatives)
     */
    panelClass: string;
    /** if <code>true</code> — disables accordion group */
    isDisabled: boolean;
    /** Emits when the opened state changes */
    isOpenChange: EventEmitter<boolean>;
    /** Is accordion group open or closed. This property supports two-way binding */
    get isOpen(): boolean;
    set isOpen(value: boolean);
    protected _isOpen: boolean;
    protected accordion: AccordionComponent;
    constructor(accordion: AccordionComponent);
    ngOnInit(): void;
    ngOnDestroy(): void;
    toggleOpen(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccordionPanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AccordionPanelComponent, "accordion-group, accordion-panel", never, { "heading": { "alias": "heading"; "required": false; }; "panelClass": { "alias": "panelClass"; "required": false; }; "isDisabled": { "alias": "isDisabled"; "required": false; }; "isOpen": { "alias": "isOpen"; "required": false; }; }, { "isOpenChange": "isOpenChange"; }, never, ["[accordion-heading]", "*"], false, never>;
}
