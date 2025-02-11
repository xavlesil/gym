import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../../services/subscription.service';
import { CustomerService } from '../../../services/customer.service';
import { OfferService } from '../../../services/offer.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css'],
  providers: [DatePipe],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SubscriptionListComponent implements OnInit {
  subscriptions: any[] = [];
  customers: any[] = [];
  offers: any[] = [];

  constructor(
    private subscriptionService: SubscriptionService,
    private customerService: CustomerService,
    private offerService: OfferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSubscriptions();
    this.loadCustomers();
    this.loadOffers();
  }

  loadSubscriptions(): void {
    this.subscriptionService.getSubscriptions().subscribe(
      data => this.subscriptions = data,
      error => console.error('Erreur:', error)
    );
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(
      data => this.customers = data
    );
  }

  loadOffers(): void {
    this.offerService.getOffers().subscribe(
      data => this.offers = data
    );
  }

  getCustomerName(customerId: number): string {
    const customer = this.customers.find(c => c.id === customerId);
    return customer ? `${customer.firstName} ${customer.lastName}` : 'Inconnu';
  }

  getOfferName(offerId: number): string {
    const offer = this.offers.find(o => o.id === offerId);
    return offer ? offer.name : 'Offre supprimée';
  }

  onAdd(): void {
    this.router.navigate(['/dashboard/subscriptions/add']);
  }

  onCancel(id: number): void {
    if (confirm('Résilier cet abonnement ?')) {
      this.subscriptionService.cancelSubscription(id).subscribe(
        () => this.loadSubscriptions(),
        error => console.error('Erreur:', error)
      );
    }
  }
}