import { InjectionToken, inject } from '@angular/core';
import { take } from 'rxjs/operators';
/**
 * Checks to see if the OnInitStore lifecycle hook
 * is defined on the ComponentStore.
 *
 * @param cs ComponentStore type
 * @returns boolean
 */
export function isOnStoreInitDefined(cs) {
    return typeof cs.ngrxOnStoreInit === 'function';
}
/**
 * Checks to see if the OnInitState lifecycle hook
 * is defined on the ComponentStore.
 *
 * @param cs ComponentStore type
 * @returns boolean
 */
export function isOnStateInitDefined(cs) {
    return typeof cs.ngrxOnStateInit === 'function';
}
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
export function provideComponentStore(componentStoreClass) {
    const CS_WITH_HOOKS = new InjectionToken('@ngrx/component-store ComponentStore with Hooks');
    return [
        { provide: CS_WITH_HOOKS, useClass: componentStoreClass },
        {
            provide: componentStoreClass,
            useFactory: () => {
                const componentStore = inject(CS_WITH_HOOKS);
                // Set private property that CS has been provided with lifecycle hooks
                componentStore['ɵhasProvider'] = true;
                if (isOnStoreInitDefined(componentStore)) {
                    componentStore.ngrxOnStoreInit();
                }
                if (isOnStateInitDefined(componentStore)) {
                    componentStore.state$
                        .pipe(take(1))
                        .subscribe(() => componentStore.ngrxOnStateInit());
                }
                return componentStore;
            },
        },
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlmZWN5Y2xlX2hvb2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnQtc3RvcmUvc3JjL2xpZmVjeWNsZV9ob29rcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVksY0FBYyxFQUFRLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFvQnRDOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxFQUFXO0lBQzlDLE9BQU8sT0FBUSxFQUFrQixDQUFDLGVBQWUsS0FBSyxVQUFVLENBQUM7QUFDbkUsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxFQUFXO0lBQzlDLE9BQU8sT0FBUSxFQUFrQixDQUFDLGVBQWUsS0FBSyxVQUFVLENBQUM7QUFDbkUsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkNHO0FBQ0gsTUFBTSxVQUFVLHFCQUFxQixDQUNuQyxtQkFBNEM7SUFFNUMsTUFBTSxhQUFhLEdBQUcsSUFBSSxjQUFjLENBQ3RDLGlEQUFpRCxDQUNsRCxDQUFDO0lBRUYsT0FBTztRQUNMLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7UUFDekQ7WUFDRSxPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLFVBQVUsRUFBRSxHQUFHLEVBQUU7Z0JBQ2YsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUU3QyxzRUFBc0U7Z0JBQ3RFLGNBQWMsQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBRXRDLElBQUksb0JBQW9CLENBQUMsY0FBYyxDQUFDLEVBQUU7b0JBQ3hDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztpQkFDbEM7Z0JBRUQsSUFBSSxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsRUFBRTtvQkFDeEMsY0FBYyxDQUFDLE1BQU07eUJBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQ2IsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO2lCQUN0RDtnQkFFRCxPQUFPLGNBQWMsQ0FBQztZQUN4QixDQUFDO1NBQ0Y7S0FDRixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3ZpZGVyLCBJbmplY3Rpb25Ub2tlbiwgVHlwZSwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ29tcG9uZW50U3RvcmUgfSBmcm9tICcuL2NvbXBvbmVudC1zdG9yZSc7XG5cbi8qKlxuICogVGhlIGludGVyZmFjZSBmb3IgdGhlIGxpZmVjeWNsZSBob29rXG4gKiBjYWxsZWQgYWZ0ZXIgdGhlIENvbXBvbmVudFN0b3JlIGlzIGluc3RhbnRpYXRlZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBPblN0b3JlSW5pdCB7XG4gIHJlYWRvbmx5IG5ncnhPblN0b3JlSW5pdDogKCkgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBUaGUgaW50ZXJmYWNlIGZvciB0aGUgbGlmZWN5Y2xlIGhvb2tcbiAqIGNhbGxlZCBvbmx5IG9uY2UgYWZ0ZXIgdGhlIENvbXBvbmVudFN0b3JlXG4gKiBzdGF0ZSBpcyBmaXJzdCBpbml0aWFsaXplZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBPblN0YXRlSW5pdCB7XG4gIHJlYWRvbmx5IG5ncnhPblN0YXRlSW5pdDogKCkgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBPbkluaXRTdG9yZSBsaWZlY3ljbGUgaG9va1xuICogaXMgZGVmaW5lZCBvbiB0aGUgQ29tcG9uZW50U3RvcmUuXG4gKlxuICogQHBhcmFtIGNzIENvbXBvbmVudFN0b3JlIHR5cGVcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT25TdG9yZUluaXREZWZpbmVkKGNzOiB1bmtub3duKTogY3MgaXMgT25TdG9yZUluaXQge1xuICByZXR1cm4gdHlwZW9mIChjcyBhcyBPblN0b3JlSW5pdCkubmdyeE9uU3RvcmVJbml0ID09PSAnZnVuY3Rpb24nO1xufVxuXG4vKipcbiAqIENoZWNrcyB0byBzZWUgaWYgdGhlIE9uSW5pdFN0YXRlIGxpZmVjeWNsZSBob29rXG4gKiBpcyBkZWZpbmVkIG9uIHRoZSBDb21wb25lbnRTdG9yZS5cbiAqXG4gKiBAcGFyYW0gY3MgQ29tcG9uZW50U3RvcmUgdHlwZVxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPblN0YXRlSW5pdERlZmluZWQoY3M6IHVua25vd24pOiBjcyBpcyBPblN0YXRlSW5pdCB7XG4gIHJldHVybiB0eXBlb2YgKGNzIGFzIE9uU3RhdGVJbml0KS5uZ3J4T25TdGF0ZUluaXQgPT09ICdmdW5jdGlvbic7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBDb21wb25lbnRTdG9yZVxuICogY2xhc3MgcmVnaXN0ZXJlZCBhcyBhIHByb3ZpZGVyLFxuICogYW5kIHVzZXMgYSBmYWN0b3J5IHByb3ZpZGVyIHRvIGluc3RhbnRpYXRlIHRoZVxuICogQ29tcG9uZW50U3RvcmUgYW5kIHJ1biB0aGUgbGlmZWN5Y2xlIGhvb2tzXG4gKiBkZWZpbmVkIG9uIHRoZSBDb21wb25lbnRTdG9yZS5cbiAqXG4gKiBAcGFyYW0gY29tcG9uZW50U3RvcmVDbGFzcyBUaGUgQ29tcG9uZW50U3RvcmUgd2l0aCBsaWZlY3ljbGUgaG9va3NcbiAqIEByZXR1cm5zIFByb3ZpZGVyW11cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIGBgYHRzXG4gKiBASW5qZWN0YWJsZSgpXG4gKiBleHBvcnQgY2xhc3MgTXlTdG9yZVxuICogICAgZXh0ZW5kcyBDb21wb25lbnRTdG9yZTx7IGluaXQ6IGJvb2xlYW4gfT5cbiAqICAgIGltcGxlbWVudHMgT25TdG9yZUluaXQsIE9uU3RhdGVJbml0XG4gKiAgIHtcbiAqXG4gKiAgIGNvbnN0cnVjdG9yKCkge1xuICogICAgIHN1cGVyKHsgaW5pdDogdHJ1ZSB9KTtcbiAqICAgfVxuICpcbiAqICAgbmdyeE9uU3RvcmVJbml0KCkge1xuICogICAgIC8vIHJ1bnMgb25jZSBhZnRlciBzdG9yZSBoYXMgYmVlbiBpbnN0YW50aWF0ZWRcbiAqICAgfVxuICpcbiAqICAgbmdyeE9uU3RhdGVJbml0KCkge1xuICogICAgIC8vIHJ1bnMgb25jZSBhZnRlciBzdG9yZSBzdGF0ZSBoYXMgYmVlbiBpbml0aWFsaXplZFxuICogICB9XG4gKiB9XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgIHByb3ZpZGVyczogW1xuICogICAgIHByb3ZpZGVDb21wb25lbnRTdG9yZShNeVN0b3JlKVxuICogICBdXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIE15Q29tcG9uZW50IHtcbiAqICAgY29uc3RydWN0b3IocHJpdmF0ZSBteVN0b3JlOiBNeVN0b3JlKSB7fVxuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlQ29tcG9uZW50U3RvcmU8VCBleHRlbmRzIG9iamVjdD4oXG4gIGNvbXBvbmVudFN0b3JlQ2xhc3M6IFR5cGU8Q29tcG9uZW50U3RvcmU8VD4+XG4pOiBQcm92aWRlcltdIHtcbiAgY29uc3QgQ1NfV0lUSF9IT09LUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxDb21wb25lbnRTdG9yZTxUPj4oXG4gICAgJ0BuZ3J4L2NvbXBvbmVudC1zdG9yZSBDb21wb25lbnRTdG9yZSB3aXRoIEhvb2tzJ1xuICApO1xuXG4gIHJldHVybiBbXG4gICAgeyBwcm92aWRlOiBDU19XSVRIX0hPT0tTLCB1c2VDbGFzczogY29tcG9uZW50U3RvcmVDbGFzcyB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IGNvbXBvbmVudFN0b3JlQ2xhc3MsXG4gICAgICB1c2VGYWN0b3J5OiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFN0b3JlID0gaW5qZWN0KENTX1dJVEhfSE9PS1MpO1xuXG4gICAgICAgIC8vIFNldCBwcml2YXRlIHByb3BlcnR5IHRoYXQgQ1MgaGFzIGJlZW4gcHJvdmlkZWQgd2l0aCBsaWZlY3ljbGUgaG9va3NcbiAgICAgICAgY29tcG9uZW50U3RvcmVbJ8m1aGFzUHJvdmlkZXInXSA9IHRydWU7XG5cbiAgICAgICAgaWYgKGlzT25TdG9yZUluaXREZWZpbmVkKGNvbXBvbmVudFN0b3JlKSkge1xuICAgICAgICAgIGNvbXBvbmVudFN0b3JlLm5ncnhPblN0b3JlSW5pdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzT25TdGF0ZUluaXREZWZpbmVkKGNvbXBvbmVudFN0b3JlKSkge1xuICAgICAgICAgIGNvbXBvbmVudFN0b3JlLnN0YXRlJFxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gY29tcG9uZW50U3RvcmUubmdyeE9uU3RhdGVJbml0KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFN0b3JlO1xuICAgICAgfSxcbiAgICB9LFxuICBdO1xufVxuIl19