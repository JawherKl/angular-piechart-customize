import { OnDestroy, OnInit } from '@angular/core';
import { CarouselComponent } from './carousel.component';
import * as i0 from "@angular/core";
export declare class SlideComponent implements OnInit, OnDestroy {
    /** Is current slide active */
    active: boolean;
    itemWidth: string;
    order: number;
    isAnimated: boolean;
    /** Wraps element by appropriate CSS classes */
    addClass: boolean;
    /** Link to Parent(container-collection) component */
    protected carousel: CarouselComponent;
    multilist: boolean;
    constructor(carousel: CarouselComponent);
    /** Fires changes in container collection after adding a new slide instance */
    ngOnInit(): void;
    /** Fires changes in container collection after removing of this slide instance */
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SlideComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SlideComponent, "slide", never, { "active": { "alias": "active"; "required": false; }; }, {}, never, ["*"], false, never>;
}
