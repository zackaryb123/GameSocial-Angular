import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';
import { FirebaseUserModel } from '../../models/user.model';
import {AuthService} from "../auth";

@Injectable()
export class UserGuard implements Resolve<FirebaseUserModel> {

  constructor(public authService: AuthService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Promise<FirebaseUserModel> {

    const user = new FirebaseUserModel();

    return new Promise((resolve, reject) => {
      this.authService.onAuthStateChanged()
      .then(res => {
        if (res.providerData[0].providerId === 'password') {
          user.image = 'https://via.placeholder.com/400x300';
          user.name = res.displayName;
          user.provider = res.providerData[0].providerId;
          return resolve(user);
        } else {
          user.image = res.photoURL;
          user.name = res.displayName;
          user.provider = res.providerData[0].providerId;
          return resolve(user);
        }
      }, err => {
        console.log('UserGuard: fail: ', err);
        this.router.navigate(['/']);
        return reject(err);
      });
    });
  }
}
