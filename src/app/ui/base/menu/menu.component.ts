import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertController, MenuController} from '@ionic/angular';
import {AuthService} from '../../../core/shared/auth.service';
import {Router} from '@angular/router';
import {User} from '../../../core/models/user.model';
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

    public isAuth = false;
    public user?: User;

    constructor(public menu: MenuController, private auth: AuthService, private router: Router, private alertController: AlertController) {
    }

    ngOnInit() {
        this.auth.isAuthSubject.subscribe(
            value => {
                if (value) {
                    this.user = this.auth.user;
                }
                this.isAuth = value;
            }
        );
    }

    onDecoClick() {
        this.menu.close();
        this.auth.logout().then(() => this.presentAlertConfirm('Déconnexion', 'Déconnexion effectuée avec succès.'));

    }

    async presentAlertConfirm(title: string, msg: string) {
        const alert = await this.alertController.create({
            header: title,
            message: msg,
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        this.router.navigate(['/home']);
                    }
                }
            ]
        });

        await alert.present();
    }

}
