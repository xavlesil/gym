import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { OfferService } from '../../../services/offer.service';
import { SubscriptionService } from '../../../services/subscription.service';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css'],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class SubscriptionFormComponent implements OnInit {
  subscriptionForm: FormGroup;
  customers: any[] = [];
  offers: any[] = [];

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private offerService: OfferService,
    private subscriptionService: SubscriptionService,
    private router: Router
  ) {
    this.subscriptionForm = this.fb.group({
      customerId: ['', Validators.required],
      offerId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
    this.loadOffers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(
      data => this.customers = data,
      error => console.error('Erreur:', error)
    );
  }

  loadOffers(): void {
    this.offerService.getOffers().subscribe(
      data => this.offers = data,
      error => console.error('Erreur:', error)
    );
  }

  onSubmit(): void {
    if (this.subscriptionForm.valid) {
      this.subscriptionService.createSubscription(this.subscriptionForm.value).subscribe(
        () => this.router.navigate(['/dashboard/subscriptions']),
        error => console.error('Erreur:', error)
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/subscriptions']);
  }
}