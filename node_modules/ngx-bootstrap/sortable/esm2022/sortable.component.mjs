import { Component, Input, Output, EventEmitter, forwardRef, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DraggableItemService } from './draggable-item.service';
import * as i0 from "@angular/core";
import * as i1 from "./draggable-item.service";
import * as i2 from "@angular/common";
export class SortableComponent {
    static { this.globalZoneIndex = 0; }
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = value;
        const out = this.items.map((x) => x.initData);
        this.onChanged(out);
        this.onChange.emit(out);
    }
    constructor(transfer) {
        /** class name for items wrapper */
        this.wrapperClass = '';
        /** style object for items wrapper */
        this.wrapperStyle = {};
        /** class name for item */
        this.itemClass = '';
        /** style object for item */
        this.itemStyle = {};
        /** class name for active item */
        this.itemActiveClass = '';
        /** style object for active item */
        this.itemActiveStyle = {};
        /** class name for placeholder */
        this.placeholderClass = '';
        /** style object for placeholder */
        this.placeholderStyle = {};
        /** placeholder item which will be shown if collection is empty */
        this.placeholderItem = '';
        /** fired on array change (reordering, insert, remove), same as <code>ngModelChange</code>.
         *  Returns new items collection as a payload.
         */
        this.onChange = new EventEmitter();
        this.showPlaceholder = false;
        this.activeItem = -1;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.onTouched = Function.prototype;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.onChanged = Function.prototype;
        this._items = [];
        this.transfer = transfer;
        this.currentZoneIndex = SortableComponent.globalZoneIndex++;
        this.transfer
            .onCaptureItem()
            .subscribe((item) => this.onDrop(item));
    }
    onItemDragstart(event, item, i) {
        this.initDragstartEvent(event);
        this.onTouched();
        this.transfer.dragStart({
            event,
            item,
            i,
            initialIndex: i,
            lastZoneIndex: this.currentZoneIndex,
            overZoneIndex: this.currentZoneIndex
        });
    }
    onItemDragover(event, i) {
        if (!this.transfer.getItem()) {
            return;
        }
        event.preventDefault();
        const dragItem = this.transfer.captureItem(this.currentZoneIndex, this.items.length);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let newArray = [];
        if (!dragItem) {
            return;
        }
        if (!this.items.length) {
            newArray = [dragItem.item];
        }
        else if (dragItem.i > i) {
            newArray = [
                ...this.items.slice(0, i),
                dragItem.item,
                ...this.items.slice(i, dragItem.i),
                ...this.items.slice(dragItem.i + 1)
            ];
        }
        else {
            // this.draggedItem.i < i
            newArray = [
                ...this.items.slice(0, dragItem.i),
                ...this.items.slice(dragItem.i + 1, i + 1),
                dragItem.item,
                ...this.items.slice(i + 1)
            ];
        }
        this.items = newArray;
        dragItem.i = i;
        this.activeItem = i;
        this.updatePlaceholderState();
    }
    cancelEvent(event) {
        if (!this.transfer.getItem() || !event) {
            return;
        }
        event.preventDefault();
    }
    onDrop(item) {
        if (item &&
            item.overZoneIndex !== this.currentZoneIndex &&
            item.lastZoneIndex === this.currentZoneIndex) {
            this.items = this.items.filter((x, i) => i !== item.i);
            this.updatePlaceholderState();
        }
        this.resetActiveItem();
    }
    resetActiveItem(event) {
        this.cancelEvent(event);
        this.activeItem = -1;
    }
    registerOnChange(callback) {
        this.onChanged = callback;
    }
    registerOnTouched(callback) {
        this.onTouched = callback;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    writeValue(value) {
        if (value) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.items = value.map((x, i) => ({
                id: i,
                initData: x,
                value: this.fieldName ? x[this.fieldName] : x
            }));
        }
        else {
            this.items = [];
        }
        this.updatePlaceholderState();
    }
    updatePlaceholderState() {
        this.showPlaceholder = !this._items.length;
    }
    getItemStyle(isActive) {
        return isActive
            ? Object.assign({}, this.itemStyle, this.itemActiveStyle)
            : this.itemStyle;
    }
    initDragstartEvent(event) {
        // it is necessary for mozilla
        // data type should be 'Text' instead of 'text/plain' to keep compatibility
        // with IE
        event.dataTransfer?.setData('Text', 'placeholder');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: SortableComponent, deps: [{ token: i1.DraggableItemService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.1.4", type: SortableComponent, selector: "bs-sortable", inputs: { fieldName: "fieldName", wrapperClass: "wrapperClass", wrapperStyle: "wrapperStyle", itemClass: "itemClass", itemStyle: "itemStyle", itemActiveClass: "itemActiveClass", itemActiveStyle: "itemActiveStyle", placeholderClass: "placeholderClass", placeholderStyle: "placeholderStyle", placeholderItem: "placeholderItem", itemTemplate: "itemTemplate" }, outputs: { onChange: "onChange" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => SortableComponent),
                multi: true
            }
        ], exportAs: ["bs-sortable"], ngImport: i0, template: `
<div
    [ngClass]="wrapperClass"
    [ngStyle]="wrapperStyle"
    (dragover)="cancelEvent($event)"
    (dragenter)="cancelEvent($event)"
    (drop)="resetActiveItem($event)"
    (mouseleave)="resetActiveItem($event)">
  <div
        *ngIf="showPlaceholder"
        [ngClass]="placeholderClass"
        [ngStyle]="placeholderStyle"
        (dragover)="onItemDragover($event, 0)"
        (dragenter)="cancelEvent($event)"
    >{{placeholderItem}}</div>
    <div
        *ngFor="let item of items; let i=index;"
        [ngClass]="[ itemClass, i === activeItem ? itemActiveClass : '' ]"
        [ngStyle]="getItemStyle(i === activeItem)"
        draggable="true"
        (dragstart)="onItemDragstart($event, item, i)"
        (dragend)="resetActiveItem($event)"
        (dragover)="onItemDragover($event, i)"
        (dragenter)="cancelEvent($event)"
        aria-dropeffect="move"
        [attr.aria-grabbed]="i === activeItem"
    ><ng-template [ngTemplateOutlet]="itemTemplate || defItemTemplate"
  [ngTemplateOutletContext]="{item:item, index: i}"></ng-template></div>
</div>

<ng-template #defItemTemplate let-item="item">{{item.value}}</ng-template>
`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: SortableComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bs-sortable',
                    exportAs: 'bs-sortable',
                    template: `
<div
    [ngClass]="wrapperClass"
    [ngStyle]="wrapperStyle"
    (dragover)="cancelEvent($event)"
    (dragenter)="cancelEvent($event)"
    (drop)="resetActiveItem($event)"
    (mouseleave)="resetActiveItem($event)">
  <div
        *ngIf="showPlaceholder"
        [ngClass]="placeholderClass"
        [ngStyle]="placeholderStyle"
        (dragover)="onItemDragover($event, 0)"
        (dragenter)="cancelEvent($event)"
    >{{placeholderItem}}</div>
    <div
        *ngFor="let item of items; let i=index;"
        [ngClass]="[ itemClass, i === activeItem ? itemActiveClass : '' ]"
        [ngStyle]="getItemStyle(i === activeItem)"
        draggable="true"
        (dragstart)="onItemDragstart($event, item, i)"
        (dragend)="resetActiveItem($event)"
        (dragover)="onItemDragover($event, i)"
        (dragenter)="cancelEvent($event)"
        aria-dropeffect="move"
        [attr.aria-grabbed]="i === activeItem"
    ><ng-template [ngTemplateOutlet]="itemTemplate || defItemTemplate"
  [ngTemplateOutletContext]="{item:item, index: i}"></ng-template></div>
</div>

<ng-template #defItemTemplate let-item="item">{{item.value}}</ng-template>
`,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => SortableComponent),
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.DraggableItemService }]; }, propDecorators: { fieldName: [{
                type: Input
            }], wrapperClass: [{
                type: Input
            }], wrapperStyle: [{
                type: Input
            }], itemClass: [{
                type: Input
            }], itemStyle: [{
                type: Input
            }], itemActiveClass: [{
                type: Input
            }], itemActiveStyle: [{
                type: Input
            }], placeholderClass: [{
                type: Input
            }], placeholderStyle: [{
                type: Input
            }], placeholderItem: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], onChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NvcnRhYmxlL3NvcnRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7O0FBNkNoRSxNQUFNLE9BQU8saUJBQWlCO2FBQ2Isb0JBQWUsR0FBRyxDQUFDLEFBQUosQ0FBSztJQTBDbkMsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFxQjtRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQVdELFlBQVksUUFBOEI7UUExRDFDLG1DQUFtQztRQUMxQixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUUzQixxQ0FBcUM7UUFDNUIsaUJBQVksR0FBMkIsRUFBRSxDQUFDO1FBRW5ELDBCQUEwQjtRQUNqQixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXhCLDRCQUE0QjtRQUNuQixjQUFTLEdBQTJCLEVBQUUsQ0FBQztRQUVoRCxpQ0FBaUM7UUFDeEIsb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFFOUIsbUNBQW1DO1FBQzFCLG9CQUFlLEdBQTJCLEVBQUUsQ0FBQztRQUV0RCxpQ0FBaUM7UUFDeEIscUJBQWdCLEdBQUcsRUFBRSxDQUFDO1FBRS9CLG1DQUFtQztRQUMxQixxQkFBZ0IsR0FBMkIsRUFBRSxDQUFDO1FBRXZELGtFQUFrRTtRQUN6RCxvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUs5Qjs7V0FFRztRQUNPLGFBQVEsR0FBNEIsSUFBSSxZQUFZLEVBQWEsQ0FBQztRQUU1RSxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixlQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFhaEIsOERBQThEO1FBQzlELGNBQVMsR0FBUSxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQ3BDLDhEQUE4RDtRQUM5RCxjQUFTLEdBQVEsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUk1QixXQUFNLEdBQW1CLEVBQUUsQ0FBQztRQUdsQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDNUQsSUFBSSxDQUFDLFFBQVE7YUFDVixhQUFhLEVBQUU7YUFDZixTQUFTLENBQUMsQ0FBQyxJQUFtQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELGVBQWUsQ0FDYixLQUFnQixFQUNoQixJQUFrQixFQUNsQixDQUFTO1FBRVQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztZQUN0QixLQUFLO1lBQ0wsSUFBSTtZQUNKLENBQUM7WUFDRCxZQUFZLEVBQUUsQ0FBQztZQUNmLGFBQWEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQ3BDLGFBQWEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1NBQ3JDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxjQUFjLENBQUMsS0FBZ0IsRUFBRSxDQUFTO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzVCLE9BQU87U0FDUjtRQUNELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FDeEMsSUFBSSxDQUFDLGdCQUFnQixFQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDbEIsQ0FBQztRQUVGLDhEQUE4RDtRQUM5RCxJQUFJLFFBQVEsR0FBVSxFQUFFLENBQUM7UUFFekIsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUN0QixRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7YUFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLFFBQVEsR0FBRztnQkFDVCxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pCLFFBQVEsQ0FBQyxJQUFJO2dCQUNiLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDcEMsQ0FBQztTQUNIO2FBQU07WUFDTCx5QkFBeUI7WUFDekIsUUFBUSxHQUFHO2dCQUNULEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDMUMsUUFBUSxDQUFDLElBQUk7Z0JBQ2IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNCLENBQUM7U0FDSDtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQ3RCLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUE0QjtRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN0QyxPQUFPO1NBQ1I7UUFDRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFtQjtRQUN4QixJQUNFLElBQUk7WUFDSixJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxnQkFBZ0I7WUFDNUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsZ0JBQWdCLEVBQzVDO1lBQ0EsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDNUIsQ0FBQyxDQUFlLEVBQUUsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FDN0MsQ0FBQztZQUNGLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxlQUFlLENBQUMsS0FBNEI7UUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxRQUFvQjtRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUM1QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsUUFBb0I7UUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDNUIsQ0FBQztJQUVELDhEQUE4RDtJQUM5RCxVQUFVLENBQUMsS0FBWTtRQUNyQixJQUFJLEtBQUssRUFBRTtZQUNULDhEQUE4RDtZQUM5RCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFNLEVBQUUsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUM3QyxFQUFFLEVBQUUsQ0FBQztnQkFDTCxRQUFRLEVBQUUsQ0FBQztnQkFDWCxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5QyxDQUFDLENBQUMsQ0FBQztTQUNMO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUNqQjtRQUNELElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxzQkFBc0I7UUFDcEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQzdDLENBQUM7SUFFRCxZQUFZLENBQUMsUUFBaUI7UUFDNUIsT0FBTyxRQUFRO1lBQ2IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUN6RCxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRU8sa0JBQWtCLENBQUMsS0FBZ0I7UUFDekMsOEJBQThCO1FBQzlCLDJFQUEyRTtRQUMzRSxVQUFVO1FBQ1YsS0FBSyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3JELENBQUM7OEdBak1VLGlCQUFpQjtrR0FBakIsaUJBQWlCLCthQVJqQjtZQUNUO2dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUM7Z0JBQ2hELEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRixxREF0Q1M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0ErQlg7OzJGQVNZLGlCQUFpQjtrQkEzQzdCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0ErQlg7b0JBQ0MsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDOzRCQUNoRCxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtpQkFDRjsyR0FJVSxTQUFTO3NCQUFqQixLQUFLO2dCQUdHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBR0csWUFBWTtzQkFBcEIsS0FBSztnQkFHRyxTQUFTO3NCQUFqQixLQUFLO2dCQUdHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBR0csZUFBZTtzQkFBdkIsS0FBSztnQkFHRyxlQUFlO3NCQUF2QixLQUFLO2dCQUdHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFHRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBR0csZUFBZTtzQkFBdkIsS0FBSztnQkFHRyxZQUFZO3NCQUFwQixLQUFLO2dCQUtJLFFBQVE7c0JBQWpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEcmFnZ2FibGVJdGVtIH0gZnJvbSAnLi9kcmFnZ2FibGUtaXRlbSc7XG5pbXBvcnQgeyBEcmFnZ2FibGVJdGVtU2VydmljZSB9IGZyb20gJy4vZHJhZ2dhYmxlLWl0ZW0uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JzLXNvcnRhYmxlJyxcbiAgZXhwb3J0QXM6ICdicy1zb3J0YWJsZScsXG4gIHRlbXBsYXRlOiBgXG48ZGl2XG4gICAgW25nQ2xhc3NdPVwid3JhcHBlckNsYXNzXCJcbiAgICBbbmdTdHlsZV09XCJ3cmFwcGVyU3R5bGVcIlxuICAgIChkcmFnb3Zlcik9XCJjYW5jZWxFdmVudCgkZXZlbnQpXCJcbiAgICAoZHJhZ2VudGVyKT1cImNhbmNlbEV2ZW50KCRldmVudClcIlxuICAgIChkcm9wKT1cInJlc2V0QWN0aXZlSXRlbSgkZXZlbnQpXCJcbiAgICAobW91c2VsZWF2ZSk9XCJyZXNldEFjdGl2ZUl0ZW0oJGV2ZW50KVwiPlxuICA8ZGl2XG4gICAgICAgICpuZ0lmPVwic2hvd1BsYWNlaG9sZGVyXCJcbiAgICAgICAgW25nQ2xhc3NdPVwicGxhY2Vob2xkZXJDbGFzc1wiXG4gICAgICAgIFtuZ1N0eWxlXT1cInBsYWNlaG9sZGVyU3R5bGVcIlxuICAgICAgICAoZHJhZ292ZXIpPVwib25JdGVtRHJhZ292ZXIoJGV2ZW50LCAwKVwiXG4gICAgICAgIChkcmFnZW50ZXIpPVwiY2FuY2VsRXZlbnQoJGV2ZW50KVwiXG4gICAgPnt7cGxhY2Vob2xkZXJJdGVtfX08L2Rpdj5cbiAgICA8ZGl2XG4gICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zOyBsZXQgaT1pbmRleDtcIlxuICAgICAgICBbbmdDbGFzc109XCJbIGl0ZW1DbGFzcywgaSA9PT0gYWN0aXZlSXRlbSA/IGl0ZW1BY3RpdmVDbGFzcyA6ICcnIF1cIlxuICAgICAgICBbbmdTdHlsZV09XCJnZXRJdGVtU3R5bGUoaSA9PT0gYWN0aXZlSXRlbSlcIlxuICAgICAgICBkcmFnZ2FibGU9XCJ0cnVlXCJcbiAgICAgICAgKGRyYWdzdGFydCk9XCJvbkl0ZW1EcmFnc3RhcnQoJGV2ZW50LCBpdGVtLCBpKVwiXG4gICAgICAgIChkcmFnZW5kKT1cInJlc2V0QWN0aXZlSXRlbSgkZXZlbnQpXCJcbiAgICAgICAgKGRyYWdvdmVyKT1cIm9uSXRlbURyYWdvdmVyKCRldmVudCwgaSlcIlxuICAgICAgICAoZHJhZ2VudGVyKT1cImNhbmNlbEV2ZW50KCRldmVudClcIlxuICAgICAgICBhcmlhLWRyb3BlZmZlY3Q9XCJtb3ZlXCJcbiAgICAgICAgW2F0dHIuYXJpYS1ncmFiYmVkXT1cImkgPT09IGFjdGl2ZUl0ZW1cIlxuICAgID48bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiaXRlbVRlbXBsYXRlIHx8IGRlZkl0ZW1UZW1wbGF0ZVwiXG4gIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7aXRlbTppdGVtLCBpbmRleDogaX1cIj48L25nLXRlbXBsYXRlPjwvZGl2PlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjZGVmSXRlbVRlbXBsYXRlIGxldC1pdGVtPVwiaXRlbVwiPnt7aXRlbS52YWx1ZX19PC9uZy10ZW1wbGF0ZT5cbmAsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU29ydGFibGVDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU29ydGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIHByaXZhdGUgc3RhdGljIGdsb2JhbFpvbmVJbmRleCA9IDA7XG4gIC8qKiBmaWVsZCBuYW1lIGlmIGlucHV0IGFycmF5IGNvbnNpc3RzIG9mIG9iamVjdHMgKi9cbiAgQElucHV0KCkgZmllbGROYW1lPzogc3RyaW5nO1xuXG4gIC8qKiBjbGFzcyBuYW1lIGZvciBpdGVtcyB3cmFwcGVyICovXG4gIEBJbnB1dCgpIHdyYXBwZXJDbGFzcyA9ICcnO1xuXG4gIC8qKiBzdHlsZSBvYmplY3QgZm9yIGl0ZW1zIHdyYXBwZXIgKi9cbiAgQElucHV0KCkgd3JhcHBlclN0eWxlOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG5cbiAgLyoqIGNsYXNzIG5hbWUgZm9yIGl0ZW0gKi9cbiAgQElucHV0KCkgaXRlbUNsYXNzID0gJyc7XG5cbiAgLyoqIHN0eWxlIG9iamVjdCBmb3IgaXRlbSAqL1xuICBASW5wdXQoKSBpdGVtU3R5bGU6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcblxuICAvKiogY2xhc3MgbmFtZSBmb3IgYWN0aXZlIGl0ZW0gKi9cbiAgQElucHV0KCkgaXRlbUFjdGl2ZUNsYXNzID0gJyc7XG5cbiAgLyoqIHN0eWxlIG9iamVjdCBmb3IgYWN0aXZlIGl0ZW0gKi9cbiAgQElucHV0KCkgaXRlbUFjdGl2ZVN0eWxlOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG5cbiAgLyoqIGNsYXNzIG5hbWUgZm9yIHBsYWNlaG9sZGVyICovXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyQ2xhc3MgPSAnJztcblxuICAvKiogc3R5bGUgb2JqZWN0IGZvciBwbGFjZWhvbGRlciAqL1xuICBASW5wdXQoKSBwbGFjZWhvbGRlclN0eWxlOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG5cbiAgLyoqIHBsYWNlaG9sZGVyIGl0ZW0gd2hpY2ggd2lsbCBiZSBzaG93biBpZiBjb2xsZWN0aW9uIGlzIGVtcHR5ICovXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVySXRlbSA9ICcnO1xuXG4gIC8qKiB1c2VkIHRvIHNwZWNpZnkgYSBjdXN0b20gaXRlbSB0ZW1wbGF0ZS4gVGVtcGxhdGUgdmFyaWFibGVzOiBpdGVtIGFuZCBpbmRleDsgKi9cbiAgQElucHV0KCkgaXRlbVRlbXBsYXRlPzogVGVtcGxhdGVSZWY8dW5rbm93bj47XG5cbiAgLyoqIGZpcmVkIG9uIGFycmF5IGNoYW5nZSAocmVvcmRlcmluZywgaW5zZXJ0LCByZW1vdmUpLCBzYW1lIGFzIDxjb2RlPm5nTW9kZWxDaGFuZ2U8L2NvZGU+LlxuICAgKiAgUmV0dXJucyBuZXcgaXRlbXMgY29sbGVjdGlvbiBhcyBhIHBheWxvYWQuXG4gICAqL1xuICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjx1bmtub3duW10+ID0gbmV3IEV2ZW50RW1pdHRlcjx1bmtub3duW10+KCk7XG5cbiAgc2hvd1BsYWNlaG9sZGVyID0gZmFsc2U7XG4gIGFjdGl2ZUl0ZW0gPSAtMTtcblxuICBnZXQgaXRlbXMoKTogU29ydGFibGVJdGVtW10ge1xuICAgIHJldHVybiB0aGlzLl9pdGVtcztcbiAgfVxuXG4gIHNldCBpdGVtcyh2YWx1ZTogU29ydGFibGVJdGVtW10pIHtcbiAgICB0aGlzLl9pdGVtcyA9IHZhbHVlO1xuICAgIGNvbnN0IG91dCA9IHRoaXMuaXRlbXMubWFwKCh4OiBTb3J0YWJsZUl0ZW0pID0+IHguaW5pdERhdGEpO1xuICAgIHRoaXMub25DaGFuZ2VkKG91dCk7XG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KG91dCk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBvblRvdWNoZWQ6IGFueSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgb25DaGFuZ2VkOiBhbnkgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbiAgcHJpdmF0ZSB0cmFuc2ZlcjogRHJhZ2dhYmxlSXRlbVNlcnZpY2U7XG4gIHByaXZhdGUgY3VycmVudFpvbmVJbmRleDogbnVtYmVyO1xuICBwcml2YXRlIF9pdGVtczogU29ydGFibGVJdGVtW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcih0cmFuc2ZlcjogRHJhZ2dhYmxlSXRlbVNlcnZpY2UpIHtcbiAgICB0aGlzLnRyYW5zZmVyID0gdHJhbnNmZXI7XG4gICAgdGhpcy5jdXJyZW50Wm9uZUluZGV4ID0gU29ydGFibGVDb21wb25lbnQuZ2xvYmFsWm9uZUluZGV4Kys7XG4gICAgdGhpcy50cmFuc2ZlclxuICAgICAgLm9uQ2FwdHVyZUl0ZW0oKVxuICAgICAgLnN1YnNjcmliZSgoaXRlbTogRHJhZ2dhYmxlSXRlbSkgPT4gdGhpcy5vbkRyb3AoaXRlbSkpO1xuICB9XG5cbiAgb25JdGVtRHJhZ3N0YXJ0KFxuICAgIGV2ZW50OiBEcmFnRXZlbnQsXG4gICAgaXRlbTogU29ydGFibGVJdGVtLFxuICAgIGk6IG51bWJlclxuICApOiB2b2lkIHtcbiAgICB0aGlzLmluaXREcmFnc3RhcnRFdmVudChldmVudCk7XG4gICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB0aGlzLnRyYW5zZmVyLmRyYWdTdGFydCh7XG4gICAgICBldmVudCxcbiAgICAgIGl0ZW0sXG4gICAgICBpLFxuICAgICAgaW5pdGlhbEluZGV4OiBpLFxuICAgICAgbGFzdFpvbmVJbmRleDogdGhpcy5jdXJyZW50Wm9uZUluZGV4LFxuICAgICAgb3ZlclpvbmVJbmRleDogdGhpcy5jdXJyZW50Wm9uZUluZGV4XG4gICAgfSk7XG4gIH1cblxuICBvbkl0ZW1EcmFnb3ZlcihldmVudDogRHJhZ0V2ZW50LCBpOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudHJhbnNmZXIuZ2V0SXRlbSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZHJhZ0l0ZW0gPSB0aGlzLnRyYW5zZmVyLmNhcHR1cmVJdGVtKFxuICAgICAgdGhpcy5jdXJyZW50Wm9uZUluZGV4LFxuICAgICAgdGhpcy5pdGVtcy5sZW5ndGhcbiAgICApO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBsZXQgbmV3QXJyYXk6IGFueVtdID0gW107XG5cbiAgICBpZiAoIWRyYWdJdGVtKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgbmV3QXJyYXkgPSBbZHJhZ0l0ZW0uaXRlbV07XG4gICAgfSBlbHNlIGlmIChkcmFnSXRlbS5pID4gaSkge1xuICAgICAgbmV3QXJyYXkgPSBbXG4gICAgICAgIC4uLnRoaXMuaXRlbXMuc2xpY2UoMCwgaSksXG4gICAgICAgIGRyYWdJdGVtLml0ZW0sXG4gICAgICAgIC4uLnRoaXMuaXRlbXMuc2xpY2UoaSwgZHJhZ0l0ZW0uaSksXG4gICAgICAgIC4uLnRoaXMuaXRlbXMuc2xpY2UoZHJhZ0l0ZW0uaSArIDEpXG4gICAgICBdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGlzLmRyYWdnZWRJdGVtLmkgPCBpXG4gICAgICBuZXdBcnJheSA9IFtcbiAgICAgICAgLi4udGhpcy5pdGVtcy5zbGljZSgwLCBkcmFnSXRlbS5pKSxcbiAgICAgICAgLi4udGhpcy5pdGVtcy5zbGljZShkcmFnSXRlbS5pICsgMSwgaSArIDEpLFxuICAgICAgICBkcmFnSXRlbS5pdGVtLFxuICAgICAgICAuLi50aGlzLml0ZW1zLnNsaWNlKGkgKyAxKVxuICAgICAgXTtcbiAgICB9XG4gICAgdGhpcy5pdGVtcyA9IG5ld0FycmF5O1xuICAgIGRyYWdJdGVtLmkgPSBpO1xuICAgIHRoaXMuYWN0aXZlSXRlbSA9IGk7XG4gICAgdGhpcy51cGRhdGVQbGFjZWhvbGRlclN0YXRlKCk7XG4gIH1cblxuICBjYW5jZWxFdmVudChldmVudD86IERyYWdFdmVudHxNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnRyYW5zZmVyLmdldEl0ZW0oKSB8fCAhZXZlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIG9uRHJvcChpdGVtOiBEcmFnZ2FibGVJdGVtKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgaXRlbSAmJlxuICAgICAgaXRlbS5vdmVyWm9uZUluZGV4ICE9PSB0aGlzLmN1cnJlbnRab25lSW5kZXggJiZcbiAgICAgIGl0ZW0ubGFzdFpvbmVJbmRleCA9PT0gdGhpcy5jdXJyZW50Wm9uZUluZGV4XG4gICAgKSB7XG4gICAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIoXG4gICAgICAgICh4OiBTb3J0YWJsZUl0ZW0sIGk6IG51bWJlcikgPT4gaSAhPT0gaXRlbS5pXG4gICAgICApO1xuICAgICAgdGhpcy51cGRhdGVQbGFjZWhvbGRlclN0YXRlKCk7XG4gICAgfVxuICAgIHRoaXMucmVzZXRBY3RpdmVJdGVtKCk7XG4gIH1cblxuICByZXNldEFjdGl2ZUl0ZW0oZXZlbnQ/OiBEcmFnRXZlbnR8TW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuY2FuY2VsRXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuYWN0aXZlSXRlbSA9IC0xO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2VkID0gY2FsbGJhY2s7XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gY2FsbGJhY2s7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnlbXSk6IHZvaWQge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgIHRoaXMuaXRlbXMgPSB2YWx1ZS5tYXAoKHg6IGFueSwgaTogbnVtYmVyKSA9PiAoe1xuICAgICAgICBpZDogaSxcbiAgICAgICAgaW5pdERhdGE6IHgsXG4gICAgICAgIHZhbHVlOiB0aGlzLmZpZWxkTmFtZSA/IHhbdGhpcy5maWVsZE5hbWVdIDogeFxuICAgICAgfSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgfVxuICAgIHRoaXMudXBkYXRlUGxhY2Vob2xkZXJTdGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlUGxhY2Vob2xkZXJTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dQbGFjZWhvbGRlciA9ICF0aGlzLl9pdGVtcy5sZW5ndGg7XG4gIH1cblxuICBnZXRJdGVtU3R5bGUoaXNBY3RpdmU6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gaXNBY3RpdmVcbiAgICAgID8gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5pdGVtU3R5bGUsIHRoaXMuaXRlbUFjdGl2ZVN0eWxlKVxuICAgICAgOiB0aGlzLml0ZW1TdHlsZTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdERyYWdzdGFydEV2ZW50KGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICAvLyBpdCBpcyBuZWNlc3NhcnkgZm9yIG1vemlsbGFcbiAgICAvLyBkYXRhIHR5cGUgc2hvdWxkIGJlICdUZXh0JyBpbnN0ZWFkIG9mICd0ZXh0L3BsYWluJyB0byBrZWVwIGNvbXBhdGliaWxpdHlcbiAgICAvLyB3aXRoIElFXG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyPy5zZXREYXRhKCdUZXh0JywgJ3BsYWNlaG9sZGVyJyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFNvcnRhYmxlSXRlbSB7XG4gIGlkOiBudW1iZXI7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIGluaXREYXRhOiBhbnk7XG59XG4iXX0=