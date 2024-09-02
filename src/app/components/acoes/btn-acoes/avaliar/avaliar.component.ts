import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avaliar',
  templateUrl: './avaliar.component.html',
  styleUrls: ['./avaliar.component.scss']
})
export class AvaliarComponent {
  @Input() bandId!: number;
}
