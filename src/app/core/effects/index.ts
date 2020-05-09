import { EffectsModule } from '@ngrx/effects';
import { PlaylistEffects } from './playlist.effects';

export const AppEffectsModules = EffectsModule.forRoot([
  PlaylistEffects
]);
