import { Observable } from 'rxjs';
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
export declare function tapResponse<T, E = unknown>(nextFn: (next: T) => void, errorFn: (error: E) => void, completeFn?: () => void): (source: Observable<T>) => Observable<T>;
