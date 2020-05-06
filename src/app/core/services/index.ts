import {AuthGuard, AuthResolver, AuthService} from './auth';
import {UserGuard, UserService} from './user';

export const SERVICES = [
  AuthGuard,
  AuthResolver,
  AuthService,
  UserGuard,
  UserService
];
