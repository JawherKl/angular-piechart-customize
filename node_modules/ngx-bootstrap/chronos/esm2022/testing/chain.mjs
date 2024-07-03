import { add, subtract } from '../index';
import { getDate, getFullYear, getHours, getMilliseconds, getMinutes, getMonth, getSeconds } from '../utils/date-getters';
import { setDate, setFullYear, setHours, setMilliseconds, setMinutes, setMonth, setSeconds } from '../utils/date-setters';
import { cloneDate } from '../create/clone';
import { isArray, isBoolean, isDate, isDateValid, isFunction, isNumber, isObject, isString, isUndefined } from '../utils/type-checks';
import { formatDate } from '../format';
import { ISO_8601, RFC_2822 } from '../create/from-string-and-format';
import { getDateOffset, getUTCOffset, hasAlignedHourOffset, isDaylightSavingTime, setOffsetToParsedOffset, setUTCOffset } from '../units/offset';
import { isLeapYear, parseTwoDigitYear } from '../units/year';
import { isAfter, isBefore, isBetween, isSame, isSameOrAfter, isSameOrBefore } from '../utils/date-compare';
import { daysInMonth } from '../units/month';
import { getDayOfWeek, getISODayOfWeek, getLocaleDayOfWeek, parseWeekday, setDayOfWeek, setISODayOfWeek, setLocaleDayOfWeek } from '../units/day-of-week';
import { getISOWeek, getWeek, setISOWeek, setWeek } from '../units/week';
import { getISOWeeksInYear, getISOWeekYear, getSetISOWeekYear, getSetWeekYear, getWeeksInYear, getWeekYear } from '../units/week-year';
import { endOf, startOf } from '../utils/start-end-of';
import { getQuarter, setQuarter } from '../units/quarter';
import { getDayOfYear, setDayOfYear } from '../units/day-of-year';
import { getZoneAbbr, getZoneName } from '../units/timezone';
import { diff } from '../moment/diff';
import { calendar } from '../moment/calendar';
import { defineLocale, getLocale, getSetGlobalLocale, listLocales } from '../locale/locales';
import { max, min } from '../moment/min-max';
import { isDuration } from '../duration/constructor';
import { createLocalOrUTC } from '../create/from-anything';
import { createDuration } from '../duration/create';
export const moment = _moment;
function _moment(input, format, localeKey, strict, isUTC) {
    if (input instanceof Khronos) {
        const _date = input.clone();
        return isUTC ? _date.utc() : _date;
    }
    if (isBoolean(localeKey)) {
        return new Khronos(input, format, null, localeKey, isUTC);
    }
    return new Khronos(input, format, localeKey, strict, isUTC);
}
moment.utc = (input, format, localeKey, strict) => {
    return _moment(input, format, localeKey, strict, true);
};
moment.parseZone = (input, format, localeKey, strict) => {
    return _moment(input, format, localeKey, strict, true).parseZone();
};
moment.locale = getSetGlobalLocale;
moment.localeData = (key) => {
    if (key instanceof Khronos) {
        return key.localeData();
    }
    return getLocale(key);
};
// moment.utc = createUTC;
moment.unix = (inp) => new Khronos(inp * 1000);
moment.ISO_8601 = ISO_8601;
moment.RFC_2822 = RFC_2822;
moment.defineLocale = defineLocale;
moment.parseTwoDigitYear = parseTwoDigitYear;
moment.isDate = isDate;
moment.invalid = function _invalid() {
    return new Khronos(new Date(NaN));
};
// duration(inp?: Duration | DateInput | Khronos, unit?: MomentUnitOfTime): Duration;
moment.duration = (input, unit) => {
    const _unit = mapUnitOfTime(unit);
    if (isDate(input)) {
        throw new Error('todo implement');
    }
    if (input == null) {
        return createDuration();
    }
    if (isDuration(input)) {
        return createDuration(input, _unit, { _locale: input._locale });
    }
    if (isString(input) || isNumber(input) || isDuration(input) || isObject(input)) {
        return createDuration(input, _unit);
    }
    throw new Error('todo implement');
};
moment.min = function _min(...dates) {
    const _firstArg = dates[0];
    const _dates = (isArray(_firstArg) ? _firstArg : dates)
        .map((date) => _moment(date))
        .map(date => date.toDate());
    const _date = min(..._dates);
    return new Khronos(_date);
};
moment.max = function _max(...dates) {
    const _firstArg = dates[0];
    const _dates = (isArray(_firstArg) ? _firstArg : dates)
        .map((date) => _moment(date))
        .map(date => date.toDate());
    const _date = max(..._dates);
    return new Khronos(_date);
};
moment.locales = () => {
    return listLocales();
};
const _unitsPriority = {
    year: 1,
    month: 8,
    week: 5,
    isoWeek: 5,
    day: 11,
    weekday: 11,
    isoWeekday: 11,
    hours: 13,
    weekYear: 1,
    isoWeekYear: 1,
    quarter: 7,
    date: 9,
    dayOfYear: 4,
    minutes: 14,
    seconds: 15,
    milliseconds: 16
};
// todo: do I need 2 mappers?
const _timeHashMap = {
    y: 'year',
    years: 'year',
    year: 'year',
    M: 'month',
    months: 'month',
    month: 'month',
    w: 'week',
    weeks: 'week',
    week: 'week',
    d: 'day',
    days: 'day',
    day: 'day',
    date: 'date',
    dates: 'date',
    D: 'date',
    h: 'hours',
    hour: 'hours',
    hours: 'hours',
    m: 'minutes',
    minute: 'minutes',
    minutes: 'minutes',
    s: 'seconds',
    second: 'seconds',
    seconds: 'seconds',
    ms: 'milliseconds',
    millisecond: 'milliseconds',
    milliseconds: 'milliseconds',
    quarter: 'quarter',
    quarters: 'quarter',
    q: 'quarter',
    Q: 'quarter',
    isoWeek: 'isoWeek',
    isoWeeks: 'isoWeek',
    W: 'isoWeek',
    weekYear: 'weekYear',
    weekYears: 'weekYear',
    gg: 'weekYears',
    isoWeekYear: 'isoWeekYear',
    isoWeekYears: 'isoWeekYear',
    GG: 'isoWeekYear',
    dayOfYear: 'dayOfYear',
    dayOfYears: 'dayOfYear',
    DDD: 'dayOfYear',
    weekday: 'weekday',
    weekdays: 'weekday',
    e: 'weekday',
    isoWeekday: 'isoWeekday',
    isoWeekdays: 'isoWeekday',
    E: 'isoWeekday'
};
function mapUnitOfTime(period) {
    return _timeHashMap[period];
}
function mapMomentInputObject(obj) {
    const _res = {};
    return Object.keys(obj)
        .reduce((res, key) => {
        res[mapUnitOfTime(key)] = obj[key];
        return res;
    }, _res);
}
export class Khronos {
    constructor(input, format, localeKey, strict = false, isUTC = false, offset) {
        this._date = new Date();
        this._isUTC = false;
        // locale will be needed to format invalid date message
        this._locale = getLocale(localeKey);
        // parse invalid input
        if (input === '' || input === null || (isNumber(input) && isNaN(input))) {
            this._date = new Date(NaN);
            return this;
        }
        this._isUTC = isUTC;
        if (this._isUTC) {
            this._offset = 0;
        }
        if (offset || offset === 0) {
            this._offset = offset;
        }
        this._isStrict = strict;
        this._format = format;
        if (!input && input !== 0 && !format) {
            this._date = new Date();
            return this;
        }
        if (isDate(input)) {
            this._date = cloneDate(input);
            return this;
        }
        // this._date = parseDate(input, format, localeKey, strict, isUTC);
        const config = createLocalOrUTC(input, format, localeKey, strict, isUTC);
        this._date = config._d;
        this._offset = isNumber(config._offset) ? config._offset : this._offset;
        this._isUTC = config._isUTC;
        this._isStrict = config._strict;
        this._format = config._f;
        this._tzm = config._tzm;
    }
    _toConfig() {
        return { _isUTC: this._isUTC, _locale: this._locale, _offset: this._offset, _tzm: this._tzm };
    }
    locale(localeKey) {
        if (isUndefined(localeKey)) {
            return this._locale._abbr;
        }
        if (localeKey instanceof Khronos) {
            this._locale = localeKey._locale;
            return this;
        }
        const newLocaleData = getLocale(localeKey);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
    localeData() {
        return this._locale;
    }
    // Basic
    add(val, period) {
        if (isString(val)) {
            this._date = add(this._date, parseInt(val, 10), mapUnitOfTime(period));
        }
        if (isNumber(val)) {
            this._date = add(this._date, val, mapUnitOfTime(period));
        }
        if (isObject(val)) {
            const _mapped = mapMomentInputObject(val);
            Object.keys(_mapped)
                .forEach((key) => add(this._date, _mapped[key], key));
        }
        return this;
    }
    // fixme: for some reason here 'null' for time is fine
    calendar(time, formats) {
        const _time = time instanceof Khronos ? time : new Khronos(time || new Date());
        const _offset = (this._offset || 0) - (_time._offset || 0);
        const _config = Object.assign(this._toConfig(), { _offset });
        return calendar(this._date, _time._date, formats, this._locale, _config);
    }
    clone() {
        const localeKey = this._locale && this._locale._abbr || 'en';
        // return new Khronos(cloneDate(this._date), this._format, localeKey, this._isStrict, this._isUTC);
        // fails if isUTC and offset
        // return new Khronos(new Date(this.valueOf()),
        return new Khronos(this._date, this._format, localeKey, this._isStrict, this._isUTC, this._offset);
    }
    diff(b, unitOfTime, precise) {
        const unit = mapUnitOfTime(unitOfTime);
        const _b = b instanceof Khronos ? b : new Khronos(b);
        // const zoneDelta = (_b.utcOffset() - this.utcOffset());
        // const config = Object.assign(this._toConfig(), {
        //   _offset: 0,
        //   _isUTC: true,
        //   _zoneDelta: zoneDelta
        // });
        // return diff(new Date(this.valueOf()), new Date(_b.valueOf()), unit, precise, config);
        return diff(this._date, _b.toDate(), unit, precise, this._toConfig());
    }
    endOf(period) {
        const _per = mapUnitOfTime(period);
        this._date = endOf(this._date, _per, this._isUTC);
        return this;
    }
    format(format) {
        return formatDate(this._date, format, this._locale && this._locale._abbr, this._isUTC, this._offset);
    }
    // todo: implement
    from(time, withoutSuffix) {
        const _time = _moment(time);
        if (this.isValid() && _time.isValid()) {
            return createDuration({ to: this.toDate(), from: _time.toDate() })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        }
        return this.localeData().invalidDate;
    }
    fromNow(withoutSuffix) {
        return this.from(new Date(), withoutSuffix);
    }
    to(inp, suffix) {
        throw new Error(`TODO: Implement`);
    }
    toNow(withoutPrefix) {
        throw new Error(`TODO: Implement`);
    }
    subtract(val, period) {
        if (isString(val)) {
            this._date = subtract(this._date, parseInt(val, 10), mapUnitOfTime(period));
            return this;
        }
        if (isNumber(val)) {
            this._date = subtract(this._date, val, mapUnitOfTime(period));
        }
        if (isObject(val)) {
            const _mapped = mapMomentInputObject(val);
            Object.keys(_mapped)
                .forEach((key) => subtract(this._date, _mapped[key], key));
        }
        return this;
    }
    get(period) {
        if (period === 'dayOfYear') {
            return this.dayOfYear();
        }
        const unit = mapUnitOfTime(period);
        switch (unit) {
            case 'year':
                return this.year();
            case 'month':
                return this.month();
            // | 'week'
            case 'date':
                return this.date();
            case 'day':
                return this.day();
            case 'hours':
                return this.hours();
            case 'minutes':
                return this.minutes();
            case 'seconds':
                return this.seconds();
            case 'milliseconds':
                return this.milliseconds();
            case 'week':
                return this.week();
            case 'isoWeek':
                return this.isoWeek();
            case 'weekYear':
                return this.weekYear();
            case 'isoWeekYear':
                return this.isoWeekYear();
            case 'weekday':
                return this.weekday();
            case 'isoWeekday':
                return this.isoWeekday();
            case 'quarter':
                return this.quarter();
            default:
                throw new Error(`Unknown moment.get('${period}')`);
        }
    }
    set(period, input) {
        if (isString(period)) {
            const unit = mapUnitOfTime(period);
            switch (unit) {
                case 'year':
                    return this.year(input);
                case 'month':
                    return this.month(input);
                // | 'week'
                case 'day':
                    return this.day(input);
                case 'date':
                    return this.date(input);
                case 'hours':
                    return this.hours(input);
                case 'minutes':
                    return this.minutes(input);
                case 'seconds':
                    return this.seconds(input);
                case 'milliseconds':
                    return this.milliseconds(input);
                case 'week':
                    return this.week(input);
                case 'isoWeek':
                    return this.isoWeek(input);
                case 'weekYear':
                    return this.weekYear(input);
                case 'isoWeekYear':
                    return this.isoWeekYear(input);
                case 'weekday':
                    return this.weekday(input);
                case 'isoWeekday':
                    return this.isoWeekday(input);
                case 'quarter':
                    return this.quarter(input);
                default:
                    throw new Error(`Unknown moment.get('${period}')`);
            }
        }
        if (isObject(period)) {
            const _mapped = mapMomentInputObject(period);
            Object.keys(_mapped)
                .sort(function (a, b) {
                return _unitsPriority[a] - _unitsPriority[b];
            })
                .forEach((key) => this.set(key, _mapped[key]));
        }
        return this;
    }
    toString() {
        return this.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }
    toISOString() {
        if (!this.isValid()) {
            return null;
        }
        if (getFullYear(this._date, true) < 0 || getFullYear(this._date, true) > 9999) {
            return this.format('YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            return this.toDate().toISOString();
        }
        return this.format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }
    inspect() {
        throw new Error('TODO: implement');
    }
    toJSON() {
        return this.toISOString();
    }
    toDate() {
        return new Date(this.valueOf());
    }
    toObject() {
        return {
            // years: getFullYear(this._date, this._isUTC),
            // months: getMonth(this._date, this._isUTC),
            year: getFullYear(this._date, this._isUTC),
            month: getMonth(this._date, this._isUTC),
            date: getDate(this._date, this._isUTC),
            hours: getHours(this._date, this._isUTC),
            minutes: getMinutes(this._date, this._isUTC),
            seconds: getSeconds(this._date, this._isUTC),
            milliseconds: getMilliseconds(this._date, this._isUTC)
        };
    }
    toArray() {
        return [this.year(), this.month(), this.date(), this.hour(), this.minute(), this.second(), this.millisecond()];
    }
    // Dates boolean algebra
    isAfter(date, unit) {
        const _unit = unit ? mapUnitOfTime(unit) : void 0;
        return isAfter(this._date, date.toDate(), _unit);
    }
    isBefore(date, unit) {
        const _unit = unit ? mapUnitOfTime(unit) : void 0;
        return isBefore(this.toDate(), date.toDate(), _unit);
    }
    isBetween(from, to, unit, inclusivity) {
        const _unit = unit ? mapUnitOfTime(unit) : void 0;
        return isBetween(this.toDate(), from.toDate(), to.toDate(), _unit, inclusivity);
    }
    isSame(date, unit) {
        const _unit = unit ? mapUnitOfTime(unit) : void 0;
        return isSame(this._date, date.toDate(), _unit);
    }
    isSameOrAfter(date, unit) {
        const _unit = unit ? mapUnitOfTime(unit) : void 0;
        return isSameOrAfter(this._date, date.toDate(), _unit);
    }
    isSameOrBefore(date, unit) {
        const _unit = unit ? mapUnitOfTime(unit) : void 0;
        return isSameOrBefore(this._date, date.toDate(), _unit);
    }
    isValid() {
        return isDateValid(this._date);
    }
    valueOf() {
        return this._date.valueOf() - ((this._offset || 0) * 60000);
    }
    unix() {
        // return getUnixTime(this._date);
        return Math.floor(this.valueOf() / 1000);
    }
    utcOffset(b, keepLocalTime) {
        const _config = this._toConfig();
        if (!b && b !== 0) {
            return getUTCOffset(this._date, _config);
        }
        this._date = setUTCOffset(this._date, b, keepLocalTime, false, _config);
        this._offset = _config._offset;
        this._isUTC = _config._isUTC;
        return this;
    }
    utc(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }
    local(keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;
            if (keepLocalTime) {
                this.subtract(getDateOffset(this._date), 'm');
            }
        }
        return this;
    }
    parseZone(input) {
        const _config = this._toConfig();
        this._date = setOffsetToParsedOffset(this._date, input, _config);
        this._offset = _config._offset;
        this._isUTC = _config._isUTC;
        return this;
    }
    hasAlignedHourOffset(input) {
        return hasAlignedHourOffset(this._date, input ? input._date : void 0);
    }
    isDST() {
        return isDaylightSavingTime(this._date);
    }
    isLocal() {
        return !this._isUTC;
    }
    isUtcOffset() {
        return this._isUTC;
    }
    isUTC() {
        return this.isUtc();
    }
    isUtc() {
        return this._isUTC && this._offset === 0;
    }
    // Timezone
    zoneAbbr() {
        return getZoneAbbr(this._isUTC);
    }
    zoneName() {
        return getZoneName(this._isUTC);
    }
    year(year) {
        if (!year && year !== 0) {
            return getFullYear(this._date, this._isUTC);
        }
        this._date = cloneDate(setFullYear(this._date, year));
        return this;
    }
    weekYear(val) {
        if (!val && val !== 0) {
            return getWeekYear(this._date, this._locale, this.isUTC());
        }
        const date = getSetWeekYear(this._date, val, this._locale, this.isUTC());
        if (isDate(date)) {
            this._date = date;
        }
        return this;
    }
    isoWeekYear(val) {
        if (!val && val !== 0) {
            return getISOWeekYear(this._date, this.isUTC());
        }
        const date = getSetISOWeekYear(this._date, val, this.isUtc());
        if (isDate(date)) {
            this._date = date;
        }
        return this;
    }
    isLeapYear() {
        return isLeapYear(getFullYear(this.toDate(), this.isUTC()));
    }
    month(month) {
        if (!month && month !== 0) {
            return getMonth(this._date, this._isUTC);
        }
        let _month = month;
        if (isString(month)) {
            const locale = this._locale || getLocale();
            _month = locale.monthsParse(month);
        }
        if (isNumber(_month)) {
            this._date = cloneDate(setMonth(this._date, _month, this._isUTC));
        }
        return this;
    }
    hour(hours) {
        return this.hours(hours);
    }
    hours(hours) {
        if (!hours && hours !== 0) {
            return getHours(this._date, this._isUTC);
        }
        this._date = cloneDate(setHours(this._date, hours, this._isUTC));
        return this;
    }
    minute(minutes) {
        return this.minutes(minutes);
    }
    minutes(minutes) {
        if (!minutes && minutes !== 0) {
            return getMinutes(this._date, this._isUTC);
        }
        this._date = cloneDate(setMinutes(this._date, minutes, this._isUTC));
        return this;
    }
    second(seconds) {
        return this.seconds(seconds);
    }
    seconds(seconds) {
        if (!seconds && seconds !== 0) {
            return getSeconds(this._date, this._isUTC);
        }
        this._date = cloneDate(setSeconds(this._date, seconds, this._isUTC));
        return this;
    }
    millisecond(ms) {
        return this.milliseconds(ms);
    }
    milliseconds(seconds) {
        if (!seconds && seconds !== 0) {
            return getMilliseconds(this._date, this._isUTC);
        }
        this._date = cloneDate(setMilliseconds(this._date, seconds, this._isUTC));
        return this;
    }
    date(date) {
        if (!date && date !== 0) {
            return getDate(this._date, this._isUTC);
        }
        this._date = cloneDate(setDate(this._date, date, this._isUTC));
        return this;
    }
    day(input) {
        if (!input && input !== 0) {
            return getDayOfWeek(this._date, this._isUTC);
        }
        let _input = input;
        if (isString(input)) {
            _input = parseWeekday(input, this._locale);
        }
        if (isNumber(_input)) {
            this._date = setDayOfWeek(this._date, _input, this._locale, this._isUTC);
        }
        return this;
    }
    weekday(val) {
        if (!val && val !== 0) {
            return getLocaleDayOfWeek(this._date, this._locale, this._isUTC);
        }
        this._date = setLocaleDayOfWeek(this._date, val, { locale: this._locale, isUTC: this._isUTC });
        return this;
    }
    isoWeekday(val) {
        if (!val && val !== 0) {
            return getISODayOfWeek(this._date);
        }
        this._date = setISODayOfWeek(this._date, val);
        return this;
    }
    dayOfYear(val) {
        if (!val && val !== 0) {
            return getDayOfYear(this._date);
        }
        this._date = setDayOfYear(this._date, val);
        return this;
    }
    week(input) {
        if (!input && input !== 0) {
            return getWeek(this._date, this._locale);
        }
        this._date = setWeek(this._date, input, this._locale);
        return this;
    }
    weeks(input) {
        return this.week(input);
    }
    isoWeek(val) {
        if (!val && val !== 0) {
            return getISOWeek(this._date);
        }
        this._date = setISOWeek(this._date, val);
        return this;
    }
    isoWeeks(val) {
        return this.isoWeek(val);
    }
    weeksInYear() {
        return getWeeksInYear(this._date, this._isUTC, this._locale);
    }
    isoWeeksInYear() {
        return getISOWeeksInYear(this._date, this._isUTC);
    }
    daysInMonth() {
        return daysInMonth(getFullYear(this._date, this._isUTC), getMonth(this._date, this._isUTC));
    }
    quarter(val) {
        if (!val && val !== 0) {
            return getQuarter(this._date, this._isUTC);
        }
        this._date = setQuarter(this._date, val, this._isUTC);
        return this;
    }
    quarters(val) {
        return this.quarter(val);
    }
    startOf(period) {
        const _per = mapUnitOfTime(period);
        this._date = startOf(this._date, _per, this._isUTC);
        return this;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy90ZXN0aW5nL2NoYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQWEsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXBELE9BQU8sRUFDTCxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBRWxGLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUNMLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUNyRSxVQUFVLEVBQ1gsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDNUMsT0FBTyxFQUNMLE9BQU8sRUFDUCxTQUFTLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQ3hFLFdBQVcsRUFDWixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUV0RSxPQUFPLEVBQ0wsYUFBYSxFQUNiLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSx1QkFBdUIsRUFDakYsWUFBWSxFQUNiLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RyxP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RCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FFRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFkZCwgcGFyc2VEYXRlLCBzdWJ0cmFjdCB9IGZyb20gJy4uL2luZGV4JztcbmltcG9ydCB7IERhdGVBcnJheSwgRGF0ZU9iamVjdCwgVW5pdE9mVGltZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7XG4gIGdldERhdGUsIGdldEZ1bGxZZWFyLCBnZXRIb3VycywgZ2V0TWlsbGlzZWNvbmRzLCBnZXRNaW51dGVzLCBnZXRNb250aCwgZ2V0U2Vjb25kcyxcbiAgZ2V0VW5peFRpbWVcbn0gZnJvbSAnLi4vdXRpbHMvZGF0ZS1nZXR0ZXJzJztcbmltcG9ydCB7XG4gIHNldERhdGUsIHNldEZ1bGxZZWFyLCBzZXRIb3Vycywgc2V0TWlsbGlzZWNvbmRzLCBzZXRNaW51dGVzLCBzZXRNb250aCxcbiAgc2V0U2Vjb25kc1xufSBmcm9tICcuLi91dGlscy9kYXRlLXNldHRlcnMnO1xuaW1wb3J0IHsgY2xvbmVEYXRlIH0gZnJvbSAnLi4vY3JlYXRlL2Nsb25lJztcbmltcG9ydCB7XG4gIGlzQXJyYXksXG4gIGlzQm9vbGVhbiwgaXNEYXRlLCBpc0RhdGVWYWxpZCwgaXNGdW5jdGlvbiwgaXNOdW1iZXIsIGlzT2JqZWN0LCBpc1N0cmluZyxcbiAgaXNVbmRlZmluZWRcbn0gZnJvbSAnLi4vdXRpbHMvdHlwZS1jaGVja3MnO1xuaW1wb3J0IHsgZm9ybWF0RGF0ZSB9IGZyb20gJy4uL2Zvcm1hdCc7XG5pbXBvcnQgeyBJU09fODYwMSwgUkZDXzI4MjIgfSBmcm9tICcuLi9jcmVhdGUvZnJvbS1zdHJpbmctYW5kLWZvcm1hdCc7XG5pbXBvcnQgeyBMb2NhbGUsIExvY2FsZURhdGEgfSBmcm9tICcuLi9sb2NhbGUvbG9jYWxlLmNsYXNzJztcbmltcG9ydCB7XG4gIGdldERhdGVPZmZzZXQsXG4gIGdldFVUQ09mZnNldCwgaGFzQWxpZ25lZEhvdXJPZmZzZXQsIGlzRGF5bGlnaHRTYXZpbmdUaW1lLCBzZXRPZmZzZXRUb1BhcnNlZE9mZnNldCxcbiAgc2V0VVRDT2Zmc2V0XG59IGZyb20gJy4uL3VuaXRzL29mZnNldCc7XG5pbXBvcnQgeyBpc0xlYXBZZWFyLCBwYXJzZVR3b0RpZ2l0WWVhciB9IGZyb20gJy4uL3VuaXRzL3llYXInO1xuaW1wb3J0IHsgaXNBZnRlciwgaXNCZWZvcmUsIGlzQmV0d2VlbiwgaXNTYW1lLCBpc1NhbWVPckFmdGVyLCBpc1NhbWVPckJlZm9yZSB9IGZyb20gJy4uL3V0aWxzL2RhdGUtY29tcGFyZSc7XG5pbXBvcnQgeyBkYXlzSW5Nb250aCB9IGZyb20gJy4uL3VuaXRzL21vbnRoJztcbmltcG9ydCB7XG4gIGdldERheU9mV2VlaywgZ2V0SVNPRGF5T2ZXZWVrLCBnZXRMb2NhbGVEYXlPZldlZWssIHBhcnNlV2Vla2RheSwgc2V0RGF5T2ZXZWVrLCBzZXRJU09EYXlPZldlZWssXG4gIHNldExvY2FsZURheU9mV2Vla1xufSBmcm9tICcuLi91bml0cy9kYXktb2Ytd2Vlayc7XG5pbXBvcnQgeyBnZXRJU09XZWVrLCBnZXRXZWVrLCBzZXRJU09XZWVrLCBzZXRXZWVrIH0gZnJvbSAnLi4vdW5pdHMvd2Vlayc7XG5pbXBvcnQge1xuICBnZXRJU09XZWVrc0luWWVhciwgZ2V0SVNPV2Vla1llYXIsIGdldFNldElTT1dlZWtZZWFyLCBnZXRTZXRXZWVrWWVhciwgZ2V0V2Vla3NJblllYXIsXG4gIGdldFdlZWtZZWFyXG59IGZyb20gJy4uL3VuaXRzL3dlZWsteWVhcic7XG5pbXBvcnQgeyBlbmRPZiwgc3RhcnRPZiB9IGZyb20gJy4uL3V0aWxzL3N0YXJ0LWVuZC1vZic7XG5pbXBvcnQgeyBnZXRRdWFydGVyLCBzZXRRdWFydGVyIH0gZnJvbSAnLi4vdW5pdHMvcXVhcnRlcic7XG5pbXBvcnQgeyBnZXREYXlPZlllYXIsIHNldERheU9mWWVhciB9IGZyb20gJy4uL3VuaXRzL2RheS1vZi15ZWFyJztcbmltcG9ydCB7IGdldFpvbmVBYmJyLCBnZXRab25lTmFtZSB9IGZyb20gJy4uL3VuaXRzL3RpbWV6b25lJztcbmltcG9ydCB7IGRpZmYgfSBmcm9tICcuLi9tb21lbnQvZGlmZic7XG5pbXBvcnQgeyBEYXRlUGFyc2luZ0NvbmZpZyB9IGZyb20gJy4uL2NyZWF0ZS9wYXJzaW5nLnR5cGVzJztcbmltcG9ydCB7IGNhbGVuZGFyLCBDYWxlbmRhclNwZWMgfSBmcm9tICcuLi9tb21lbnQvY2FsZW5kYXInO1xuaW1wb3J0IHsgZGVmaW5lTG9jYWxlLCBnZXRMb2NhbGUsIGdldFNldEdsb2JhbExvY2FsZSwgbGlzdExvY2FsZXMgfSBmcm9tICcuLi9sb2NhbGUvbG9jYWxlcyc7XG5pbXBvcnQgeyBtYXgsIG1pbiB9IGZyb20gJy4uL21vbWVudC9taW4tbWF4JztcbmltcG9ydCB7IER1cmF0aW9uLCBpc0R1cmF0aW9uIH0gZnJvbSAnLi4vZHVyYXRpb24vY29uc3RydWN0b3InO1xuaW1wb3J0IHsgY3JlYXRlTG9jYWxPclVUQyB9IGZyb20gJy4uL2NyZWF0ZS9mcm9tLWFueXRoaW5nJztcbmltcG9ydCB7IGNyZWF0ZUR1cmF0aW9uIH0gZnJvbSAnLi4vZHVyYXRpb24vY3JlYXRlJztcblxuZXhwb3J0IHR5cGUgRGF0ZUlucHV0ID0gc3RyaW5nIHwgbnVtYmVyIHwgRGF0ZSB8IHN0cmluZ1tdIHwgRGF0ZUFycmF5IHwgTW9tZW50SW5wdXRPYmplY3Q7XG5cbmV4cG9ydCBjb25zdCBtb21lbnQ6IE1vbWVudEZuID0gKF9tb21lbnQgYXMgTW9tZW50Rm4pO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1vbWVudEZuIHtcbiAgKGlucHV0PzogRGF0ZUlucHV0IHwgS2hyb25vcywgZm9ybWF0Pzogc3RyaW5nIHwgc3RyaW5nW10sIGxvY2FsZUtleT86IHN0cmluZyB8IGJvb2xlYW4sIHN0cmljdD86IGJvb2xlYW4sIGlzVVRDPzogYm9vbGVhbik6IEtocm9ub3M7XG5cbiAgSVNPXzg2MDE6IHN0cmluZztcbiAgUkZDXzI4MjI6IHN0cmluZztcblxuICB1dGMoaW5wdXQ/OiBEYXRlSW5wdXQgfCBLaHJvbm9zLCBmb3JtYXQ/OiBzdHJpbmcgfCBzdHJpbmdbXSwgbG9jYWxlS2V5Pzogc3RyaW5nIHwgYm9vbGVhbiwgc3RyaWN0PzogYm9vbGVhbik6IEtocm9ub3M7XG5cbiAgcGFyc2Vab25lKGlucHV0PzogRGF0ZUlucHV0IHwgS2hyb25vcywgZm9ybWF0Pzogc3RyaW5nIHwgc3RyaW5nW10sIGxvY2FsZUtleT86IHN0cmluZyB8IGJvb2xlYW4sIHN0cmljdD86IGJvb2xlYW4pOiBLaHJvbm9zO1xuXG4gIHVuaXgobnVtOiBudW1iZXIpOiBLaHJvbm9zO1xuXG4gIGxvY2FsZShrZXk/OiBzdHJpbmcgfCBzdHJpbmdbXSwgdmFsdWVzPzogTG9jYWxlRGF0YSk6IHN0cmluZztcblxuICBkdXJhdGlvbihpbnA/OiBEdXJhdGlvbiB8IERhdGVJbnB1dCB8IEtocm9ub3MsIHVuaXQ/OiBNb21lbnRVbml0T2ZUaW1lKTogRHVyYXRpb247XG5cbiAgZGVmaW5lTG9jYWxlKG5hbWU6IHN0cmluZywgY29uZmlnPzogTG9jYWxlRGF0YSk6IExvY2FsZTtcblxuICBwYXJzZVR3b0RpZ2l0WWVhcihpbnB1dDogc3RyaW5nKTogbnVtYmVyO1xuXG4gIGlzRGF0ZShpbnB1dD86IGFueSk6IGlucHV0IGlzIERhdGU7XG5cbiAgbW9udGhzKCk6IHN0cmluZ1tdO1xuXG4gIG1vbnRocyhpbmRleDogbnVtYmVyKTogc3RyaW5nO1xuXG4gIG1vbnRocyhmb3JtYXQ6IHN0cmluZyk6IHN0cmluZ1tdO1xuXG4gIG1vbnRocyhmb3JtYXQ6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHN0cmluZztcblxuICBtb250aHNTaG9ydCgpOiBzdHJpbmdbXTtcblxuICBtb250aHNTaG9ydChpbmRleDogbnVtYmVyKTogc3RyaW5nO1xuXG4gIG1vbnRoc1Nob3J0KGZvcm1hdDogc3RyaW5nKTogc3RyaW5nW107XG5cbiAgbW9udGhzU2hvcnQoZm9ybWF0OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBzdHJpbmc7XG5cbiAgd2Vla2RheXMoKTogc3RyaW5nW107XG5cbiAgd2Vla2RheXMoaW5kZXg6IG51bWJlcik6IHN0cmluZztcblxuICB3ZWVrZGF5cyhmb3JtYXQ6IHN0cmluZyk6IHN0cmluZ1tdO1xuXG4gIHdlZWtkYXlzKGZvcm1hdDogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogc3RyaW5nO1xuXG4gIHdlZWtkYXlzKGxvY2FsZVNvcnRlZDogYm9vbGVhbik6IHN0cmluZ1tdO1xuXG4gIHdlZWtkYXlzKGxvY2FsZVNvcnRlZDogYm9vbGVhbiwgaW5kZXg6IG51bWJlcik6IHN0cmluZztcblxuICB3ZWVrZGF5cyhsb2NhbGVTb3J0ZWQ6IGJvb2xlYW4sIGZvcm1hdDogc3RyaW5nKTogc3RyaW5nW107XG5cbiAgd2Vla2RheXMobG9jYWxlU29ydGVkOiBib29sZWFuLCBmb3JtYXQ6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHN0cmluZztcblxuICB3ZWVrZGF5c1Nob3J0KCk6IHN0cmluZ1tdO1xuXG4gIHdlZWtkYXlzU2hvcnQoaW5kZXg6IG51bWJlcik6IHN0cmluZztcblxuICB3ZWVrZGF5c1Nob3J0KGZvcm1hdDogc3RyaW5nKTogc3RyaW5nW107XG5cbiAgd2Vla2RheXNTaG9ydChmb3JtYXQ6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHN0cmluZztcblxuICB3ZWVrZGF5c1Nob3J0KGxvY2FsZVNvcnRlZDogYm9vbGVhbik6IHN0cmluZ1tdO1xuXG4gIHdlZWtkYXlzU2hvcnQobG9jYWxlU29ydGVkOiBib29sZWFuLCBpbmRleDogbnVtYmVyKTogc3RyaW5nO1xuXG4gIHdlZWtkYXlzU2hvcnQobG9jYWxlU29ydGVkOiBib29sZWFuLCBmb3JtYXQ6IHN0cmluZyk6IHN0cmluZ1tdO1xuXG4gIHdlZWtkYXlzU2hvcnQobG9jYWxlU29ydGVkOiBib29sZWFuLCBmb3JtYXQ6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHN0cmluZztcblxuICB3ZWVrZGF5c01pbigpOiBzdHJpbmdbXTtcblxuICB3ZWVrZGF5c01pbihpbmRleDogbnVtYmVyKTogc3RyaW5nO1xuXG4gIHdlZWtkYXlzTWluKGZvcm1hdDogc3RyaW5nKTogc3RyaW5nW107XG5cbiAgd2Vla2RheXNNaW4oZm9ybWF0OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBzdHJpbmc7XG5cbiAgd2Vla2RheXNNaW4obG9jYWxlU29ydGVkOiBib29sZWFuKTogc3RyaW5nW107XG5cbiAgd2Vla2RheXNNaW4obG9jYWxlU29ydGVkOiBib29sZWFuLCBpbmRleDogbnVtYmVyKTogc3RyaW5nO1xuXG4gIHdlZWtkYXlzTWluKGxvY2FsZVNvcnRlZDogYm9vbGVhbiwgZm9ybWF0OiBzdHJpbmcpOiBzdHJpbmdbXTtcblxuICB3ZWVrZGF5c01pbihsb2NhbGVTb3J0ZWQ6IGJvb2xlYW4sIGZvcm1hdDogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogc3RyaW5nO1xuXG4gIHJlbGF0aXZlVGltZVRocmVzaG9sZCh0aHJlc2hvbGQ6IHN0cmluZyk6IG51bWJlciB8IGJvb2xlYW47XG5cbiAgcmVsYXRpdmVUaW1lVGhyZXNob2xkKHRocmVzaG9sZDogc3RyaW5nLCBsaW1pdDogbnVtYmVyKTogYm9vbGVhbjtcblxuICBtaW4oLi4uZGF0ZXM6ICgoRGF0ZUlucHV0IHwgS2hyb25vcylbXSB8IChEYXRlSW5wdXQgfCBLaHJvbm9zKSlbXSk6IEtocm9ub3M7XG5cbiAgbWF4KC4uLmRhdGVzOiAoKERhdGVJbnB1dCB8IEtocm9ub3MpW10gfCAoRGF0ZUlucHV0IHwgS2hyb25vcykpW10pOiBLaHJvbm9zO1xuXG4gIGxvY2FsZURhdGEoa2V5Pzogc3RyaW5nIHwgc3RyaW5nW10gfCBLaHJvbm9zKTogTG9jYWxlO1xuXG4gIHVwZGF0ZUxvY2FsZShsYW5ndWFnZTogc3RyaW5nLCBsb2NhbGVTcGVjPzogTG9jYWxlRGF0YSk6IExvY2FsZTtcblxuICBjYWxlbmRhckZvcm1hdChtOiBEYXRlLCBub3c6IERhdGUpOiBzdHJpbmc7XG5cbiAgLy8gdG9kbzogcmVtb3ZlIHRoaXNcbiAgY2FsZW5kYXJGb3JtYXQobTogS2hyb25vcywgbm93OiBLaHJvbm9zKTogc3RyaW5nO1xuXG4gIC8vIHRvZG86IGltcGxlbWVudFxuICBpbnZhbGlkKCk6IEtocm9ub3M7XG5cbiAgbG9jYWxlcygpOiBzdHJpbmdbXTtcblxuICAvLyB0b2RvOiBpbXBsZW1lbnRcbiAgdXBkYXRlT2Zmc2V0KG06IEtocm9ub3MsIGtlZXBUaW1lPzogYm9vbGVhbik6IHZvaWQ7XG59XG5cbmZ1bmN0aW9uIF9tb21lbnQoaW5wdXQ/OiBEYXRlSW5wdXQgfCBLaHJvbm9zLCBmb3JtYXQ/OiBzdHJpbmcgfCBzdHJpbmdbXSwgbG9jYWxlS2V5Pzogc3RyaW5nIHwgYm9vbGVhbiwgc3RyaWN0PzogYm9vbGVhbiwgaXNVVEM/OiBib29sZWFuKTogS2hyb25vcyB7XG4gIGlmIChpbnB1dCBpbnN0YW5jZW9mIEtocm9ub3MpIHtcbiAgICBjb25zdCBfZGF0ZSA9IGlucHV0LmNsb25lKCk7XG5cbiAgICByZXR1cm4gaXNVVEMgPyBfZGF0ZS51dGMoKSA6IF9kYXRlO1xuICB9XG5cbiAgaWYgKGlzQm9vbGVhbihsb2NhbGVLZXkpKSB7XG4gICAgcmV0dXJuIG5ldyBLaHJvbm9zKGlucHV0LCBmb3JtYXQsIG51bGwsIGxvY2FsZUtleSwgaXNVVEMpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBLaHJvbm9zKGlucHV0LCBmb3JtYXQsIGxvY2FsZUtleSwgc3RyaWN0LCBpc1VUQyk7XG59XG5cbm1vbWVudC51dGMgPSAoaW5wdXQ/OiBEYXRlSW5wdXQgfCBLaHJvbm9zLCBmb3JtYXQ/OiBzdHJpbmcsIGxvY2FsZUtleT86IHN0cmluZyB8IGJvb2xlYW4sIHN0cmljdD86IGJvb2xlYW4pOiBLaHJvbm9zID0+IHtcbiAgcmV0dXJuIF9tb21lbnQoaW5wdXQsIGZvcm1hdCwgbG9jYWxlS2V5LCBzdHJpY3QsIHRydWUpO1xufTtcblxubW9tZW50LnBhcnNlWm9uZSA9IChpbnB1dD86IERhdGVJbnB1dCB8IEtocm9ub3MsIGZvcm1hdD86IHN0cmluZywgbG9jYWxlS2V5Pzogc3RyaW5nIHwgYm9vbGVhbiwgc3RyaWN0PzogYm9vbGVhbik6IEtocm9ub3MgPT4ge1xuICByZXR1cm4gX21vbWVudChpbnB1dCwgZm9ybWF0LCBsb2NhbGVLZXksIHN0cmljdCwgdHJ1ZSkucGFyc2Vab25lKCk7XG59O1xuXG5tb21lbnQubG9jYWxlID0gZ2V0U2V0R2xvYmFsTG9jYWxlO1xubW9tZW50LmxvY2FsZURhdGEgPSAoa2V5Pzogc3RyaW5nIHwgc3RyaW5nW10gfCBLaHJvbm9zKTogTG9jYWxlID0+IHtcbiAgaWYgKGtleSBpbnN0YW5jZW9mIEtocm9ub3MpIHtcbiAgICByZXR1cm4ga2V5LmxvY2FsZURhdGEoKTtcbiAgfVxuXG4gIHJldHVybiBnZXRMb2NhbGUoa2V5KTtcbn07XG5cbi8vIG1vbWVudC51dGMgPSBjcmVhdGVVVEM7XG5tb21lbnQudW5peCA9IChpbnA6IG51bWJlcikgPT4gbmV3IEtocm9ub3MoaW5wICogMTAwMCk7XG5tb21lbnQuSVNPXzg2MDEgPSBJU09fODYwMTtcbm1vbWVudC5SRkNfMjgyMiA9IFJGQ18yODIyO1xubW9tZW50LmRlZmluZUxvY2FsZSA9IGRlZmluZUxvY2FsZTtcbm1vbWVudC5wYXJzZVR3b0RpZ2l0WWVhciA9IHBhcnNlVHdvRGlnaXRZZWFyO1xubW9tZW50LmlzRGF0ZSA9IGlzRGF0ZTtcbm1vbWVudC5pbnZhbGlkID0gZnVuY3Rpb24gX2ludmFsaWQoKTogS2hyb25vcyB7XG4gIHJldHVybiBuZXcgS2hyb25vcyhuZXcgRGF0ZShOYU4pKTtcbn07XG5cbi8vIGR1cmF0aW9uKGlucD86IER1cmF0aW9uIHwgRGF0ZUlucHV0IHwgS2hyb25vcywgdW5pdD86IE1vbWVudFVuaXRPZlRpbWUpOiBEdXJhdGlvbjtcbm1vbWVudC5kdXJhdGlvbiA9IChpbnB1dD86IER1cmF0aW9uIHwgRGF0ZUlucHV0IHwgS2hyb25vcywgdW5pdD86IE1vbWVudFVuaXRPZlRpbWUpOiBEdXJhdGlvbiA9PiB7XG4gIGNvbnN0IF91bml0ID0gbWFwVW5pdE9mVGltZSh1bml0KTtcbiAgaWYgKGlzRGF0ZShpbnB1dCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3RvZG8gaW1wbGVtZW50Jyk7XG4gIH1cblxuICBpZiAoaW5wdXQgPT0gbnVsbCkge1xuICAgIHJldHVybiBjcmVhdGVEdXJhdGlvbigpO1xuICB9XG5cbiAgaWYgKGlzRHVyYXRpb24oaW5wdXQpKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUR1cmF0aW9uKGlucHV0LCBfdW5pdCwgeyBfbG9jYWxlOiBpbnB1dC5fbG9jYWxlIH0pO1xuICB9XG5cbiAgaWYgKGlzU3RyaW5nKGlucHV0KSB8fCBpc051bWJlcihpbnB1dCkgfHwgaXNEdXJhdGlvbihpbnB1dCkgfHwgaXNPYmplY3Q8RGF0ZU9iamVjdD4oaW5wdXQpKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUR1cmF0aW9uKGlucHV0LCBfdW5pdCk7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ3RvZG8gaW1wbGVtZW50Jyk7XG59O1xuXG5tb21lbnQubWluID0gZnVuY3Rpb24gX21pbiguLi5kYXRlczogKChEYXRlSW5wdXQgfCBLaHJvbm9zKVtdIHwgKERhdGVJbnB1dCB8IEtocm9ub3MpKVtdKTogS2hyb25vcyB7XG4gIGNvbnN0IF9maXJzdEFyZyA9IGRhdGVzWzBdO1xuICBjb25zdCBfZGF0ZXMgPSAoaXNBcnJheShfZmlyc3RBcmcpID8gX2ZpcnN0QXJnIDogZGF0ZXMpXG4gICAgLm1hcCgoZGF0ZTogS2hyb25vcykgPT4gX21vbWVudChkYXRlKSlcbiAgICAubWFwKGRhdGUgPT4gZGF0ZS50b0RhdGUoKSk7XG5cbiAgY29uc3QgX2RhdGUgPSBtaW4oLi4uX2RhdGVzKTtcblxuICByZXR1cm4gbmV3IEtocm9ub3MoX2RhdGUpO1xufTtcblxubW9tZW50Lm1heCA9IGZ1bmN0aW9uIF9tYXgoLi4uZGF0ZXM6ICgoRGF0ZUlucHV0IHwgS2hyb25vcylbXSB8IChEYXRlSW5wdXQgfCBLaHJvbm9zKSlbXSk6IEtocm9ub3Mge1xuICBjb25zdCBfZmlyc3RBcmcgPSBkYXRlc1swXTtcbiAgY29uc3QgX2RhdGVzID0gKGlzQXJyYXkoX2ZpcnN0QXJnKSA/IF9maXJzdEFyZyA6IGRhdGVzKVxuICAgIC5tYXAoKGRhdGU6IEtocm9ub3MpID0+IF9tb21lbnQoZGF0ZSkpXG4gICAgLm1hcChkYXRlID0+IGRhdGUudG9EYXRlKCkpO1xuXG4gIGNvbnN0IF9kYXRlID0gbWF4KC4uLl9kYXRlcyk7XG5cbiAgcmV0dXJuIG5ldyBLaHJvbm9zKF9kYXRlKTtcbn07XG5cbm1vbWVudC5sb2NhbGVzID0gKCk6IHN0cmluZ1tdID0+IHtcbiAgcmV0dXJuIGxpc3RMb2NhbGVzKCk7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIE1vbWVudElucHV0T2JqZWN0IHtcbiAgeWVhcnM/OiBudW1iZXI7XG4gIHllYXI/OiBudW1iZXI7XG4gIHk/OiBudW1iZXI7XG5cbiAgbW9udGhzPzogbnVtYmVyO1xuICBtb250aD86IG51bWJlcjtcbiAgTT86IG51bWJlcjtcblxuICBkYXlzPzogbnVtYmVyO1xuICBkYXk/OiBudW1iZXI7XG4gIGQ/OiBudW1iZXI7XG5cbiAgZGF0ZXM/OiBudW1iZXI7XG4gIGRhdGU/OiBudW1iZXI7XG4gIEQ/OiBudW1iZXI7XG5cbiAgaG91cnM/OiBudW1iZXI7XG4gIGhvdXI/OiBudW1iZXI7XG4gIGg/OiBudW1iZXI7XG5cbiAgbWludXRlcz86IG51bWJlcjtcbiAgbWludXRlPzogbnVtYmVyO1xuICBtPzogbnVtYmVyO1xuXG4gIHNlY29uZHM/OiBudW1iZXI7XG4gIHNlY29uZD86IG51bWJlcjtcbiAgcz86IG51bWJlcjtcblxuICBtaWxsaXNlY29uZHM/OiBudW1iZXI7XG4gIG1pbGxpc2Vjb25kPzogbnVtYmVyO1xuICBtcz86IG51bWJlcjtcblxuICB3PzogbnVtYmVyO1xuICB3ZWVrPzogbnVtYmVyO1xuICB3ZWVrcz86IG51bWJlcjtcblxuICBRPzogbnVtYmVyO1xuICBxdWFydGVyPzogbnVtYmVyO1xuICBxdWFydGVycz86IG51bWJlcjtcblxuICB3ZWVrWWVhcj86IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgTW9tZW50VW5pdE9mVGltZSA9IChcbiAgJ3llYXInIHwgJ3llYXJzJyB8ICd5JyB8XG4gICdtb250aCcgfCAnbW9udGhzJyB8ICdNJyB8XG4gICd3ZWVrJyB8ICd3ZWVrcycgfCAndycgfFxuICAnZGF5JyB8ICdkYXlzJyB8ICdkJyB8XG4gICdob3VyJyB8ICdob3VycycgfCAnaCcgfFxuICAnbWludXRlJyB8ICdtaW51dGVzJyB8ICdtJyB8XG4gICdzZWNvbmQnIHwgJ3NlY29uZHMnIHwgJ3MnIHxcbiAgJ21pbGxpc2Vjb25kJyB8ICdtaWxsaXNlY29uZHMnIHwgJ21zJyB8XG4gICdxJyB8ICdxdWFydGVyJyB8ICdxdWFydGVycycgfCAnUScgfFxuICAnaXNvV2VlaycgfCAnaXNvV2Vla3MnIHwgJ1cnIHxcbiAgJ2RhdGUnIHwgJ2RhdGVzJyB8ICdEJ1xuICApO1xuXG5leHBvcnQgdHlwZSBNb21lbnRBbGwgPSBNb21lbnRVbml0T2ZUaW1lIHxcbiAgJ3dlZWtZZWFyJyB8ICd3ZWVrWWVhcnMnIHwgJ2dnJyB8XG4gICdpc29XZWVrWWVhcicgfCAnaXNvV2Vla1llYXJzJyB8ICdHRycgfFxuICAnZGF5T2ZZZWFyJyB8ICdkYXlPZlllYXJzJyB8ICdEREQnIHxcbiAgJ3dlZWtkYXknIHwgJ3dlZWtkYXlzJyB8ICdlJyB8XG4gICdpc29XZWVrZGF5JyB8ICdpc29XZWVrZGF5cycgfCAnRSc7XG5cbmNvbnN0IF91bml0c1ByaW9yaXR5OiB7W2tleSBpbiBVbml0T2ZUaW1lXTogbnVtYmVyfSA9IHtcbiAgeWVhcjogMSxcbiAgbW9udGg6IDgsXG4gIHdlZWs6IDUsXG4gIGlzb1dlZWs6IDUsXG4gIGRheTogMTEsXG4gIHdlZWtkYXk6IDExLFxuICBpc29XZWVrZGF5OiAxMSxcbiAgaG91cnM6IDEzLFxuICB3ZWVrWWVhcjogMSxcbiAgaXNvV2Vla1llYXI6IDEsXG4gIHF1YXJ0ZXI6IDcsXG4gIGRhdGU6IDksXG4gIGRheU9mWWVhcjogNCxcbiAgbWludXRlczogMTQsXG4gIHNlY29uZHM6IDE1LFxuICBtaWxsaXNlY29uZHM6IDE2XG59O1xuXG4vLyB0b2RvOiBkbyBJIG5lZWQgMiBtYXBwZXJzP1xuY29uc3QgX3RpbWVIYXNoTWFwOiB7IFtrZXkgaW4gTW9tZW50QWxsXTogVW5pdE9mVGltZSB8IHN0cmluZyB9ID0ge1xuICB5OiAneWVhcicsXG4gIHllYXJzOiAneWVhcicsXG4gIHllYXI6ICd5ZWFyJyxcbiAgTTogJ21vbnRoJyxcbiAgbW9udGhzOiAnbW9udGgnLFxuICBtb250aDogJ21vbnRoJyxcbiAgdzogJ3dlZWsnLFxuICB3ZWVrczogJ3dlZWsnLFxuICB3ZWVrOiAnd2VlaycsXG5cbiAgZDogJ2RheScsXG4gIGRheXM6ICdkYXknLFxuICBkYXk6ICdkYXknLFxuXG4gIGRhdGU6ICdkYXRlJyxcbiAgZGF0ZXM6ICdkYXRlJyxcbiAgRDogJ2RhdGUnLFxuXG4gIGg6ICdob3VycycsXG4gIGhvdXI6ICdob3VycycsXG4gIGhvdXJzOiAnaG91cnMnLFxuICBtOiAnbWludXRlcycsXG4gIG1pbnV0ZTogJ21pbnV0ZXMnLFxuICBtaW51dGVzOiAnbWludXRlcycsXG4gIHM6ICdzZWNvbmRzJyxcbiAgc2Vjb25kOiAnc2Vjb25kcycsXG4gIHNlY29uZHM6ICdzZWNvbmRzJyxcbiAgbXM6ICdtaWxsaXNlY29uZHMnLFxuICBtaWxsaXNlY29uZDogJ21pbGxpc2Vjb25kcycsXG4gIG1pbGxpc2Vjb25kczogJ21pbGxpc2Vjb25kcycsXG4gIHF1YXJ0ZXI6ICdxdWFydGVyJyxcbiAgcXVhcnRlcnM6ICdxdWFydGVyJyxcbiAgcTogJ3F1YXJ0ZXInLFxuICBROiAncXVhcnRlcicsXG4gIGlzb1dlZWs6ICdpc29XZWVrJyxcbiAgaXNvV2Vla3M6ICdpc29XZWVrJyxcbiAgVzogJ2lzb1dlZWsnLFxuICB3ZWVrWWVhcjogJ3dlZWtZZWFyJyxcbiAgd2Vla1llYXJzOiAnd2Vla1llYXInLFxuICBnZzogJ3dlZWtZZWFycycsXG4gIGlzb1dlZWtZZWFyOiAnaXNvV2Vla1llYXInLFxuICBpc29XZWVrWWVhcnM6ICdpc29XZWVrWWVhcicsXG4gIEdHOiAnaXNvV2Vla1llYXInLFxuICBkYXlPZlllYXI6ICdkYXlPZlllYXInLFxuICBkYXlPZlllYXJzOiAnZGF5T2ZZZWFyJyxcbiAgREREOiAnZGF5T2ZZZWFyJyxcbiAgd2Vla2RheTogJ3dlZWtkYXknLFxuICB3ZWVrZGF5czogJ3dlZWtkYXknLFxuICBlOiAnd2Vla2RheScsXG4gIGlzb1dlZWtkYXk6ICdpc29XZWVrZGF5JyxcbiAgaXNvV2Vla2RheXM6ICdpc29XZWVrZGF5JyxcbiAgRTogJ2lzb1dlZWtkYXknXG59O1xuXG5mdW5jdGlvbiBtYXBVbml0T2ZUaW1lKHBlcmlvZDogTW9tZW50QWxsKTogVW5pdE9mVGltZSB7XG4gIHJldHVybiBfdGltZUhhc2hNYXBbcGVyaW9kXSBhcyBVbml0T2ZUaW1lO1xufVxuXG5mdW5jdGlvbiBtYXBNb21lbnRJbnB1dE9iamVjdChvYmo6IE1vbWVudElucHV0T2JqZWN0KToge1trZXkgaW4gVW5pdE9mVGltZV0/OiBudW1iZXJ9IHtcbiAgY29uc3QgX3Jlczoge1trZXkgaW4gVW5pdE9mVGltZV0/OiBudW1iZXJ9ID0ge307XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iailcbiAgICAucmVkdWNlKChyZXMsIGtleToga2V5b2YgTW9tZW50SW5wdXRPYmplY3QpID0+IHtcbiAgICAgIHJlc1ttYXBVbml0T2ZUaW1lKGtleSldID0gb2JqW2tleV07XG5cbiAgICAgIHJldHVybiByZXM7XG4gICAgfSwgX3Jlcyk7XG59XG5cbmV4cG9ydCBjbGFzcyBLaHJvbm9zIHtcbiAgX2RhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICBfaXNVVEMgPSBmYWxzZTtcbiAgX2lzU3RyaWN0OiBib29sZWFuO1xuICBfbG9jYWxlOiBMb2NhbGU7XG4gIF9mb3JtYXQ6IHN0cmluZyB8IHN0cmluZ1tdO1xuICBfb2Zmc2V0OiBudW1iZXI7XG4gIF90em06IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihpbnB1dD86IERhdGVJbnB1dCxcbiAgICAgICAgICAgICAgZm9ybWF0Pzogc3RyaW5nIHwgc3RyaW5nW10sXG4gICAgICAgICAgICAgIGxvY2FsZUtleT86IHN0cmluZyxcbiAgICAgICAgICAgICAgc3RyaWN0ID0gZmFsc2UsXG4gICAgICAgICAgICAgIGlzVVRDID0gZmFsc2UsXG4gICAgICAgICAgICAgIG9mZnNldD86IG51bWJlcikge1xuICAgIC8vIGxvY2FsZSB3aWxsIGJlIG5lZWRlZCB0byBmb3JtYXQgaW52YWxpZCBkYXRlIG1lc3NhZ2VcbiAgICB0aGlzLl9sb2NhbGUgPSBnZXRMb2NhbGUobG9jYWxlS2V5KTtcbiAgICAvLyBwYXJzZSBpbnZhbGlkIGlucHV0XG4gICAgaWYgKGlucHV0ID09PSAnJyB8fCBpbnB1dCA9PT0gbnVsbCB8fCAoaXNOdW1iZXIoaW5wdXQpICYmIGlzTmFOKGlucHV0KSkpIHtcbiAgICAgIHRoaXMuX2RhdGUgPSBuZXcgRGF0ZShOYU4pO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0aGlzLl9pc1VUQyA9IGlzVVRDO1xuICAgIGlmICh0aGlzLl9pc1VUQykge1xuICAgICAgdGhpcy5fb2Zmc2V0ID0gMDtcbiAgICB9XG4gICAgaWYgKG9mZnNldCB8fCBvZmZzZXQgPT09IDApIHtcbiAgICAgIHRoaXMuX29mZnNldCA9IG9mZnNldDtcbiAgICB9XG4gICAgdGhpcy5faXNTdHJpY3QgPSBzdHJpY3Q7XG4gICAgdGhpcy5fZm9ybWF0ID0gZm9ybWF0O1xuXG4gICAgaWYgKCFpbnB1dCAmJiBpbnB1dCAhPT0gMCAmJiAhZm9ybWF0KSB7XG4gICAgICB0aGlzLl9kYXRlID0gbmV3IERhdGUoKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKGlzRGF0ZShpbnB1dCkpIHtcbiAgICAgIHRoaXMuX2RhdGUgPSBjbG9uZURhdGUoaW5wdXQpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyB0aGlzLl9kYXRlID0gcGFyc2VEYXRlKGlucHV0LCBmb3JtYXQsIGxvY2FsZUtleSwgc3RyaWN0LCBpc1VUQyk7XG4gICAgY29uc3QgY29uZmlnID0gY3JlYXRlTG9jYWxPclVUQyhpbnB1dCwgZm9ybWF0LCBsb2NhbGVLZXksIHN0cmljdCwgaXNVVEMpO1xuICAgIHRoaXMuX2RhdGUgPSBjb25maWcuX2Q7XG4gICAgdGhpcy5fb2Zmc2V0ID0gaXNOdW1iZXIoY29uZmlnLl9vZmZzZXQpID8gY29uZmlnLl9vZmZzZXQgOiB0aGlzLl9vZmZzZXQ7XG4gICAgdGhpcy5faXNVVEMgPSBjb25maWcuX2lzVVRDO1xuICAgIHRoaXMuX2lzU3RyaWN0ID0gY29uZmlnLl9zdHJpY3Q7XG4gICAgdGhpcy5fZm9ybWF0ID0gY29uZmlnLl9mO1xuICAgIHRoaXMuX3R6bSA9IGNvbmZpZy5fdHptO1xuICB9XG5cbiAgX3RvQ29uZmlnKCk6IERhdGVQYXJzaW5nQ29uZmlnIHtcbiAgICByZXR1cm4geyBfaXNVVEM6IHRoaXMuX2lzVVRDLCBfbG9jYWxlOiB0aGlzLl9sb2NhbGUsIF9vZmZzZXQ6IHRoaXMuX29mZnNldCwgX3R6bTogdGhpcy5fdHptIH07XG4gIH1cblxuICAvLyBMb2NhbGVcbiAgbG9jYWxlKCk6IHN0cmluZztcbiAgbG9jYWxlKGxvY2FsZUtleTogc3RyaW5nIHwgc3RyaW5nW10gfCBLaHJvbm9zKTogS2hyb25vcztcbiAgbG9jYWxlKGxvY2FsZUtleT86IHN0cmluZyB8IHN0cmluZ1tdIHwgS2hyb25vcyk6IEtocm9ub3MgfCBzdHJpbmcge1xuICAgIGlmIChpc1VuZGVmaW5lZChsb2NhbGVLZXkpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbG9jYWxlLl9hYmJyO1xuICAgIH1cblxuICAgIGlmIChsb2NhbGVLZXkgaW5zdGFuY2VvZiBLaHJvbm9zKSB7XG4gICAgICB0aGlzLl9sb2NhbGUgPSBsb2NhbGVLZXkuX2xvY2FsZTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY29uc3QgbmV3TG9jYWxlRGF0YSA9IGdldExvY2FsZShsb2NhbGVLZXkpO1xuICAgIGlmIChuZXdMb2NhbGVEYXRhICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2xvY2FsZSA9IG5ld0xvY2FsZURhdGE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsb2NhbGVEYXRhKCk6IExvY2FsZSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZTtcbiAgfVxuXG4gIC8vIEJhc2ljXG5cbiAgYWRkKHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgTW9tZW50SW5wdXRPYmplY3QsIHBlcmlvZD86IFVuaXRPZlRpbWUgfCBNb21lbnRVbml0T2ZUaW1lKTogS2hyb25vcyB7XG4gICAgaWYgKGlzU3RyaW5nKHZhbCkpIHtcbiAgICAgIHRoaXMuX2RhdGUgPSBhZGQodGhpcy5fZGF0ZSwgcGFyc2VJbnQodmFsLCAxMCksIG1hcFVuaXRPZlRpbWUocGVyaW9kKSk7XG4gICAgfVxuXG4gICAgaWYgKGlzTnVtYmVyKHZhbCkpIHtcbiAgICAgIHRoaXMuX2RhdGUgPSBhZGQodGhpcy5fZGF0ZSwgdmFsLCBtYXBVbml0T2ZUaW1lKHBlcmlvZCkpO1xuICAgIH1cblxuICAgIGlmIChpc09iamVjdDxNb21lbnRJbnB1dE9iamVjdD4odmFsKSkge1xuICAgICAgY29uc3QgX21hcHBlZCA9IG1hcE1vbWVudElucHV0T2JqZWN0KHZhbCk7XG4gICAgICBPYmplY3Qua2V5cyhfbWFwcGVkKVxuICAgICAgICAuZm9yRWFjaCgoa2V5OiBVbml0T2ZUaW1lKSA9PiBhZGQodGhpcy5fZGF0ZSwgX21hcHBlZFtrZXldLCBrZXkpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGZpeG1lOiBmb3Igc29tZSByZWFzb24gaGVyZSAnbnVsbCcgZm9yIHRpbWUgaXMgZmluZVxuICBjYWxlbmRhcih0aW1lPzogRGF0ZUlucHV0IHwgS2hyb25vcywgZm9ybWF0cz86IENhbGVuZGFyU3BlYyk6IHN0cmluZyB7XG4gICAgY29uc3QgX3RpbWUgPSB0aW1lIGluc3RhbmNlb2YgS2hyb25vcyA/IHRpbWUgOiBuZXcgS2hyb25vcyh0aW1lIHx8IG5ldyBEYXRlKCkpO1xuICAgIGNvbnN0IF9vZmZzZXQgPSAodGhpcy5fb2Zmc2V0IHx8IDApIC0gKF90aW1lLl9vZmZzZXQgfHwgMCk7XG4gICAgY29uc3QgX2NvbmZpZyA9IE9iamVjdC5hc3NpZ24odGhpcy5fdG9Db25maWcoKSwgeyBfb2Zmc2V0IH0pO1xuXG4gICAgcmV0dXJuIGNhbGVuZGFyKHRoaXMuX2RhdGUsIF90aW1lLl9kYXRlLFxuICAgICAgZm9ybWF0cywgdGhpcy5fbG9jYWxlLCBfY29uZmlnKTtcbiAgfVxuXG4gIGNsb25lKCk6IEtocm9ub3Mge1xuICAgIGNvbnN0IGxvY2FsZUtleSA9IHRoaXMuX2xvY2FsZSAmJiB0aGlzLl9sb2NhbGUuX2FiYnIgfHwgJ2VuJztcblxuICAgIC8vIHJldHVybiBuZXcgS2hyb25vcyhjbG9uZURhdGUodGhpcy5fZGF0ZSksIHRoaXMuX2Zvcm1hdCwgbG9jYWxlS2V5LCB0aGlzLl9pc1N0cmljdCwgdGhpcy5faXNVVEMpO1xuICAgIC8vIGZhaWxzIGlmIGlzVVRDIGFuZCBvZmZzZXRcbiAgICAvLyByZXR1cm4gbmV3IEtocm9ub3MobmV3IERhdGUodGhpcy52YWx1ZU9mKCkpLFxuICAgIHJldHVybiBuZXcgS2hyb25vcyh0aGlzLl9kYXRlLFxuICAgICAgdGhpcy5fZm9ybWF0LFxuICAgICAgbG9jYWxlS2V5LFxuICAgICAgdGhpcy5faXNTdHJpY3QsXG4gICAgICB0aGlzLl9pc1VUQyxcbiAgICAgIHRoaXMuX29mZnNldCk7XG4gIH1cblxuICBkaWZmKGI6IERhdGVJbnB1dCB8IEtocm9ub3MsIHVuaXRPZlRpbWU/OiBNb21lbnRVbml0T2ZUaW1lLCBwcmVjaXNlPzogYm9vbGVhbik6IG51bWJlciB7XG4gICAgY29uc3QgdW5pdCA9IG1hcFVuaXRPZlRpbWUodW5pdE9mVGltZSk7XG4gICAgY29uc3QgX2IgPSBiIGluc3RhbmNlb2YgS2hyb25vcyA/IGIgOiBuZXcgS2hyb25vcyhiKTtcbiAgICAvLyBjb25zdCB6b25lRGVsdGEgPSAoX2IudXRjT2Zmc2V0KCkgLSB0aGlzLnV0Y09mZnNldCgpKTtcbiAgICAvLyBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHRoaXMuX3RvQ29uZmlnKCksIHtcbiAgICAvLyAgIF9vZmZzZXQ6IDAsXG4gICAgLy8gICBfaXNVVEM6IHRydWUsXG4gICAgLy8gICBfem9uZURlbHRhOiB6b25lRGVsdGFcbiAgICAvLyB9KTtcbiAgICAvLyByZXR1cm4gZGlmZihuZXcgRGF0ZSh0aGlzLnZhbHVlT2YoKSksIG5ldyBEYXRlKF9iLnZhbHVlT2YoKSksIHVuaXQsIHByZWNpc2UsIGNvbmZpZyk7XG5cbiAgICByZXR1cm4gZGlmZih0aGlzLl9kYXRlLCBfYi50b0RhdGUoKSwgdW5pdCwgcHJlY2lzZSwgdGhpcy5fdG9Db25maWcoKSk7XG4gIH1cblxuICBlbmRPZihwZXJpb2Q/OiBNb21lbnRVbml0T2ZUaW1lKTogS2hyb25vcyB7XG4gICAgY29uc3QgX3BlciA9IG1hcFVuaXRPZlRpbWUocGVyaW9kKTtcbiAgICB0aGlzLl9kYXRlID0gZW5kT2YodGhpcy5fZGF0ZSwgX3BlciwgdGhpcy5faXNVVEMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmb3JtYXQoZm9ybWF0Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZm9ybWF0RGF0ZSh0aGlzLl9kYXRlLCBmb3JtYXQsIHRoaXMuX2xvY2FsZSAmJiB0aGlzLl9sb2NhbGUuX2FiYnIsIHRoaXMuX2lzVVRDLCB0aGlzLl9vZmZzZXQpO1xuICB9XG5cbiAgLy8gdG9kbzogaW1wbGVtZW50XG4gIGZyb20odGltZT86IERhdGVJbnB1dCB8IEtocm9ub3MsIHdpdGhvdXRTdWZmaXg/OiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBjb25zdCBfdGltZSA9IF9tb21lbnQodGltZSk7XG4gICAgaWYgKHRoaXMuaXNWYWxpZCgpICYmIF90aW1lLmlzVmFsaWQoKSkge1xuICAgICAgcmV0dXJuIGNyZWF0ZUR1cmF0aW9uKHsgdG86IHRoaXMudG9EYXRlKCksIGZyb206IF90aW1lLnRvRGF0ZSgpIH0pXG4gICAgICAgIC5sb2NhbGUodGhpcy5sb2NhbGUoKSlcbiAgICAgICAgLmh1bWFuaXplKCF3aXRob3V0U3VmZml4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGU7XG4gIH1cblxuICBmcm9tTm93KHdpdGhvdXRTdWZmaXg/OiBib29sZWFuKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5mcm9tKG5ldyBEYXRlKCksIHdpdGhvdXRTdWZmaXgpO1xuICB9XG5cbiAgdG8oaW5wOiBEYXRlSW5wdXQgfCBLaHJvbm9zLCBzdWZmaXg/OiBib29sZWFuKTogc3RyaW5nIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRPRE86IEltcGxlbWVudGApO1xuICB9XG5cbiAgdG9Ob3cod2l0aG91dFByZWZpeD86IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIHRocm93IG5ldyBFcnJvcihgVE9ETzogSW1wbGVtZW50YCk7XG4gIH1cblxuICBzdWJ0cmFjdCh2YWw6IG51bWJlciB8IHN0cmluZyB8IE1vbWVudElucHV0T2JqZWN0LCBwZXJpb2Q/OiBVbml0T2ZUaW1lIHwgTW9tZW50VW5pdE9mVGltZSk6IEtocm9ub3Mge1xuICAgIGlmIChpc1N0cmluZyh2YWwpKSB7XG4gICAgICB0aGlzLl9kYXRlID0gc3VidHJhY3QodGhpcy5fZGF0ZSwgcGFyc2VJbnQodmFsLCAxMCksIG1hcFVuaXRPZlRpbWUocGVyaW9kKSk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmIChpc051bWJlcih2YWwpKSB7XG4gICAgICB0aGlzLl9kYXRlID0gc3VidHJhY3QodGhpcy5fZGF0ZSwgdmFsLCBtYXBVbml0T2ZUaW1lKHBlcmlvZCkpO1xuICAgIH1cblxuICAgIGlmIChpc09iamVjdDxNb21lbnRJbnB1dE9iamVjdD4odmFsKSkge1xuICAgICAgY29uc3QgX21hcHBlZCA9IG1hcE1vbWVudElucHV0T2JqZWN0KHZhbCk7XG4gICAgICBPYmplY3Qua2V5cyhfbWFwcGVkKVxuICAgICAgICAuZm9yRWFjaCgoa2V5OiBVbml0T2ZUaW1lKSA9PiBzdWJ0cmFjdCh0aGlzLl9kYXRlLCBfbWFwcGVkW2tleV0sIGtleSkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0KHBlcmlvZDogTW9tZW50QWxsKTogbnVtYmVyIHtcbiAgICBpZiAocGVyaW9kID09PSAnZGF5T2ZZZWFyJykge1xuICAgICAgcmV0dXJuIHRoaXMuZGF5T2ZZZWFyKCk7XG4gICAgfVxuXG4gICAgY29uc3QgdW5pdCA9IG1hcFVuaXRPZlRpbWUocGVyaW9kKTtcbiAgICBzd2l0Y2ggKHVuaXQpIHtcbiAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICByZXR1cm4gdGhpcy55ZWFyKCk7XG4gICAgICBjYXNlICdtb250aCc6XG4gICAgICAgIHJldHVybiB0aGlzLm1vbnRoKCk7XG4gICAgICAvLyB8ICd3ZWVrJ1xuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGUoKTtcbiAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgIHJldHVybiB0aGlzLmRheSgpO1xuICAgICAgY2FzZSAnaG91cnMnOlxuICAgICAgICByZXR1cm4gdGhpcy5ob3VycygpO1xuICAgICAgY2FzZSAnbWludXRlcyc6XG4gICAgICAgIHJldHVybiB0aGlzLm1pbnV0ZXMoKTtcbiAgICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgICAgICByZXR1cm4gdGhpcy5zZWNvbmRzKCk7XG4gICAgICBjYXNlICdtaWxsaXNlY29uZHMnOlxuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZHMoKTtcbiAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICByZXR1cm4gdGhpcy53ZWVrKCk7XG4gICAgICBjYXNlICdpc29XZWVrJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNvV2VlaygpO1xuICAgICAgY2FzZSAnd2Vla1llYXInOlxuICAgICAgICByZXR1cm4gdGhpcy53ZWVrWWVhcigpO1xuICAgICAgY2FzZSAnaXNvV2Vla1llYXInOlxuICAgICAgICByZXR1cm4gdGhpcy5pc29XZWVrWWVhcigpO1xuICAgICAgY2FzZSAnd2Vla2RheSc6XG4gICAgICAgIHJldHVybiB0aGlzLndlZWtkYXkoKTtcbiAgICAgIGNhc2UgJ2lzb1dlZWtkYXknOlxuICAgICAgICByZXR1cm4gdGhpcy5pc29XZWVrZGF5KCk7XG4gICAgICBjYXNlICdxdWFydGVyJzpcbiAgICAgICAgcmV0dXJuIHRoaXMucXVhcnRlcigpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIG1vbWVudC5nZXQoJyR7cGVyaW9kfScpYCk7XG4gICAgfVxuICB9XG5cbiAgc2V0KHBlcmlvZDogTW9tZW50QWxsIHwgTW9tZW50SW5wdXRPYmplY3QsIGlucHV0PzogbnVtYmVyKTogS2hyb25vcyB7XG5cbiAgICBpZiAoaXNTdHJpbmcocGVyaW9kKSkge1xuICAgICAgY29uc3QgdW5pdCA9IG1hcFVuaXRPZlRpbWUocGVyaW9kKTtcbiAgICAgIHN3aXRjaCAodW5pdCkge1xuICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy55ZWFyKGlucHV0KTtcbiAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgIHJldHVybiB0aGlzLm1vbnRoKGlucHV0KTtcbiAgICAgICAgLy8gfCAnd2VlaydcbiAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5kYXkoaW5wdXQpO1xuICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlKGlucHV0KTtcbiAgICAgICAgY2FzZSAnaG91cnMnOlxuICAgICAgICAgIHJldHVybiB0aGlzLmhvdXJzKGlucHV0KTtcbiAgICAgICAgY2FzZSAnbWludXRlcyc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMubWludXRlcyhpbnB1dCk7XG4gICAgICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgICAgICAgIHJldHVybiB0aGlzLnNlY29uZHMoaW5wdXQpO1xuICAgICAgICBjYXNlICdtaWxsaXNlY29uZHMnOlxuICAgICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kcyhpbnB1dCk7XG4gICAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICAgIHJldHVybiB0aGlzLndlZWsoaW5wdXQpO1xuICAgICAgICBjYXNlICdpc29XZWVrJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5pc29XZWVrKGlucHV0KTtcbiAgICAgICAgY2FzZSAnd2Vla1llYXInOlxuICAgICAgICAgIHJldHVybiB0aGlzLndlZWtZZWFyKGlucHV0KTtcbiAgICAgICAgY2FzZSAnaXNvV2Vla1llYXInOlxuICAgICAgICAgIHJldHVybiB0aGlzLmlzb1dlZWtZZWFyKGlucHV0KTtcbiAgICAgICAgY2FzZSAnd2Vla2RheSc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMud2Vla2RheShpbnB1dCk7XG4gICAgICAgIGNhc2UgJ2lzb1dlZWtkYXknOlxuICAgICAgICAgIHJldHVybiB0aGlzLmlzb1dlZWtkYXkoaW5wdXQpO1xuICAgICAgICBjYXNlICdxdWFydGVyJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5xdWFydGVyKGlucHV0KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gbW9tZW50LmdldCgnJHtwZXJpb2R9JylgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNPYmplY3Q8TW9tZW50SW5wdXRPYmplY3Q+KHBlcmlvZCkpIHtcbiAgICAgIGNvbnN0IF9tYXBwZWQgPSBtYXBNb21lbnRJbnB1dE9iamVjdChwZXJpb2QpO1xuICAgICAgT2JqZWN0LmtleXMoX21hcHBlZClcbiAgICAgICAgLnNvcnQoZnVuY3Rpb24oYTogVW5pdE9mVGltZSwgYjogVW5pdE9mVGltZSk6IG51bWJlciB7XG4gICAgICAgICAgcmV0dXJuIF91bml0c1ByaW9yaXR5W2FdIC0gX3VuaXRzUHJpb3JpdHlbYl07XG4gICAgICAgIH0pXG4gICAgICAgIC5mb3JFYWNoKChrZXk6IFVuaXRPZlRpbWUpID0+IHRoaXMuc2V0KGtleSwgX21hcHBlZFtrZXldKSk7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0KCdkZGQgTU1NIEREIFlZWVkgSEg6bW06c3MgW0dNVF1aWicpO1xuICB9XG5cbiAgdG9JU09TdHJpbmcoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoZ2V0RnVsbFllYXIodGhpcy5fZGF0ZSwgdHJ1ZSkgPCAwIHx8IGdldEZ1bGxZZWFyKHRoaXMuX2RhdGUsIHRydWUpID4gOTk5OSkge1xuICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0KCdZWVlZWVktTU0tRERbVF1ISDptbTpzcy5TU1NbWl0nKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbihEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZykpIHtcbiAgICAgIC8vIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBpcyB+NTB4IGZhc3RlciwgdXNlIGl0IHdoZW4gd2UgY2FuXG4gICAgICByZXR1cm4gdGhpcy50b0RhdGUoKS50b0lTT1N0cmluZygpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmZvcm1hdCgnWVlZWS1NTS1ERFtUXUhIOm1tOnNzLlNTU1taXScpO1xuICB9XG5cbiAgaW5zcGVjdCgpOiBzdHJpbmcge1xuICAgIHRocm93IG5ldyBFcnJvcignVE9ETzogaW1wbGVtZW50Jyk7XG4gIH1cblxuICB0b0pTT04oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50b0lTT1N0cmluZygpO1xuICB9XG5cbiAgdG9EYXRlKCk6IERhdGUge1xuICAgIHJldHVybiBuZXcgRGF0ZSh0aGlzLnZhbHVlT2YoKSk7XG4gIH1cblxuICB0b09iamVjdCgpOiB7W2tleSBpbiBNb21lbnRVbml0T2ZUaW1lXT86IG51bWJlcn0ge1xuICAgIHJldHVybiB7XG4gICAgICAvLyB5ZWFyczogZ2V0RnVsbFllYXIodGhpcy5fZGF0ZSwgdGhpcy5faXNVVEMpLFxuICAgICAgLy8gbW9udGhzOiBnZXRNb250aCh0aGlzLl9kYXRlLCB0aGlzLl9pc1VUQyksXG5cbiAgICAgIHllYXI6IGdldEZ1bGxZZWFyKHRoaXMuX2RhdGUsIHRoaXMuX2lzVVRDKSxcbiAgICAgIG1vbnRoOiBnZXRNb250aCh0aGlzLl9kYXRlLCB0aGlzLl9pc1VUQyksXG4gICAgICBkYXRlOiBnZXREYXRlKHRoaXMuX2RhdGUsIHRoaXMuX2lzVVRDKSxcbiAgICAgIGhvdXJzOiBnZXRIb3Vycyh0aGlzLl9kYXRlLCB0aGlzLl9pc1VUQyksXG4gICAgICBtaW51dGVzOiBnZXRNaW51dGVzKHRoaXMuX2RhdGUsIHRoaXMuX2lzVVRDKSxcbiAgICAgIHNlY29uZHM6IGdldFNlY29uZHModGhpcy5fZGF0ZSwgdGhpcy5faXNVVEMpLFxuICAgICAgbWlsbGlzZWNvbmRzOiBnZXRNaWxsaXNlY29uZHModGhpcy5fZGF0ZSwgdGhpcy5faXNVVEMpXG4gICAgfTtcbiAgfVxuXG4gIHRvQXJyYXkoKTogRGF0ZUFycmF5IHtcbiAgICByZXR1cm4gW3RoaXMueWVhcigpLCB0aGlzLm1vbnRoKCksIHRoaXMuZGF0ZSgpLCB0aGlzLmhvdXIoKSwgdGhpcy5taW51dGUoKSwgdGhpcy5zZWNvbmQoKSwgdGhpcy5taWxsaXNlY29uZCgpXTtcbiAgfVxuXG5cbiAgLy8gRGF0ZXMgYm9vbGVhbiBhbGdlYnJhXG5cbiAgaXNBZnRlcihkYXRlOiBLaHJvbm9zLCB1bml0PzogTW9tZW50VW5pdE9mVGltZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IF91bml0ID0gdW5pdCA/IG1hcFVuaXRPZlRpbWUodW5pdCkgOiB2b2lkIDA7XG5cbiAgICByZXR1cm4gaXNBZnRlcih0aGlzLl9kYXRlLCBkYXRlLnRvRGF0ZSgpLCBfdW5pdCk7XG4gIH1cblxuICBpc0JlZm9yZShkYXRlOiBLaHJvbm9zLCB1bml0PzogTW9tZW50VW5pdE9mVGltZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IF91bml0ID0gdW5pdCA/IG1hcFVuaXRPZlRpbWUodW5pdCkgOiB2b2lkIDA7XG5cbiAgICByZXR1cm4gaXNCZWZvcmUodGhpcy50b0RhdGUoKSwgZGF0ZS50b0RhdGUoKSwgX3VuaXQpO1xuICB9XG5cbiAgaXNCZXR3ZWVuKGZyb206IEtocm9ub3MsIHRvOiBLaHJvbm9zLCB1bml0PzogTW9tZW50VW5pdE9mVGltZSwgaW5jbHVzaXZpdHk/OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBfdW5pdCA9IHVuaXQgPyBtYXBVbml0T2ZUaW1lKHVuaXQpIDogdm9pZCAwO1xuXG4gICAgcmV0dXJuIGlzQmV0d2Vlbih0aGlzLnRvRGF0ZSgpLCBmcm9tLnRvRGF0ZSgpLCB0by50b0RhdGUoKSwgX3VuaXQsIGluY2x1c2l2aXR5KTtcbiAgfVxuXG4gIGlzU2FtZShkYXRlOiBLaHJvbm9zLCB1bml0PzogTW9tZW50VW5pdE9mVGltZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IF91bml0ID0gdW5pdCA/IG1hcFVuaXRPZlRpbWUodW5pdCkgOiB2b2lkIDA7XG5cbiAgICByZXR1cm4gaXNTYW1lKHRoaXMuX2RhdGUsIGRhdGUudG9EYXRlKCksIF91bml0KTtcbiAgfVxuXG4gIGlzU2FtZU9yQWZ0ZXIoZGF0ZTogS2hyb25vcywgdW5pdD86IE1vbWVudFVuaXRPZlRpbWUpOiBib29sZWFuIHtcbiAgICBjb25zdCBfdW5pdCA9IHVuaXQgPyBtYXBVbml0T2ZUaW1lKHVuaXQpIDogdm9pZCAwO1xuXG4gICAgcmV0dXJuIGlzU2FtZU9yQWZ0ZXIodGhpcy5fZGF0ZSwgZGF0ZS50b0RhdGUoKSwgX3VuaXQpO1xuICB9XG5cbiAgaXNTYW1lT3JCZWZvcmUoZGF0ZTogS2hyb25vcywgdW5pdD86IE1vbWVudFVuaXRPZlRpbWUpOiBib29sZWFuIHtcbiAgICBjb25zdCBfdW5pdCA9IHVuaXQgPyBtYXBVbml0T2ZUaW1lKHVuaXQpIDogdm9pZCAwO1xuXG4gICAgcmV0dXJuIGlzU2FtZU9yQmVmb3JlKHRoaXMuX2RhdGUsIGRhdGUudG9EYXRlKCksIF91bml0KTtcbiAgfVxuXG4gIGlzVmFsaWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzRGF0ZVZhbGlkKHRoaXMuX2RhdGUpO1xuICB9XG5cbiAgdmFsdWVPZigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kYXRlLnZhbHVlT2YoKSAtICgodGhpcy5fb2Zmc2V0IHx8IDApICogNjAwMDApO1xuICB9XG5cbiAgdW5peCgpOiBudW1iZXIge1xuICAgIC8vIHJldHVybiBnZXRVbml4VGltZSh0aGlzLl9kYXRlKTtcbiAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLnZhbHVlT2YoKSAvIDEwMDApO1xuICB9XG5cblxuICAvLyBPZmZzZXRcblxuICB1dGNPZmZzZXQoKTogbnVtYmVyO1xuICB1dGNPZmZzZXQoYjogbnVtYmVyIHwgc3RyaW5nLCBrZWVwTG9jYWxUaW1lPzogYm9vbGVhbik6IEtocm9ub3M7XG4gIHV0Y09mZnNldChiPzogbnVtYmVyIHwgc3RyaW5nLCBrZWVwTG9jYWxUaW1lPzogYm9vbGVhbik6IG51bWJlciB8IEtocm9ub3Mge1xuICAgIGNvbnN0IF9jb25maWcgPSB0aGlzLl90b0NvbmZpZygpO1xuXG4gICAgaWYgKCFiICYmIGIgIT09IDApIHtcbiAgICAgIHJldHVybiBnZXRVVENPZmZzZXQodGhpcy5fZGF0ZSwgX2NvbmZpZyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZGF0ZSA9IHNldFVUQ09mZnNldCh0aGlzLl9kYXRlLCBiLCBrZWVwTG9jYWxUaW1lLCBmYWxzZSwgX2NvbmZpZyk7XG5cbiAgICB0aGlzLl9vZmZzZXQgPSBfY29uZmlnLl9vZmZzZXQ7XG4gICAgdGhpcy5faXNVVEMgPSBfY29uZmlnLl9pc1VUQztcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdXRjKGtlZXBMb2NhbFRpbWU/OiBib29sZWFuKTogS2hyb25vcyB7XG4gICAgcmV0dXJuIHRoaXMudXRjT2Zmc2V0KDAsIGtlZXBMb2NhbFRpbWUpO1xuICB9XG5cbiAgbG9jYWwoa2VlcExvY2FsVGltZT86IGJvb2xlYW4pOiBLaHJvbm9zIHtcbiAgICBpZiAodGhpcy5faXNVVEMpIHtcbiAgICAgIHRoaXMudXRjT2Zmc2V0KDAsIGtlZXBMb2NhbFRpbWUpO1xuICAgICAgdGhpcy5faXNVVEMgPSBmYWxzZTtcblxuICAgICAgaWYgKGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgdGhpcy5zdWJ0cmFjdChnZXREYXRlT2Zmc2V0KHRoaXMuX2RhdGUpLCAnbScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcGFyc2Vab25lKGlucHV0Pzogc3RyaW5nKTogS2hyb25vcyB7XG4gICAgY29uc3QgX2NvbmZpZyA9IHRoaXMuX3RvQ29uZmlnKCk7XG4gICAgdGhpcy5fZGF0ZSA9IHNldE9mZnNldFRvUGFyc2VkT2Zmc2V0KHRoaXMuX2RhdGUsIGlucHV0LCBfY29uZmlnKTtcblxuICAgIHRoaXMuX29mZnNldCA9IF9jb25maWcuX29mZnNldDtcbiAgICB0aGlzLl9pc1VUQyA9IF9jb25maWcuX2lzVVRDO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBoYXNBbGlnbmVkSG91ck9mZnNldChpbnB1dD86IEtocm9ub3MpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaGFzQWxpZ25lZEhvdXJPZmZzZXQodGhpcy5fZGF0ZSwgaW5wdXQgPyBpbnB1dC5fZGF0ZSA6IHZvaWQgMCk7XG4gIH1cblxuICBpc0RTVCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNEYXlsaWdodFNhdmluZ1RpbWUodGhpcy5fZGF0ZSk7XG4gIH1cblxuICBpc0xvY2FsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5faXNVVEM7XG4gIH1cblxuICBpc1V0Y09mZnNldCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNVVEM7XG4gIH1cblxuICBpc1VUQygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc1V0YygpO1xuICB9XG5cbiAgaXNVdGMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzVVRDICYmIHRoaXMuX29mZnNldCA9PT0gMDtcbiAgfVxuXG4gIC8vIFRpbWV6b25lXG5cbiAgem9uZUFiYnIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZ2V0Wm9uZUFiYnIodGhpcy5faXNVVEMpO1xuICB9XG5cbiAgem9uZU5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZ2V0Wm9uZU5hbWUodGhpcy5faXNVVEMpO1xuICB9XG5cbiAgLy8gWWVhclxuXG4gIHllYXIoKTogbnVtYmVyO1xuICB5ZWFyKHllYXI6IG51bWJlcik6IEtocm9ub3M7XG4gIHllYXIoeWVhcj86IG51bWJlcik6IEtocm9ub3MgfCBudW1iZXIge1xuICAgIGlmICgheWVhciAmJiB5ZWFyICE9PSAwKSB7XG4gICAgICByZXR1cm4gZ2V0RnVsbFllYXIodGhpcy5fZGF0ZSwgdGhpcy5faXNVVEMpO1xuICAgIH1cblxuICAgIHRoaXMuX2RhdGUgPSBjbG9uZURhdGUoc2V0RnVsbFllYXIodGhpcy5fZGF0ZSwgeWVhcikpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3ZWVrWWVhcigpOiBudW1iZXI7XG4gIHdlZWtZZWFyKHZhbDogbnVtYmVyKTogS2hyb25vcztcbiAgd2Vla1llYXIodmFsPzogbnVtYmVyKTogS2hyb25vcyB8IG51bWJlciB7XG4gICAgaWYgKCF2YWwgJiYgdmFsICE9PSAwKSB7XG4gICAgICByZXR1cm4gZ2V0V2Vla1llYXIodGhpcy5fZGF0ZSwgdGhpcy5fbG9jYWxlLCB0aGlzLmlzVVRDKCkpO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGUgPSBnZXRTZXRXZWVrWWVhcih0aGlzLl9kYXRlLCB2YWwsIHRoaXMuX2xvY2FsZSwgdGhpcy5pc1VUQygpKTtcbiAgICBpZiAoaXNEYXRlKGRhdGUpKSB7XG4gICAgICB0aGlzLl9kYXRlID0gZGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlzb1dlZWtZZWFyKCk6IG51bWJlciA7XG4gIGlzb1dlZWtZZWFyKHZhbDogbnVtYmVyKTogS2hyb25vcyA7XG4gIGlzb1dlZWtZZWFyKHZhbD86IG51bWJlcik6IEtocm9ub3MgfCBudW1iZXIge1xuICAgIGlmICghdmFsICYmIHZhbCAhPT0gMCkge1xuICAgICAgcmV0dXJuIGdldElTT1dlZWtZZWFyKHRoaXMuX2RhdGUsIHRoaXMuaXNVVEMoKSk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0ZSA9IGdldFNldElTT1dlZWtZZWFyKHRoaXMuX2RhdGUsIHZhbCwgdGhpcy5pc1V0YygpKTtcblxuICAgIGlmIChpc0RhdGUoZGF0ZSkpIHtcbiAgICAgIHRoaXMuX2RhdGUgPSBkYXRlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaXNMZWFwWWVhcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNMZWFwWWVhcihnZXRGdWxsWWVhcih0aGlzLnRvRGF0ZSgpLCB0aGlzLmlzVVRDKCkpKTtcbiAgfVxuXG4gIC8vIE1vbnRoXG5cbiAgbW9udGgoKTogbnVtYmVyO1xuICBtb250aChtb250aDogbnVtYmVyIHwgc3RyaW5nKTogS2hyb25vcztcbiAgbW9udGgobW9udGg/OiBudW1iZXIgfCBzdHJpbmcpOiBLaHJvbm9zIHwgbnVtYmVyIHtcbiAgICBpZiAoIW1vbnRoICYmIG1vbnRoICE9PSAwKSB7XG4gICAgICByZXR1cm4gZ2V0TW9udGgodGhpcy5fZGF0ZSwgdGhpcy5faXNVVEMpO1xuICAgIH1cblxuICAgIGxldCBfbW9udGggPSBtb250aDtcblxuICAgIGlmIChpc1N0cmluZyhtb250aCkpIHtcbiAgICAgIGNvbnN0IGxvY2FsZSA9IHRoaXMuX2xvY2FsZSB8fCBnZXRMb2NhbGUoKTtcbiAgICAgIF9tb250aCA9IGxvY2FsZS5tb250aHNQYXJzZShtb250aCk7XG4gICAgfVxuXG4gICAgaWYgKGlzTnVtYmVyKF9tb250aCkpIHtcbiAgICAgIHRoaXMuX2RhdGUgPSBjbG9uZURhdGUoc2V0TW9udGgodGhpcy5fZGF0ZSwgX21vbnRoLCB0aGlzLl9pc1VUQykpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqIEBkZXByZWNhdGVkICovXG4gIGhvdXIoKTogbnVtYmVyO1xuICBob3VyKGhvdXJzOiBudW1iZXIpOiBLaHJvbm9zO1xuICBob3VyKGhvdXJzPzogbnVtYmVyKTogS2hyb25vcyB8IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuaG91cnMoaG91cnMpO1xuICB9XG5cbiAgaG91cnMoKTogbnVtYmVyO1xuICBob3Vycyhob3VyczogbnVtYmVyKTogS2hyb25vcztcbiAgaG91cnMoaG91cnM/OiBudW1iZXIpOiBLaHJvbm9zIHwgbnVtYmVyIHtcbiAgICBpZiAoIWhvdXJzICYmIGhvdXJzICE9PSAwKSB7XG4gICAgICByZXR1cm4gZ2V0SG91cnModGhpcy5fZGF0ZSwgdGhpcy5faXNVVEMpO1xuICAgIH1cblxuICAgIHRoaXMuX2RhdGUgPSBjbG9uZURhdGUoc2V0SG91cnModGhpcy5fZGF0ZSwgaG91cnMsIHRoaXMuX2lzVVRDKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCAqL1xuICBtaW51dGUoKTogbnVtYmVyO1xuICBtaW51dGUobWludXRlczogbnVtYmVyKTogS2hyb25vcztcbiAgbWludXRlKG1pbnV0ZXM/OiBudW1iZXIpOiBLaHJvbm9zIHwgbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5taW51dGVzKG1pbnV0ZXMpO1xuICB9XG5cbiAgbWludXRlcygpOiBudW1iZXI7XG4gIG1pbnV0ZXMobWludXRlczogbnVtYmVyKTogS2hyb25vcztcbiAgbWludXRlcyhtaW51dGVzPzogbnVtYmVyKTogS2hyb25vcyB8IG51bWJlciB7XG4gICAgaWYgKCFtaW51dGVzICYmIG1pbnV0ZXMgIT09IDApIHtcbiAgICAgIHJldHVybiBnZXRNaW51dGVzKHRoaXMuX2RhdGUsIHRoaXMuX2lzVVRDKTtcbiAgICB9XG5cbiAgICB0aGlzLl9kYXRlID0gY2xvbmVEYXRlKHNldE1pbnV0ZXModGhpcy5fZGF0ZSwgbWludXRlcywgdGhpcy5faXNVVEMpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqIEBkZXByZWNhdGVkICovXG4gIHNlY29uZCgpOiBudW1iZXI7XG4gIHNlY29uZChzZWNvbmRzOiBudW1iZXIpOiBLaHJvbm9zO1xuICBzZWNvbmQoc2Vjb25kcz86IG51bWJlcik6IEtocm9ub3MgfCBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnNlY29uZHMoc2Vjb25kcyk7XG4gIH1cblxuICBzZWNvbmRzKCk6IG51bWJlcjtcbiAgc2Vjb25kcyhzZWNvbmRzOiBudW1iZXIpOiBLaHJvbm9zO1xuICBzZWNvbmRzKHNlY29uZHM/OiBudW1iZXIpOiBLaHJvbm9zIHwgbnVtYmVyIHtcbiAgICBpZiAoIXNlY29uZHMgJiYgc2Vjb25kcyAhPT0gMCkge1xuICAgICAgcmV0dXJuIGdldFNlY29uZHModGhpcy5fZGF0ZSwgdGhpcy5faXNVVEMpO1xuICAgIH1cblxuICAgIHRoaXMuX2RhdGUgPSBjbG9uZURhdGUoc2V0U2Vjb25kcyh0aGlzLl9kYXRlLCBzZWNvbmRzLCB0aGlzLl9pc1VUQykpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKiogQGRlcHJlY2F0ZWQgKi9cbiAgbWlsbGlzZWNvbmQoKTogbnVtYmVyO1xuICBtaWxsaXNlY29uZChtczogbnVtYmVyKTogS2hyb25vcztcbiAgbWlsbGlzZWNvbmQobXM/OiBudW1iZXIpOiBLaHJvbm9zIHwgbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZHMobXMpO1xuICB9XG5cbiAgbWlsbGlzZWNvbmRzKCk6IG51bWJlcjtcbiAgbWlsbGlzZWNvbmRzKHNlY29uZHM6IG51bWJlcik6IEtocm9ub3M7XG4gIG1pbGxpc2Vjb25kcyhzZWNvbmRzPzogbnVtYmVyKTogS2hyb25vcyB8IG51bWJlciB7XG4gICAgaWYgKCFzZWNvbmRzICYmIHNlY29uZHMgIT09IDApIHtcbiAgICAgIHJldHVybiBnZXRNaWxsaXNlY29uZHModGhpcy5fZGF0ZSwgdGhpcy5faXNVVEMpO1xuICAgIH1cblxuICAgIHRoaXMuX2RhdGUgPSBjbG9uZURhdGUoc2V0TWlsbGlzZWNvbmRzKHRoaXMuX2RhdGUsIHNlY29uZHMsIHRoaXMuX2lzVVRDKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIERheVxuXG4gIGRhdGUoKTogbnVtYmVyO1xuICBkYXRlKGRhdGU6IG51bWJlcik6IEtocm9ub3M7XG4gIGRhdGUoZGF0ZT86IG51bWJlcik6IEtocm9ub3MgfCBudW1iZXIge1xuICAgIGlmICghZGF0ZSAmJiBkYXRlICE9PSAwKSB7XG4gICAgICByZXR1cm4gZ2V0RGF0ZSh0aGlzLl9kYXRlLCB0aGlzLl9pc1VUQyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZGF0ZSA9IGNsb25lRGF0ZShzZXREYXRlKHRoaXMuX2RhdGUsIGRhdGUsIHRoaXMuX2lzVVRDKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRheSgpOiBudW1iZXIgO1xuICBkYXkoaW5wdXQ6IG51bWJlciB8IHN0cmluZyk6IEtocm9ub3MgO1xuICBkYXkoaW5wdXQ/OiBudW1iZXIgfCBzdHJpbmcpOiBLaHJvbm9zIHwgbnVtYmVyIHtcbiAgICBpZiAoIWlucHV0ICYmIGlucHV0ICE9PSAwKSB7XG4gICAgICByZXR1cm4gZ2V0RGF5T2ZXZWVrKHRoaXMuX2RhdGUsIHRoaXMuX2lzVVRDKTtcbiAgICB9XG5cbiAgICBsZXQgX2lucHV0ID0gaW5wdXQ7XG5cbiAgICBpZiAoaXNTdHJpbmcoaW5wdXQpKSB7XG4gICAgICBfaW5wdXQgPSBwYXJzZVdlZWtkYXkoaW5wdXQsIHRoaXMuX2xvY2FsZSk7XG4gICAgfVxuXG4gICAgaWYgKGlzTnVtYmVyKF9pbnB1dCkpIHtcbiAgICAgIHRoaXMuX2RhdGUgPSBzZXREYXlPZldlZWsodGhpcy5fZGF0ZSwgX2lucHV0LCB0aGlzLl9sb2NhbGUsIHRoaXMuX2lzVVRDKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdlZWtkYXkoKTogbnVtYmVyIDtcbiAgd2Vla2RheSh2YWw6IG51bWJlcik6IEtocm9ub3MgO1xuICB3ZWVrZGF5KHZhbD86IG51bWJlcik6IEtocm9ub3MgfCBudW1iZXIge1xuICAgIGlmICghdmFsICYmIHZhbCAhPT0gMCkge1xuICAgICAgcmV0dXJuIGdldExvY2FsZURheU9mV2Vlayh0aGlzLl9kYXRlLCB0aGlzLl9sb2NhbGUsIHRoaXMuX2lzVVRDKTtcbiAgICB9XG5cbiAgICB0aGlzLl9kYXRlID0gc2V0TG9jYWxlRGF5T2ZXZWVrKHRoaXMuX2RhdGUsIHZhbCwgeyBsb2NhbGU6IHRoaXMuX2xvY2FsZSwgaXNVVEM6IHRoaXMuX2lzVVRDIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpc29XZWVrZGF5KCk6IG51bWJlciA7XG4gIGlzb1dlZWtkYXkodmFsOiBudW1iZXIgfCBzdHJpbmcpOiBLaHJvbm9zIDtcbiAgaXNvV2Vla2RheSh2YWw/OiBudW1iZXIgfCBzdHJpbmcpOiBLaHJvbm9zIHwgbnVtYmVyIHtcbiAgICBpZiAoIXZhbCAmJiB2YWwgIT09IDApIHtcbiAgICAgIHJldHVybiBnZXRJU09EYXlPZldlZWsodGhpcy5fZGF0ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5fZGF0ZSA9IHNldElTT0RheU9mV2Vlayh0aGlzLl9kYXRlLCB2YWwpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkYXlPZlllYXIoKTogbnVtYmVyO1xuICBkYXlPZlllYXIodmFsOiBudW1iZXIpOiBLaHJvbm9zO1xuICBkYXlPZlllYXIodmFsPzogbnVtYmVyKTogS2hyb25vcyB8IG51bWJlciB7XG4gICAgaWYgKCF2YWwgJiYgdmFsICE9PSAwKSB7XG4gICAgICByZXR1cm4gZ2V0RGF5T2ZZZWFyKHRoaXMuX2RhdGUpO1xuICAgIH1cblxuICAgIHRoaXMuX2RhdGUgPSBzZXREYXlPZlllYXIodGhpcy5fZGF0ZSwgdmFsKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gV2Vla1xuXG4gIHdlZWsoKTogbnVtYmVyO1xuICB3ZWVrKGlucHV0OiBudW1iZXIpOiBLaHJvbm9zO1xuICB3ZWVrKGlucHV0PzogbnVtYmVyKTogS2hyb25vcyB8IG51bWJlciB7XG4gICAgaWYgKCFpbnB1dCAmJiBpbnB1dCAhPT0gMCkge1xuICAgICAgcmV0dXJuIGdldFdlZWsodGhpcy5fZGF0ZSwgdGhpcy5fbG9jYWxlKTtcbiAgICB9XG5cbiAgICB0aGlzLl9kYXRlID0gc2V0V2Vlayh0aGlzLl9kYXRlLCBpbnB1dCwgdGhpcy5fbG9jYWxlKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqIEBkZXByZWNhdGVkICovXG4gIHdlZWtzKCk6IG51bWJlcjtcbiAgd2Vla3MoaW5wdXQ6IG51bWJlcik6IEtocm9ub3M7XG4gIHdlZWtzKGlucHV0PzogbnVtYmVyKTogS2hyb25vcyB8IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMud2VlayhpbnB1dCk7XG4gIH1cblxuICBpc29XZWVrKCk6IG51bWJlciA7XG4gIGlzb1dlZWsodmFsOiBudW1iZXIpOiBLaHJvbm9zIDtcbiAgaXNvV2Vlayh2YWw/OiBudW1iZXIpOiBLaHJvbm9zIHwgbnVtYmVyIHtcbiAgICBpZiAoIXZhbCAmJiB2YWwgIT09IDApIHtcbiAgICAgIHJldHVybiBnZXRJU09XZWVrKHRoaXMuX2RhdGUpO1xuICAgIH1cblxuICAgIHRoaXMuX2RhdGUgPSBzZXRJU09XZWVrKHRoaXMuX2RhdGUsIHZhbCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCAqL1xuICBpc29XZWVrcygpOiBudW1iZXIgO1xuICBpc29XZWVrcyh2YWw6IG51bWJlcik6IEtocm9ub3MgO1xuICBpc29XZWVrcyh2YWw/OiBudW1iZXIpOiBLaHJvbm9zIHwgbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5pc29XZWVrKHZhbCk7XG4gIH1cblxuICB3ZWVrc0luWWVhcigpOiBudW1iZXIge1xuICAgIHJldHVybiBnZXRXZWVrc0luWWVhcih0aGlzLl9kYXRlLCB0aGlzLl9pc1VUQywgdGhpcy5fbG9jYWxlKTtcbiAgfVxuXG4gIGlzb1dlZWtzSW5ZZWFyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGdldElTT1dlZWtzSW5ZZWFyKHRoaXMuX2RhdGUsIHRoaXMuX2lzVVRDKTtcbiAgfVxuXG5cbiAgZGF5c0luTW9udGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZGF5c0luTW9udGgoZ2V0RnVsbFllYXIodGhpcy5fZGF0ZSwgdGhpcy5faXNVVEMpLCBnZXRNb250aCh0aGlzLl9kYXRlLCB0aGlzLl9pc1VUQykpO1xuICB9XG5cblxuICBxdWFydGVyKCk6IG51bWJlcjtcbiAgcXVhcnRlcih2YWw6IG51bWJlcik6IEtocm9ub3M7XG4gIHF1YXJ0ZXIodmFsPzogbnVtYmVyKTogS2hyb25vcyB8IG51bWJlciB7XG4gICAgaWYgKCF2YWwgJiYgdmFsICE9PSAwKSB7XG4gICAgICByZXR1cm4gZ2V0UXVhcnRlcih0aGlzLl9kYXRlLCB0aGlzLl9pc1VUQyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZGF0ZSA9IHNldFF1YXJ0ZXIodGhpcy5fZGF0ZSwgdmFsLCB0aGlzLl9pc1VUQyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCAqL1xuICBxdWFydGVycygpOiBudW1iZXI7XG4gIHF1YXJ0ZXJzKHZhbDogbnVtYmVyKTogS2hyb25vcztcbiAgcXVhcnRlcnModmFsPzogbnVtYmVyKTogS2hyb25vcyB8IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucXVhcnRlcih2YWwpO1xuICB9XG5cbiAgc3RhcnRPZihwZXJpb2Q/OiBNb21lbnRVbml0T2ZUaW1lKTogS2hyb25vcyB7XG4gICAgY29uc3QgX3BlciA9IG1hcFVuaXRPZlRpbWUocGVyaW9kKTtcbiAgICB0aGlzLl9kYXRlID0gc3RhcnRPZih0aGlzLl9kYXRlLCBfcGVyLCB0aGlzLl9pc1VUQyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG59XG4iXX0=