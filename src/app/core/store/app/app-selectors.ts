// import {createSelector, State} from '@ngrx/store';
// import {IAppStore} from './app-reducer';
// import {GameSocialState} from '../reducers';
// import {createFeatureSelector} from "@ngrx/store";
//
// export const getAppReducer = (state: GameSocialState) => state.appStore;
// console.log('getAppStore: ', getAppReducer);
//
// export const appStoreState = createFeatureSelector<GameSocialState, IAppStore>(
//   'appStore' // feature root
// );
//
// export const getSidebarCollapsed = createSelector(
//   appStoreState,
//   (appStore: IAppStore) => {
//     console.log('getSidebarCollapsed: state: ', appStore);
//     return !appStore.sidebarExpanded;
//   }
// );
//
