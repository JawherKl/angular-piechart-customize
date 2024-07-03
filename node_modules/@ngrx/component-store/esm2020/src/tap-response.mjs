import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
/**
 * Handles the response in ComponentStore effects in a safe way, without
 * additional boilerplate.
 * It enforces that the error case is handled and that the effect would still be
 * running should an error occur.
 *
 * Takes an optional third argument for a `complete` callback.
 *
 * ```typescript
 * readonly dismissedAlerts = this.effect<Alert>(alert$ => {
 *  return alert$.pipe(
 *      concatMap(
 *          (alert) => this.alertsService.dismissAlert(alert).pipe(
 *              tapResponse(
 *                 (dismissedAlert) => this.alertDismissed(dismissedAlert),
 *                 (error: { message: string }) => this.logError(error.message),
 *              ))));
 *   });
 * ```
 */
export function tapResponse(nextFn, errorFn, completeFn) {
    return (source) => source.pipe(tap({
        next: nextFn,
        complete: completeFn,
    }), catchError((e) => {
        errorFn(e);
        return EMPTY;
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwLXJlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnQtc3RvcmUvc3JjL3RhcC1yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUN6QixNQUF5QixFQUN6QixPQUEyQixFQUMzQixVQUF1QjtJQUV2QixPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FDaEIsTUFBTSxDQUFDLElBQUksQ0FDVCxHQUFHLENBQUM7UUFDRixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxVQUFVO0tBQ3JCLENBQUMsRUFDRixVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNmLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNYLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQyxDQUFDLENBQ0gsQ0FBQztBQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBjYXRjaEVycm9yLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogSGFuZGxlcyB0aGUgcmVzcG9uc2UgaW4gQ29tcG9uZW50U3RvcmUgZWZmZWN0cyBpbiBhIHNhZmUgd2F5LCB3aXRob3V0XG4gKiBhZGRpdGlvbmFsIGJvaWxlcnBsYXRlLlxuICogSXQgZW5mb3JjZXMgdGhhdCB0aGUgZXJyb3IgY2FzZSBpcyBoYW5kbGVkIGFuZCB0aGF0IHRoZSBlZmZlY3Qgd291bGQgc3RpbGwgYmVcbiAqIHJ1bm5pbmcgc2hvdWxkIGFuIGVycm9yIG9jY3VyLlxuICpcbiAqIFRha2VzIGFuIG9wdGlvbmFsIHRoaXJkIGFyZ3VtZW50IGZvciBhIGBjb21wbGV0ZWAgY2FsbGJhY2suXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogcmVhZG9ubHkgZGlzbWlzc2VkQWxlcnRzID0gdGhpcy5lZmZlY3Q8QWxlcnQ+KGFsZXJ0JCA9PiB7XG4gKiAgcmV0dXJuIGFsZXJ0JC5waXBlKFxuICogICAgICBjb25jYXRNYXAoXG4gKiAgICAgICAgICAoYWxlcnQpID0+IHRoaXMuYWxlcnRzU2VydmljZS5kaXNtaXNzQWxlcnQoYWxlcnQpLnBpcGUoXG4gKiAgICAgICAgICAgICAgdGFwUmVzcG9uc2UoXG4gKiAgICAgICAgICAgICAgICAgKGRpc21pc3NlZEFsZXJ0KSA9PiB0aGlzLmFsZXJ0RGlzbWlzc2VkKGRpc21pc3NlZEFsZXJ0KSxcbiAqICAgICAgICAgICAgICAgICAoZXJyb3I6IHsgbWVzc2FnZTogc3RyaW5nIH0pID0+IHRoaXMubG9nRXJyb3IoZXJyb3IubWVzc2FnZSksXG4gKiAgICAgICAgICAgICAgKSkpKTtcbiAqICAgfSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRhcFJlc3BvbnNlPFQsIEUgPSB1bmtub3duPihcbiAgbmV4dEZuOiAobmV4dDogVCkgPT4gdm9pZCxcbiAgZXJyb3JGbjogKGVycm9yOiBFKSA9PiB2b2lkLFxuICBjb21wbGV0ZUZuPzogKCkgPT4gdm9pZFxuKTogKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiAoc291cmNlKSA9PlxuICAgIHNvdXJjZS5waXBlKFxuICAgICAgdGFwKHtcbiAgICAgICAgbmV4dDogbmV4dEZuLFxuICAgICAgICBjb21wbGV0ZTogY29tcGxldGVGbixcbiAgICAgIH0pLFxuICAgICAgY2F0Y2hFcnJvcigoZSkgPT4ge1xuICAgICAgICBlcnJvckZuKGUpO1xuICAgICAgICByZXR1cm4gRU1QVFk7XG4gICAgICB9KVxuICAgICk7XG59XG4iXX0=