import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Directives
import { LordiconDirective } from './directives/lordicon.directive';

@NgModule({
  declarations: [
    LordiconDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    LordiconDirective,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }