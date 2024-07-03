import { ChangeDetectorRef, Provider, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ButtonRadioDirective } from './button-radio.directive';
import * as i0 from "@angular/core";
export declare const RADIO_CONTROL_VALUE_ACCESSOR: Provider;
/**
 * A group of radio buttons.
 * A value of a selected button is bound to a variable specified via ngModel.
 */
export declare class ButtonRadioGroupDirective implements ControlValueAccessor {
    private cdr;
    onChange: Function;
    onTouched: Function;
    readonly role: string;
    radioButtons?: QueryList<ButtonRadioDirective>;
    constructor(cdr: ChangeDetectorRef);
    private _value?;
    get value(): unknown | undefined;
    set value(value: unknown | undefined);
    private _disabled;
    get disabled(): boolean;
    get tabindex(): null | number;
    writeValue(value?: string): void;
    registerOnChange(fn: () => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(disabled: boolean): void;
    onFocus(): void;
    onBlur(): void;
    selectNext(event: KeyboardEvent): void;
    selectPrevious(event: KeyboardEvent): void;
    private selectInDirection;
    private getActiveOrFocusedRadio;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonRadioGroupDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ButtonRadioGroupDirective, "[btnRadioGroup]", never, {}, {}, ["radioButtons"], never, false, never>;
}
