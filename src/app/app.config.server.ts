import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';

const serverConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()), 
    provideRouter(routes), 
    provideClientHydration(),
    provideServerRendering(withRoutes(serverRoutes))
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
