// Shared Module - Barrel exports for standalone components
// Since we're using standalone components, this file serves as a barrel export
// for easy importing of shared components, directives, and pipes

// Layout Components
export { HeaderComponent } from './components/layout/header/header.component';
export { FooterComponent } from './components/layout/footer/footer.component';
export { NavbarComponent } from './components/layout/navbar/navbar.component';

// UI Components
export { SplashScreenComponent } from './components/ui/splash-screen/splash-screen.component';
export { LoaderComponent } from './components/ui/loader/loader.component';
export { PaginationComponent } from './components/ui/pagination/pagination.component';
export { SearchBoxComponent } from './components/ui/search-box/search-box.component';
export { ConfirmationModalComponent } from './components/ui/confirmation-modal/confirmation-modal.component';
export { ToastComponent } from './components/toast/toast.component';
export { ScrollTopComponent } from './components/ui/scroll-top/scroll-top.component';
export { ThemeToggleComponent } from './components/ui/theme-toggle/theme-toggle.component';
export { LanguageSelectorComponent } from './components/ui/language-selector/language-selector.component';
export { ChatAssistComponent } from './components/chat-assist/chat-assist.component';
export { NotificationContainerComponent } from './components/notification-container/notification-container.component';

// Directives
export { RtlDirective } from './directives/rtl.directive';
export { LordiconDirective } from './directives/lordicon.directive';

// Pipes
export { SafeHtmlPipe } from './pipes/safe-html.pipe';
export { TimeAgoPipe } from './pipes/time-ago.pipe';
export { CurrencyConverterPipe } from './pipes/currency-converter.pipe';
export { TruncatePipe } from './pipes/truncate.pipe';
export { TranslatePipe } from './pipes/translate.pipe';

// Common Angular modules for convenience
export { CommonModule } from '@angular/common';
export { RouterModule } from '@angular/router';
export { ReactiveFormsModule, FormsModule } from '@angular/forms';