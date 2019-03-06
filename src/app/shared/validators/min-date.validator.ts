import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[apMinDate]',
    providers: [{provide: NG_VALIDATORS, useExisting: MinDateDirective, multi: true}]
})
export class MinDateDirective implements Validator {
    @Input() apMinDate: string;

    validate(c: AbstractControl): { [key: string]: any } {
        if (c.value) {
            const minDate   = new Date(this.apMinDate);
            const inputDate = new Date(c.value);
            console.log(minDate, inputDate);
            return minDate <= inputDate ? null : {'minDate': minDate.toLocaleDateString()};
        }
        return null;
    }

    constructor() {}
}
