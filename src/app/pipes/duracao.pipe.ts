import { Pipe, PipeTransform } from '@angular/core';

// A API guarda a duração em segundos; mostra como nos players: "4:05", ou "1:02:10" a partir de uma hora
@Pipe({ name: 'duracao' })
export class DuracaoPipe implements PipeTransform {
  transform(segundos: number | null | undefined): string {
    if (segundos === null || segundos === undefined || isNaN(segundos)) {
      return '';
    }
    const total = Math.round(segundos);
    const horas = Math.floor(total / 3600);
    const minutos = Math.floor((total % 3600) / 60);
    const resto = String(total % 60).padStart(2, '0');
    return horas > 0 ? `${horas}:${String(minutos).padStart(2, '0')}:${resto}` : `${minutos}:${resto}`;
  }
}
