import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InicioViewComponent} from "./views/inicio-view/inicio-view.component";
import {LoginViewComponent} from "./views/login-view/login-view.component";
import {BandaViewComponent} from "./views/banda-view/banda-view.component";
import {AlbumViewComponent} from "./views/album-view/album-view.component";
import {MusicaViewComponent} from "./views/musica-view/musica-view.component";
import {CadastroViewComponent} from "./views/cadastro-view/cadastro-view.component";
import {CardBandaViewComponent} from "./views/card-banda-view/card-banda-view.component";
import { UsuarioViewComponent } from "./views/usuario-view/usuario-view.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: InicioViewComponent },
  { path: 'login', component: LoginViewComponent },
  { path: 'banda', component: BandaViewComponent },
  { path: 'album', component: AlbumViewComponent },
  { path: 'musica', component: MusicaViewComponent },
  { path: 'cadastro', component: CadastroViewComponent },
  { path: 'pagebanda', component: CardBandaViewComponent },
  { path: 'usuario', component: UsuarioViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
