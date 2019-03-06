import { MinDateDirective } from './validators/min-date.validator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MinDateDirective
  ],
  exports: [
    MinDateDirective
  ]
})
export class SharedModule { }
