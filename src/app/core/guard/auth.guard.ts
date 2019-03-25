import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {CookieService} from 'angular2-cookie/core';
import {AuthService} from '../shared/auth.service';
import {HttpClient} from '@angular/common/http';
import {conf} from '../../../assets/config';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private cookieService: CookieService, private auth: AuthService, private http: HttpClient) {
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const token = this.cookieService.get('token');
        const stayConnectToken = this.cookieService.get('stayConnectedToken');
        console.log(stayConnectToken);

        if (stayConnectToken) {

            this.http.post(conf.api_url + '/user/stay-connect/', {
                'username': this.cookieService.get('stayConnectedUser'),
                'password': stayConnectToken
            }).subscribe(
                data => {
                    this.auth.registerToken(data['token']);
                    return true;
                },
                error1 => {
                    console.log(error1);
                }
            );
        } else if (token) {
            this.auth.refresh(token).subscribe(
                data => {
                    this.auth.registerToken(data['token']);
                    return true;
                },
                error1 => {
                    console.log(error1);
                    this.auth.logout();
                }
            );
        }
    }
// TODO FAIRE UN VRAIS TRUC PUTAIN
}
