import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appRtl]'
})
export class RtlDirective implements OnInit, OnDestroy {
  @Input() appRtl: string = 'ar';

  private destroy$ = new Subject<void>();

  constructor(
    private el: ElementRef,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.updateDirection(lang);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateDirection(lang: string): void {
    const isRtl = lang === this.appRtl;
    const element = this.el.nativeElement;

    if (isRtl) {
      element.setAttribute('dir', 'rtl');
      element.style.direction = 'rtl';
      element.style.textAlign = 'right';
    } else {
      element.setAttribute('dir', 'ltr');
      element.style.direction = 'ltr';
      element.style.textAlign = 'left';
    }
  }
}