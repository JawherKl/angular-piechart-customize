import { window } from './facade/browser';
import { currentBsVersion } from './theme-provider';
export class Utils {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static reflow(element) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((bs) => bs)(element.offsetHeight);
    }
    // source: https://github.com/jquery/jquery/blob/master/src/css/var/getStyles.js
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getStyles(elem) {
        // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
        // IE throws on elements created in popups
        // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
        let view = elem.ownerDocument.defaultView;
        if (!view || !view.opener) {
            view = window;
        }
        return view.getComputedStyle(elem);
    }
    static stackOverflowConfig() {
        const bsVer = currentBsVersion();
        return {
            crossorigin: "anonymous",
            integrity: bsVer === 'bs5' ? 'sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65' : 'sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2',
            cdnLink: bsVer === 'bs5' ? 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css' : 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbHMvdXRpbHMuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXBELE1BQU0sT0FBTyxLQUFLO0lBQ2hCLDhEQUE4RDtJQUM5RCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQVk7UUFDeEIsOERBQThEO1FBQzlELENBQUMsQ0FBQyxFQUFPLEVBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsZ0ZBQWdGO0lBQ2hGLDhEQUE4RDtJQUM5RCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQVM7UUFDeEIsdURBQXVEO1FBQ3ZELDBDQUEwQztRQUMxQywrRUFBK0U7UUFDL0UsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7UUFFMUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDekIsSUFBSSxHQUFHLE1BQU0sQ0FBQztTQUNmO1FBRUQsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVBLE1BQU0sQ0FBQyxtQkFBbUI7UUFDekIsTUFBTSxLQUFLLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztRQUMvQixPQUFPO1lBQ1AsV0FBVyxFQUFFLFdBQVc7WUFDeEIsU0FBUyxFQUFFLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLHlFQUF5RSxDQUFDLENBQUMsQ0FBQyx5RUFBeUU7WUFDbEwsT0FBTyxFQUFFLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLHlFQUF5RSxDQUFDLENBQUMsQ0FBQyx5RUFBeUU7U0FDakwsQ0FBQztJQUNILENBQUM7Q0FDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHdpbmRvdyB9IGZyb20gJy4vZmFjYWRlL2Jyb3dzZXInO1xuaW1wb3J0IHsgY3VycmVudEJzVmVyc2lvbiB9IGZyb20gJy4vdGhlbWUtcHJvdmlkZXInO1xuXG5leHBvcnQgY2xhc3MgVXRpbHMge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBzdGF0aWMgcmVmbG93KGVsZW1lbnQ6IGFueSk6IHZvaWQge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgKChiczogYW55KTogdm9pZCA9PiBicykoZWxlbWVudC5vZmZzZXRIZWlnaHQpO1xuICB9XG5cbiAgLy8gc291cmNlOiBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9ibG9iL21hc3Rlci9zcmMvY3NzL3Zhci9nZXRTdHlsZXMuanNcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgc3RhdGljIGdldFN0eWxlcyhlbGVtOiBhbnkpOiBhbnkge1xuICAgIC8vIFN1cHBvcnQ6IElFIDw9MTEgb25seSwgRmlyZWZveCA8PTMwICgjMTUwOTgsICMxNDE1MClcbiAgICAvLyBJRSB0aHJvd3Mgb24gZWxlbWVudHMgY3JlYXRlZCBpbiBwb3B1cHNcbiAgICAvLyBGRiBtZWFud2hpbGUgdGhyb3dzIG9uIGZyYW1lIGVsZW1lbnRzIHRocm91Z2ggXCJkZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlXCJcbiAgICBsZXQgdmlldyA9IGVsZW0ub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldztcblxuICAgIGlmICghdmlldyB8fCAhdmlldy5vcGVuZXIpIHtcbiAgICAgIHZpZXcgPSB3aW5kb3c7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKTtcbiAgfVxuXG4gICBzdGF0aWMgc3RhY2tPdmVyZmxvd0NvbmZpZygpOiB7IGNyb3Nzb3JpZ2luPzogc3RyaW5nLCBpbnRlZ3JpdHk/OiBzdHJpbmcsIGNkbkxpbms6IHN0cmluZyB9IHtcbiAgICBjb25zdCBic1ZlciA9IGN1cnJlbnRCc1ZlcnNpb24oKTtcbiAgICAgIHJldHVybiB7XG4gICAgICBjcm9zc29yaWdpbjogXCJhbm9ueW1vdXNcIixcbiAgICAgIGludGVncml0eTogYnNWZXIgPT09ICdiczUnID8gJ3NoYTM4NC1yYnNBMlZCS1FoZ2d3enhIN3BQQ2FBcU80Nk1nbk9NODB6VzFSV3VINjFER0x3WkpFZEsyS2FkcTJGOUNVRzY1JyA6ICdzaGEzODQtVFg4dDI3RWNSRTNlL2loVTd6bVF4Vm5jREF5NXVJS3o0ckVrZ0lYZU1lZDRNMGpsZklEUHZnNnVxS0kyeFhyMicsXG4gICAgICBjZG5MaW5rOiBic1ZlciA9PT0gJ2JzNScgPyAnaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9ib290c3RyYXBANS4yLjMvZGlzdC9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnIDogJ2h0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vYm9vdHN0cmFwQDQuNS4zL2Rpc3QvY3NzL2Jvb3RzdHJhcC5taW4uY3NzJyxcbiAgICB9O1xuICAgfVxufVxuIl19