//! moment.js locale configuration
//! locale : Hindi [hi]
//! author : Mayank Singhal : https://github.com/mayanksinghal
let symbolMap = {
    1: '१',
    2: '२',
    3: '३',
    4: '४',
    5: '५',
    6: '६',
    7: '७',
    8: '८',
    9: '९',
    0: '०'
}, numberMap = {
    '१': '1',
    '२': '2',
    '३': '3',
    '४': '4',
    '५': '5',
    '६': '6',
    '७': '7',
    '८': '8',
    '९': '9',
    '०': '0'
};
export const hiLocale = {
    abbr: 'hi',
    months: 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split('_'),
    monthsShort: 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
    monthsParseExact: true,
    weekdays: 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
    weekdaysShort: 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
    weekdaysMin: 'र_सो_मं_बु_गु_शु_श'.split('_'),
    longDateFormat: {
        LT: 'A h:mm बजे',
        LTS: 'A h:mm:ss बजे',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY, A h:mm बजे',
        LLLL: 'dddd, D MMMM YYYY, A h:mm बजे'
    },
    calendar: {
        sameDay: '[आज] LT',
        nextDay: '[कल] LT',
        nextWeek: 'dddd, LT',
        lastDay: '[कल] LT',
        lastWeek: '[पिछले] dddd, LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s में',
        past: '%s पहले',
        s: 'कुछ ही क्षण',
        ss: '%d सेकंड',
        m: 'एक मिनट',
        mm: '%d मिनट',
        h: 'एक घंटा',
        hh: '%d घंटे',
        d: 'एक दिन',
        dd: '%d दिन',
        M: 'एक महीने',
        MM: '%d महीने',
        y: 'एक वर्ष',
        yy: '%d वर्ष'
    },
    preparse(str) {
        return str.replace(/[१२३४५६७८९०]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat(str) {
        return str.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    // Hindi notation for meridiems are quite fuzzy in practice. While there exists
    // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
    meridiemParse: /रात|सुबह|दोपहर|शाम/,
    meridiemHour(hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'रात') {
            return hour < 4 ? hour : hour + 12;
        }
        else if (meridiem === 'सुबह') {
            return hour;
        }
        else if (meridiem === 'दोपहर') {
            return hour >= 10 ? hour : hour + 12;
        }
        else if (meridiem === 'शाम') {
            return hour + 12;
        }
    },
    meridiem(hour, minute, isLower) {
        if (hour < 4) {
            return 'रात';
        }
        else if (hour < 10) {
            return 'सुबह';
        }
        else if (hour < 17) {
            return 'दोपहर';
        }
        else if (hour < 20) {
            return 'शाम';
        }
        else {
            return 'रात';
        }
    },
    week: {
        dow: 0,
        doy: 6 // The week that contains Jan 1st is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL2hpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQyx1QkFBdUI7QUFDdkIsOERBQThEO0FBRTlELElBQUksU0FBUyxHQUE0QjtJQUNyQyxDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztDQUNQLEVBQ0QsU0FBUyxHQUE0QjtJQUNuQyxHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztDQUNULENBQUM7QUFFSixNQUFNLENBQUMsTUFBTSxRQUFRLEdBQWU7SUFDbEMsSUFBSSxFQUFFLElBQUk7SUFDVixNQUFNLEVBQUUsNkVBQTZFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNoRyxXQUFXLEVBQUUsNERBQTRELENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNwRixnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLFFBQVEsRUFBRSxzREFBc0QsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzNFLGFBQWEsRUFBRSxpQ0FBaUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzNELFdBQVcsRUFBRSxvQkFBb0Is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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYWxlRGF0YSB9IGZyb20gJy4uL2xvY2FsZS9sb2NhbGUuY2xhc3MnO1xuXG4vLyEgbW9tZW50LmpzIGxvY2FsZSBjb25maWd1cmF0aW9uXG4vLyEgbG9jYWxlIDogSGluZGkgW2hpXVxuLy8hIGF1dGhvciA6IE1heWFuayBTaW5naGFsIDogaHR0cHM6Ly9naXRodWIuY29tL21heWFua3NpbmdoYWxcblxubGV0IHN5bWJvbE1hcDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgMTogJ+ClpycsXG4gICAgMjogJ+ClqCcsXG4gICAgMzogJ+ClqScsXG4gICAgNDogJ+ClqicsXG4gICAgNTogJ+ClqycsXG4gICAgNjogJ+ClrCcsXG4gICAgNzogJ+ClrScsXG4gICAgODogJ+ClricsXG4gICAgOTogJ+ClrycsXG4gICAgMDogJ+ClpidcbiAgfSxcbiAgbnVtYmVyTWFwOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAn4KWnJzogJzEnLFxuICAgICfgpagnOiAnMicsXG4gICAgJ+ClqSc6ICczJyxcbiAgICAn4KWqJzogJzQnLFxuICAgICfgpasnOiAnNScsXG4gICAgJ+ClrCc6ICc2JyxcbiAgICAn4KWtJzogJzcnLFxuICAgICfgpa4nOiAnOCcsXG4gICAgJ+Clryc6ICc5JyxcbiAgICAn4KWmJzogJzAnXG4gIH07XG5cbmV4cG9ydCBjb25zdCBoaUxvY2FsZTogTG9jYWxlRGF0YSA9IHtcbiAgYWJicjogJ2hpJyxcbiAgbW9udGhzOiAn4KSc4KSo4KS14KSw4KWAX+Ckq+CkvOCksOCkteCksOClgF/gpK7gpL7gpLDgpY3gpJpf4KSF4KSq4KWN4KSw4KWI4KSyX+CkruCkiF/gpJzgpYLgpKhf4KSc4KWB4KSy4KS+4KSIX+CkheCkl+CkuOCljeCkpF/gpLjgpL/gpKTgpK7gpY3gpKzgpLBf4KSF4KSV4KWN4KSf4KWC4KSs4KSwX+CkqOCkteCkruCljeCkrOCksF/gpKbgpL/gpLjgpK7gpY3gpKzgpLAnLnNwbGl0KCdfJyksXG4gIG1vbnRoc1Nob3J0OiAn4KSc4KSoLl/gpKvgpLzgpLAuX+CkruCkvuCksOCljeCkml/gpIXgpKrgpY3gpLDgpYguX+CkruCkiF/gpJzgpYLgpKhf4KSc4KWB4KSyLl/gpIXgpJcuX+CkuOCkv+CkpC5f4KSF4KSV4KWN4KSf4KWCLl/gpKjgpLUuX+CkpuCkv+CkuC4nLnNwbGl0KCdfJyksXG4gIG1vbnRoc1BhcnNlRXhhY3Q6IHRydWUsXG4gIHdlZWtkYXlzOiAn4KSw4KS14KS/4KS14KS+4KSwX+CkuOCli+CkruCkteCkvuCksF/gpK7gpILgpJfgpLLgpLXgpL7gpLBf4KSs4KWB4KSn4KS14KS+4KSwX+Ckl+ClgeCksOClguCkteCkvuCksF/gpLbgpYHgpJXgpY3gpLDgpLXgpL7gpLBf4KS24KSo4KS/4KS14KS+4KSwJy5zcGxpdCgnXycpLFxuICB3ZWVrZGF5c1Nob3J0OiAn4KSw4KS14KS/X+CkuOCli+Ckrl/gpK7gpILgpJfgpLJf4KSs4KWB4KSnX+Ckl+ClgeCksOClgl/gpLbgpYHgpJXgpY3gpLBf4KS24KSo4KS/Jy5zcGxpdCgnXycpLFxuICB3ZWVrZGF5c01pbjogJ+CksF/gpLjgpYtf4KSu4KSCX+CkrOClgV/gpJfgpYFf4KS24KWBX+Ckticuc3BsaXQoJ18nKSxcbiAgbG9uZ0RhdGVGb3JtYXQ6IHtcbiAgICBMVDogJ0EgaDptbSDgpKzgpJzgpYcnLFxuICAgIExUUzogJ0EgaDptbTpzcyDgpKzgpJzgpYcnLFxuICAgIEw6ICdERC9NTS9ZWVlZJyxcbiAgICBMTDogJ0QgTU1NTSBZWVlZJyxcbiAgICBMTEw6ICdEIE1NTU0gWVlZWSwgQSBoOm1tIOCkrOCknOClhycsXG4gICAgTExMTDogJ2RkZGQsIEQgTU1NTSBZWVlZLCBBIGg6bW0g4KSs4KSc4KWHJ1xuICB9LFxuICBjYWxlbmRhcjoge1xuICAgIHNhbWVEYXk6ICdb4KSG4KScXSBMVCcsXG4gICAgbmV4dERheTogJ1vgpJXgpLJdIExUJyxcbiAgICBuZXh0V2VlazogJ2RkZGQsIExUJyxcbiAgICBsYXN0RGF5OiAnW+CkleCksl0gTFQnLFxuICAgIGxhc3RXZWVrOiAnW+CkquCkv+Ckm+CksuClh10gZGRkZCwgTFQnLFxuICAgIHNhbWVFbHNlOiAnTCdcbiAgfSxcbiAgcmVsYXRpdmVUaW1lOiB7XG4gICAgZnV0dXJlOiAnJXMg4KSu4KWH4KSCJyxcbiAgICBwYXN0OiAnJXMg4KSq4KS54KSy4KWHJyxcbiAgICBzOiAn4KSV4KWB4KSbIOCkueClgCDgpJXgpY3gpLfgpKMnLFxuICAgIHNzOiAnJWQg4KS44KWH4KSV4KSC4KShJyxcbiAgICBtOiAn4KSP4KSVIOCkruCkv+CkqOCknycsXG4gICAgbW06ICclZCDgpK7gpL/gpKjgpJ8nLFxuICAgIGg6ICfgpI/gpJUg4KSY4KSC4KSf4KS+JyxcbiAgICBoaDogJyVkIOCkmOCkguCkn+ClhycsXG4gICAgZDogJ+Ckj+CklSDgpKbgpL/gpKgnLFxuICAgIGRkOiAnJWQg4KSm4KS/4KSoJyxcbiAgICBNOiAn4KSP4KSVIOCkruCkueClgOCkqOClhycsXG4gICAgTU06ICclZCDgpK7gpLngpYDgpKjgpYcnLFxuICAgIHk6ICfgpI/gpJUg4KS14KSw4KWN4KS3JyxcbiAgICB5eTogJyVkIOCkteCksOCljeCktydcbiAgfSxcbiAgcHJlcGFyc2Uoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvW+Clp+ClqOClqeClquClq+ClrOClreClruClr+Clpl0vZywgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICByZXR1cm4gbnVtYmVyTWFwW21hdGNoXTtcbiAgICB9KTtcbiAgfSxcbiAgcG9zdGZvcm1hdChzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXGQvZywgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICByZXR1cm4gc3ltYm9sTWFwW21hdGNoXTtcbiAgICB9KTtcbiAgfSxcbiAgLy8gSGluZGkgbm90YXRpb24gZm9yIG1lcmlkaWVtcyBhcmUgcXVpdGUgZnV6enkgaW4gcHJhY3RpY2UuIFdoaWxlIHRoZXJlIGV4aXN0c1xuICAvLyBhIHJpZ2lkIG5vdGlvbiBvZiBhICdQYWhhcicgaXQgaXMgbm90IHVzZWQgYXMgcmlnaWRseSBpbiBtb2Rlcm4gSGluZGkuXG4gIG1lcmlkaWVtUGFyc2U6IC/gpLDgpL7gpKR84KS44KWB4KSs4KS5fOCkpuCli+CkquCkueCksHzgpLbgpL7gpK4vLFxuICBtZXJpZGllbUhvdXIoaG91ciwgbWVyaWRpZW0pIHtcbiAgICBpZiAoaG91ciA9PT0gMTIpIHtcbiAgICAgIGhvdXIgPSAwO1xuICAgIH1cbiAgICBpZiAobWVyaWRpZW0gPT09ICfgpLDgpL7gpKQnKSB7XG4gICAgICByZXR1cm4gaG91ciA8IDQgPyBob3VyIDogaG91ciArIDEyO1xuICAgIH0gZWxzZSBpZiAobWVyaWRpZW0gPT09ICfgpLjgpYHgpKzgpLknKSB7XG4gICAgICByZXR1cm4gaG91cjtcbiAgICB9IGVsc2UgaWYgKG1lcmlkaWVtID09PSAn4KSm4KWL4KSq4KS54KSwJykge1xuICAgICAgcmV0dXJuIGhvdXIgPj0gMTAgPyBob3VyIDogaG91ciArIDEyO1xuICAgIH0gZWxzZSBpZiAobWVyaWRpZW0gPT09ICfgpLbgpL7gpK4nKSB7XG4gICAgICByZXR1cm4gaG91ciArIDEyO1xuICAgIH1cbiAgfSxcbiAgbWVyaWRpZW0oaG91ciwgbWludXRlLCBpc0xvd2VyKSB7XG4gICAgaWYgKGhvdXIgPCA0KSB7XG4gICAgICByZXR1cm4gJ+CksOCkvuCkpCc7XG4gICAgfSBlbHNlIGlmIChob3VyIDwgMTApIHtcbiAgICAgIHJldHVybiAn4KS44KWB4KSs4KS5JztcbiAgICB9IGVsc2UgaWYgKGhvdXIgPCAxNykge1xuICAgICAgcmV0dXJuICfgpKbgpYvgpKrgpLngpLAnO1xuICAgIH0gZWxzZSBpZiAoaG91ciA8IDIwKSB7XG4gICAgICByZXR1cm4gJ+CktuCkvuCkric7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAn4KSw4KS+4KSkJztcbiAgICB9XG4gIH0sXG4gIHdlZWs6IHtcbiAgICBkb3c6IDAsIC8vIFN1bmRheSBpcyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxuICAgIGRveTogNiAgLy8gVGhlIHdlZWsgdGhhdCBjb250YWlucyBKYW4gMXN0IGlzIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyLlxuICB9XG59O1xuIl19