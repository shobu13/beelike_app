import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/shared/auth.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    constructor(private fb: FormBuilder, private auth: AuthService, private alertController: AlertController, private router: Router) {
        this.form = this.fb.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required],
            'stayConnected': [false],
        });
    }

    ngOnInit() {
    }

    onSubmit() {
        const credentials = this.form.getRawValue();
        this.auth.login(credentials.username, credentials.password).subscribe(
            data => {
                this.auth.registerToken(data['token']).then(() => {
                    console.log('token created');
                    this.presentAlertConfirm('Connexion réussie', 'Vous êtes maintenant connecter en temps que ' + this.auth.user.username);
                });
                // const stayConnected = this.form.controls.stayConnected.value;
                // this.auth.setStayConnected(stayConnected);
            },
            error1 => {
                console.log(error1);
                const errs = [];
                for (const error in error1['error']) {
                    if (error1['error'].hasOwnProperty(error)) {
                        errs.push(error1['error'][error]);
                    }
                }
                this.presentAlertError('Erreurs', errs);
            }
        );
    }


    async presentAlertError(title: string, msgArray: string[]) {
        let msg = '<ul>';

        for (const line of msgArray) {
            msg += '<li>' + line + '</li>';
        }

        msg += '</ul>';

        const alert = await this.alertController.create({
            header: title,
            message: msg,
            buttons: ['OK']
        });

        await alert.present();
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
