import { CREATE_EFFECT_METADATA_KEY, DEFAULT_EFFECT_CONFIG, } from './models';
/**
 * @description
 *
 * Creates an effect from a source and an `EffectConfig`.
 *
 * @param source A function which returns an observable or observable factory.
 * @param config A `EffectConfig` to configure the effect. By default,
 * `dispatch` is true, `functional` is false, and `useEffectsErrorHandler` is
 * true.
 * @returns If `EffectConfig`#`functional` is true, returns the source function.
 * Else, returns the source function result. When `EffectConfig`#`dispatch` is
 * true, the source function result needs to be `Observable<Action>`.
 *
 * @usageNotes
 *
 * ### Class Effects
 *
 * ```ts
 * @Injectable()
 * export class FeatureEffects {
 *   // mapping to a different action
 *   readonly effect1$ = createEffect(
 *     () => this.actions$.pipe(
 *       ofType(FeatureActions.actionOne),
 *       map(() => FeatureActions.actionTwo())
 *     )
 *   );
 *
 *   // non-dispatching effect
 *   readonly effect2$ = createEffect(
 *     () => this.actions$.pipe(
 *       ofType(FeatureActions.actionTwo),
 *       tap(() => console.log('Action Two Dispatched'))
 *     ),
 *     { dispatch: false } // FeatureActions.actionTwo is not dispatched
 *   );
 *
 *   constructor(private readonly actions$: Actions) {}
 * }
 * ```
 *
 * ### Functional Effects
 *
 * ```ts
 * // mapping to a different action
 * export const loadUsers = createEffect(
 *   (actions$ = inject(Actions), usersService = inject(UsersService)) => {
 *     return actions$.pipe(
 *       ofType(UsersPageActions.opened),
 *       exhaustMap(() => {
 *         return usersService.getAll().pipe(
 *           map((users) => UsersApiActions.usersLoadedSuccess({ users })),
 *           catchError((error) =>
 *             of(UsersApiActions.usersLoadedFailure({ error }))
 *           )
 *         );
 *       })
 *     );
 *   },
 *   { functional: true }
 * );
 *
 * // non-dispatching functional effect
 * export const logDispatchedActions = createEffect(
 *   () => inject(Actions).pipe(tap(console.log)),
 *   { functional: true, dispatch: false }
 * );
 * ```
 */
