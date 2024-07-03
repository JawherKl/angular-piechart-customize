import { latinMap } from './latin-map';
export function latinize(str) {
    if (!str) {
        return '';
    }
    return str.replace(/[^A-Za-z0-9[\] ]/g, function (a) {
        return latinMap[a] || a;
    });
}
export function escapeRegexp(queryToEscape) {
    // Regex: capture the whole query string and replace it with the string
    // that will be used to match the results, for example if the capture is
    // 'a' the result will be \a
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
}
export function tokenize(str, wordRegexDelimiters = ' ', phraseRegexDelimiters = '', delimitersForMultipleSearch) {
    let result = [];
    if (!delimitersForMultipleSearch) {
        result = tokenizeWordsAndPhrases(str, wordRegexDelimiters, phraseRegexDelimiters);
    }
    else {
        const multipleSearchRegexStr = `([${delimitersForMultipleSearch}]+)`;
        const delimitedTokens = str.split(new RegExp(multipleSearchRegexStr, 'g'));
        const lastToken = delimitedTokens[delimitedTokens.length - 1];
        if (lastToken > '') {
            if (wordRegexDelimiters && phraseRegexDelimiters) {
                result = tokenizeWordsAndPhrases(lastToken, wordRegexDelimiters, phraseRegexDelimiters);
            }
            else {
                result.push(lastToken);
            }
        }
    }
    return result;
}
function tokenizeWordsAndPhrases(str, wordRegexDelimiters, phraseRegexDelimiters) {
    const result = [];
    const regexStr = `(?:[${phraseRegexDelimiters}])([^${phraseRegexDelimiters}]+)` +
        `(?:[${phraseRegexDelimiters}])|([^${wordRegexDelimiters}]+)`;
    const preTokenized = str.split(new RegExp(regexStr, 'g'));
    const preTokenizedLength = preTokenized.length;
    let token;
    const replacePhraseDelimiters = new RegExp(`[${phraseRegexDelimiters}]+`, 'g');
    for (let i = 0; i < preTokenizedLength; i += 1) {
        token = preTokenized[i];
        if (token && token.length && token !== wordRegexDelimiters) {
            result.push(token.replace(replacePhraseDelimiters, ''));
        }
    }
    return result;
}
// eslint-disable-next-line
export function getValueFromObject(object, option) {
    if (!option || typeof object !== 'object') {
        return object.toString();
    }
    if (option.endsWith('()')) {
        const functionName = option.slice(0, option.length - 2);
        return object[functionName]().toString();
    }
    const properties = option
        .replace(/\[(\w+)\]/g, '.$1')
        .replace(/^\./, '');
    const propertiesArray = properties.split('.');
    for (const property of propertiesArray) {
        if (property in object) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            object = object[property];
        }
    }
    if (!object) {
        return '';
    }
    return object.toString();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVhaGVhZC90eXBlYWhlYWQtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV2QyxNQUFNLFVBQVUsUUFBUSxDQUFDLEdBQVc7SUFDbEMsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNSLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFFRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsVUFBUyxDQUFTO1FBQ3hELE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLGFBQXFCO0lBQ2hELHVFQUF1RTtJQUN2RSx3RUFBd0U7SUFDeEUsNEJBQTRCO0lBQzVCLE9BQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNqRSxDQUFDO0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxHQUFXLEVBQ1gsbUJBQW1CLEdBQUcsR0FBRyxFQUN6QixxQkFBcUIsR0FBRyxFQUFFLEVBQUUsMkJBQW9DO0lBRXZGLElBQUksTUFBTSxHQUFhLEVBQUUsQ0FBQztJQUMxQixJQUFJLENBQUMsMkJBQTJCLEVBQUU7UUFDaEMsTUFBTSxHQUFHLHVCQUF1QixDQUFDLEdBQUcsRUFBRSxtQkFBbUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0tBQ25GO1NBQU07UUFDTCxNQUFNLHNCQUFzQixHQUFHLEtBQUssMkJBQTJCLEtBQUssQ0FBQztRQUNyRSxNQUFNLGVBQWUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0UsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxTQUFTLEdBQUcsRUFBRSxFQUFFO1lBQ2xCLElBQUksbUJBQW1CLElBQUkscUJBQXFCLEVBQUU7Z0JBQ2hELE1BQU0sR0FBRyx1QkFBdUIsQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLEVBQUUscUJBQXFCLENBQUMsQ0FBQzthQUN6RjtpQkFBTTtnQkFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3hCO1NBQ0Y7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxTQUFTLHVCQUF1QixDQUFDLEdBQVcsRUFBRSxtQkFBMkIsRUFBRSxxQkFBNkI7SUFDdEcsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO0lBQzVCLE1BQU0sUUFBUSxHQUFHLE9BQU8scUJBQXFCLFFBQVEscUJBQXFCLEtBQUs7UUFDN0UsT0FBTyxxQkFBcUIsU0FBUyxtQkFBbUIsS0FBSyxDQUFDO0lBQ2hFLE1BQU0sWUFBWSxHQUFhLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDcEUsTUFBTSxrQkFBa0IsR0FBVyxZQUFZLENBQUMsTUFBTSxDQUFDO0lBQ3ZELElBQUksS0FBYSxDQUFDO0lBQ2xCLE1BQU0sdUJBQXVCLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxxQkFBcUIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRS9FLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzlDLEtBQUssR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLEtBQUssbUJBQW1CLEVBQUU7WUFDMUQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDekQ7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRCwyQkFBMkI7QUFDM0IsTUFBTSxVQUFVLGtCQUFrQixDQUFDLE1BQTZDLEVBQUUsTUFBZTtJQUMvRixJQUFJLENBQUMsTUFBTSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtRQUN6QyxPQUFPLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMxQjtJQUVELElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN6QixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXhELE9BQVEsTUFBTSxDQUFDLFlBQVksQ0FBa0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzVEO0lBRUQsTUFBTSxVQUFVLEdBQVcsTUFBTTtTQUM5QixPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQztTQUM1QixPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RCLE1BQU0sZUFBZSxHQUFhLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFeEQsS0FBSyxNQUFNLFFBQVEsSUFBSSxlQUFlLEVBQUU7UUFDdEMsSUFBSSxRQUFRLElBQUssTUFBa0MsRUFBRTtZQUNuRCw2REFBNkQ7WUFDN0QsYUFBYTtZQUNiLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDM0I7S0FDRjtJQUNELElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDWCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBRUQsT0FBTyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDM0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxhdGluTWFwIH0gZnJvbSAnLi9sYXRpbi1tYXAnO1xuXG5leHBvcnQgZnVuY3Rpb24gbGF0aW5pemUoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoIXN0cikge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHJldHVybiBzdHIucmVwbGFjZSgvW15BLVphLXowLTlbXFxdIF0vZywgZnVuY3Rpb24oYTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbGF0aW5NYXBbYV0gfHwgYTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVSZWdleHAocXVlcnlUb0VzY2FwZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgLy8gUmVnZXg6IGNhcHR1cmUgdGhlIHdob2xlIHF1ZXJ5IHN0cmluZyBhbmQgcmVwbGFjZSBpdCB3aXRoIHRoZSBzdHJpbmdcbiAgLy8gdGhhdCB3aWxsIGJlIHVzZWQgdG8gbWF0Y2ggdGhlIHJlc3VsdHMsIGZvciBleGFtcGxlIGlmIHRoZSBjYXB0dXJlIGlzXG4gIC8vICdhJyB0aGUgcmVzdWx0IHdpbGwgYmUgXFxhXG4gIHJldHVybiBxdWVyeVRvRXNjYXBlLnJlcGxhY2UoLyhbLj8qK14kW1xcXVxcXFwoKXt9fC1dKS9nLCAnXFxcXCQxJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2tlbml6ZShzdHI6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICB3b3JkUmVnZXhEZWxpbWl0ZXJzID0gJyAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgIHBocmFzZVJlZ2V4RGVsaW1pdGVycyA9ICcnLCBkZWxpbWl0ZXJzRm9yTXVsdGlwbGVTZWFyY2g/OiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcblxuICBsZXQgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xuICBpZiAoIWRlbGltaXRlcnNGb3JNdWx0aXBsZVNlYXJjaCkge1xuICAgIHJlc3VsdCA9IHRva2VuaXplV29yZHNBbmRQaHJhc2VzKHN0ciwgd29yZFJlZ2V4RGVsaW1pdGVycywgcGhyYXNlUmVnZXhEZWxpbWl0ZXJzKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBtdWx0aXBsZVNlYXJjaFJlZ2V4U3RyID0gYChbJHtkZWxpbWl0ZXJzRm9yTXVsdGlwbGVTZWFyY2h9XSspYDtcbiAgICBjb25zdCBkZWxpbWl0ZWRUb2tlbnMgPSBzdHIuc3BsaXQobmV3IFJlZ0V4cChtdWx0aXBsZVNlYXJjaFJlZ2V4U3RyLCAnZycpKTtcbiAgICBjb25zdCBsYXN0VG9rZW4gPSBkZWxpbWl0ZWRUb2tlbnNbZGVsaW1pdGVkVG9rZW5zLmxlbmd0aCAtIDFdO1xuICAgIGlmIChsYXN0VG9rZW4gPiAnJykge1xuICAgICAgaWYgKHdvcmRSZWdleERlbGltaXRlcnMgJiYgcGhyYXNlUmVnZXhEZWxpbWl0ZXJzKSB7XG4gICAgICAgIHJlc3VsdCA9IHRva2VuaXplV29yZHNBbmRQaHJhc2VzKGxhc3RUb2tlbiwgd29yZFJlZ2V4RGVsaW1pdGVycywgcGhyYXNlUmVnZXhEZWxpbWl0ZXJzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGxhc3RUb2tlbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gdG9rZW5pemVXb3Jkc0FuZFBocmFzZXMoc3RyOiBzdHJpbmcsIHdvcmRSZWdleERlbGltaXRlcnM6IHN0cmluZywgcGhyYXNlUmVnZXhEZWxpbWl0ZXJzOiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcbiAgY29uc3QgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xuICBjb25zdCByZWdleFN0ciA9IGAoPzpbJHtwaHJhc2VSZWdleERlbGltaXRlcnN9XSkoW14ke3BocmFzZVJlZ2V4RGVsaW1pdGVyc31dKylgICtcbiAgICBgKD86WyR7cGhyYXNlUmVnZXhEZWxpbWl0ZXJzfV0pfChbXiR7d29yZFJlZ2V4RGVsaW1pdGVyc31dKylgO1xuICBjb25zdCBwcmVUb2tlbml6ZWQ6IHN0cmluZ1tdID0gc3RyLnNwbGl0KG5ldyBSZWdFeHAocmVnZXhTdHIsICdnJykpO1xuICBjb25zdCBwcmVUb2tlbml6ZWRMZW5ndGg6IG51bWJlciA9IHByZVRva2VuaXplZC5sZW5ndGg7XG4gIGxldCB0b2tlbjogc3RyaW5nO1xuICBjb25zdCByZXBsYWNlUGhyYXNlRGVsaW1pdGVycyA9IG5ldyBSZWdFeHAoYFske3BocmFzZVJlZ2V4RGVsaW1pdGVyc31dK2AsICdnJyk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmVUb2tlbml6ZWRMZW5ndGg7IGkgKz0gMSkge1xuICAgIHRva2VuID0gcHJlVG9rZW5pemVkW2ldO1xuICAgIGlmICh0b2tlbiAmJiB0b2tlbi5sZW5ndGggJiYgdG9rZW4gIT09IHdvcmRSZWdleERlbGltaXRlcnMpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHRva2VuLnJlcGxhY2UocmVwbGFjZVBocmFzZURlbGltaXRlcnMsICcnKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFsdWVGcm9tT2JqZWN0KG9iamVjdDogc3RyaW5nIHwgUmVjb3JkPHN0cmluZyB8IG51bWJlciwgYW55Piwgb3B0aW9uPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKCFvcHRpb24gfHwgdHlwZW9mIG9iamVjdCAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gb2JqZWN0LnRvU3RyaW5nKCk7XG4gIH1cblxuICBpZiAob3B0aW9uLmVuZHNXaXRoKCcoKScpKSB7XG4gICAgY29uc3QgZnVuY3Rpb25OYW1lID0gb3B0aW9uLnNsaWNlKDAsIG9wdGlvbi5sZW5ndGggLSAyKTtcblxuICAgIHJldHVybiAob2JqZWN0W2Z1bmN0aW9uTmFtZV0gYXMgKCkgPT4gc3RyaW5nKSgpLnRvU3RyaW5nKCk7XG4gIH1cblxuICBjb25zdCBwcm9wZXJ0aWVzOiBzdHJpbmcgPSBvcHRpb25cbiAgICAucmVwbGFjZSgvXFxbKFxcdyspXFxdL2csICcuJDEnKVxuICAgIC5yZXBsYWNlKC9eXFwuLywgJycpO1xuICBjb25zdCBwcm9wZXJ0aWVzQXJyYXk6IHN0cmluZ1tdID0gcHJvcGVydGllcy5zcGxpdCgnLicpO1xuXG4gIGZvciAoY29uc3QgcHJvcGVydHkgb2YgcHJvcGVydGllc0FycmF5KSB7XG4gICAgaWYgKHByb3BlcnR5IGluIChvYmplY3QgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBvYmplY3QgPSBvYmplY3RbcHJvcGVydHldO1xuICAgIH1cbiAgfVxuICBpZiAoIW9iamVjdCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHJldHVybiBvYmplY3QudG9TdHJpbmcoKTtcbn1cbiJdfQ==