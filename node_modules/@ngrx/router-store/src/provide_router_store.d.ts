import { EnvironmentProviders } from '@angular/core';
import { StoreRouterConfig } from './router_store_config';
import { SerializedRouterStateSnapshot } from './serializers/full_serializer';
import { BaseRouterStoreState } from './serializers/base';
/**
 * Connects the Angular Router to the Store.
 *
 * @usageNotes
 *
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideStore({ router: routerReducer }),
 *     provideRouterStore(),
 *   ],
 * });
 * ```
 */
export declare function provideRouterStore<T extends BaseRouterStoreState = SerializedRouterStateSnapshot>(config?: StoreRouterConfig<T>): EnvironmentProviders;
