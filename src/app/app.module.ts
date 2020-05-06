import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { env } from '../environments/environment';
import { LoginComponent } from './pages/access/login/login.component';
import { UserComponent } from './core/components/user/user.component';
import { RegisterComponent } from './pages/access/register/register.component';
import { UserGuard } from './core/services/user.guard';
import { AuthGuard } from './core/services/auth/auth.guard';
import { AuthService } from './core/services/auth/auth.service';
import { UserService } from './core/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BannerComponent } from './pages/access/banner/banner.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AccessPage } from './pages/access/access.page';
import { DiscoverPage } from './pages/discover/discover.page';
import { HomePage } from './pages/home/home.page';
import { ProfilePage } from './pages/profile/profile.page';
import { AuthResolver } from './core/services/auth/auth.resolver';
import { ScrollComponent } from './core/components/scroll/scroll.component';
import { MultiScrollComponent } from './core/components/multi-scroll/multi-scroll.component';
import {AppSidebarComponent,
  // AppSidebarProxy
} from './core/components/app-sidebar/app-sidebar.component';
import {AppBrandComponent} from './core/components/app-brand/app-brand.component';
import {AppNavigatorComponent} from './core/components/app-navigator/app-navigator.component';
import {IconComponent} from './shared/directives/icon';
import {SearchPipe} from './shared/pipes/search.pipe';
import {AppSearchComponent} from './core/components/app-search/app-search.component';
import {PlayerSearchComponent} from './core/components/app-search/player-search/player-search.component';
import {SearchNavigatorComponent} from './core/components/app-search/search-navigator/search-navigator.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {AppNavbarComponent} from './core/components/app-navbar/app-navbar.component';
import {AppNavbarUserComponent} from './core/components/app-navbar/app-navbar-user/app-navbar-user.component';
import {AppNavbarMenuComponent} from './core/components/app-navbar/app-navbar-menu/app-navbar-menu.component';
import {NgxTypeaheadModule} from 'ngx-typeahead';
// import {TooltipDirective} from './shared/directives/tooltip';
import {ButtonGroupComponent} from './core/components/common/button-group/button-group.component';
import {AppStoreModule} from './core/store';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {APP_APIS} from './core/dispatcher';
import {CORE_DIRECTIVES} from './shared/directives';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {localStorageSync} from 'ngrx-store-localstorage';
import {GameSocialActions, GameSocialReducers} from './core/store/reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
// import { ServiceWorkerModule } from '@angular/service-worker';
// import {NowPlayingComponent} from './core/components/now-playing/now-playing.component';
// import {NowPlaylistFilterComponent} from './core/components/now-playing/now-playlist-filter/now-playlist-filter.component';
// import {NowPlaylistTrackComponent} from './core/components/now-playing/now-playlist/now-playlist-track.component';
// import {NowPlaylistComponent} from './core/components/now-playing/now-playlist/now-playlist.component';
// import {StoreModule} from "@ngrx/store";

// export function localStorageSyncReducer(
//   reducer: ActionReducer<any>
// ): ActionReducer<any> {
//   return localStorageSync({
//     keys: Object.keys(GameSocialReducers),
//     rehydrate: true
//   })(reducer);
// }
// const metaReducers: MetaReducer<any, any>[] = [localStorageSyncReducer];
// const optionalImports = [];
// if (!env.production) {
//   optionalImports.push(StoreDevtoolsModule.instrument({ maxAge: 25 }));
// }


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    AccessPage,
    BannerComponent,
    DiscoverPage,
    HomePage,
    ProfilePage,
    ScrollComponent,
    MultiScrollComponent,
    AppSidebarComponent,
    AppBrandComponent,
    AppNavigatorComponent,
    // IconComponent,
    // NowPlayingComponent,
    // NowPlaylistComponent,
    // NowPlaylistFilterComponent,
    // NowPlaylistTrackComponent,
    SearchPipe,
    AppSearchComponent,
    PlayerSearchComponent,
    SearchNavigatorComponent,
    AppNavbarComponent,
    AppNavbarUserComponent,
    AppNavbarMenuComponent,
    ButtonGroupComponent,
    ...CORE_DIRECTIVES,
    // TooltipDirective
  ],
  imports: [
    AppStoreModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, {
      useHash: true,
      onSameUrlNavigation: 'reload'
    }),
    AngularFireModule.initializeApp(env.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    BrowserAnimationsModule,
    ScrollingModule,
    InfiniteScrollModule,
    NgxTypeaheadModule,
    StoreRouterConnectingModule.forRoot(),
    // ServiceWorkerModule.register('/ngsw-worker.js', {
    //   enabled: env.production
    // })
  ],
  exports: [RouterModule],
  providers: [
    SearchPipe,
    ErrorHandler,
    AuthService,
    UserService,
    UserGuard,
    AuthGuard,
    AuthResolver,
    // AppSidebarProxy,
    ...APP_APIS,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
