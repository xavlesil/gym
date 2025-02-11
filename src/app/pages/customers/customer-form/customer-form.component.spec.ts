import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  isEditMode = false;
  customerId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Mise à jour du formulaire avec les bons champs
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required], // Correspondance avec le backend
      registrationDate: [new Date().toISOString().split('T')[0]], // Définit la date du jour par défaut
      activeSubscription: [false] // Valeur par défaut
    });
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id')! : null;
    if (this.customerId) {
      this.isEditMode = true;
      this.loadCustomer(this.customerId);
    }
  }

  loadCustomer(id: number): void {
    this.customerService.getCustomer(id).subscribe(
      (customer) => {
        this.customerForm.patchValue(customer); // Remplit le formulaire avec les données du backend
      },
      (error) => {
        console.error('Erreur lors du chargement du client', error);
      }
    );
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const customerData = this.customerForm.value;
      if (this.isEditMode && this.customerId) {
        this.customerService.updateCustomer(this.customerId, customerData).subscribe(
          () => {
            this.router.navigate(['/dashboard/customers']);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du client', error);
          }
        );
      } else {
        this.customerService.addCustomer(customerData).subscribe(
          () => {
            this.router.navigate(['/dashboard/customers']);
          },
          (error) => {
            console.error("Erreur lors de l'ajout du client", error);
          }
        );
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/customers']);
  }
}
