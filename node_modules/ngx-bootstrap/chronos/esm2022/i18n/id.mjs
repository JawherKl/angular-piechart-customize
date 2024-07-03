//! moment.js locale configuration
//! locale : Indonesia [id]
//! author : Romy Kusuma : https://github.com/rkusuma
//! reference: https://github.com/moment/moment/blob/develop/locale/id.js
export const idLocale = {
    abbr: 'id',
    months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des'.split('_'),
    weekdays: 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
    weekdaysShort: 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
    weekdaysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
    longDateFormat: {
        LT: 'HH.mm',
        LTS: 'HH.mm.ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY [pukul] HH.mm',
        LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
    },
    meridiemParse: /pagi|siang|sore|malam/,
    meridiemHour(hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'pagi') {
            return hour;
        }
        else if (meridiem === 'siang') {
            return hour >= 11 ? hour : hour + 12;
        }
        else if (meridiem === 'sore' || meridiem === 'malam') {
            return hour + 12;
        }
    },
    meridiem(hours, minutes, isLower) {
        if (hours < 11) {
            return 'pagi';
        }
        else if (hours < 15) {
            return 'siang';
        }
        else if (hours < 19) {
            return 'sore';
        }
        else {
            return 'malam';
        }
    },
    calendar: {
        sameDay: '[Hari ini pukul] LT',
        nextDay: '[Besok pukul] LT',
        nextWeek: 'dddd [pukul] LT',
        lastDay: '[Kemarin pukul] LT',
        lastWeek: 'dddd [lalu pukul] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'dalam %s',
        past: '%s yang lalu',
        s: 'beberapa detik',
        ss: '%d detik',
        m: 'semenit',
        mm: '%d menit',
        h: 'sejam',
        hh: '%d jam',
        d: 'sehari',
        dd: '%d hari',
        M: 'sebulan',
        MM: '%d bulan',
        y: 'setahun',
        yy: '%d tahun'
    },
    week: {
        dow: 1,
        doy: 7 // The week that contains Jan 1st is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL2lkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQywyQkFBMkI7QUFDM0IscURBQXFEO0FBQ3JELHlFQUF5RTtBQUV6RSxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQWU7SUFDbEMsSUFBSSxFQUFFLElBQUk7SUFDVixNQUFNLEVBQUcsd0ZBQXdGLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUM1RyxXQUFXLEVBQUcsaURBQWlELENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUMxRSxRQUFRLEVBQUcsNENBQTRDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNsRSxhQUFhLEVBQUcsNkJBQTZCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUN4RCxXQUFXLEVBQUcsc0JBQXNCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUMvQyxjQUFjLEVBQUc7UUFDZixFQUFFLEVBQUcsT0FBTztRQUNaLEdBQUcsRUFBRyxVQUFVO1FBQ2hCLENBQUMsRUFBRyxZQUFZO1FBQ2hCLEVBQUUsRUFBRyxhQUFhO1FBQ2xCLEdBQUcsRUFBRywyQkFBMkI7UUFDakMsSUFBSSxFQUFHLGlDQUFpQztLQUN6QztJQUNELGFBQWEsRUFBRSx1QkFBdUI7SUFDdEMsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRO1FBQ3pCLElBQUksSUFBSSxLQUFLLEVBQUUsRUFBRTtZQUNmLElBQUksR0FBRyxDQUFDLENBQUM7U0FDVjtRQUNELElBQUksUUFBUSxLQUFLLE1BQU0sRUFBRTtZQUN2QixPQUFPLElBQUksQ0FBQztTQUNiO2FBQU0sSUFBSSxRQUFRLEtBQUssT0FBTyxFQUFFO1lBQy9CLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQ3RDO2FBQU0sSUFBSSxRQUFRLEtBQUssTUFBTSxJQUFJLFFBQVEsS0FBSyxPQUFPLEVBQUU7WUFDdEQsT0FBTyxJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQUNELFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU87UUFDOUIsSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUFFO1lBQ2QsT0FBTyxNQUFNLENBQUM7U0FDZjthQUFNLElBQUksS0FBSyxHQUFHLEVBQUUsRUFBRTtZQUNyQixPQUFPLE9BQU8sQ0FBQztTQUNoQjthQUFNLElBQUksS0FBSyxHQUFHLEVBQUUsRUFBRTtZQUNyQixPQUFPLE1BQU0sQ0FBQztTQUNmO2FBQU07WUFDTCxPQUFPLE9BQU8sQ0FBQztTQUNoQjtJQUNILENBQUM7SUFDRCxRQUFRLEVBQUc7UUFDVCxPQUFPLEVBQUcscUJBQXFCO1FBQy9CLE9BQU8sRUFBRyxrQkFBa0I7UUFDNUIsUUFBUSxFQUFHLGlCQUFpQjtRQUM1QixPQUFPLEVBQUcsb0JBQW9CO1FBQzlCLFFBQVEsRUFBRyxzQkFBc0I7UUFDakMsUUFBUSxFQUFHLEdBQUc7S0FDZjtJQUNELFlBQVksRUFBRztRQUNiLE1BQU0sRUFBRyxVQUFVO1FBQ25CLElBQUksRUFBRyxjQUFjO1FBQ3JCLENBQUMsRUFBRyxnQkFBZ0I7UUFDcEIsRUFBRSxFQUFHLFVBQVU7UUFDZixDQUFDLEVBQUcsU0FBUztRQUNiLEVBQUUsRUFBRyxVQUFVO1FBQ2YsQ0FBQyxFQUFHLE9BQU87UUFDWCxFQUFFLEVBQUcsUUFBUTtRQUNiLENBQUMsRUFBRyxRQUFRO1FBQ1osRUFBRSxFQUFHLFNBQVM7UUFDZCxDQUFDLEVBQUcsU0FBUztRQUNiLEVBQUUsRUFBRyxVQUFVO1FBQ2YsQ0FBQyxFQUFHLFNBQVM7UUFDYixFQUFFLEVBQUcsVUFBVTtLQUNoQjtJQUNELElBQUksRUFBRztRQUNMLEdBQUcsRUFBRyxDQUFDO1FBQ1AsR0FBRyxFQUFHLENBQUMsQ0FBRSxnRUFBZ0U7S0FDMUU7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYWxlRGF0YSB9IGZyb20gJy4uL2xvY2FsZS9sb2NhbGUuY2xhc3MnO1xuXG4vLyEgbW9tZW50LmpzIGxvY2FsZSBjb25maWd1cmF0aW9uXG4vLyEgbG9jYWxlIDogSW5kb25lc2lhIFtpZF1cbi8vISBhdXRob3IgOiBSb215IEt1c3VtYSA6IGh0dHBzOi8vZ2l0aHViLmNvbS9ya3VzdW1hXG4vLyEgcmVmZXJlbmNlOiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9ibG9iL2RldmVsb3AvbG9jYWxlL2lkLmpzXG5cbmV4cG9ydCBjb25zdCBpZExvY2FsZTogTG9jYWxlRGF0YSA9IHtcbiAgYWJicjogJ2lkJyxcbiAgbW9udGhzIDogJ0phbnVhcmlfRmVicnVhcmlfTWFyZXRfQXByaWxfTWVpX0p1bmlfSnVsaV9BZ3VzdHVzX1NlcHRlbWJlcl9Pa3RvYmVyX05vdmVtYmVyX0Rlc2VtYmVyJy5zcGxpdCgnXycpLFxuICBtb250aHNTaG9ydCA6ICdKYW5fRmViX01hcl9BcHJfTWVpX0p1bl9KdWxfQWdzX1NlcF9Pa3RfTm92X0Rlcycuc3BsaXQoJ18nKSxcbiAgd2Vla2RheXMgOiAnTWluZ2d1X1NlbmluX1NlbGFzYV9SYWJ1X0thbWlzX0p1bWF0X1NhYnR1Jy5zcGxpdCgnXycpLFxuICB3ZWVrZGF5c1Nob3J0IDogJ01pbl9TZW5fU2VsX1JhYl9LYW1fSnVtX1NhYicuc3BsaXQoJ18nKSxcbiAgd2Vla2RheXNNaW4gOiAnTWdfU25fU2xfUmJfS21fSm1fU2InLnNwbGl0KCdfJyksXG4gIGxvbmdEYXRlRm9ybWF0IDoge1xuICAgIExUIDogJ0hILm1tJyxcbiAgICBMVFMgOiAnSEgubW0uc3MnLFxuICAgIEwgOiAnREQvTU0vWVlZWScsXG4gICAgTEwgOiAnRCBNTU1NIFlZWVknLFxuICAgIExMTCA6ICdEIE1NTU0gWVlZWSBbcHVrdWxdIEhILm1tJyxcbiAgICBMTExMIDogJ2RkZGQsIEQgTU1NTSBZWVlZIFtwdWt1bF0gSEgubW0nXG4gIH0sXG4gIG1lcmlkaWVtUGFyc2U6IC9wYWdpfHNpYW5nfHNvcmV8bWFsYW0vLFxuICBtZXJpZGllbUhvdXIoaG91ciwgbWVyaWRpZW0pIHtcbiAgICBpZiAoaG91ciA9PT0gMTIpIHtcbiAgICAgIGhvdXIgPSAwO1xuICAgIH1cbiAgICBpZiAobWVyaWRpZW0gPT09ICdwYWdpJykge1xuICAgICAgcmV0dXJuIGhvdXI7XG4gICAgfSBlbHNlIGlmIChtZXJpZGllbSA9PT0gJ3NpYW5nJykge1xuICAgICAgcmV0dXJuIGhvdXIgPj0gMTEgPyBob3VyIDogaG91ciArIDEyO1xuICAgIH0gZWxzZSBpZiAobWVyaWRpZW0gPT09ICdzb3JlJyB8fCBtZXJpZGllbSA9PT0gJ21hbGFtJykge1xuICAgICAgcmV0dXJuIGhvdXIgKyAxMjtcbiAgICB9XG4gIH0sXG4gIG1lcmlkaWVtKGhvdXJzLCBtaW51dGVzLCBpc0xvd2VyKSB7XG4gICAgaWYgKGhvdXJzIDwgMTEpIHtcbiAgICAgIHJldHVybiAncGFnaSc7XG4gICAgfSBlbHNlIGlmIChob3VycyA8IDE1KSB7XG4gICAgICByZXR1cm4gJ3NpYW5nJztcbiAgICB9IGVsc2UgaWYgKGhvdXJzIDwgMTkpIHtcbiAgICAgIHJldHVybiAnc29yZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnbWFsYW0nO1xuICAgIH1cbiAgfSxcbiAgY2FsZW5kYXIgOiB7XG4gICAgc2FtZURheSA6ICdbSGFyaSBpbmkgcHVrdWxdIExUJyxcbiAgICBuZXh0RGF5IDogJ1tCZXNvayBwdWt1bF0gTFQnLFxuICAgIG5leHRXZWVrIDogJ2RkZGQgW3B1a3VsXSBMVCcsXG4gICAgbGFzdERheSA6ICdbS2VtYXJpbiBwdWt1bF0gTFQnLFxuICAgIGxhc3RXZWVrIDogJ2RkZGQgW2xhbHUgcHVrdWxdIExUJyxcbiAgICBzYW1lRWxzZSA6ICdMJ1xuICB9LFxuICByZWxhdGl2ZVRpbWUgOiB7XG4gICAgZnV0dXJlIDogJ2RhbGFtICVzJyxcbiAgICBwYXN0IDogJyVzIHlhbmcgbGFsdScsXG4gICAgcyA6ICdiZWJlcmFwYSBkZXRpaycsXG4gICAgc3MgOiAnJWQgZGV0aWsnLFxuICAgIG0gOiAnc2VtZW5pdCcsXG4gICAgbW0gOiAnJWQgbWVuaXQnLFxuICAgIGggOiAnc2VqYW0nLFxuICAgIGhoIDogJyVkIGphbScsXG4gICAgZCA6ICdzZWhhcmknLFxuICAgIGRkIDogJyVkIGhhcmknLFxuICAgIE0gOiAnc2VidWxhbicsXG4gICAgTU0gOiAnJWQgYnVsYW4nLFxuICAgIHkgOiAnc2V0YWh1bicsXG4gICAgeXkgOiAnJWQgdGFodW4nXG4gIH0sXG4gIHdlZWsgOiB7XG4gICAgZG93IDogMSwgLy8gTW9uZGF5IGlzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXG4gICAgZG95IDogNyAgLy8gVGhlIHdlZWsgdGhhdCBjb250YWlucyBKYW4gMXN0IGlzIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyLlxuICB9XG59O1xuXG4iXX0=