import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sucesso',
  templateUrl: './sucesso.component.html',
  styleUrl: './sucesso.component.scss'
})
export class SucessoComponent {
  @Input() message: string = '';
}
