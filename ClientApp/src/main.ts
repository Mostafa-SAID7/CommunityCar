import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';

bootstrapApplication(App, appConfig)
  .catch((err) => {
    // Log to console only in development
    if (!environment.production) {
      console.error('Application bootstrap error:', err);
    }
    // In production, you might want to send this to an error reporting service
    // errorReportingService.reportError(err);
  });
