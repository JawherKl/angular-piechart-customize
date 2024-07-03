import { Actions } from '@ngrx/effects';
import { defer } from 'rxjs';
/**
 * @description
 * Creates mock actions provider.
 *
 * @param factoryOrSource Actions' source or source creation function
 *
 * @usageNotes
 *
 * **With `TestBed.configureTestingModule`**
 *
 * ```ts
 * describe('Books Effects', () => {
 *   let actions$ = new Observable<Action>();
 *   let effects: BooksEffects;
 *
 *   beforeEach(() => {
 *     TestBed.configureTestingModule({
 *       providers: [
 *         provideMockActions(() => actions$),
 *         BooksEffects,
 *       ],
 *     });
 *
 *     actions$ = TestBed.inject(Actions);
 *     effects = TestBed.inject(BooksEffects);
 *   });
 * });
 * ```
 *
 * **With `Injector.create`**
 *
 * ```ts
 * describe('Counter Effects', () => {
 *   let injector: Injector;
 *   let actions$ = new Observable<Action>();
 *   let effects: CounterEffects;
 *
 *   beforeEach(() => {
 *     injector = Injector.create({
 *       providers: [
 *         provideMockActions(() => actions$),
 *         CounterEffects,
 *       ],
 *     });
 *
 *     actions$ = injector.get(Actions);
 *     effects = injector.get(CounterEffects);
 *   });
 * });
 * ```
 */
export function provideMockActions(factoryOrSource) {
    return {
        provide: Actions,
        useFactory: () => {
            if (typeof factoryOrSource === 'function') {
                return new Actions(defer(factoryOrSource));
            }
            return new Actions(factoryOrSource);
        },
        deps: [],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy90ZXN0aW5nL3NyYy90ZXN0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFFLEtBQUssRUFBYyxNQUFNLE1BQU0sQ0FBQztBQU16Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrREc7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQ2hDLGVBQTBEO0lBRTFELE9BQU87UUFDTCxPQUFPLEVBQUUsT0FBTztRQUNoQixVQUFVLEVBQUUsR0FBb0IsRUFBRTtZQUNoQyxJQUFJLE9BQU8sZUFBZSxLQUFLLFVBQVUsRUFBRTtnQkFDekMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQzthQUM1QztZQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUNELElBQUksRUFBRSxFQUFFO0tBQ1QsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGYWN0b3J5UHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbnMgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IGRlZmVyLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlTW9ja0FjdGlvbnMoc291cmNlOiBPYnNlcnZhYmxlPGFueT4pOiBGYWN0b3J5UHJvdmlkZXI7XG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZU1vY2tBY3Rpb25zKFxuICBmYWN0b3J5OiAoKSA9PiBPYnNlcnZhYmxlPGFueT5cbik6IEZhY3RvcnlQcm92aWRlcjtcbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDcmVhdGVzIG1vY2sgYWN0aW9ucyBwcm92aWRlci5cbiAqXG4gKiBAcGFyYW0gZmFjdG9yeU9yU291cmNlIEFjdGlvbnMnIHNvdXJjZSBvciBzb3VyY2UgY3JlYXRpb24gZnVuY3Rpb25cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqICoqV2l0aCBgVGVzdEJlZC5jb25maWd1cmVUZXN0aW5nTW9kdWxlYCoqXG4gKlxuICogYGBgdHNcbiAqIGRlc2NyaWJlKCdCb29rcyBFZmZlY3RzJywgKCkgPT4ge1xuICogICBsZXQgYWN0aW9ucyQgPSBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KCk7XG4gKiAgIGxldCBlZmZlY3RzOiBCb29rc0VmZmVjdHM7XG4gKlxuICogICBiZWZvcmVFYWNoKCgpID0+IHtcbiAqICAgICBUZXN0QmVkLmNvbmZpZ3VyZVRlc3RpbmdNb2R1bGUoe1xuICogICAgICAgcHJvdmlkZXJzOiBbXG4gKiAgICAgICAgIHByb3ZpZGVNb2NrQWN0aW9ucygoKSA9PiBhY3Rpb25zJCksXG4gKiAgICAgICAgIEJvb2tzRWZmZWN0cyxcbiAqICAgICAgIF0sXG4gKiAgICAgfSk7XG4gKlxuICogICAgIGFjdGlvbnMkID0gVGVzdEJlZC5pbmplY3QoQWN0aW9ucyk7XG4gKiAgICAgZWZmZWN0cyA9IFRlc3RCZWQuaW5qZWN0KEJvb2tzRWZmZWN0cyk7XG4gKiAgIH0pO1xuICogfSk7XG4gKiBgYGBcbiAqXG4gKiAqKldpdGggYEluamVjdG9yLmNyZWF0ZWAqKlxuICpcbiAqIGBgYHRzXG4gKiBkZXNjcmliZSgnQ291bnRlciBFZmZlY3RzJywgKCkgPT4ge1xuICogICBsZXQgaW5qZWN0b3I6IEluamVjdG9yO1xuICogICBsZXQgYWN0aW9ucyQgPSBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KCk7XG4gKiAgIGxldCBlZmZlY3RzOiBDb3VudGVyRWZmZWN0cztcbiAqXG4gKiAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICogICAgIGluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAqICAgICAgIHByb3ZpZGVyczogW1xuICogICAgICAgICBwcm92aWRlTW9ja0FjdGlvbnMoKCkgPT4gYWN0aW9ucyQpLFxuICogICAgICAgICBDb3VudGVyRWZmZWN0cyxcbiAqICAgICAgIF0sXG4gKiAgICAgfSk7XG4gKlxuICogICAgIGFjdGlvbnMkID0gaW5qZWN0b3IuZ2V0KEFjdGlvbnMpO1xuICogICAgIGVmZmVjdHMgPSBpbmplY3Rvci5nZXQoQ291bnRlckVmZmVjdHMpO1xuICogICB9KTtcbiAqIH0pO1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlTW9ja0FjdGlvbnMoXG4gIGZhY3RvcnlPclNvdXJjZTogKCgpID0+IE9ic2VydmFibGU8YW55PikgfCBPYnNlcnZhYmxlPGFueT5cbik6IEZhY3RvcnlQcm92aWRlciB7XG4gIHJldHVybiB7XG4gICAgcHJvdmlkZTogQWN0aW9ucyxcbiAgICB1c2VGYWN0b3J5OiAoKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcbiAgICAgIGlmICh0eXBlb2YgZmFjdG9yeU9yU291cmNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgQWN0aW9ucyhkZWZlcihmYWN0b3J5T3JTb3VyY2UpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBBY3Rpb25zKGZhY3RvcnlPclNvdXJjZSk7XG4gICAgfSxcbiAgICBkZXBzOiBbXSxcbiAgfTtcbn1cbiJdfQ==