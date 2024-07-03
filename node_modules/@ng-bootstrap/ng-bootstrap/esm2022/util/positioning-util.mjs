import { offset as offsetModifier } from '@popperjs/core';
export function addPopperOffset(offset) {
    return (options) => {
        options.modifiers.push(offsetModifier, {
            name: 'offset',
            options: {
                offset: () => offset,
            },
        });
        return options;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb25pbmctdXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlsL3Bvc2l0aW9uaW5nLXV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sSUFBSSxjQUFjLEVBQVcsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRSxNQUFNLFVBQVUsZUFBZSxDQUFDLE1BQWdCO0lBQy9DLE9BQU8sQ0FBQyxPQUF5QixFQUFFLEVBQUU7UUFDcEMsT0FBTyxDQUFDLFNBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3ZDLElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFO2dCQUNSLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNO2FBQ3BCO1NBQ0QsQ0FBQyxDQUFDO1FBRUgsT0FBTyxPQUFPLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG9mZnNldCBhcyBvZmZzZXRNb2RpZmllciwgT3B0aW9ucyB9IGZyb20gJ0Bwb3BwZXJqcy9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFBvcHBlck9mZnNldChvZmZzZXQ6IG51bWJlcltdKSB7XG5cdHJldHVybiAob3B0aW9uczogUGFydGlhbDxPcHRpb25zPikgPT4ge1xuXHRcdG9wdGlvbnMubW9kaWZpZXJzIS5wdXNoKG9mZnNldE1vZGlmaWVyLCB7XG5cdFx0XHRuYW1lOiAnb2Zmc2V0Jyxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0b2Zmc2V0OiAoKSA9PiBvZmZzZXQsXG5cdFx0XHR9LFxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIG9wdGlvbnM7XG5cdH07XG59XG4iXX0=