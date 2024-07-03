import { isInteger } from '../util/util';
/**
 * A simple class that represents a date that datepicker also uses internally.
 *
 * It is the implementation of the `NgbDateStruct` interface that adds some convenience methods,
 * like `.equals()`, `.before()`, etc.
 *
 * All datepicker APIs consume `NgbDateStruct`, but return `NgbDate`.
 *
 * In many cases it is simpler to manipulate these objects together with
 * [`NgbCalendar`](#/components/datepicker/api#NgbCalendar) than native JS Dates.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details.
 *
 * @since 3.0.0
 */
export class NgbDate {
    /**
     * A **static method** that creates a new date object from the `NgbDateStruct`,
     *
     * ex. `NgbDate.from({year: 2000, month: 5, day: 1})`.
     *
     * If the `date` is already of `NgbDate` type, the method will return the same object.
     */
    static from(date) {
        if (date instanceof NgbDate) {
            return date;
        }
        return date ? new NgbDate(date.year, date.month, date.day) : null;
    }
    constructor(year, month, day) {
        this.year = isInteger(year) ? year : null;
        this.month = isInteger(month) ? month : null;
        this.day = isInteger(day) ? day : null;
    }
    /**
     * Checks if the current date is equal to another date.
     */
    equals(other) {
        return other != null && this.year === other.year && this.month === other.month && this.day === other.day;
    }
    /**
     * Checks if the current date is before another date.
     */
    before(other) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day < other.day;
            }
            else {
                return this.month < other.month;
            }
        }
        else {
            return this.year < other.year;
        }
    }
    /**
     * Checks if the current date is after another date.
     */
    after(other) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day > other.day;
            }
            else {
                return this.month > other.month;
            }
        }
        else {
            return this.year > other.year;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGF0ZXBpY2tlci9uZ2ItZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXpDOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsTUFBTSxPQUFPLE9BQU87SUFnQm5COzs7Ozs7T0FNRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBMkI7UUFDdEMsSUFBSSxJQUFJLFlBQVksT0FBTyxFQUFFO1lBQzVCLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFDRCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ25FLENBQUM7SUFFRCxZQUFZLElBQVksRUFBRSxLQUFhLEVBQUUsR0FBVztRQUNuRCxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBTSxJQUFJLENBQUM7UUFDL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQU0sSUFBSSxDQUFDO1FBQ2xELElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFNLElBQUksQ0FBQztJQUM3QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLENBQUMsS0FBNEI7UUFDbEMsT0FBTyxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzFHLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxLQUE0QjtRQUNsQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1gsT0FBTyxLQUFLLENBQUM7U0FDYjtRQUVELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQzdCLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUMvQixPQUFPLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDN0Q7aUJBQU07Z0JBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDaEM7U0FDRDthQUFNO1lBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDOUI7SUFDRixDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsS0FBNEI7UUFDakMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNYLE9BQU8sS0FBSyxDQUFDO1NBQ2I7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksRUFBRTtZQUM3QixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDL0IsT0FBTyxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2FBQzdEO2lCQUFNO2dCQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO2FBQ2hDO1NBQ0Q7YUFBTTtZQUNOLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQzlCO0lBQ0YsQ0FBQztDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdiRGF0ZVN0cnVjdCB9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcbmltcG9ydCB7IGlzSW50ZWdlciB9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5cbi8qKlxuICogQSBzaW1wbGUgY2xhc3MgdGhhdCByZXByZXNlbnRzIGEgZGF0ZSB0aGF0IGRhdGVwaWNrZXIgYWxzbyB1c2VzIGludGVybmFsbHkuXG4gKlxuICogSXQgaXMgdGhlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBgTmdiRGF0ZVN0cnVjdGAgaW50ZXJmYWNlIHRoYXQgYWRkcyBzb21lIGNvbnZlbmllbmNlIG1ldGhvZHMsXG4gKiBsaWtlIGAuZXF1YWxzKClgLCBgLmJlZm9yZSgpYCwgZXRjLlxuICpcbiAqIEFsbCBkYXRlcGlja2VyIEFQSXMgY29uc3VtZSBgTmdiRGF0ZVN0cnVjdGAsIGJ1dCByZXR1cm4gYE5nYkRhdGVgLlxuICpcbiAqIEluIG1hbnkgY2FzZXMgaXQgaXMgc2ltcGxlciB0byBtYW5pcHVsYXRlIHRoZXNlIG9iamVjdHMgdG9nZXRoZXIgd2l0aFxuICogW2BOZ2JDYWxlbmRhcmBdKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2FwaSNOZ2JDYWxlbmRhcikgdGhhbiBuYXRpdmUgSlMgRGF0ZXMuXG4gKlxuICogU2VlIHRoZSBbZGF0ZSBmb3JtYXQgb3ZlcnZpZXddKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL292ZXJ2aWV3I2RhdGUtbW9kZWwpIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHNpbmNlIDMuMC4wXG4gKi9cbmV4cG9ydCBjbGFzcyBOZ2JEYXRlIGltcGxlbWVudHMgTmdiRGF0ZVN0cnVjdCB7XG5cdC8qKlxuXHQgKiBUaGUgeWVhciwgZm9yIGV4YW1wbGUgMjAxNlxuXHQgKi9cblx0eWVhcjogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgbW9udGgsIGZvciBleGFtcGxlIDE9SmFuIC4uLiAxMj1EZWMgYXMgaW4gSVNPIDg2MDFcblx0ICovXG5cdG1vbnRoOiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBkYXkgb2YgbW9udGgsIHN0YXJ0aW5nIHdpdGggMVxuXHQgKi9cblx0ZGF5OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIEEgKipzdGF0aWMgbWV0aG9kKiogdGhhdCBjcmVhdGVzIGEgbmV3IGRhdGUgb2JqZWN0IGZyb20gdGhlIGBOZ2JEYXRlU3RydWN0YCxcblx0ICpcblx0ICogZXguIGBOZ2JEYXRlLmZyb20oe3llYXI6IDIwMDAsIG1vbnRoOiA1LCBkYXk6IDF9KWAuXG5cdCAqXG5cdCAqIElmIHRoZSBgZGF0ZWAgaXMgYWxyZWFkeSBvZiBgTmdiRGF0ZWAgdHlwZSwgdGhlIG1ldGhvZCB3aWxsIHJldHVybiB0aGUgc2FtZSBvYmplY3QuXG5cdCAqL1xuXHRzdGF0aWMgZnJvbShkYXRlPzogTmdiRGF0ZVN0cnVjdCB8IG51bGwpOiBOZ2JEYXRlIHwgbnVsbCB7XG5cdFx0aWYgKGRhdGUgaW5zdGFuY2VvZiBOZ2JEYXRlKSB7XG5cdFx0XHRyZXR1cm4gZGF0ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGRhdGUgPyBuZXcgTmdiRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5KSA6IG51bGw7XG5cdH1cblxuXHRjb25zdHJ1Y3Rvcih5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKSB7XG5cdFx0dGhpcy55ZWFyID0gaXNJbnRlZ2VyKHllYXIpID8geWVhciA6IDxhbnk+bnVsbDtcblx0XHR0aGlzLm1vbnRoID0gaXNJbnRlZ2VyKG1vbnRoKSA/IG1vbnRoIDogPGFueT5udWxsO1xuXHRcdHRoaXMuZGF5ID0gaXNJbnRlZ2VyKGRheSkgPyBkYXkgOiA8YW55Pm51bGw7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2tzIGlmIHRoZSBjdXJyZW50IGRhdGUgaXMgZXF1YWwgdG8gYW5vdGhlciBkYXRlLlxuXHQgKi9cblx0ZXF1YWxzKG90aGVyPzogTmdiRGF0ZVN0cnVjdCB8IG51bGwpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gb3RoZXIgIT0gbnVsbCAmJiB0aGlzLnllYXIgPT09IG90aGVyLnllYXIgJiYgdGhpcy5tb250aCA9PT0gb3RoZXIubW9udGggJiYgdGhpcy5kYXkgPT09IG90aGVyLmRheTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVja3MgaWYgdGhlIGN1cnJlbnQgZGF0ZSBpcyBiZWZvcmUgYW5vdGhlciBkYXRlLlxuXHQgKi9cblx0YmVmb3JlKG90aGVyPzogTmdiRGF0ZVN0cnVjdCB8IG51bGwpOiBib29sZWFuIHtcblx0XHRpZiAoIW90aGVyKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMueWVhciA9PT0gb3RoZXIueWVhcikge1xuXHRcdFx0aWYgKHRoaXMubW9udGggPT09IG90aGVyLm1vbnRoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmRheSA9PT0gb3RoZXIuZGF5ID8gZmFsc2UgOiB0aGlzLmRheSA8IG90aGVyLmRheTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLm1vbnRoIDwgb3RoZXIubW9udGg7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB0aGlzLnllYXIgPCBvdGhlci55ZWFyO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVja3MgaWYgdGhlIGN1cnJlbnQgZGF0ZSBpcyBhZnRlciBhbm90aGVyIGRhdGUuXG5cdCAqL1xuXHRhZnRlcihvdGhlcj86IE5nYkRhdGVTdHJ1Y3QgfCBudWxsKTogYm9vbGVhbiB7XG5cdFx0aWYgKCFvdGhlcikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRpZiAodGhpcy55ZWFyID09PSBvdGhlci55ZWFyKSB7XG5cdFx0XHRpZiAodGhpcy5tb250aCA9PT0gb3RoZXIubW9udGgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZGF5ID09PSBvdGhlci5kYXkgPyBmYWxzZSA6IHRoaXMuZGF5ID4gb3RoZXIuZGF5O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMubW9udGggPiBvdGhlci5tb250aDtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHRoaXMueWVhciA+IG90aGVyLnllYXI7XG5cdFx0fVxuXHR9XG59XG4iXX0=