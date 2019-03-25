import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/shared/auth.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

    monthNames = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    form: FormGroup;

    constructor(private fb: FormBuilder, private auth: AuthService, private alertController: AlertController, private router: Router) {
        this.form = fb.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required],
            'confirmPassword': ['', Validators.required],
            'lastName': ['', Validators.required],
            'firstName': ['', Validators.required],
            'email': ['', Validators.compose([Validators.required, Validators.email])],
            'city': ['', Validators.required],
            'postalCode': ['', Validators.required],
            'phone': [''],
            'birth': ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    onSubmit() {
        this.auth.register(this.form.getRawValue()).subscribe(
            data => {
                this.presentAlertConfirm('Compte créer', 'Votre compte a bien été créer');
            },
            error1 => {
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

