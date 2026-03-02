import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserListComponent {
  // Lista original
  listaPersonas = [
    { nombre: 'Diego' },
    { nombre: 'Juan' },
    { nombre: 'Ana' }
  ];

  filtro: string = '';

  // Función para eliminar
  eliminarPersona(nombre: string) {
    this.listaPersonas = this.listaPersonas.filter(p => p.nombre !== nombre);
  }

  // Getter para obtener la lista filtrada dinámicamente
  get usuariosFiltrados() {
    return this.listaPersonas.filter(persona =>
      persona.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}