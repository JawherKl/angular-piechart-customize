/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
import { Renderer2 } from '@angular/core';
import { Trigger } from './trigger.class';
export type BsEventCallback = (event?: any) => boolean | void;
export interface ListenOptions {
    target?: HTMLElement;
    targets?: HTMLElement[];
    triggers?: string;
    outsideClick?: boolean;
    outsideEsc?: boolean;
    show?: BsEventCallback;
    hide?: BsEventCallback;
    toggle?: BsEventCallback;
}
export declare function parseTriggers(triggers?: string, aliases?: any): Trigger[];
export declare function listenToTriggers(renderer: Renderer2, target: any, triggers: string, showFn: BsEventCallback, hideFn: BsEventCallback, toggleFn: BsEventCallback): () => void;
export declare function listenToTriggersV2(renderer: Renderer2, options: ListenOptions): () => void;
export declare function registerOutsideClick(renderer: Renderer2, options: ListenOptions): Function;
export declare function registerEscClick(renderer: Renderer2, options: ListenOptions): Function;
