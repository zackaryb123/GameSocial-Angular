import { Routes } from '@angular/router';

import { LoginComponent } from './access/login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './access/register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import {AccessComponent} from './access/access.component';

export const rootRouterConfig: Routes = [
  {path: '', component: AccessComponent},
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  // { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}}
];
