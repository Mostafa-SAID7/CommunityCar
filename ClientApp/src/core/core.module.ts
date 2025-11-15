import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Core module for shared functionality.
 * Note: Services are provided in 'root' and interceptors/guards are configured in app.config.ts
 * This module can be used for any module-specific declarations if needed in the future.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    // All providers have been moved to app.config.ts for standalone application setup
  ]
})
export class CoreModule { }