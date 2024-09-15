import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';


import { routes } from './app.routes';
import { postReducer } from './state/post.reducers';
import { PostEffects } from './state/post.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore({ posts: postReducer }),
    provideEffects(PostEffects),
   
  ]
};
