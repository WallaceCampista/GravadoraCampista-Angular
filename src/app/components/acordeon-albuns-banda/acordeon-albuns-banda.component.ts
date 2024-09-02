import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AlbumService } from 'src/app/service/servicos/formularios/album.service';

@Component({
  selector: 'app-acordeon-albuns-banda',
  templateUrl: './acordeon-albuns-banda.component.html',
  styleUrls: ['./acordeon-albuns-banda.component.scss']
})
export class AcordeonAlbunsBandaComponent implements AfterViewInit, OnChanges {
  @Input() albuns: any[] = [];
  albumData: any = {};

  constructor(private albumService: AlbumService) {}

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      const accordions = document.querySelectorAll('.accordion-collapse');
      accordions.forEach(accordion => {
        accordion.addEventListener('transitionend', () => {
          if (accordion.classList.contains('show')) {
            (accordion as HTMLElement).style.maxHeight = 'none';
          }
        });
      });

      const strongElements = document.querySelectorAll('.accordion-button strong');
      strongElements.forEach(strong => {
        strong.addEventListener('click', (event) => {
          event.stopPropagation();
          this.toggleAccordion(event);
        });
      });
    }
  }

  generateValidId(albumName: string): string {
    return albumName.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();
  }

  toggleAccordion(event: Event) {
    const button = (event.target as HTMLElement).closest('.accordion-button') as HTMLElement;
    const targetId = button.getAttribute('data-bs-target');

    if (targetId) {
      const targetElement = document.querySelector(targetId) as HTMLElement;

      if (targetElement) {
        const isCollapsed = targetElement.classList.contains('collapse');
        const allAccordions = document.querySelectorAll('.accordion-collapse');

        allAccordions.forEach(accordion => {
          if (accordion !== targetElement) {
            accordion.classList.remove('show');
            accordion.classList.add('collapse');
            (accordion as HTMLElement).style.maxHeight = '0';
          }
        });

        if (isCollapsed) {
          targetElement.classList.remove('collapse');
          targetElement.classList.add('show');
          targetElement.style.maxHeight = targetElement.scrollHeight + 'px';
          const albumName = button.querySelector('strong')?.textContent;
          if (albumName) {
            this.fetchAlbumData(albumName);
          }
        } else {
          targetElement.style.maxHeight = targetElement.scrollHeight + 'px';
          setTimeout(() => {
            targetElement.classList.remove('show');
            targetElement.classList.add('collapse');
            targetElement.style.maxHeight = '0';
          }, 10);
        }
      }
    }
  }

  fetchAlbumData(albumName: string) {
    this.albumService.getAlbumData(albumName).subscribe(data => {
      this.albumData[albumName] = data.content[0].musicas;
      setTimeout(() => {
        const targetElement = document.querySelector(`#collapse${this.generateValidId(albumName)}`) as HTMLElement;
        if (targetElement) {
          targetElement.style.maxHeight = targetElement.scrollHeight + 'px';
        }
      }, 0);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['albuns']) {
    }
  }
}
