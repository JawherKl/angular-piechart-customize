import { Injectable } from '@angular/core';
import { Key } from '../util/key';
import * as i0 from "@angular/core";
/**
 * A service that represents the keyboard navigation.
 *
 * Default keyboard shortcuts [are documented in the overview](#/components/datepicker/overview#keyboard-shortcuts)
 *
 * @since 5.2.0
 */
class NgbDatepickerKeyboardService {
    /**
     * Processes a keyboard event.
     */
    processKey(event, datepicker) {
        const { state, calendar } = datepicker;
        /* eslint-disable-next-line deprecation/deprecation */
        switch (event.which) {
            case Key.PageUp:
                datepicker.focusDate(calendar.getPrev(state.focusedDate, event.shiftKey ? 'y' : 'm', 1));
                break;
            case Key.PageDown:
                datepicker.focusDate(calendar.getNext(state.focusedDate, event.shiftKey ? 'y' : 'm', 1));
                break;
            case Key.End:
                datepicker.focusDate(event.shiftKey ? state.maxDate : state.lastDate);
                break;
            case Key.Home:
                datepicker.focusDate(event.shiftKey ? state.minDate : state.firstDate);
                break;
            case Key.ArrowLeft:
                datepicker.focusDate(calendar.getPrev(state.focusedDate, 'd', 1));
                break;
            case Key.ArrowUp:
                datepicker.focusDate(calendar.getPrev(state.focusedDate, 'd', calendar.getDaysPerWeek()));
                break;
            case Key.ArrowRight:
                datepicker.focusDate(calendar.getNext(state.focusedDate, 'd', 1));
                break;
            case Key.ArrowDown:
                datepicker.focusDate(calendar.getNext(state.focusedDate, 'd', calendar.getDaysPerWeek()));
                break;
            case Key.Enter:
            case Key.Space:
                datepicker.focusSelect();
                break;
            default:
                return;
        }
        event.preventDefault();
        event.stopPropagation();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerKeyboardService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerKeyboardService, providedIn: 'root' }); }
}
export { NgbDatepickerKeyboardService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.6", ngImport: i0, type: NgbDatepickerKeyboardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1rZXlib2FyZC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1rZXlib2FyZC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7QUFFbEM7Ozs7OztHQU1HO0FBQ0gsTUFDYSw0QkFBNEI7SUFDeEM7O09BRUc7SUFDSCxVQUFVLENBQUMsS0FBb0IsRUFBRSxVQUF5QjtRQUN6RCxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUN2QyxzREFBc0Q7UUFDdEQsUUFBUSxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ3BCLEtBQUssR0FBRyxDQUFDLE1BQU07Z0JBQ2QsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekYsTUFBTTtZQUNQLEtBQUssR0FBRyxDQUFDLFFBQVE7Z0JBQ2hCLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pGLE1BQU07WUFDUCxLQUFLLEdBQUcsQ0FBQyxHQUFHO2dCQUNYLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0RSxNQUFNO1lBQ1AsS0FBSyxHQUFHLENBQUMsSUFBSTtnQkFDWixVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdkUsTUFBTTtZQUNQLEtBQUssR0FBRyxDQUFDLFNBQVM7Z0JBQ2pCLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSxNQUFNO1lBQ1AsS0FBSyxHQUFHLENBQUMsT0FBTztnQkFDZixVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDMUYsTUFBTTtZQUNQLEtBQUssR0FBRyxDQUFDLFVBQVU7Z0JBQ2xCLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSxNQUFNO1lBQ1AsS0FBSyxHQUFHLENBQUMsU0FBUztnQkFDakIsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFGLE1BQU07WUFDUCxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDZixLQUFLLEdBQUcsQ0FBQyxLQUFLO2dCQUNiLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDekIsTUFBTTtZQUNQO2dCQUNDLE9BQU87U0FDUjtRQUNELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQzs4R0F6Q1csNEJBQTRCO2tIQUE1Qiw0QkFBNEIsY0FEZixNQUFNOztTQUNuQiw0QkFBNEI7MkZBQTVCLDRCQUE0QjtrQkFEeEMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ2JEYXRlcGlja2VyIH0gZnJvbSAnLi9kYXRlcGlja2VyJztcbmltcG9ydCB7IEtleSB9IGZyb20gJy4uL3V0aWwva2V5JztcblxuLyoqXG4gKiBBIHNlcnZpY2UgdGhhdCByZXByZXNlbnRzIHRoZSBrZXlib2FyZCBuYXZpZ2F0aW9uLlxuICpcbiAqIERlZmF1bHQga2V5Ym9hcmQgc2hvcnRjdXRzIFthcmUgZG9jdW1lbnRlZCBpbiB0aGUgb3ZlcnZpZXddKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL292ZXJ2aWV3I2tleWJvYXJkLXNob3J0Y3V0cylcbiAqXG4gKiBAc2luY2UgNS4yLjBcbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyS2V5Ym9hcmRTZXJ2aWNlIHtcblx0LyoqXG5cdCAqIFByb2Nlc3NlcyBhIGtleWJvYXJkIGV2ZW50LlxuXHQgKi9cblx0cHJvY2Vzc0tleShldmVudDogS2V5Ym9hcmRFdmVudCwgZGF0ZXBpY2tlcjogTmdiRGF0ZXBpY2tlcikge1xuXHRcdGNvbnN0IHsgc3RhdGUsIGNhbGVuZGFyIH0gPSBkYXRlcGlja2VyO1xuXHRcdC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkZXByZWNhdGlvbi9kZXByZWNhdGlvbiAqL1xuXHRcdHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcblx0XHRcdGNhc2UgS2V5LlBhZ2VVcDpcblx0XHRcdFx0ZGF0ZXBpY2tlci5mb2N1c0RhdGUoY2FsZW5kYXIuZ2V0UHJldihzdGF0ZS5mb2N1c2VkRGF0ZSwgZXZlbnQuc2hpZnRLZXkgPyAneScgOiAnbScsIDEpKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIEtleS5QYWdlRG93bjpcblx0XHRcdFx0ZGF0ZXBpY2tlci5mb2N1c0RhdGUoY2FsZW5kYXIuZ2V0TmV4dChzdGF0ZS5mb2N1c2VkRGF0ZSwgZXZlbnQuc2hpZnRLZXkgPyAneScgOiAnbScsIDEpKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIEtleS5FbmQ6XG5cdFx0XHRcdGRhdGVwaWNrZXIuZm9jdXNEYXRlKGV2ZW50LnNoaWZ0S2V5ID8gc3RhdGUubWF4RGF0ZSA6IHN0YXRlLmxhc3REYXRlKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIEtleS5Ib21lOlxuXHRcdFx0XHRkYXRlcGlja2VyLmZvY3VzRGF0ZShldmVudC5zaGlmdEtleSA/IHN0YXRlLm1pbkRhdGUgOiBzdGF0ZS5maXJzdERhdGUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgS2V5LkFycm93TGVmdDpcblx0XHRcdFx0ZGF0ZXBpY2tlci5mb2N1c0RhdGUoY2FsZW5kYXIuZ2V0UHJldihzdGF0ZS5mb2N1c2VkRGF0ZSwgJ2QnLCAxKSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBLZXkuQXJyb3dVcDpcblx0XHRcdFx0ZGF0ZXBpY2tlci5mb2N1c0RhdGUoY2FsZW5kYXIuZ2V0UHJldihzdGF0ZS5mb2N1c2VkRGF0ZSwgJ2QnLCBjYWxlbmRhci5nZXREYXlzUGVyV2VlaygpKSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBLZXkuQXJyb3dSaWdodDpcblx0XHRcdFx0ZGF0ZXBpY2tlci5mb2N1c0RhdGUoY2FsZW5kYXIuZ2V0TmV4dChzdGF0ZS5mb2N1c2VkRGF0ZSwgJ2QnLCAxKSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBLZXkuQXJyb3dEb3duOlxuXHRcdFx0XHRkYXRlcGlja2VyLmZvY3VzRGF0ZShjYWxlbmRhci5nZXROZXh0KHN0YXRlLmZvY3VzZWREYXRlLCAnZCcsIGNhbGVuZGFyLmdldERheXNQZXJXZWVrKCkpKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIEtleS5FbnRlcjpcblx0XHRcdGNhc2UgS2V5LlNwYWNlOlxuXHRcdFx0XHRkYXRlcGlja2VyLmZvY3VzU2VsZWN0KCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHR9XG59XG4iXX0=