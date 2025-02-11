// src/app/components/customer/customer-list/customer-list.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  imports: [ReactiveFormsModule, CommonModule,FormsModule]
})
export class CustomerListComponent implements OnInit {
  customers: any[] = [];
  filteredCustomers: any[] = [];
  searchQuery: string = '';

  constructor(
    @Inject(CustomerService) private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(
      (data) => {
        this.customers = data;
        this.filteredCustomers = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des clients', error);
      }
    );
  }

  onSearch(): void {
    this.filteredCustomers = this.customers.filter(customer =>
      customer.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onAdd(): void {
    this.router.navigate(['/dashboard/customers/add']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/dashboard/customers/edit', id]);
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      this.customerService.deleteCustomer(id).subscribe(
        () => {
          this.loadCustomers(); // Recharge la liste après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression du client', error);
        }
      );
    }
  }
}
