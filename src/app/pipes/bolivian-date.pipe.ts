import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
    name: 'bolivianDate'
})
export class BolivianDatePipe implements PipeTransform {

    transform(value: string, args?: any): any {
        return new DatePipe('en-US').transform(value, 'dd/MM/yyyy HH:mm');
    }

}