export function createEffect(source, config = {}) {
    const effect = config.functional ? source : source();
    const value = {
        ...DEFAULT_EFFECT_CONFIG,
        ...config, // Overrides any defaults if values are provided
    };
    Object.defineProperty(effect, CREATE_EFFECT_METADATA_KEY, {
        value,
    });
    return effect;
}
export function getCreateEffectMetadata(instance) {
    const propertyNames = Object.getOwnPropertyNames(instance);
    const metadata = propertyNames
        .filter((propertyName) => {
        if (instance[propertyName] &&
            instance[propertyName].hasOwnProperty(CREATE_EFFECT_METADATA_KEY)) {
            // If the property type has overridden `hasOwnProperty` we need to ensure
            // that the metadata is valid (containing a `dispatch` property)
            // https://github.com/ngrx/platform/issues/2975
            const property = instance[propertyName];
            return property[CREATE_EFFECT_METADATA_KEY].hasOwnProperty('dispatch');
        }
        return false;
    })
        .map((propertyName) => {
        const metaData = instance[propertyName][CREATE_EFFECT_METADATA_KEY];
        return {
            propertyName,
            ...metaData,
        };
    });
    return metadata;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0X2NyZWF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VmZmVjdHMvc3JjL2VmZmVjdF9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFDTCwwQkFBMEIsRUFFMUIscUJBQXFCLEdBSXRCLE1BQU0sVUFBVSxDQUFDO0FBOEJsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvRUc7QUFDSCxNQUFNLFVBQVUsWUFBWSxDQUkxQixNQUFjLEVBQ2QsU0FBdUIsRUFBRTtJQUV6QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3JELE1BQU0sS0FBSyxHQUFpQjtRQUMxQixHQUFHLHFCQUFxQjtRQUN4QixHQUFHLE1BQU0sRUFBRSxnREFBZ0Q7S0FDNUQsQ0FBQztJQUNGLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLDBCQUEwQixFQUFFO1FBQ3hELEtBQUs7S0FDTixDQUFDLENBQUM7SUFDSCxPQUFPLE1BQThDLENBQUM7QUFDeEQsQ0FBQztBQUVELE1BQU0sVUFBVSx1QkFBdUIsQ0FDckMsUUFBVztJQUVYLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQW1CLENBQUM7SUFFN0UsTUFBTSxRQUFRLEdBQXdCLGFBQWE7U0FDaEQsTUFBTSxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUU7UUFDdkIsSUFDRSxRQUFRLENBQUMsWUFBWSxDQUFDO1lBQ3RCLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxjQUFjLENBQUMsMEJBQTBCLENBQUMsRUFDakU7WUFDQSx5RUFBeUU7WUFDekUsZ0VBQWdFO1lBQ2hFLCtDQUErQztZQUMvQyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFRLENBQUM7WUFDL0MsT0FBTyxRQUFRLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDeEU7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUMsQ0FBQztTQUNELEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxFQUFFO1FBQ3BCLE1BQU0sUUFBUSxHQUFJLFFBQVEsQ0FBQyxZQUFZLENBQVMsQ0FDOUMsMEJBQTBCLENBQzNCLENBQUM7UUFDRixPQUFPO1lBQ0wsWUFBWTtZQUNaLEdBQUcsUUFBUTtTQUNaLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVMLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBY3Rpb24sIEFjdGlvbkNyZWF0b3IgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQge1xuICBDUkVBVEVfRUZGRUNUX01FVEFEQVRBX0tFWSxcbiAgQ3JlYXRlRWZmZWN0TWV0YWRhdGEsXG4gIERFRkFVTFRfRUZGRUNUX0NPTkZJRyxcbiAgRWZmZWN0Q29uZmlnLFxuICBFZmZlY3RNZXRhZGF0YSxcbiAgRnVuY3Rpb25hbEVmZmVjdCxcbn0gZnJvbSAnLi9tb2RlbHMnO1xuXG50eXBlIERpc3BhdGNoVHlwZTxUPiA9IFQgZXh0ZW5kcyB7IGRpc3BhdGNoOiBpbmZlciBVIH0gPyBVIDogdHJ1ZTtcbnR5cGUgT2JzZXJ2YWJsZVR5cGU8VCwgT3JpZ2luYWxUeXBlPiA9IFQgZXh0ZW5kcyBmYWxzZSA/IE9yaWdpbmFsVHlwZSA6IEFjdGlvbjtcbnR5cGUgRWZmZWN0UmVzdWx0PE9UPiA9IE9ic2VydmFibGU8T1Q+IHwgKCguLi5hcmdzOiBhbnlbXSkgPT4gT2JzZXJ2YWJsZTxPVD4pO1xudHlwZSBDb25kaXRpb25hbGx5RGlzYWxsb3dBY3Rpb25DcmVhdG9yPERULCBSZXN1bHQ+ID0gRFQgZXh0ZW5kcyBmYWxzZVxuICA/IHVua25vd24gLy8gSWYgRFQgKERpc3BhdGNoVHlwZSBpcyBmYWxzZSwgdGhlbiB3ZSBkb24ndCBlbmZvcmNlIGFueSByZXR1cm4gdHlwZXMpXG4gIDogUmVzdWx0IGV4dGVuZHMgRWZmZWN0UmVzdWx0PGluZmVyIE9UPlxuICA/IE9UIGV4dGVuZHMgQWN0aW9uQ3JlYXRvclxuICAgID8gJ0FjdGlvbkNyZWF0b3IgY2Fubm90IGJlIGRpc3BhdGNoZWQuIERpZCB5b3UgZm9yZ2V0IHRvIGNhbGwgdGhlIGFjdGlvbiBjcmVhdG9yIGZ1bmN0aW9uPydcbiAgICA6IHVua25vd25cbiAgOiB1bmtub3duO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWZmZWN0PFxuICBDIGV4dGVuZHMgRWZmZWN0Q29uZmlnICYgeyBmdW5jdGlvbmFsPzogZmFsc2UgfSxcbiAgRFQgZXh0ZW5kcyBEaXNwYXRjaFR5cGU8Qz4sXG4gIE9UIGV4dGVuZHMgT2JzZXJ2YWJsZVR5cGU8RFQsIE9UPixcbiAgUiBleHRlbmRzIEVmZmVjdFJlc3VsdDxPVD5cbj4oXG4gIHNvdXJjZTogKCkgPT4gUiAmIENvbmRpdGlvbmFsbHlEaXNhbGxvd0FjdGlvbkNyZWF0b3I8RFQsIFI+LFxuICBjb25maWc/OiBDXG4pOiBSICYgQ3JlYXRlRWZmZWN0TWV0YWRhdGE7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWZmZWN0PFNvdXJjZSBleHRlbmRzICgpID0+IE9ic2VydmFibGU8dW5rbm93bj4+KFxuICBzb3VyY2U6IFNvdXJjZSxcbiAgY29uZmlnOiBFZmZlY3RDb25maWcgJiB7IGZ1bmN0aW9uYWw6IHRydWU7IGRpc3BhdGNoOiBmYWxzZSB9XG4pOiBGdW5jdGlvbmFsRWZmZWN0PFNvdXJjZT47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWZmZWN0PFNvdXJjZSBleHRlbmRzICgpID0+IE9ic2VydmFibGU8QWN0aW9uPj4oXG4gIHNvdXJjZTogU291cmNlICYgQ29uZGl0aW9uYWxseURpc2FsbG93QWN0aW9uQ3JlYXRvcjx0cnVlLCBSZXR1cm5UeXBlPFNvdXJjZT4+LFxuICBjb25maWc6IEVmZmVjdENvbmZpZyAmIHsgZnVuY3Rpb25hbDogdHJ1ZTsgZGlzcGF0Y2g/OiB0cnVlIH1cbik6IEZ1bmN0aW9uYWxFZmZlY3Q8U291cmNlPjtcbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogQ3JlYXRlcyBhbiBlZmZlY3QgZnJvbSBhIHNvdXJjZSBhbmQgYW4gYEVmZmVjdENvbmZpZ2AuXG4gKlxuICogQHBhcmFtIHNvdXJjZSBBIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYW4gb2JzZXJ2YWJsZSBvciBvYnNlcnZhYmxlIGZhY3RvcnkuXG4gKiBAcGFyYW0gY29uZmlnIEEgYEVmZmVjdENvbmZpZ2AgdG8gY29uZmlndXJlIHRoZSBlZmZlY3QuIEJ5IGRlZmF1bHQsXG4gKiBgZGlzcGF0Y2hgIGlzIHRydWUsIGBmdW5jdGlvbmFsYCBpcyBmYWxzZSwgYW5kIGB1c2VFZmZlY3RzRXJyb3JIYW5kbGVyYCBpc1xuICogdHJ1ZS5cbiAqIEByZXR1cm5zIElmIGBFZmZlY3RDb25maWdgI2BmdW5jdGlvbmFsYCBpcyB0cnVlLCByZXR1cm5zIHRoZSBzb3VyY2UgZnVuY3Rpb24uXG4gKiBFbHNlLCByZXR1cm5zIHRoZSBzb3VyY2UgZnVuY3Rpb24gcmVzdWx0LiBXaGVuIGBFZmZlY3RDb25maWdgI2BkaXNwYXRjaGAgaXNcbiAqIHRydWUsIHRoZSBzb3VyY2UgZnVuY3Rpb24gcmVzdWx0IG5lZWRzIHRvIGJlIGBPYnNlcnZhYmxlPEFjdGlvbj5gLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogIyMjIENsYXNzIEVmZmVjdHNcbiAqXG4gKiBgYGB0c1xuICogQEluamVjdGFibGUoKVxuICogZXhwb3J0IGNsYXNzIEZlYXR1cmVFZmZlY3RzIHtcbiAqICAgLy8gbWFwcGluZyB0byBhIGRpZmZlcmVudCBhY3Rpb25cbiAqICAgcmVhZG9ubHkgZWZmZWN0MSQgPSBjcmVhdGVFZmZlY3QoXG4gKiAgICAgKCkgPT4gdGhpcy5hY3Rpb25zJC5waXBlKFxuICogICAgICAgb2ZUeXBlKEZlYXR1cmVBY3Rpb25zLmFjdGlvbk9uZSksXG4gKiAgICAgICBtYXAoKCkgPT4gRmVhdHVyZUFjdGlvbnMuYWN0aW9uVHdvKCkpXG4gKiAgICAgKVxuICogICApO1xuICpcbiAqICAgLy8gbm9uLWRpc3BhdGNoaW5nIGVmZmVjdFxuICogICByZWFkb25seSBlZmZlY3QyJCA9IGNyZWF0ZUVmZmVjdChcbiAqICAgICAoKSA9PiB0aGlzLmFjdGlvbnMkLnBpcGUoXG4gKiAgICAgICBvZlR5cGUoRmVhdHVyZUFjdGlvbnMuYWN0aW9uVHdvKSxcbiAqICAgICAgIHRhcCgoKSA9PiBjb25zb2xlLmxvZygnQWN0aW9uIFR3byBEaXNwYXRjaGVkJykpXG4gKiAgICAgKSxcbiAqICAgICB7IGRpc3BhdGNoOiBmYWxzZSB9IC8vIEZlYXR1cmVBY3Rpb25zLmFjdGlvblR3byBpcyBub3QgZGlzcGF0Y2hlZFxuICogICApO1xuICpcbiAqICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBhY3Rpb25zJDogQWN0aW9ucykge31cbiAqIH1cbiAqIGBgYFxuICpcbiAqICMjIyBGdW5jdGlvbmFsIEVmZmVjdHNcbiAqXG4gKiBgYGB0c1xuICogLy8gbWFwcGluZyB0byBhIGRpZmZlcmVudCBhY3Rpb25cbiAqIGV4cG9ydCBjb25zdCBsb2FkVXNlcnMgPSBjcmVhdGVFZmZlY3QoXG4gKiAgIChhY3Rpb25zJCA9IGluamVjdChBY3Rpb25zKSwgdXNlcnNTZXJ2aWNlID0gaW5qZWN0KFVzZXJzU2VydmljZSkpID0+IHtcbiAqICAgICByZXR1cm4gYWN0aW9ucyQucGlwZShcbiAqICAgICAgIG9mVHlwZShVc2Vyc1BhZ2VBY3Rpb25zLm9wZW5lZCksXG4gKiAgICAgICBleGhhdXN0TWFwKCgpID0+IHtcbiAqICAgICAgICAgcmV0dXJuIHVzZXJzU2VydmljZS5nZXRBbGwoKS5waXBlKFxuICogICAgICAgICAgIG1hcCgodXNlcnMpID0+IFVzZXJzQXBpQWN0aW9ucy51c2Vyc0xvYWRlZFN1Y2Nlc3MoeyB1c2VycyB9KSksXG4gKiAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+XG4gKiAgICAgICAgICAgICBvZihVc2Vyc0FwaUFjdGlvbnMudXNlcnNMb2FkZWRGYWlsdXJlKHsgZXJyb3IgfSkpXG4gKiAgICAgICAgICAgKVxuICogICAgICAgICApO1xuICogICAgICAgfSlcbiAqICAgICApO1xuICogICB9LFxuICogICB7IGZ1bmN0aW9uYWw6IHRydWUgfVxuICogKTtcbiAqXG4gKiAvLyBub24tZGlzcGF0Y2hpbmcgZnVuY3Rpb25hbCBlZmZlY3RcbiAqIGV4cG9ydCBjb25zdCBsb2dEaXNwYXRjaGVkQWN0aW9ucyA9IGNyZWF0ZUVmZmVjdChcbiAqICAgKCkgPT4gaW5qZWN0KEFjdGlvbnMpLnBpcGUodGFwKGNvbnNvbGUubG9nKSksXG4gKiAgIHsgZnVuY3Rpb25hbDogdHJ1ZSwgZGlzcGF0Y2g6IGZhbHNlIH1cbiAqICk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVmZmVjdDxcbiAgUmVzdWx0IGV4dGVuZHMgRWZmZWN0UmVzdWx0PHVua25vd24+LFxuICBTb3VyY2UgZXh0ZW5kcyAoKSA9PiBSZXN1bHRcbj4oXG4gIHNvdXJjZTogU291cmNlLFxuICBjb25maWc6IEVmZmVjdENvbmZpZyA9IHt9XG4pOiAoU291cmNlIHwgUmVzdWx0KSAmIENyZWF0ZUVmZmVjdE1ldGFkYXRhIHtcbiAgY29uc3QgZWZmZWN0ID0gY29uZmlnLmZ1bmN0aW9uYWwgPyBzb3VyY2UgOiBzb3VyY2UoKTtcbiAgY29uc3QgdmFsdWU6IEVmZmVjdENvbmZpZyA9IHtcbiAgICAuLi5ERUZBVUxUX0VGRkVDVF9DT05GSUcsXG4gICAgLi4uY29uZmlnLCAvLyBPdmVycmlkZXMgYW55IGRlZmF1bHRzIGlmIHZhbHVlcyBhcmUgcHJvdmlkZWRcbiAgfTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVmZmVjdCwgQ1JFQVRFX0VGRkVDVF9NRVRBREFUQV9LRVksIHtcbiAgICB2YWx1ZSxcbiAgfSk7XG4gIHJldHVybiBlZmZlY3QgYXMgdHlwZW9mIGVmZmVjdCAmIENyZWF0ZUVmZmVjdE1ldGFkYXRhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3JlYXRlRWZmZWN0TWV0YWRhdGE8VCBleHRlbmRzIFJlY29yZDxrZXlvZiBULCBPYmplY3Q+PihcbiAgaW5zdGFuY2U6IFRcbik6IEVmZmVjdE1ldGFkYXRhPFQ+W10ge1xuICBjb25zdCBwcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaW5zdGFuY2UpIGFzIEFycmF5PGtleW9mIFQ+O1xuXG4gIGNvbnN0IG1ldGFkYXRhOiBFZmZlY3RNZXRhZGF0YTxUPltdID0gcHJvcGVydHlOYW1lc1xuICAgIC5maWx0ZXIoKHByb3BlcnR5TmFtZSkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBpbnN0YW5jZVtwcm9wZXJ0eU5hbWVdICYmXG4gICAgICAgIGluc3RhbmNlW3Byb3BlcnR5TmFtZV0uaGFzT3duUHJvcGVydHkoQ1JFQVRFX0VGRkVDVF9NRVRBREFUQV9LRVkpXG4gICAgICApIHtcbiAgICAgICAgLy8gSWYgdGhlIHByb3BlcnR5IHR5cGUgaGFzIG92ZXJyaWRkZW4gYGhhc093blByb3BlcnR5YCB3ZSBuZWVkIHRvIGVuc3VyZVxuICAgICAgICAvLyB0aGF0IHRoZSBtZXRhZGF0YSBpcyB2YWxpZCAoY29udGFpbmluZyBhIGBkaXNwYXRjaGAgcHJvcGVydHkpXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZ3J4L3BsYXRmb3JtL2lzc3Vlcy8yOTc1XG4gICAgICAgIGNvbnN0IHByb3BlcnR5ID0gaW5zdGFuY2VbcHJvcGVydHlOYW1lXSBhcyBhbnk7XG4gICAgICAgIHJldHVybiBwcm9wZXJ0eVtDUkVBVEVfRUZGRUNUX01FVEFEQVRBX0tFWV0uaGFzT3duUHJvcGVydHkoJ2Rpc3BhdGNoJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSlcbiAgICAubWFwKChwcm9wZXJ0eU5hbWUpID0+IHtcbiAgICAgIGNvbnN0IG1ldGFEYXRhID0gKGluc3RhbmNlW3Byb3BlcnR5TmFtZV0gYXMgYW55KVtcbiAgICAgICAgQ1JFQVRFX0VGRkVDVF9NRVRBREFUQV9LRVlcbiAgICAgIF07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcm9wZXJ0eU5hbWUsXG4gICAgICAgIC4uLm1ldGFEYXRhLFxuICAgICAgfTtcbiAgICB9KTtcblxuICByZXR1cm4gbWV0YWRhdGE7XG59XG4iXX0=