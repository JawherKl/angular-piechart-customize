import { AccordionPanelComponent } from './accordion-group.component';
import { AccordionConfig } from './accordion.config';
import * as i0 from "@angular/core";
/** Displays collapsible content panels for presenting information in a limited amount of space. */
export declare class AccordionComponent {
    /** turn on/off animation */
    isAnimated: boolean;
    /** if `true` expanding one item will close all others */
    closeOthers: boolean;
    protected groups: AccordionPanelComponent[];
    constructor(config: AccordionConfig);
    closeOtherPanels(openGroup: AccordionPanelComponent): void;
    addGroup(group: AccordionPanelComponent): void;
    removeGroup(group: AccordionPanelComponent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccordionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AccordionComponent, "accordion", never, { "isAnimated": { "alias": "isAnimated"; "required": false; }; "closeOthers": { "alias": "closeOthers"; "required": false; }; }, {}, never, ["*"], false, never>;
}
