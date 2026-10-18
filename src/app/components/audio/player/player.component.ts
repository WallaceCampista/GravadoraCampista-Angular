import { Component } from '@angular/core';
import { PlayerService } from 'src/app/service/servicos/player/player.service';

// Reprodutor fixo no pé da página. Fica fora do <router-outlet>, então não some ao trocar de tela.
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  constructor(public player: PlayerService) {}

  buscar(evento: Event) {
    this.player.buscar(Number((evento.target as HTMLInputElement).value));
  }

  mudarVolume(evento: Event) {
    this.player.definirVolume(Number((evento.target as HTMLInputElement).value));
  }
}
