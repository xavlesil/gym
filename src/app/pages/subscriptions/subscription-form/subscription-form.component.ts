import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { OfferService } from '../../../services/offer.service';
import { SubscriptionService } from '../../../services/subscription.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-subscription-form',
  standalone: true,
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SubscriptionFormComponent implements OnInit {
  subscriptionForm: FormGroup;
  customers: any[] = [];
  offers: any[] = [];
  selectedOffer: any | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private offerService: OfferService,
    @Inject(SubscriptionService) private subscriptionService: SubscriptionService,
    private router: Router
  ) {
    this.subscriptionForm = this.fb.group({
      customerId: ['', Validators.required],
      packId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
    this.loadOffers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => this.customers = data,
      error: (error) => {
        console.error('Erreur clients:', error);
        this.errorMessage = 'Impossible de charger les clients';
      }
    });
  }

  loadOffers(): void {
    this.offerService.getOffers().subscribe({
      next: (data) => this.offers = data,
      error: (error) => {
        console.error('Erreur offres:', error);
        this.errorMessage = 'Impossible de charger les offres';
      }
    });
  }

  onOfferChange(): void {
    const offerId = this.subscriptionForm.get('packId')?.value;
    this.selectedOffer = this.offers.find(offer => offer.id === offerId);

    if (this.selectedOffer?.durationMonths) {
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + this.selectedOffer.durationMonths);

      this.subscriptionForm.patchValue({
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      });
    }
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.subscriptionForm.valid) {
      const formData = {
        customer: { id: this.subscriptionForm.value.customerId },
        pack: { id: this.subscriptionForm.value.packId },
        startDate: this.subscriptionForm.value.startDate,
        endDate: this.subscriptionForm.value.endDate
      };

      this.subscriptionService.createSubscription(formData).subscribe({
        next: (response) => {
          this.successMessage = 'Abonnement créé avec succès!';
          setTimeout(() => this.router.navigate(['/dashboard/subscriptions']), 1500);
        },
        error: (error) => {
          console.error('Erreur création:', error);
          this.errorMessage = error.error?.message || 'Erreur lors de la création';
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/subscriptions']);
  }
}

// Removed custom Inject function
