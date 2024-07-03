import { ChangeDetectorRef, EventEmitter, OnInit, Provider, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { RatingResults } from './models';
import { RatingConfig } from './rating.config';
import * as i0 from "@angular/core";
export declare const RATING_CONTROL_VALUE_ACCESSOR: Provider;
export declare class RatingComponent implements ControlValueAccessor, OnInit {
    private changeDetection;
    /** number of icons */
    max: number;
    /** if true will not react on any user events */
    readonly: boolean;
    /** array of icons titles, default: (["one", "two", "three", "four", "five"]) */
    titles: string[];
    /** custom template for icons */
    customTemplate?: TemplateRef<any>;
    /** fired when icon selected, $event:number equals to selected rating */
    onHover: EventEmitter<number>;
    /** fired when icon selected, $event:number equals to previous rating value */
    onLeave: EventEmitter<number>;
    onChange: Function;
    onTouched: Function;
    /** aria label for rating */
    ariaLabel: string;
    range: RatingResults[];
    value: number;
    protected preValue?: number;
    constructor(changeDetection: ChangeDetectorRef, config: RatingConfig);
    onKeydown(event: KeyboardEvent): void;
    ngOnInit(): void;
    writeValue(value: number): void;
    enter(value: number): void;
    reset(): void;
    registerOnChange(fn: (_: number) => void): void;
    registerOnTouched(fn: () => void): void;
    rate(value: number): void;
    protected buildTemplateObjects(max: number): RatingResults[];
    static ɵfac: i0.ɵɵFactoryDeclaration<RatingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RatingComponent, "rating", never, { "max": { "alias": "max"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "titles": { "alias": "titles"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, { "onHover": "onHover"; "onLeave": "onLeave"; }, never, never, false, never>;
}
