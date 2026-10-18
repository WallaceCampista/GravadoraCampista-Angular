import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TipoAvaliacao } from '../../popup/popup-avaliar/popup-avaliar.component';

@Component({
  selector: 'app-avaliar',
  templateUrl: './avaliar.component.html',
  styleUrls: ['./avaliar.component.scss']
})
export class AvaliarComponent {
  @Input() id!: number;
  @Input() tipo: TipoAvaliacao = 'banda';
  @Output() avaliado = new EventEmitter<void>();
}
