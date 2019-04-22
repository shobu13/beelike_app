import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {conf} from '../../../assets/config';
import {Subject} from 'rxjs';
import {DatePipe} from '@angular/common';
import {User} from '../models/user.model';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _isAuth = false;
    private _isAuthSubject = new Subject<boolean>();
    private _token?: string;
    private _token_expires?: Date;
    private _user: User;

    get isAuth(): boolean {
        return this._isAuth;
    }

    get isAuthSubject(): Subject<boolean> {
        return this._isAuthSubject;
    }

    get token(): string {
        return this._token;
    }

    get token_expires(): Date {
        return this._token_expires;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

    constructor(private http: HttpClient, private storage: Storage) {
    }

    login(user: string, password: string) {
        const data = {
            'username': user,
            'password': password,
        };
        console.log(conf.api_url + '/api-token-auth/');
        return this.http.post(conf.api_url + '/api-token-auth/', data);
    }

    logout() {
        this._user = undefined;
        this._token = undefined;
        this._token_expires = undefined;
        this._isAuth = false;
        this._isAuthSubject.next(this._isAuth);
        return this.storage.clear();
    }

    refresh(token) {
        return this.http.post(conf.api_url + '/api-token-refresh/', {'token': token});
    }

    register(user: any) {

        const datePipe = new DatePipe('fr');
        const data = {
            username: user.username,
            password: user.password,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            postal_code: user.postalCode,
            city: user.city,
            phone_number: user.phone,
            birth_date: datePipe.transform(user.birth, 'yyyy-MM-dd')
        };
        return this.http.post(conf.api_url + '/user/', data);
    }

    registerToken(token: string) {
        this._isAuth = true;
        this._token = token;
        this.updateData();
        this.isAuthSubject.next(this._isAuth);
        return this.storage.set('token', token);
    }

    private updateData() {
        const token_parts = this.token.split(/\./);
        const token_decoded = JSON.parse(window.atob(token_parts[1]));
        this._token_expires = new Date(token_decoded.exp * 1000);
        this._user = new User({id: token_decoded.user_id, username: token_decoded.username});
    }
}
