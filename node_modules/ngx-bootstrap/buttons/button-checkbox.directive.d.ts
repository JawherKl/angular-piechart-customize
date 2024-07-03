import { OnInit, Provider } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare const CHECKBOX_CONTROL_VALUE_ACCESSOR: Provider;
type AvailableValues = boolean | string | number;
/**
 * Add checkbox functionality to any element
 */
export declare class ButtonCheckboxDirective implements ControlValueAccessor, OnInit {
    /** Truthy value, will be set to ngModel */
    btnCheckboxTrue: AvailableValues;
    /** Falsy value, will be set to ngModel */
    btnCheckboxFalse: AvailableValues;
    state: boolean;
    protected value?: AvailableValues;
    protected isDisabled: boolean;
    protected onChange: Function;
    protected onTouched: Function;
    onClick(): void;
    ngOnInit(): void;
    protected get trueValue(): AvailableValues;
    protected get falseValue(): AvailableValues;
    toggle(state: boolean): void;
    writeValue(value: boolean | string | null): void;
    setDisabledState(isDisabled: boolean): void;
    registerOnChange(fn: () => void): void;
    registerOnTouched(fn: () => void): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonCheckboxDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ButtonCheckboxDirective, "[btnCheckbox]", never, { "btnCheckboxTrue": { "alias": "btnCheckboxTrue"; "required": false; }; "btnCheckboxFalse": { "alias": "btnCheckboxFalse"; "required": false; }; }, {}, never, never, false, never>;
}
export {};
