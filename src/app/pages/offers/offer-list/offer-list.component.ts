import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfferService } from '../../../services/offer.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class OfferListComponent implements OnInit {
  offers: any[] = [];
  filteredOffers: any[] = [];
  searchQuery: string = '';

  constructor(
    private offerService: OfferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.offerService.getOffers().subscribe(
      (data) => {
        this.offers = data;
        this.filteredOffers = data;
      },
      (error) => console.error('Erreur:', error)
    );
  }
  onSearch(): void {
    this.filteredOffers = this.offers.filter(offer =>
      offer.offerName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  

  onAdd(): void {
    this.router.navigate(['/dashboard/offers/add']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/dashboard/offers/edit', id]);
  }

  onDelete(id: number): void {
    if (confirm('Supprimer cette offre ?')) {
      this.offerService.deleteOffer(id).subscribe(
        () => this.loadOffers(),
        (error) => console.error('Erreur:', error)
      );
    }
  }
}