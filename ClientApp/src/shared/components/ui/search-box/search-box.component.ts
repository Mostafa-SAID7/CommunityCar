import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface SearchConfig {
  placeholder?: string;
  debounceTime?: number;
  minLength?: number;
  showClearButton?: boolean;
  showSearchIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
}

@Component({
  selector: 'app-search-box',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-box-container" [ngClass]="containerClass">
      <div class="search-input-wrapper" [ngClass]="[size, variant]">
        <svg
          *ngIf="config.showSearchIcon !== false"
          class="search-icon"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>

        <input
          #searchInput
          type="text"
          class="search-input"
          [placeholder]="config.placeholder || 'Search...'"
          [(ngModel)]="searchTerm"
          (input)="onInput($event)"
          (keyup.enter)="onEnter()"
          [attr.aria-label]="config.placeholder || 'Search'"
          autocomplete="off" />

        <button
          *ngIf="config.showClearButton && searchTerm"
          type="button"
          class="clear-button"
          (click)="clearSearch()"
          [attr.aria-label]="'Clear search'">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>
        </button>
      </div>

      <!-- Search Suggestions (Optional) -->
      <div *ngIf="showSuggestions && suggestions.length > 0" class="search-suggestions">
        <div
          *ngFor="let suggestion of suggestions; trackBy: trackBySuggestion"
          class="suggestion-item"
          (click)="selectSuggestion(suggestion)">
          <span class="suggestion-text">{{ suggestion.text }}</span>
          <span *ngIf="suggestion.count" class="suggestion-count">{{ suggestion.count }}</span>
        </div>
      </div>
    </div>
  `
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

  @Input() config: SearchConfig = {};
  @Input() suggestions: Array<{ text: string; count?: number }> = [];
  @Input() showSuggestions = false;
  @Input() containerClass = '';

  @Output() search = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() suggestionSelected = new EventEmitter<string>();

  searchTerm = '';
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  get size(): string {
    return this.config.size || 'md';
  }

  get variant(): string {
    return this.config.variant || 'default';
  }

  ngOnInit(): void {
    const debounceMs = this.config.debounceTime || 300;

    this.searchSubject
      .pipe(
        debounceTime(debounceMs),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((term: string) => {
        if (term.length >= (this.config.minLength || 0)) {
          this.search.emit(term);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.searchSubject.next(this.searchTerm);
    this.searchChange.emit(this.searchTerm);
  }

  onEnter(): void {
    if (this.searchTerm.trim()) {
      this.search.emit(this.searchTerm.trim());
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchSubject.next('');
    this.searchChange.emit('');
    this.search.emit('');
  }

  selectSuggestion(suggestion: { text: string; count?: number }): void {
    this.searchTerm = suggestion.text;
    this.suggestionSelected.emit(suggestion.text);
    this.search.emit(suggestion.text);
  }

  trackBySuggestion(_index: number, item: { text: string; count?: number }): string {
    return item.text;
  }

  focus(): void {
    // Method to programmatically focus the input
    if (this.searchInput) {
      this.searchInput.nativeElement.focus();
    }
  }
}