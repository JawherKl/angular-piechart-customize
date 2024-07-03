import { Subject } from 'rxjs';
import { DraggableItem } from './draggable-item';
import * as i0 from "@angular/core";
export declare class DraggableItemService {
    private draggableItem?;
    private onCapture;
    dragStart(item: DraggableItem): void;
    getItem(): DraggableItem | undefined;
    captureItem(overZoneIndex: number, newIndex: number): DraggableItem | undefined;
    onCaptureItem(): Subject<DraggableItem>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DraggableItemService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DraggableItemService>;
}
