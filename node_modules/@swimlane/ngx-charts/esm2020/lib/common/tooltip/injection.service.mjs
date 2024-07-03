import { Injectable } from '@angular/core';
import { DomPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import * as i0 from "@angular/core";
function isViewContainerRef(x) {
    return x.element;
}
/**
 * Injection service is a helper to append components
 * dynamically to a known location in the DOM, most
 * noteably for dialogs/tooltips appending to body.
 *
 * @export
 */
export class InjectionService {
    constructor(applicationRef, componentFactoryResolver, injector) {
        this.applicationRef = applicationRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    /**
     * Sets a default global root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param container
     */
    static setGlobalRootViewContainer(container) {
        InjectionService.globalRootViewContainer = container;
    }
    /**
     * Gets the root view container to inject the component to.
     *
     * @memberOf InjectionService
     */
    getRootViewContainer() {
        if (this._container)
            return this._container;
        if (InjectionService.globalRootViewContainer)
            return InjectionService.globalRootViewContainer;
        if (this.applicationRef.components.length)
            return this.applicationRef.components[0];
        throw new Error('View Container not found! ngUpgrade needs to manually set this via setRootViewContainer or setGlobalRootViewContainer.');
    }
    /**
     * Overrides the default root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param container
     *
     * @memberOf InjectionService
     */
    setRootViewContainer(container) {
        this._container = container;
    }
    /**
     * Gets the html element for a component ref.
     *
     * @param componentRef
     *
     * @memberOf InjectionService
     */
    getComponentRootNode(component) {
        if (isViewContainerRef(component)) {
            return component.element.nativeElement;
        }
        if (component.hostView && component.hostView.rootNodes.length > 0) {
            return component.hostView.rootNodes[0];
        }
        // the top most component root node has no `hostView`
        return component.location.nativeElement;
    }
    /**
     * Gets the root component container html element.
     *
     * @memberOf InjectionService
     */
    getRootViewContainerNode(component) {
        return this.getComponentRootNode(component);
    }
    /**
     * Projects the bindings onto the component
     *
     * @param component
     * @param options
     *
     * @memberOf InjectionService
     */
    projectComponentBindings(component, bindings) {
        if (bindings) {
            if (bindings.inputs !== undefined) {
                const bindingKeys = Object.getOwnPropertyNames(bindings.inputs);
                for (const bindingName of bindingKeys) {
                    component.instance[bindingName] = bindings.inputs[bindingName];
                }
            }
            if (bindings.outputs !== undefined) {
                const eventKeys = Object.getOwnPropertyNames(bindings.outputs);
                for (const eventName of eventKeys) {
                    component.instance[eventName] = bindings.outputs[eventName];
                }
            }
        }
        return component;
    }
    /**
     * Appends a component to a adjacent location
     *
     * @param componentClass
     * @param [options={}]
     * @param [location]
     *
     * @memberOf InjectionService
     */
    appendComponent(componentClass, bindings = {}, location) {
        if (!location)
            location = this.getRootViewContainer();
        const appendLocation = this.getComponentRootNode(location);
        const portalHost = new DomPortalOutlet(appendLocation, this.componentFactoryResolver, this.applicationRef, this.injector);
        const portal = new ComponentPortal(componentClass);
        const componentRef = portalHost.attach(portal);
        this.projectComponentBindings(componentRef, bindings);
        return componentRef;
    }
}
InjectionService.globalRootViewContainer = null;
InjectionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: InjectionService, deps: [{ token: i0.ApplicationRef }, { token: i0.ComponentFactoryResolver }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
InjectionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: InjectionService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: InjectionService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.ApplicationRef }, { type: i0.ComponentFactoryResolver }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtY2hhcnRzL3NyYy9saWIvY29tbW9uL3Rvb2x0aXAvaW5qZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUlMLFVBQVUsRUFLWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztBQUV2RSxTQUFTLGtCQUFrQixDQUFDLENBQU07SUFDaEMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFFSCxNQUFNLE9BQU8sZ0JBQWdCO0lBZTNCLFlBQ1UsY0FBOEIsRUFDOUIsd0JBQWtELEVBQ2xELFFBQWtCO1FBRmxCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELGFBQVEsR0FBUixRQUFRLENBQVU7SUFDekIsQ0FBQztJQWhCSjs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxTQUEyQjtRQUMzRCxnQkFBZ0IsQ0FBQyx1QkFBdUIsR0FBRyxTQUFTLENBQUM7SUFDdkQsQ0FBQztJQVVEOzs7O09BSUc7SUFDSCxvQkFBb0I7UUFDbEIsSUFBSSxJQUFJLENBQUMsVUFBVTtZQUFFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUM1QyxJQUFJLGdCQUFnQixDQUFDLHVCQUF1QjtZQUFFLE9BQU8sZ0JBQWdCLENBQUMsdUJBQXVCLENBQUM7UUFFOUYsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxNQUFNO1lBQUUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwRixNQUFNLElBQUksS0FBSyxDQUNiLHdIQUF3SCxDQUN6SCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxvQkFBb0IsQ0FBQyxTQUEyQjtRQUM5QyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUM5QixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsb0JBQW9CLENBQUMsU0FBK0M7UUFDbEUsSUFBSSxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNqQyxPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxTQUFTLENBQUMsUUFBUSxJQUFLLFNBQVMsQ0FBQyxRQUFpQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzNGLE9BQVEsU0FBUyxDQUFDLFFBQWlDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBZ0IsQ0FBQztTQUNqRjtRQUVELHFEQUFxRDtRQUNyRCxPQUFPLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO0lBQzFDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsd0JBQXdCLENBQUMsU0FBK0M7UUFDdEUsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCx3QkFBd0IsQ0FBQyxTQUE0QixFQUFFLFFBQWE7UUFDbEUsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUNqQyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNoRSxLQUFLLE1BQU0sV0FBVyxJQUFJLFdBQVcsRUFBRTtvQkFDckMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNoRTthQUNGO1lBRUQsSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtnQkFDbEMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDL0QsS0FBSyxNQUFNLFNBQVMsSUFBSSxTQUFTLEVBQUU7b0JBQ2pDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDN0Q7YUFDRjtTQUNGO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsZUFBZSxDQUFJLGNBQXVCLEVBQUUsV0FBZ0IsRUFBRSxFQUFFLFFBQWM7UUFDNUUsSUFBSSxDQUFDLFFBQVE7WUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDdEQsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTNELE1BQU0sVUFBVSxHQUFHLElBQUksZUFBZSxDQUNwQyxjQUFjLEVBQ2QsSUFBSSxDQUFDLHdCQUF3QixFQUM3QixJQUFJLENBQUMsY0FBYyxFQUNuQixJQUFJLENBQUMsUUFBUSxDQUNkLENBQUM7UUFFRixNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVuRCxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdEQsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQzs7QUFqSU0sd0NBQXVCLEdBQXFCLElBQUssQ0FBQTs2R0FEN0MsZ0JBQWdCO2lIQUFoQixnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFENUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFwcGxpY2F0aW9uUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0b3IsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgVHlwZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVBvcnRhbE91dGxldCwgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5cbmZ1bmN0aW9uIGlzVmlld0NvbnRhaW5lclJlZih4OiBhbnkpOiB4IGlzIFZpZXdDb250YWluZXJSZWYge1xuICByZXR1cm4geC5lbGVtZW50O1xufVxuXG4vKipcbiAqIEluamVjdGlvbiBzZXJ2aWNlIGlzIGEgaGVscGVyIHRvIGFwcGVuZCBjb21wb25lbnRzXG4gKiBkeW5hbWljYWxseSB0byBhIGtub3duIGxvY2F0aW9uIGluIHRoZSBET00sIG1vc3RcbiAqIG5vdGVhYmx5IGZvciBkaWFsb2dzL3Rvb2x0aXBzIGFwcGVuZGluZyB0byBib2R5LlxuICpcbiAqIEBleHBvcnRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEluamVjdGlvblNlcnZpY2Uge1xuICBzdGF0aWMgZ2xvYmFsUm9vdFZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBTZXRzIGEgZGVmYXVsdCBnbG9iYWwgcm9vdCB2aWV3IGNvbnRhaW5lci4gVGhpcyBpcyB1c2VmdWwgZm9yXG4gICAqIHRoaW5ncyBsaWtlIG5nVXBncmFkZSB0aGF0IGRvZXNuJ3QgaGF2ZSBhIEFwcGxpY2F0aW9uUmVmIHJvb3QuXG4gICAqXG4gICAqIEBwYXJhbSBjb250YWluZXJcbiAgICovXG4gIHN0YXRpYyBzZXRHbG9iYWxSb290Vmlld0NvbnRhaW5lcihjb250YWluZXI6IFZpZXdDb250YWluZXJSZWYpOiB2b2lkIHtcbiAgICBJbmplY3Rpb25TZXJ2aWNlLmdsb2JhbFJvb3RWaWV3Q29udGFpbmVyID0gY29udGFpbmVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3JcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSByb290IHZpZXcgY29udGFpbmVyIHRvIGluamVjdCB0aGUgY29tcG9uZW50IHRvLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgSW5qZWN0aW9uU2VydmljZVxuICAgKi9cbiAgZ2V0Um9vdFZpZXdDb250YWluZXIoKTogVmlld0NvbnRhaW5lclJlZiB8IENvbXBvbmVudFJlZjxhbnk+IHtcbiAgICBpZiAodGhpcy5fY29udGFpbmVyKSByZXR1cm4gdGhpcy5fY29udGFpbmVyO1xuICAgIGlmIChJbmplY3Rpb25TZXJ2aWNlLmdsb2JhbFJvb3RWaWV3Q29udGFpbmVyKSByZXR1cm4gSW5qZWN0aW9uU2VydmljZS5nbG9iYWxSb290Vmlld0NvbnRhaW5lcjtcblxuICAgIGlmICh0aGlzLmFwcGxpY2F0aW9uUmVmLmNvbXBvbmVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5hcHBsaWNhdGlvblJlZi5jb21wb25lbnRzWzBdO1xuXG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ1ZpZXcgQ29udGFpbmVyIG5vdCBmb3VuZCEgbmdVcGdyYWRlIG5lZWRzIHRvIG1hbnVhbGx5IHNldCB0aGlzIHZpYSBzZXRSb290Vmlld0NvbnRhaW5lciBvciBzZXRHbG9iYWxSb290Vmlld0NvbnRhaW5lci4nXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZXMgdGhlIGRlZmF1bHQgcm9vdCB2aWV3IGNvbnRhaW5lci4gVGhpcyBpcyB1c2VmdWwgZm9yXG4gICAqIHRoaW5ncyBsaWtlIG5nVXBncmFkZSB0aGF0IGRvZXNuJ3QgaGF2ZSBhIEFwcGxpY2F0aW9uUmVmIHJvb3QuXG4gICAqXG4gICAqIEBwYXJhbSBjb250YWluZXJcbiAgICpcbiAgICogQG1lbWJlck9mIEluamVjdGlvblNlcnZpY2VcbiAgICovXG4gIHNldFJvb3RWaWV3Q29udGFpbmVyKGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZik6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBodG1sIGVsZW1lbnQgZm9yIGEgY29tcG9uZW50IHJlZi5cbiAgICpcbiAgICogQHBhcmFtIGNvbXBvbmVudFJlZlxuICAgKlxuICAgKiBAbWVtYmVyT2YgSW5qZWN0aW9uU2VydmljZVxuICAgKi9cbiAgZ2V0Q29tcG9uZW50Um9vdE5vZGUoY29tcG9uZW50OiBWaWV3Q29udGFpbmVyUmVmIHwgQ29tcG9uZW50UmVmPGFueT4pOiBIVE1MRWxlbWVudCB7XG4gICAgaWYgKGlzVmlld0NvbnRhaW5lclJlZihjb21wb25lbnQpKSB7XG4gICAgICByZXR1cm4gY29tcG9uZW50LmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgaWYgKGNvbXBvbmVudC5ob3N0VmlldyAmJiAoY29tcG9uZW50Lmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIChjb21wb25lbnQuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcbiAgICB9XG5cbiAgICAvLyB0aGUgdG9wIG1vc3QgY29tcG9uZW50IHJvb3Qgbm9kZSBoYXMgbm8gYGhvc3RWaWV3YFxuICAgIHJldHVybiBjb21wb25lbnQubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSByb290IGNvbXBvbmVudCBjb250YWluZXIgaHRtbCBlbGVtZW50LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgSW5qZWN0aW9uU2VydmljZVxuICAgKi9cbiAgZ2V0Um9vdFZpZXdDb250YWluZXJOb2RlKGNvbXBvbmVudDogVmlld0NvbnRhaW5lclJlZiB8IENvbXBvbmVudFJlZjxhbnk+KTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmdldENvbXBvbmVudFJvb3ROb2RlKGNvbXBvbmVudCk7XG4gIH1cblxuICAvKipcbiAgICogUHJvamVjdHMgdGhlIGJpbmRpbmdzIG9udG8gdGhlIGNvbXBvbmVudFxuICAgKlxuICAgKiBAcGFyYW0gY29tcG9uZW50XG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBJbmplY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwcm9qZWN0Q29tcG9uZW50QmluZGluZ3MoY29tcG9uZW50OiBDb21wb25lbnRSZWY8YW55PiwgYmluZGluZ3M6IGFueSk6IENvbXBvbmVudFJlZjxhbnk+IHtcbiAgICBpZiAoYmluZGluZ3MpIHtcbiAgICAgIGlmIChiaW5kaW5ncy5pbnB1dHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBiaW5kaW5nS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGJpbmRpbmdzLmlucHV0cyk7XG4gICAgICAgIGZvciAoY29uc3QgYmluZGluZ05hbWUgb2YgYmluZGluZ0tleXMpIHtcbiAgICAgICAgICBjb21wb25lbnQuaW5zdGFuY2VbYmluZGluZ05hbWVdID0gYmluZGluZ3MuaW5wdXRzW2JpbmRpbmdOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYmluZGluZ3Mub3V0cHV0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50S2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGJpbmRpbmdzLm91dHB1dHMpO1xuICAgICAgICBmb3IgKGNvbnN0IGV2ZW50TmFtZSBvZiBldmVudEtleXMpIHtcbiAgICAgICAgICBjb21wb25lbnQuaW5zdGFuY2VbZXZlbnROYW1lXSA9IGJpbmRpbmdzLm91dHB1dHNbZXZlbnROYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb21wb25lbnQ7XG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kcyBhIGNvbXBvbmVudCB0byBhIGFkamFjZW50IGxvY2F0aW9uXG4gICAqXG4gICAqIEBwYXJhbSBjb21wb25lbnRDbGFzc1xuICAgKiBAcGFyYW0gW29wdGlvbnM9e31dXG4gICAqIEBwYXJhbSBbbG9jYXRpb25dXG4gICAqXG4gICAqIEBtZW1iZXJPZiBJbmplY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBhcHBlbmRDb21wb25lbnQ8VD4oY29tcG9uZW50Q2xhc3M6IFR5cGU8VD4sIGJpbmRpbmdzOiBhbnkgPSB7fSwgbG9jYXRpb24/OiBhbnkpOiBDb21wb25lbnRSZWY8YW55PiB7XG4gICAgaWYgKCFsb2NhdGlvbikgbG9jYXRpb24gPSB0aGlzLmdldFJvb3RWaWV3Q29udGFpbmVyKCk7XG4gICAgY29uc3QgYXBwZW5kTG9jYXRpb24gPSB0aGlzLmdldENvbXBvbmVudFJvb3ROb2RlKGxvY2F0aW9uKTtcblxuICAgIGNvbnN0IHBvcnRhbEhvc3QgPSBuZXcgRG9tUG9ydGFsT3V0bGV0KFxuICAgICAgYXBwZW5kTG9jYXRpb24sXG4gICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgIHRoaXMuYXBwbGljYXRpb25SZWYsXG4gICAgICB0aGlzLmluamVjdG9yXG4gICAgKTtcblxuICAgIGNvbnN0IHBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoY29tcG9uZW50Q2xhc3MpO1xuXG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gcG9ydGFsSG9zdC5hdHRhY2gocG9ydGFsKTtcbiAgICB0aGlzLnByb2plY3RDb21wb25lbnRCaW5kaW5ncyhjb21wb25lbnRSZWYsIGJpbmRpbmdzKTtcbiAgICByZXR1cm4gY29tcG9uZW50UmVmO1xuICB9XG59XG4iXX0=