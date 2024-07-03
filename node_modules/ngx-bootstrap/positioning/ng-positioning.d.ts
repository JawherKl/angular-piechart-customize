/**
 * @copyright Valor Software
 * @copyright Federico Zivolo and contributors
 */
import { Renderer2 } from '@angular/core';
import { Data, Offsets, Options } from './models';
export declare class Positioning {
    position(hostElement: HTMLElement, targetElement: HTMLElement): Offsets | undefined;
    offset(hostElement: HTMLElement, targetElement: HTMLElement): Offsets | undefined;
    positionElements(hostElement: HTMLElement | null, targetElement: HTMLElement | null, position: string, appendToBody?: boolean, options?: Options): Data | undefined;
}
export declare function positionElements(hostElement: HTMLElement | null, targetElement: HTMLElement | null, placement: string, appendToBody?: boolean, options?: Options, renderer?: Renderer2): void;
