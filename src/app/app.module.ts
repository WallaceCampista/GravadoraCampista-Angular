import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardModule } from 'primeng/card';
import { LoginComponent } from './components/login/loginbox/login.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { RodapeComponent } from './components/rodape/rodape.component';
import { InicioViewComponent } from './views/inicio-view/inicio-view.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { CardBandaComponent } from './components/home/card-banda/card-banda.component';
import { RouterModule } from '@angular/router';
import { ListaBandaComponent } from './components/banda/lista-banda/lista-banda.component';
import { BandaViewComponent } from './views/banda-view/banda-view.component';
import { CadastroBandaComponent } from './components/banda/cadastro-banda/cadastro-banda.component';
import { AlbumViewComponent } from './views/album-view/album-view.component';
import { MusicaViewComponent } from './views/musica-view/musica-view.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CadastroViewComponent } from './views/cadastro-view/cadastro-view.component';
import { TituloLoginComponent } from './components/login/titulo-login/titulo-login.component';
import { LogotipoComponent } from './components/logotipo/logotipo.component';
import { ListaAlbumComponent } from './components/album/lista-album/lista-album.component';
import { CadastroAlbumComponent } from './components/album/cadastro-album/cadastro-album.component';
import { CadastroMusicaComponent } from './components/musica/cadastro-musica/cadastro-musica.component';
import { ListarMusicaComponent } from './components/musica/listar-musica/listar-musica.component';
import { LixeiraComponent } from './components/acoes/btn-acoes/lixeira/lixeira.component';
import { EditarComponent } from './components/acoes/btn-acoes/editar/editar.component';
import { AvaliarComponent } from './components/acoes/btn-acoes/avaliar/avaliar.component';
import { CardBandaViewComponent } from './views/card-banda-view/card-banda-view.component';
import { AcordeonAlbunsBandaComponent } from './components/acordeon-albuns-banda/acordeon-albuns-banda.component';
import { StarComponent } from './components/star/star.component';
import { PopupAvaliarComponent } from './components/acoes/popup/popup-avaliar/popup-avaliar.component';
import { PopupApagarComponent } from './components/acoes/popup/popup-apagar/popup-apagar.component';
import { PopupEditarComponent } from './components/acoes/popup/popup-editar/popup-editar.component';
import { AvatarGreetingComponent } from './components/avatar-greeting/avatar-greeting.component';
import { UsuarioViewComponent } from './views/usuario-view/usuario-view.component';
import { ListarUsuarioComponent } from './components/usuario/listar-usuario/listar-usuario.component';
import { SucessoComponent } from './components/alertas/sucesso/sucesso.component';
import { ErrorComponent } from './components/alertas/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CabecalhoComponent,
    RodapeComponent,
    InicioViewComponent,
    NavbarComponent,
    LoginViewComponent,
    CardBandaComponent,
    ListaBandaComponent,
    BandaViewComponent,
    CadastroBandaComponent,
    AlbumViewComponent,
    MusicaViewComponent,
    CadastroComponent,
    CadastroViewComponent,
    TituloLoginComponent,
    LogotipoComponent,
    ListaAlbumComponent,
    CadastroAlbumComponent,
    CadastroMusicaComponent,
    ListarMusicaComponent,
    LixeiraComponent,
    EditarComponent,
    AvaliarComponent,
    CardBandaViewComponent,
    AcordeonAlbunsBandaComponent,
    StarComponent,
    PopupAvaliarComponent,
    PopupApagarComponent,
    PopupEditarComponent,
    AvatarGreetingComponent,
    UsuarioViewComponent,
    ListarUsuarioComponent,
    SucessoComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CardModule,
    DividerModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi(), withFetch())
  ],
  exports: [
    CabecalhoComponent,
    RodapeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
