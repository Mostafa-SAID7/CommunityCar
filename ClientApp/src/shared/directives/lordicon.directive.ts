import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { LordiconService, LordiconOptions } from '../../core/services/lordicon.service';

@Directive({
  selector: '[lordicon]',
  standalone: true
})
export class LordiconDirective implements OnInit, OnDestroy {
  @Input('lordicon') lordiconIcon = 'user';
  @Input() lordiconOptions: LordiconOptions = {};
  @Input() lordiconTrigger: string = 'hover';
  @Input() lordiconColors: string = 'primary:#3b82f6,secondary:#8b5cf6';
  @Input() lordiconSize: string | number = 32;

  private lordiconElement: HTMLElement | null = null;

  constructor(
    private el: ElementRef,
    private lordiconService: LordiconService
  ) {}

  ngOnInit(): void {
    this.initializeIcon();
  }

  ngOnDestroy(): void {
    if (this.lordiconElement) {
      this.lordiconElement.remove();
    }
  }

  private initializeIcon(): void {
    const iconUrl = this.lordiconService.getIconUrl(this.lordiconIcon);

    const size = typeof this.lordiconSize === 'string' ? parseInt(this.lordiconSize, 10) : this.lordiconSize;

    const options: LordiconOptions = {
      ...this.lordiconOptions,
      trigger: this.lordiconTrigger,
      colors: this.lordiconColors,
      height: size,
      width: size
    };

    this.lordiconElement = this.lordiconService.createIconElement(iconUrl, options);

    // Clear existing content and add the icon
    this.el.nativeElement.innerHTML = '';
    this.el.nativeElement.appendChild(this.lordiconElement);

    // Add CSS class for styling
    this.el.nativeElement.classList.add('lordicon-container');
  }

  // Method to update icon dynamically
  updateIcon(iconName: string, options?: LordiconOptions): void {
    this.lordiconIcon = iconName;
    if (options) {
      this.lordiconOptions = { ...this.lordiconOptions, ...options };
    }
    this.initializeIcon();
  }

  // Method to trigger animation
  triggerAnimation(): void {
    if (this.lordiconElement) {
      const lordicon = this.lordiconElement as any;
      if (lordicon.trigger) {
        lordicon.trigger();
      }
    }
  }
}