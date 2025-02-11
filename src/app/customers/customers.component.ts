import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService, Customer } from '../customer.service';

@Component({
  selector: 'app-customers',
  standalone: true, // Composant standalone
  imports: [CommonModule], // Pour utiliser *ngFor et *ngIf
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = []; // Tableau pour stocker les clients

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  // Fonction pour récupérer les clients depuis l'API
  fetchCustomers(): void {
    this.customerService.getCustomers().subscribe(
      (data) => (this.customers = data),
      (error) => console.error('Erreur lors du chargement des clients:', error)
    );
  }
}
