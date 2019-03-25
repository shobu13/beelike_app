import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BaseModule} from './ui/base/base.module';
import {AuthService} from './core/shared/auth.service';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {CookieService} from 'angular2-cookie/core';

registerLocaleData(localeFr, 'fr');

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        BaseModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: LOCALE_ID, useValue: 'fr'},
        CookieService,
        AuthService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
