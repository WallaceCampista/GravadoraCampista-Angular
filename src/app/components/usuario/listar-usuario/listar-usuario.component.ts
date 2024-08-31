import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/servicos/usuario/auth.service';

interface Usuario {
  id: number;
  nome: string;
  sobrenome: string;
  username: string;
  email: string;
  isAdmin: boolean;
  criadoEm?: Date;
  ultimoLogin?: Date | string;
}

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.scss']
})
export class ListarUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];

  isAscending = true;
  currentSortColumn: keyof Usuario = 'id'; // Inicializar com um valor válido

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe({
      next: response => {
        this.usuarios = response.map((user: any) => ({
          id: user.usuarioId,
          nome: user.nome,
          sobrenome: user.sobrenome,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          criadoEm: new Date(user.criadoEm),
          ultimoLogin: user.ultimoLogin ? new Date(user.ultimoLogin) : " - "
        }));
      },
      error: error => {
        console.error('Erro ao buscar usuários:', error);
      }
    });
  }

  sortColumn(column: keyof Usuario) {
    if (this.currentSortColumn === column) {
      this.isAscending = !this.isAscending;
    } else {
      this.currentSortColumn = column;
      this.isAscending = true;
    }

    this.usuarios.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue === undefined || bValue === undefined) {
        return 0;
      }

      if (aValue < bValue) {
        return this.isAscending ? -1 : 1;
      } else if (aValue > bValue) {
        return this.isAscending ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  formatIsAdministrator(isAdmin: boolean): string {
    return isAdmin ? 'Sim' : 'Não';
  }

  formatDate(date?: Date | string): string {
    if (!date || date === " - ") return " - ";
    if (typeof date === 'string') {
      date = new Date(date);
    }
    const day = (date.getUTCDate()).toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }
}
