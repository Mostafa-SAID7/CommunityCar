import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslationService } from '../../core/services/translation.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private destroy$ = new Subject<void>();
  private lastKey?: string;
  private lastParams?: Record<string, any>;
  private lastValue?: string;

  constructor(private translationService: TranslationService) {}

  transform(key: string, params?: Record<string, any>): string {
    if (!key) {
      return '';
    }

    // Return cached value if parameters haven't changed
    if (this.lastKey === key &&
        JSON.stringify(this.lastParams) === JSON.stringify(params) &&
        this.lastValue) {
      return this.lastValue;
    }

    this.lastKey = key;
    this.lastParams = params;
    this.lastValue = this.translationService.translate(key, params);

    return this.lastValue;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}