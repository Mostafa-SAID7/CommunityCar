import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageService } from '../services/language.service';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
  constructor(private languageService: LanguageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentLang = this.languageService.getCurrentLanguage();

    if (currentLang) {
      request = request.clone({
        setHeaders: {
          'Accept-Language': currentLang
        }
      });
    }

    return next.handle(request);
  }
}