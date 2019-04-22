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
import {IonicStorageModule} from '@ionic/storage';
import {CoreModule} from './core/core.module';

registerLocaleData(localeFr, 'fr');

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        BaseModule,
        CoreModule,
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
