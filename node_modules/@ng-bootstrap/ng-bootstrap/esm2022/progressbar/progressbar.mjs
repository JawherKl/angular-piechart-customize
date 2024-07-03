import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, HostBinding } from '@angular/core';
import { getValueInRange, isNumber } from '../util/util';
import { NgIf, PercentPipe } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./progressbar-config";
/**
 * A directive that provides feedback on the progress of a workflow or an action.
 */
class NgbProgressbar {
    /**
     * The maximal value to be displayed in the progress bar.
     *
     * Should be a positive number. Will default to 100 otherwise.
     */
    set max(max) {
        this._max = !isNumber(max) || max <= 0 ? 100 : max;
    }
    get max() {
        return this._max;
    }
    constructor(config) {
        /**
         * The current value for the progress bar.
         *
         * Should be in the `[0, max]` range.
         */
        this.value = 0;
        this.max = config.max;
        this.animated = config.animated;
        this.ariaLabel = config.ariaLabel;
        this.striped = config.striped;
        this.textType = config.textType;
        this.type = config.type;
        this.showValue = config.showValue;
        this.height = config.height;
    }
    getValue() {
        return getValueInRange(this.value, this.max);
    }
    getPercentValue() {
        return (100 * this.getValue()) / this.max;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbProgressbar, deps: [{ token: i1.NgbProgressbarConfig }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.6", type: NgbProgressbar, isStandalone: true, selector: "ngb-progressbar", inputs: { max: "max", animated: "animated", ariaLabel: "ariaLabel", striped: "striped", showValue: "showValue", textType: "textType", type: "type", value: "value", height: "height" }, host: { attributes: { "role": "progressbar", "aria-valuemin": "0" }, properties: { "attr.aria-valuenow": "getValue()", "attr.aria-valuemax": "max", "attr.aria-label": "ariaLabel", "style.height": "this.height" }, classAttribute: "progress" }, ngImport: i0, template: `
		<div
			class="progress-bar{{ type ? (textType ? ' bg-' + type : ' text-bg-' + type) : '' }}{{
				textType ? ' text-' + textType : ''
			}}"
			[class.progress-bar-animated]="animated"
			[class.progress-bar-striped]="striped"
			[style.width.%]="getPercentValue()"
		>
			<span *ngIf="showValue" i18n="@@ngb.progressbar.value">{{ getValue() / max | percent }}</span
			><ng-content></ng-content>
		</div>
	`, isInline: true, dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: PercentPipe, name: "percent" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgbProgressbar };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbProgressbar, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-progressbar',
                    standalone: true,
                    imports: [NgIf, PercentPipe],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'progress',
                        role: 'progressbar',
                        '[attr.aria-valuenow]': 'getValue()',
                        'aria-valuemin': '0',
                        '[attr.aria-valuemax]': 'max',
                        '[attr.aria-label]': 'ariaLabel',
                    },
                    template: `
		<div
			class="progress-bar{{ type ? (textType ? ' bg-' + type : ' text-bg-' + type) : '' }}{{
				textType ? ' text-' + textType : ''
			}}"
			[class.progress-bar-animated]="animated"
			[class.progress-bar-striped]="striped"
			[style.width.%]="getPercentValue()"
		>
			<span *ngIf="showValue" i18n="@@ngb.progressbar.value">{{ getValue() / max | percent }}</span
			><ng-content></ng-content>
		</div>
	`,
                }]
        }], ctorParameters: function () { return [{ type: i1.NgbProgressbarConfig }]; }, propDecorators: { max: [{
                type: Input
            }], animated: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], striped: [{
                type: Input
            }], showValue: [{
                type: Input
            }], textType: [{
                type: Input
            }], type: [{
                type: Input
            }], value: [{
                type: Input,
                args: [{ required: true }]
            }], height: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['style.height']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXpELE9BQU8sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQUVwRDs7R0FFRztBQUNILE1BNEJhLGNBQWM7SUFHMUI7Ozs7T0FJRztJQUNILElBQ0ksR0FBRyxDQUFDLEdBQVc7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNwRCxDQUFDO0lBRUQsSUFBSSxHQUFHO1FBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ2xCLENBQUM7SUEwREQsWUFBWSxNQUE0QjtRQWR4Qzs7OztXQUlHO1FBQ3dCLFVBQUssR0FBRyxDQUFDLENBQUM7UUFVcEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUM3QixDQUFDO0lBRUQsUUFBUTtRQUNQLE9BQU8sZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxlQUFlO1FBQ2QsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQzNDLENBQUM7OEdBMUZXLGNBQWM7a0dBQWQsY0FBYyxzZkFkaEI7Ozs7Ozs7Ozs7OztFQVlULDREQXZCUyxJQUFJLHdGQUFFLFdBQVc7O1NBeUJmLGNBQWM7MkZBQWQsY0FBYztrQkE1QjFCLFNBQVM7bUJBQUM7b0JBQ1YsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUM7b0JBQzVCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsSUFBSSxFQUFFO3dCQUNMLEtBQUssRUFBRSxVQUFVO3dCQUNqQixJQUFJLEVBQUUsYUFBYTt3QkFDbkIsc0JBQXNCLEVBQUUsWUFBWTt3QkFDcEMsZUFBZSxFQUFFLEdBQUc7d0JBQ3BCLHNCQUFzQixFQUFFLEtBQUs7d0JBQzdCLG1CQUFtQixFQUFFLFdBQVc7cUJBQ2hDO29CQUNELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O0VBWVQ7aUJBQ0Q7MkdBVUksR0FBRztzQkFETixLQUFLO2dCQWNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBT0csU0FBUztzQkFBakIsS0FBSztnQkFLRyxPQUFPO3NCQUFmLEtBQUs7Z0JBS0csU0FBUztzQkFBakIsS0FBSztnQkFVRyxRQUFRO3NCQUFoQixLQUFLO2dCQVFHLElBQUk7c0JBQVosS0FBSztnQkFPcUIsS0FBSztzQkFBL0IsS0FBSzt1QkFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7Z0JBT2EsTUFBTTtzQkFBM0MsS0FBSzs7c0JBQUksV0FBVzt1QkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZ2V0VmFsdWVJblJhbmdlLCBpc051bWJlciB9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQgeyBOZ2JQcm9ncmVzc2JhckNvbmZpZyB9IGZyb20gJy4vcHJvZ3Jlc3NiYXItY29uZmlnJztcbmltcG9ydCB7IE5nSWYsIFBlcmNlbnRQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHByb3ZpZGVzIGZlZWRiYWNrIG9uIHRoZSBwcm9ncmVzcyBvZiBhIHdvcmtmbG93IG9yIGFuIGFjdGlvbi5cbiAqL1xuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnbmdiLXByb2dyZXNzYmFyJyxcblx0c3RhbmRhbG9uZTogdHJ1ZSxcblx0aW1wb3J0czogW05nSWYsIFBlcmNlbnRQaXBlXSxcblx0Y2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG5cdGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG5cdGhvc3Q6IHtcblx0XHRjbGFzczogJ3Byb2dyZXNzJyxcblx0XHRyb2xlOiAncHJvZ3Jlc3NiYXInLFxuXHRcdCdbYXR0ci5hcmlhLXZhbHVlbm93XSc6ICdnZXRWYWx1ZSgpJyxcblx0XHQnYXJpYS12YWx1ZW1pbic6ICcwJyxcblx0XHQnW2F0dHIuYXJpYS12YWx1ZW1heF0nOiAnbWF4Jyxcblx0XHQnW2F0dHIuYXJpYS1sYWJlbF0nOiAnYXJpYUxhYmVsJyxcblx0fSxcblx0dGVtcGxhdGU6IGBcblx0XHQ8ZGl2XG5cdFx0XHRjbGFzcz1cInByb2dyZXNzLWJhcnt7IHR5cGUgPyAodGV4dFR5cGUgPyAnIGJnLScgKyB0eXBlIDogJyB0ZXh0LWJnLScgKyB0eXBlKSA6ICcnIH19e3tcblx0XHRcdFx0dGV4dFR5cGUgPyAnIHRleHQtJyArIHRleHRUeXBlIDogJydcblx0XHRcdH19XCJcblx0XHRcdFtjbGFzcy5wcm9ncmVzcy1iYXItYW5pbWF0ZWRdPVwiYW5pbWF0ZWRcIlxuXHRcdFx0W2NsYXNzLnByb2dyZXNzLWJhci1zdHJpcGVkXT1cInN0cmlwZWRcIlxuXHRcdFx0W3N0eWxlLndpZHRoLiVdPVwiZ2V0UGVyY2VudFZhbHVlKClcIlxuXHRcdD5cblx0XHRcdDxzcGFuICpuZ0lmPVwic2hvd1ZhbHVlXCIgaTE4bj1cIkBAbmdiLnByb2dyZXNzYmFyLnZhbHVlXCI+e3sgZ2V0VmFsdWUoKSAvIG1heCB8IHBlcmNlbnQgfX08L3NwYW5cblx0XHRcdD48bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cdFx0PC9kaXY+XG5cdGAsXG59KVxuZXhwb3J0IGNsYXNzIE5nYlByb2dyZXNzYmFyIHtcblx0cHJpdmF0ZSBfbWF4OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBtYXhpbWFsIHZhbHVlIHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgcHJvZ3Jlc3MgYmFyLlxuXHQgKlxuXHQgKiBTaG91bGQgYmUgYSBwb3NpdGl2ZSBudW1iZXIuIFdpbGwgZGVmYXVsdCB0byAxMDAgb3RoZXJ3aXNlLlxuXHQgKi9cblx0QElucHV0KClcblx0c2V0IG1heChtYXg6IG51bWJlcikge1xuXHRcdHRoaXMuX21heCA9ICFpc051bWJlcihtYXgpIHx8IG1heCA8PSAwID8gMTAwIDogbWF4O1xuXHR9XG5cblx0Z2V0IG1heCgpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLl9tYXg7XG5cdH1cblxuXHQvKipcblx0ICogSWYgYHRydWVgLCB0aGUgc3RyaXBlcyBvbiB0aGUgcHJvZ3Jlc3MgYmFyIGFyZSBhbmltYXRlZC5cblx0ICpcblx0ICogVGFrZXMgZWZmZWN0IG9ubHkgZm9yIGJyb3dzZXJzIHN1cHBvcnRpbmcgQ1NTMyBhbmltYXRpb25zLCBhbmQgaWYgYHN0cmlwZWRgIGlzIGB0cnVlYC5cblx0ICovXG5cdEBJbnB1dCgpIGFuaW1hdGVkOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGUgYWNjZXNzaWJsZSBwcm9ncmVzcyBiYXIgbmFtZS5cblx0ICpcblx0ICogQHNpbmNlIDEzLjEuMFxuXHQgKi9cblx0QElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgdGhlIHByb2dyZXNzIGJhcnMgd2lsbCBiZSBkaXNwbGF5ZWQgYXMgc3RyaXBlZC5cblx0ICovXG5cdEBJbnB1dCgpIHN0cmlwZWQ6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIElmIGB0cnVlYCwgdGhlIGN1cnJlbnQgcGVyY2VudGFnZSB3aWxsIGJlIHNob3duIGluIHRoZSBgeHglYCBmb3JtYXQuXG5cdCAqL1xuXHRASW5wdXQoKSBzaG93VmFsdWU6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIE9wdGlvbmFsIHRleHQgdmFyaWFudCB0eXBlIG9mIHRoZSBwcm9ncmVzcyBiYXIuXG5cdCAqXG5cdCAqIFN1cHBvcnRzIHR5cGVzIGJhc2VkIG9uIEJvb3RzdHJhcCBiYWNrZ3JvdW5kIGNvbG9yIHZhcmlhbnRzLCBsaWtlOlxuXHQgKiAgYFwic3VjY2Vzc1wiYCwgYFwiaW5mb1wiYCwgYFwid2FybmluZ1wiYCwgYFwiZGFuZ2VyXCJgLCBgXCJwcmltYXJ5XCJgLCBgXCJzZWNvbmRhcnlcImAsIGBcImRhcmtcImAgYW5kIHNvIG9uLlxuXHQgKlxuXHQgKiBAc2luY2UgNS4yLjBcblx0ICovXG5cdEBJbnB1dCgpIHRleHRUeXBlOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSB0eXBlIG9mIHRoZSBwcm9ncmVzcyBiYXIuXG5cdCAqXG5cdCAqIFN1cHBvcnRzIHR5cGVzIGJhc2VkIG9uIEJvb3RzdHJhcCBiYWNrZ3JvdW5kIGNvbG9yIHZhcmlhbnRzLCBsaWtlOlxuXHQgKiAgYFwic3VjY2Vzc1wiYCwgYFwiaW5mb1wiYCwgYFwid2FybmluZ1wiYCwgYFwiZGFuZ2VyXCJgLCBgXCJwcmltYXJ5XCJgLCBgXCJzZWNvbmRhcnlcImAsIGBcImRhcmtcImAgYW5kIHNvIG9uLlxuXHQgKi9cblx0QElucHV0KCkgdHlwZTogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgY3VycmVudCB2YWx1ZSBmb3IgdGhlIHByb2dyZXNzIGJhci5cblx0ICpcblx0ICogU2hvdWxkIGJlIGluIHRoZSBgWzAsIG1heF1gIHJhbmdlLlxuXHQgKi9cblx0QElucHV0KHsgcmVxdWlyZWQ6IHRydWUgfSkgdmFsdWUgPSAwO1xuXG5cdC8qKlxuXHQgKiBUaGUgaGVpZ2h0IG9mIHRoZSBwcm9ncmVzcyBiYXIuXG5cdCAqXG5cdCAqIEFjY2VwdHMgYW55IHZhbGlkIENTUyBoZWlnaHQgdmFsdWVzLCBleC4gYFwiMnJlbVwiYFxuXHQgKi9cblx0QElucHV0KCkgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQnKSBoZWlnaHQ6IHN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcihjb25maWc6IE5nYlByb2dyZXNzYmFyQ29uZmlnKSB7XG5cdFx0dGhpcy5tYXggPSBjb25maWcubWF4O1xuXHRcdHRoaXMuYW5pbWF0ZWQgPSBjb25maWcuYW5pbWF0ZWQ7XG5cdFx0dGhpcy5hcmlhTGFiZWwgPSBjb25maWcuYXJpYUxhYmVsO1xuXHRcdHRoaXMuc3RyaXBlZCA9IGNvbmZpZy5zdHJpcGVkO1xuXHRcdHRoaXMudGV4dFR5cGUgPSBjb25maWcudGV4dFR5cGU7XG5cdFx0dGhpcy50eXBlID0gY29uZmlnLnR5cGU7XG5cdFx0dGhpcy5zaG93VmFsdWUgPSBjb25maWcuc2hvd1ZhbHVlO1xuXHRcdHRoaXMuaGVpZ2h0ID0gY29uZmlnLmhlaWdodDtcblx0fVxuXG5cdGdldFZhbHVlKCkge1xuXHRcdHJldHVybiBnZXRWYWx1ZUluUmFuZ2UodGhpcy52YWx1ZSwgdGhpcy5tYXgpO1xuXHR9XG5cblx0Z2V0UGVyY2VudFZhbHVlKCkge1xuXHRcdHJldHVybiAoMTAwICogdGhpcy5nZXRWYWx1ZSgpKSAvIHRoaXMubWF4O1xuXHR9XG59XG4iXX0=