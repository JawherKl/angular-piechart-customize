import { Provider, Type } from '@angular/core';
import { ComponentStore } from './component-store';
/**
 * The interface for the lifecycle hook
 * called after the ComponentStore is instantiated.
 */
export interface OnStoreInit {
    readonly ngrxOnStoreInit: () => void;
}
/**
 * The interface for the lifecycle hook
 * called only once after the ComponentStore
 * state is first initialized.
 */
export interface OnStateInit {
    readonly ngrxOnStateInit: () => void;
}
/**
 * Checks to see if the OnInitStore lifecycle hook
 * is defined on the ComponentStore.
 *
 * @param cs ComponentStore type
 * @returns boolean
 */
export declare function isOnStoreInitDefined(cs: unknown): cs is OnStoreInit;
/**
 * Checks to see if the OnInitState lifecycle hook
 * is defined on the ComponentStore.
 *
 * @param cs ComponentStore type
 * @returns boolean
 */
export declare function isOnStateInitDefined(cs: unknown): cs is OnStateInit;
/**
 * @description
 *
 * Function that returns the ComponentStore
 * class registered as a provider,
 * and uses a factory provider to instantiate the
 * ComponentStore and run the lifecycle hooks
 * defined on the ComponentStore.
 *
 * @param componentStoreClass The ComponentStore with lifecycle hooks
 * @returns Provider[]
 *
 * @usageNotes
 *
 * ```ts
 * @Injectable()
 * export class MyStore
 *    extends ComponentStore<{ init: boolean }>
 *    implements OnStoreInit, OnStateInit
 *   {
 *
 *   constructor() {
 *     super({ init: true });
 *   }
 *
 *   ngrxOnStoreInit() {
 *     // runs once after store has been instantiated
 *   }
 *
 *   ngrxOnStateInit() {
 *     // runs once after store state has been initialized
 *   }
 * }
 *
 * @Component({
 *   providers: [
 *     provideComponentStore(MyStore)
 *   ]
 * })
 * export class MyComponent {
 *   constructor(private myStore: MyStore) {}
 * }
 * ```
 */
export declare function provideComponentStore<T extends object>(componentStoreClass: Type<ComponentStore<T>>): Provider[];
