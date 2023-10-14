import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FirstLetterPipe} from './first-letter.pipe';
import { BolivianDatePipe } from './bolivian-date.pipe';


@NgModule({
    declarations: [
        FirstLetterPipe,
        BolivianDatePipe
    ],
    exports: [
        FirstLetterPipe,
        BolivianDatePipe
    ],
    imports: [
        CommonModule
    ]
})
export class PipesModule {
}
