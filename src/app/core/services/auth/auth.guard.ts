import {Injectable, NgZone} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth.onAuthStateChanged(auth => {
        console.log('canActivate: onAuthStateChanged: success: ', auth);
        if (auth) {
          resolve(true);
        } else {
          return this.ngZone.run(() => this.router.navigate(['/']));
      }
      }).catch(error => {
        console.log('canActivate: onAuthStateChanged: fail: ', error);
        reject(false);
      });
    });
  }
}
