import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { ToastService } from '../../../services/toast.service';
import { ConfirmationModalComponent } from '../../../components/confirmation-modal/confirmation-modal.component';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { EmptyStateComponent } from '../../../shared/empty-state/empty-state.component';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, ConfirmationModalComponent, LoaderComponent, EmptyStateComponent],
  templateUrl: './manage-users.component.html'
})
export class ManageUsersComponent implements OnInit {
  users = signal<User[]>([]);
  loading = signal(true);
  deleteTarget = signal<User | null>(null);

  constructor(private userService: UserService, private toast: ToastService) { }

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    this.userService.getAllUsers().subscribe({
      next: u => { this.users.set(u); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  deleteUser(): void {
    const u = this.deleteTarget();
    if (!u) return;
    this.userService.deleteUser(u.id).subscribe({
      next: () => { this.toast.success('User deleted'); this.deleteTarget.set(null); this.load(); },
      error: () => { this.toast.error('Failed to delete user'); this.deleteTarget.set(null); }
    });
  }
}
