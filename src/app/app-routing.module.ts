import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/guard/auth.guard';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard]},
    {path: 'profil', loadChildren: './pages/profil/profil.module#ProfilPageModule', canActivate: [AuthGuard]},
    {path: 'auth', loadChildren: './pages/auth/auth.module#AuthPageModule', canActivate: [AuthGuard]},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
