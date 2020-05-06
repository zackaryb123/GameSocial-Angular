import {Injectable, NgZone} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate, NavigationEnd,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user/user.service';
import {User} from 'firebase';
import {Observable, Subject} from 'rxjs';


@Injectable()
export class AuthResolver implements Resolve<User> {
  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,

  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> {
    return new Promise((resolve, reject) => {
      this.afAuth.onAuthStateChanged(auth => {
        console.log('resolve: onAuthStateChanged: success:  ', auth);
        if (auth) {
          return this.ngZone.run(() => this.router.navigate(['/home']));
        }
        resolve(auth);
      }).catch(error => {
        console.log('resolve: onAuthStateChanged: fail: ', error);
        reject(error);
      });
    });
  }
}
