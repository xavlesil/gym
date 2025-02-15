import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../../services/user.service'; // 🔥 Import de l'interface User
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [
    CommonModule,
    // other imports
  ]
})
export class UserListComponent implements OnInit {
  users: User[] = []; // Utilisation de User[] au lieu de any[]

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // ✅ Charger les utilisateurs
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log('Données récupérées:', data);
        this.users = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
        console.error("Erreur lors du chargement des utilisateurs", err);
        alert("Erreur lors du chargement des utilisateurs !");
      }
    });
  }

  // ✅ Supprimer un utilisateur avec confirmation
  deleteUser(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          alert("Utilisateur supprimé !");
          this.loadUsers(); // Recharge la liste après suppression
        },
        error: (err) => {
          console.error("Erreur lors de la suppression", err);
          alert("Échec de la suppression de l'utilisateur !");
        }
      });
    }
  }

  // ✅ Navigation vers l'ajout d'un utilisateur
  navigateToAddUser(): void {
    this.router.navigate(['/dashboard/add-user']);
  }

  // ✅ Navigation vers la modification d'un utilisateur
  navigateToEditUser(id: number): void {
    this.router.navigate(['/dashboard/edit-user', id]);
  }
}
