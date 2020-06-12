import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { env } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgxTypeaheadModule} from 'ngx-typeahead';
import {AppStoreModule} from './core/store';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {SHARED_DIRECTIVES} from './shared/directives';
import {CORE_COMPONENTS} from './core/components';
import {SHARED_PIPES} from './shared/pipes';
import {SERVICES} from './core/services';
import {SHARED_COMPONENTS} from './shared/components';
import {AppEffectsModules} from './core/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CdkTableModule} from '@angular/cdk/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {AngularFireMessagingModule} from "@angular/fire/messaging";


@NgModule({
  declarations: [
    AppComponent,
    ...SHARED_PIPES,
    ...SHARED_DIRECTIVES,
    ...SHARED_COMPONENTS,
    ...CORE_COMPONENTS,
  ],
  imports: [
    AppStoreModule,
    BrowserModule,
    ReactiveFormsModule,
    AppEffectsModules,
    NgbModule,
    RouterModule.forRoot(rootRouterConfig, {
      useHash: true,
      // onSameUrlNavigation: 'reload'
    }),
    AngularFireModule.initializeApp(env.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireMessagingModule,
    BrowserAnimationsModule,
    ScrollingModule,
    InfiniteScrollModule,
    NgxTypeaheadModule,
    StoreRouterConnectingModule.forRoot({}),
    CdkTableModule,
    DragDropModule
    // ServiceWorkerModule.register('/ngsw-worker.js', {
    //   enabled: env.production
    // })
  ],
  exports: [RouterModule],
  providers: [
    ErrorHandler,
    ...SERVICES,
    // {
      // provide: HTTP_INTERCEPTORS,
      // useClass: [AppHttpInterceptor, AppErrorHandler],
      // multi: true,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
