import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appRouting } from './app/app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { LoaderInterceptor } from './app/core/interceptors/loader-interceptor.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // ✅ Enable DI-based interceptors
    importProvidersFrom(HttpClientModule), // ✅ Provide HttpClient
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }, // ✅ Register Interceptor
    ...appRouting, // ✅ Add Routing
  ],
}).catch(err => console.error(err));
