import { Component, Input, OnChanges } from '@angular/core';
import { urlMidia } from 'src/app/utils/midia';

// Foto da banda ou capa do álbum. Sem imagem (ou se ela não carregar), mostra um quadro
// colorido com as iniciais; a cor sai do nome, então cada banda/álbum tem sempre a mesma.
// O tamanho vem de quem usa o componente (width/height/aspect-ratio na tag <app-capa>).
@Component({
  selector: 'app-capa',
  templateUrl: './capa.component.html',
  styleUrls: ['./capa.component.scss']
})
export class CapaComponent implements OnChanges {
  @Input() arquivo: string | null | undefined = null;
  @Input() nome: string = '';
  // Endereço já pronto (ex.: prévia de um arquivo escolhido); tem prioridade sobre "arquivo"
  @Input() src: string | null = null;
  falhou = false;

  ngOnChanges(): void {
    this.falhou = false;
  }

  get url(): string | null {
    return this.falhou ? null : (this.src ?? urlMidia(this.arquivo));
  }

  get iniciais(): string {
    return this.nome
      .split(/\s+/)
      .filter(palavra => palavra.length > 0)
      .slice(0, 2)
      .map(palavra => palavra[0].toUpperCase())
      .join('');
  }

  get fundo(): string {
    let hash = 0;
    for (const letra of this.nome) {
      hash = (hash * 31 + letra.charCodeAt(0)) % 360;
    }
    return `linear-gradient(135deg, hsl(${hash}, 55%, 35%), hsl(${(hash + 50) % 360}, 65%, 55%))`;
  }
}
