function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty: false,
        unusedTokens: [],
        unusedInput: [],
        overflow: -2,
        charsLeftOver: 0,
        nullInput: false,
        invalidMonth: null,
        invalidFormat: false,
        userInvalidated: false,
        iso: false,
        parsedDateParts: [],
        meridiem: null,
        rfc2822: false,
        weekdayMismatch: false
    };
}
export function getParsingFlags(config) {
    if (config._pf == null) {
        config._pf = defaultParsingFlags();
    }
    return config._pf;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2luZy1mbGFncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jaHJvbm9zL2NyZWF0ZS9wYXJzaW5nLWZsYWdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLFNBQVMsbUJBQW1CO0lBQzFCLHFDQUFxQztJQUNyQyxPQUFPO1FBQ0wsS0FBSyxFQUFFLEtBQUs7UUFDWixZQUFZLEVBQUUsRUFBRTtRQUNoQixXQUFXLEVBQUUsRUFBRTtRQUNmLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDWixhQUFhLEVBQUUsQ0FBQztRQUNoQixTQUFTLEVBQUUsS0FBSztRQUNoQixZQUFZLEVBQUUsSUFBSTtRQUNsQixhQUFhLEVBQUUsS0FBSztRQUNwQixlQUFlLEVBQUUsS0FBSztRQUN0QixHQUFHLEVBQUUsS0FBSztRQUNWLGVBQWUsRUFBRSxFQUFFO1FBQ25CLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLEtBQUs7UUFDZCxlQUFlLEVBQUUsS0FBSztLQUN2QixDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSxlQUFlLENBQUMsTUFBeUI7SUFDdkQsSUFBSSxNQUFNLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTtRQUN0QixNQUFNLENBQUMsR0FBRyxHQUFHLG1CQUFtQixFQUFFLENBQUM7S0FDcEM7SUFFRCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDcEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGVQYXJzaW5nQ29uZmlnLCBEYXRlUGFyc2luZ0ZsYWdzIH0gZnJvbSAnLi9wYXJzaW5nLnR5cGVzJztcblxuZnVuY3Rpb24gZGVmYXVsdFBhcnNpbmdGbGFncygpOiBEYXRlUGFyc2luZ0ZsYWdzIHtcbiAgLy8gV2UgbmVlZCB0byBkZWVwIGNsb25lIHRoaXMgb2JqZWN0LlxuICByZXR1cm4ge1xuICAgIGVtcHR5OiBmYWxzZSxcbiAgICB1bnVzZWRUb2tlbnM6IFtdLFxuICAgIHVudXNlZElucHV0OiBbXSxcbiAgICBvdmVyZmxvdzogLTIsXG4gICAgY2hhcnNMZWZ0T3ZlcjogMCxcbiAgICBudWxsSW5wdXQ6IGZhbHNlLFxuICAgIGludmFsaWRNb250aDogbnVsbCxcbiAgICBpbnZhbGlkRm9ybWF0OiBmYWxzZSxcbiAgICB1c2VySW52YWxpZGF0ZWQ6IGZhbHNlLFxuICAgIGlzbzogZmFsc2UsXG4gICAgcGFyc2VkRGF0ZVBhcnRzOiBbXSxcbiAgICBtZXJpZGllbTogbnVsbCxcbiAgICByZmMyODIyOiBmYWxzZSxcbiAgICB3ZWVrZGF5TWlzbWF0Y2g6IGZhbHNlXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnOiBEYXRlUGFyc2luZ0NvbmZpZyk6IERhdGVQYXJzaW5nRmxhZ3Mge1xuICBpZiAoY29uZmlnLl9wZiA9PSBudWxsKSB7XG4gICAgY29uZmlnLl9wZiA9IGRlZmF1bHRQYXJzaW5nRmxhZ3MoKTtcbiAgfVxuXG4gIHJldHVybiBjb25maWcuX3BmO1xufVxuIl19