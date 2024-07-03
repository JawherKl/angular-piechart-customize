/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
export class Trigger {
    constructor(open, close) {
        this.open = open;
        this.close = close || open;
    }
    isManual() {
        return this.open === 'manual' || this.close === 'manual';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlci5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlscy90cmlnZ2VyLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE1BQU0sT0FBTyxPQUFPO0lBSWxCLFlBQVksSUFBWSxFQUFFLEtBQWM7UUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQztJQUMzRCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgVmFsb3IgU29mdHdhcmVcbiAqIEBjb3B5cmlnaHQgQW5ndWxhciBuZy1ib290c3RyYXAgdGVhbVxuICovXG5cbmV4cG9ydCBjbGFzcyBUcmlnZ2VyIHtcbiAgb3Blbjogc3RyaW5nO1xuICBjbG9zZT86IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihvcGVuOiBzdHJpbmcsIGNsb3NlPzogc3RyaW5nKSB7XG4gICAgdGhpcy5vcGVuID0gb3BlbjtcbiAgICB0aGlzLmNsb3NlID0gY2xvc2UgfHwgb3BlbjtcbiAgfVxuXG4gIGlzTWFudWFsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm9wZW4gPT09ICdtYW51YWwnIHx8IHRoaXMuY2xvc2UgPT09ICdtYW51YWwnO1xuICB9XG59XG4iXX0=