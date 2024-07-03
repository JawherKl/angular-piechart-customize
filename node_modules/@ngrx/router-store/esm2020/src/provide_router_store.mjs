import { ENVIRONMENT_INITIALIZER, inject, makeEnvironmentProviders, } from '@angular/core';
import { _createRouterConfig, _ROUTER_CONFIG, ROUTER_CONFIG, } from './router_store_config';
import { FullRouterStateSerializer, } from './serializers/full_serializer';
import { MinimalRouterStateSerializer } from './serializers/minimal_serializer';
import { RouterStateSerializer, } from './serializers/base';
import { StoreRouterConnectingService } from './store_router_connecting.service';
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
export function provideRouterStore(config = {}) {
    return makeEnvironmentProviders([
        { provide: _ROUTER_CONFIG, useValue: config },
        {
            provide: ROUTER_CONFIG,
            useFactory: _createRouterConfig,
            deps: [_ROUTER_CONFIG],
        },
        {
            provide: RouterStateSerializer,
            useClass: config.serializer
                ? config.serializer
                : config.routerState === 0 /* RouterState.Full */
                    ? FullRouterStateSerializer
                    : MinimalRouterStateSerializer,
        },
        {
            provide: ENVIRONMENT_INITIALIZER,
            multi: true,
            useFactory() {
                return () => inject(StoreRouterConnectingService);
            },
        },
        StoreRouterConnectingService,
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZV9yb3V0ZXJfc3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3JvdXRlci1zdG9yZS9zcmMvcHJvdmlkZV9yb3V0ZXJfc3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixNQUFNLEVBQ04sd0JBQXdCLEdBQ3pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxtQkFBbUIsRUFDbkIsY0FBYyxFQUNkLGFBQWEsR0FHZCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFDTCx5QkFBeUIsR0FFMUIsTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLEVBRUwscUJBQXFCLEdBQ3RCLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFakY7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FFaEMsU0FBK0IsRUFBRTtJQUNqQyxPQUFPLHdCQUF3QixDQUFDO1FBQzlCLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFO1FBQzdDO1lBQ0UsT0FBTyxFQUFFLGFBQWE7WUFDdEIsVUFBVSxFQUFFLG1CQUFtQjtZQUMvQixJQUFJLEVBQUUsQ0FBQyxjQUFjLENBQUM7U0FDdkI7UUFDRDtZQUNFLE9BQU8sRUFBRSxxQkFBcUI7WUFDOUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxVQUFVO2dCQUN6QixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVU7Z0JBQ25CLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyw2QkFBcUI7b0JBQ3pDLENBQUMsQ0FBQyx5QkFBeUI7b0JBQzNCLENBQUMsQ0FBQyw0QkFBNEI7U0FDakM7UUFDRDtZQUNFLE9BQU8sRUFBRSx1QkFBdUI7WUFDaEMsS0FBSyxFQUFFLElBQUk7WUFDWCxVQUFVO2dCQUNSLE9BQU8sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDcEQsQ0FBQztTQUNGO1FBQ0QsNEJBQTRCO0tBQzdCLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFTlZJUk9OTUVOVF9JTklUSUFMSVpFUixcbiAgRW52aXJvbm1lbnRQcm92aWRlcnMsXG4gIGluamVjdCxcbiAgbWFrZUVudmlyb25tZW50UHJvdmlkZXJzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIF9jcmVhdGVSb3V0ZXJDb25maWcsXG4gIF9ST1VURVJfQ09ORklHLFxuICBST1VURVJfQ09ORklHLFxuICBSb3V0ZXJTdGF0ZSxcbiAgU3RvcmVSb3V0ZXJDb25maWcsXG59IGZyb20gJy4vcm91dGVyX3N0b3JlX2NvbmZpZyc7XG5pbXBvcnQge1xuICBGdWxsUm91dGVyU3RhdGVTZXJpYWxpemVyLFxuICBTZXJpYWxpemVkUm91dGVyU3RhdGVTbmFwc2hvdCxcbn0gZnJvbSAnLi9zZXJpYWxpemVycy9mdWxsX3NlcmlhbGl6ZXInO1xuaW1wb3J0IHsgTWluaW1hbFJvdXRlclN0YXRlU2VyaWFsaXplciB9IGZyb20gJy4vc2VyaWFsaXplcnMvbWluaW1hbF9zZXJpYWxpemVyJztcbmltcG9ydCB7XG4gIEJhc2VSb3V0ZXJTdG9yZVN0YXRlLFxuICBSb3V0ZXJTdGF0ZVNlcmlhbGl6ZXIsXG59IGZyb20gJy4vc2VyaWFsaXplcnMvYmFzZSc7XG5pbXBvcnQgeyBTdG9yZVJvdXRlckNvbm5lY3RpbmdTZXJ2aWNlIH0gZnJvbSAnLi9zdG9yZV9yb3V0ZXJfY29ubmVjdGluZy5zZXJ2aWNlJztcblxuLyoqXG4gKiBDb25uZWN0cyB0aGUgQW5ndWxhciBSb3V0ZXIgdG8gdGhlIFN0b3JlLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogYGBgdHNcbiAqIGJvb3RzdHJhcEFwcGxpY2F0aW9uKEFwcENvbXBvbmVudCwge1xuICogICBwcm92aWRlcnM6IFtcbiAqICAgICBwcm92aWRlU3RvcmUoeyByb3V0ZXI6IHJvdXRlclJlZHVjZXIgfSksXG4gKiAgICAgcHJvdmlkZVJvdXRlclN0b3JlKCksXG4gKiAgIF0sXG4gKiB9KTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVJvdXRlclN0b3JlPFxuICBUIGV4dGVuZHMgQmFzZVJvdXRlclN0b3JlU3RhdGUgPSBTZXJpYWxpemVkUm91dGVyU3RhdGVTbmFwc2hvdFxuPihjb25maWc6IFN0b3JlUm91dGVyQ29uZmlnPFQ+ID0ge30pOiBFbnZpcm9ubWVudFByb3ZpZGVycyB7XG4gIHJldHVybiBtYWtlRW52aXJvbm1lbnRQcm92aWRlcnMoW1xuICAgIHsgcHJvdmlkZTogX1JPVVRFUl9DT05GSUcsIHVzZVZhbHVlOiBjb25maWcgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBST1VURVJfQ09ORklHLFxuICAgICAgdXNlRmFjdG9yeTogX2NyZWF0ZVJvdXRlckNvbmZpZyxcbiAgICAgIGRlcHM6IFtfUk9VVEVSX0NPTkZJR10sXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBSb3V0ZXJTdGF0ZVNlcmlhbGl6ZXIsXG4gICAgICB1c2VDbGFzczogY29uZmlnLnNlcmlhbGl6ZXJcbiAgICAgICAgPyBjb25maWcuc2VyaWFsaXplclxuICAgICAgICA6IGNvbmZpZy5yb3V0ZXJTdGF0ZSA9PT0gUm91dGVyU3RhdGUuRnVsbFxuICAgICAgICA/IEZ1bGxSb3V0ZXJTdGF0ZVNlcmlhbGl6ZXJcbiAgICAgICAgOiBNaW5pbWFsUm91dGVyU3RhdGVTZXJpYWxpemVyLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogRU5WSVJPTk1FTlRfSU5JVElBTElaRVIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgIHVzZUZhY3RvcnkoKSB7XG4gICAgICAgIHJldHVybiAoKSA9PiBpbmplY3QoU3RvcmVSb3V0ZXJDb25uZWN0aW5nU2VydmljZSk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgU3RvcmVSb3V0ZXJDb25uZWN0aW5nU2VydmljZSxcbiAgXSk7XG59XG4iXX0=