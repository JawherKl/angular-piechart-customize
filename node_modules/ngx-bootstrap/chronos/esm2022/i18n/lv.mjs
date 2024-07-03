//! moment.js locale configuration
//! locale : Latvian [lv]
//! author : Matiss Janis Aboltins : https://github.com/matissjanis
export const lvLocale = {
    abbr: 'lv',
    months: 'Janvāris_Februāris_Marts_Aprīlis_Maijs_Jūnijs_Jūlijs_Augusts_Septembris_Oktobris_Novembris_Decembris'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_Mai_Jūn_Jūl_Aug_Sep_Okt_Nov_Dec'.split('_'),
    weekdays: 'Svētdiena_Pirmdiena_Otrdiena_Trešdiena_Ceturtdiena_Piektdiena_Sestdiena'.split('_'),
    weekdaysShort: 'Svētd_Pirmd_Otrd_Trešd_Ceturtd_Piektd_Sestd'.split('_'),
    weekdaysMin: 'Sv_Pi_Ot_Tr_Ce_Pk_Se'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'pēc %s',
        past: 'pirms %s',
        s: 'dažām sekundēm',
        ss: '%d sekundēm',
        m: 'minūtes',
        mm: '%d minūtēm',
        h: 'stundas',
        hh: '%d stundām',
        d: 'dienas',
        dd: '%d dienām',
        M: 'mēneša',
        MM: '%d mēnešiem',
        y: 'gada',
        yy: '%d gadiem'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal(num) {
        return num + '.';
    },
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL2x2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQyx5QkFBeUI7QUFDekIsbUVBQW1FO0FBRW5FLE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBZTtJQUNsQyxJQUFJLEVBQUUsSUFBSTtJQUNWLE1BQU0sRUFBRyxzR0FBc0csQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzFILFdBQVcsRUFBRyxpREFBaUQsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzFFLFFBQVEsRUFBRyx5RUFBeUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQy9GLGFBQWEsRUFBRyw2Q0FBNkMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3hFLFdBQVcsRUFBRyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQy9DLGNBQWMsRUFBRztRQUNmLEVBQUUsRUFBRyxPQUFPO1FBQ1osR0FBRyxFQUFHLFVBQVU7UUFDaEIsQ0FBQyxFQUFHLFlBQVk7UUFDaEIsRUFBRSxFQUFHLGFBQWE7UUFDbEIsR0FBRyxFQUFHLG1CQUFtQjtRQUN6QixJQUFJLEVBQUcseUJBQXlCO0tBQ2pDO0lBQ0QsUUFBUSxFQUFHO1FBQ1QsT0FBTyxFQUFHLGVBQWU7UUFDekIsT0FBTyxFQUFHLGtCQUFrQjtRQUM1QixRQUFRLEVBQUcsY0FBYztRQUN6QixPQUFPLEVBQUcsbUJBQW1CO1FBQzdCLFFBQVEsRUFBRyxxQkFBcUI7UUFDaEMsUUFBUSxFQUFHLEdBQUc7S0FDZjtJQUNELFlBQVksRUFBRztRQUNiLE1BQU0sRUFBRyxRQUFRO1FBQ2pCLElBQUksRUFBRyxVQUFVO1FBQ2pCLENBQUMsRUFBRyxnQkFBZ0I7UUFDcEIsRUFBRSxFQUFHLGFBQWE7UUFDbEIsQ0FBQyxFQUFHLFNBQVM7UUFDYixFQUFFLEVBQUcsWUFBWTtRQUNqQixDQUFDLEVBQUcsU0FBUztRQUNiLEVBQUUsRUFBRyxZQUFZO1FBQ2pCLENBQUMsRUFBRyxRQUFRO1FBQ1osRUFBRSxFQUFHLFdBQVc7UUFDaEIsQ0FBQyxFQUFHLFFBQVE7UUFDWixFQUFFLEVBQUcsYUFBYTtRQUNsQixDQUFDLEVBQUcsTUFBTTtRQUNWLEVBQUUsRUFBRyxXQUFXO0tBQ2pCO0lBQ0Qsc0JBQXNCLEVBQUUsV0FBVztJQUNuQyxPQUFPLENBQUMsR0FBRztRQUNQLE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNyQixDQUFDO0lBQ0QsSUFBSSxFQUFHO1FBQ0wsR0FBRyxFQUFHLENBQUM7UUFDUCxHQUFHLEVBQUcsQ0FBQyxDQUFFLGdFQUFnRTtLQUMxRTtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhbGVEYXRhIH0gZnJvbSAnLi4vbG9jYWxlL2xvY2FsZS5jbGFzcyc7XG5cbi8vISBtb21lbnQuanMgbG9jYWxlIGNvbmZpZ3VyYXRpb25cbi8vISBsb2NhbGUgOiBMYXR2aWFuIFtsdl1cbi8vISBhdXRob3IgOiBNYXRpc3MgSmFuaXMgQWJvbHRpbnMgOiBodHRwczovL2dpdGh1Yi5jb20vbWF0aXNzamFuaXNcblxuZXhwb3J0IGNvbnN0IGx2TG9jYWxlOiBMb2NhbGVEYXRhID0ge1xuICBhYmJyOiAnbHYnLFxuICBtb250aHMgOiAnSmFudsSBcmlzX0ZlYnJ1xIFyaXNfTWFydHNfQXByxKtsaXNfTWFpanNfSsWrbmlqc19KxatsaWpzX0F1Z3VzdHNfU2VwdGVtYnJpc19Pa3RvYnJpc19Ob3ZlbWJyaXNfRGVjZW1icmlzJy5zcGxpdCgnXycpLFxuICBtb250aHNTaG9ydCA6ICdKYW5fRmViX01hcl9BcHJfTWFpX0rFq25fSsWrbF9BdWdfU2VwX09rdF9Ob3ZfRGVjJy5zcGxpdCgnXycpLFxuICB3ZWVrZGF5cyA6ICdTdsSTdGRpZW5hX1Bpcm1kaWVuYV9PdHJkaWVuYV9UcmXFoWRpZW5hX0NldHVydGRpZW5hX1BpZWt0ZGllbmFfU2VzdGRpZW5hJy5zcGxpdCgnXycpLFxuICB3ZWVrZGF5c1Nob3J0IDogJ1N2xJN0ZF9QaXJtZF9PdHJkX1RyZcWhZF9DZXR1cnRkX1BpZWt0ZF9TZXN0ZCcuc3BsaXQoJ18nKSxcbiAgd2Vla2RheXNNaW4gOiAnU3ZfUGlfT3RfVHJfQ2VfUGtfU2UnLnNwbGl0KCdfJyksXG4gIGxvbmdEYXRlRm9ybWF0IDoge1xuICAgIExUIDogJ0hIOm1tJyxcbiAgICBMVFMgOiAnSEg6bW06c3MnLFxuICAgIEwgOiAnREQvTU0vWVlZWScsXG4gICAgTEwgOiAnRCBNTU1NIFlZWVknLFxuICAgIExMTCA6ICdEIE1NTU0gWVlZWSBISDptbScsXG4gICAgTExMTCA6ICdkZGRkLCBEIE1NTU0gWVlZWSBISDptbSdcbiAgfSxcbiAgY2FsZW5kYXIgOiB7XG4gICAgc2FtZURheSA6ICdbVG9kYXkgYXRdIExUJyxcbiAgICBuZXh0RGF5IDogJ1tUb21vcnJvdyBhdF0gTFQnLFxuICAgIG5leHRXZWVrIDogJ2RkZGQgW2F0XSBMVCcsXG4gICAgbGFzdERheSA6ICdbWWVzdGVyZGF5IGF0XSBMVCcsXG4gICAgbGFzdFdlZWsgOiAnW0xhc3RdIGRkZGQgW2F0XSBMVCcsXG4gICAgc2FtZUVsc2UgOiAnTCdcbiAgfSxcbiAgcmVsYXRpdmVUaW1lIDoge1xuICAgIGZ1dHVyZSA6ICdwxJNjICVzJyxcbiAgICBwYXN0IDogJ3Bpcm1zICVzJyxcbiAgICBzIDogJ2Rhxb7EgW0gc2VrdW5kxJNtJyxcbiAgICBzcyA6ICclZCBzZWt1bmTEk20nLFxuICAgIG0gOiAnbWluxat0ZXMnLFxuICAgIG1tIDogJyVkIG1pbsWrdMSTbScsXG4gICAgaCA6ICdzdHVuZGFzJyxcbiAgICBoaCA6ICclZCBzdHVuZMSBbScsXG4gICAgZCA6ICdkaWVuYXMnLFxuICAgIGRkIDogJyVkIGRpZW7EgW0nLFxuICAgIE0gOiAnbcSTbmXFoWEnLFxuICAgIE1NIDogJyVkIG3Ek25lxaFpZW0nLFxuICAgIHkgOiAnZ2FkYScsXG4gICAgeXkgOiAnJWQgZ2FkaWVtJ1xuICB9LFxuICBkYXlPZk1vbnRoT3JkaW5hbFBhcnNlOiAvXFxkezEsMn1cXC4vLFxuICBvcmRpbmFsKG51bSkge1xuICAgICAgcmV0dXJuIG51bSArICcuJztcbiAgfSxcbiAgd2VlayA6IHtcbiAgICBkb3cgOiAxLCAvLyBNb25kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cbiAgICBkb3kgOiA0ICAvLyBUaGUgd2VlayB0aGF0IGNvbnRhaW5zIEphbiA0dGggaXMgdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHllYXIuXG4gIH1cbn07XG4iXX0=