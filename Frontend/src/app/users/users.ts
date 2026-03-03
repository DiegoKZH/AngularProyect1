import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from '../components/user-list/user-list';
import { JsonPlaceholderService } from '../services/jsonplaceholder.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, UserListComponent],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  loading = false;
  error: string | null = null;

  // create form
  newName = '';
  newEmail = '';
  newRole = '';
  newPassword = '';

  // edit state (password editing disabled)
  editingUser: any | null = null;
  editModel: { id?: number; name: string; email: string; role?: string } = { name: '', email: '', role: '' };

  constructor(private router: Router, private api: JsonPlaceholderService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.error = null;
    this.api.getUsers().subscribe({
      next: (res) => {
        // map response to expected shape
        this.users = res.map((u: any) => ({ nombre: u.name, raw: u }));
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Error cargando usuarios';
        this.loading = false;
      },
    });
  }

  onSelected(name: string) {
    this.router.navigate(['/users', name]);
  }

  onDeleted(personaOrName: any) {
    // personaOrName may be a string (legacy) or the persona object emitted by the list
    if (typeof personaOrName === 'string') {
      this.users = this.users.filter((u) => u.nombre !== personaOrName);
      return;
    }

    const persona = personaOrName;
    const raw = persona?.raw || persona;
    const id = raw?.id;

    if (id) {
      this.api.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter((u) => !(u.raw && u.raw.id === id) && u.nombre !== persona.nombre);
        },
        error: (err) => {
          this.error = err?.message || 'Error eliminando usuario';
        },
      });
    } else {
      // fallback: remove by name only
      this.users = this.users.filter((u) => u.nombre !== persona.nombre);
    }
  }

  create() {
    // basic client-side guard
    if (!this.newName.trim() || !this.newEmail.trim()) return;
    const payload = { name: this.newName, email: this.newEmail, role: this.newRole };
    if (this.newPassword && this.newPassword.trim()) {
      (payload as any).password = this.newPassword;
    }
    this.api.createUser(payload).subscribe({
      next: (res) => {
        // jsonplaceholder returns the created resource with an id
        this.users.unshift({ nombre: res.name || this.newName, raw: res });
        this.newName = '';
        this.newEmail = '';
        this.newRole = '';
        this.newPassword = '';
      },
      error: (err) => {
        this.error = err?.message || 'Error creando usuario';
      },
    });
  }

  startEdit(persona: any) {
    // persona may include .raw with id and other fields
    const raw = persona?.raw || persona;
    this.editingUser = raw;
    this.editModel = {
      id: raw?.id,
      name: raw?.name || persona?.nombre || '',
      email: raw?.email || '',
      // copy role if exists
      ...(raw?.role ? { role: raw.role } : {}),
    };
  }

  saveEdit() {
    if (!this.editModel.name.trim() || !this.editModel.email.trim()) return;
    if (!this.editModel.id) {
      this.error = 'No se puede editar: id no disponible.';
      return;
    }
    const payload: any = { name: this.editModel.name, email: this.editModel.email };
    if ((this.editModel as any).role !== undefined) {
      payload.role = (this.editModel as any).role;
    }
    this.api.updateUser(this.editModel.id, payload).subscribe({
      next: (res) => {
        // update local array
        const idx = this.users.findIndex(u => u.raw && u.raw.id === res.id);
        if (idx !== -1) {
          this.users[idx] = { nombre: res.name, raw: res };
        }
        this.editingUser = null;
        this.editModel = { name: '', email: '', role: '' };
      },
      error: (err) => {
        this.error = err?.message || 'Error actualizando usuario';
      }
    });
  }

  cancelEdit() {
    this.editingUser = null;
    this.editModel = { name: '', email: '', role: '' };
  }
}
