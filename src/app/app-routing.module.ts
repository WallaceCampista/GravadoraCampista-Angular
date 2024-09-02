import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioViewComponent } from './views/inicio-view/inicio-view.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { BandaViewComponent } from './views/banda-view/banda-view.component';
import { AlbumViewComponent } from './views/album-view/album-view.component';
import { MusicaViewComponent } from './views/musica-view/musica-view.component';
import { CadastroViewComponent } from './views/cadastro-view/cadastro-view.component';
import { CardBandaViewComponent } from './views/card-banda-view/card-banda-view.component';
import { UsuarioViewComponent } from './views/usuario-view/usuario-view.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginViewComponent },
  { path: 'cadastro', component: CadastroViewComponent },
  { path: 'home', component: InicioViewComponent, canActivate: [AuthGuard] },
  { path: 'banda', component: BandaViewComponent, canActivate: [AuthGuard] },
  { path: 'album', component: AlbumViewComponent, canActivate: [AuthGuard] },
  { path: 'musica', component: MusicaViewComponent, canActivate: [AuthGuard] },
  { path: 'pagebanda', component: CardBandaViewComponent, canActivate: [AuthGuard] },
  { path: 'usuario', component: UsuarioViewComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
