import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../shared/auth.service';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {and} from '@angular/router/src/utils/collection';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private storage: Storage, private auth: AuthService, private http: HttpClient) {
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.storage.get('token').then((token) => {
            if (token) {
                if (this.auth.token_expires === undefined) {
                    this.auth.registerToken(token).then();
                }
                const now = new Date();
                if (new Date(this.auth.token_expires.getTime() - now.getTime()).getMinutes() <= 5) {
                    return this.auth.refresh(token).toPromise().then(data => {
                            return this.auth.registerToken(data['token']).then(() => {
                                return true;
                            });
                        },
                        error1 => {
                            if (this.auth.isAuth) {
                                return this.auth.logout().then(() => {
                                    return true;
                                });
                            }
                        });
                } else if (this.auth.token_expires.getTime() < now.getTime()) {
                    if (this.auth.isAuth) {
                        return this.auth.logout().then(() => {
                            return true;
                        });
                    }
                } else {
                    return true;
                }
            } else {
                return true;
            }
        });
    }


// TODO FAIRE UN VRAIS TRUC PUTAIN
}
