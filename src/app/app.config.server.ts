import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideMaterialServer } from '@angular/material/server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    provideNoopAnimations(),
    provideMaterialServer()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
