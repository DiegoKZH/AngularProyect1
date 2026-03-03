import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserListComponent implements OnInit, OnChanges {
  @Input() users?: any[];
  @Output() selected = new EventEmitter<string>();
  @Output() deleted = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();

  listaPersonas: any[] = [
    { nombre: 'Diego' },
    { nombre: 'Juan' },
    { nombre: 'Ana' }
  ];

  filtro: string = '';

  ngOnInit(): void {
    if (this.users && this.users.length) {
      this.listaPersonas = [...this.users];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users'] && this.users && this.users.length) {
      // ensure we copy the array so local filtering doesn't mutate parent data
      this.listaPersonas = this.users.map(u => ({ ...u }));
    }
  }

  eliminarPersona(persona: any) {
    this.listaPersonas = this.listaPersonas.filter(p => p.nombre !== persona.nombre);
    this.deleted.emit(persona);
  }

  seleccionarPersona(nombre: string) {
    this.selected.emit(nombre);
  }

  editarPersona(persona: any) {
    // emitimos el objeto (puede contener .raw con id)
    this.edit.emit(persona);
  }

  get usuariosFiltrados() {
    return this.listaPersonas.filter(persona =>
      persona.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}