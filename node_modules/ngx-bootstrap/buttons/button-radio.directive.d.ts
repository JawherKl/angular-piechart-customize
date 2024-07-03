import { ChangeDetectorRef, ElementRef, OnChanges, Provider, Renderer2, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ButtonRadioGroupDirective } from './button-radio-group.directive';
import * as i0 from "@angular/core";
export declare const RADIO_CONTROL_VALUE_ACCESSOR: Provider;
/**
 * Create radio buttons or groups of buttons.
 * A value of a selected button is bound to a variable specified via ngModel.
 */
export declare class ButtonRadioDirective implements ControlValueAccessor, OnChanges {
    private el;
    private cdr;
    private renderer;
    private group;
    onChange: Function;
    onTouched: Function;
    /** Radio button value, will be set to `ngModel` */
    btnRadio?: unknown;
    /** If `true` — radio button can be unchecked */
    uncheckable: boolean;
    /** Current value of radio component or group */
    get value(): unknown | undefined;
    set value(value: unknown | undefined);
    /** If `true` — radio button is disabled */
    get disabled(): boolean;
    set disabled(disabled: boolean);
    get controlOrGroupDisabled(): true | undefined;
    get hasDisabledClass(): boolean | undefined;
    get isActive(): boolean;
    readonly role: string;
    get tabindex(): undefined | number;
    get hasFocus(): boolean;
    private _value?;
    private _disabled;
    private _hasFocus;
    constructor(el: ElementRef, cdr: ChangeDetectorRef, renderer: Renderer2, group: ButtonRadioGroupDirective);
    toggleIfAllowed(): void;
    onSpacePressed(event: KeyboardEvent): void;
    focus(): void;
    onFocus(): void;
    onBlur(): void;
    canToggle(): boolean;
    ngOnChanges(changes: SimpleChanges): void;
    _onChange(value?: unknown): void;
    writeValue(value: unknown): void;
    registerOnChange(fn: () => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(disabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonRadioDirective, [null, null, null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ButtonRadioDirective, "[btnRadio]", never, { "btnRadio": { "alias": "btnRadio"; "required": false; }; "uncheckable": { "alias": "uncheckable"; "required": false; }; "value": { "alias": "value"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, false, never>;
}
