import { NgModule } from '@angular/core';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import {env} from '../../../environments/environment';
import {GameSocialActions, GameSocialReducers} from './reducers';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: Object.keys(GameSocialReducers),
    rehydrate: true
  })(reducer);
}
const metaReducers: MetaReducer<any, any>[] = [localStorageSyncReducer];
const optionalImports = [];
if (!env.production) {
  optionalImports.push(StoreDevtoolsModule.instrument({ maxAge: 25 }));
}

@NgModule({
  imports: [
    StoreModule.forRoot(GameSocialReducers, { metaReducers }),
    ...optionalImports
  ],
  declarations: [],
  exports: [],
  providers: [
    ...GameSocialActions
  ]
})
export class AppStoreModule {}
