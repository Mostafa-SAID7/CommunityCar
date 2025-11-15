import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Components
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { SplashScreenComponent } from './components/ui/splash-screen/splash-screen.component';

// Directives
import { RtlDirective } from './directives/rtl.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { LazyLoadDirective } from './directives/lazy-load.directive';
import { LordiconDirective } from './directives/lordicon.directive';

// Pipes
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { CurrencyConverterPipe } from './pipes/currency-converter.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    SplashScreenComponent,
    LordiconDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    SplashScreenComponent,
    LordiconDirective,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }