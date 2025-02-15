import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '../../../services/offer.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
})
export class OfferFormComponent implements OnInit {
  offerForm: FormGroup;
  isEditMode = false;
  offerId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private offerService: OfferService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.offerForm = this.fb.group({
      offerName: ['', Validators.required],
      durationMonths: ['', [Validators.required, Validators.min(1)]],
      monthlyPrice: ['', [Validators.required, Validators.min(0)]]
    });
    
  }

  ngOnInit(): void {
    this.offerId = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id')! : null;
    if (this.offerId) {
      this.isEditMode = true;
      this.loadOffer(this.offerId);
    }
  }

  loadOffer(id: number): void {
    this.offerService.getOffer(id).subscribe(
      (offer) => this.offerForm.patchValue(offer),
      (error) => console.error('Erreur:', error)
    );
  }
  onSubmit(): void {
    console.log("onSubmit appelé", this.offerForm.value);
    if (this.offerForm.valid) {
      const offerData = this.offerForm.value;
      if (this.isEditMode && this.offerId) {
        this.offerService.updateOffer(this.offerId, offerData).subscribe(
          () => this.router.navigate(['/dashboard/offers']),
          (error) => console.error('Erreur lors de la modification:', error)
        );
      } else {
        this.offerService.addOffer(offerData).subscribe(
          () => this.router.navigate(['/dashboard/offers']),
          (error) => console.error('Erreur lors de l\'ajout:', error)
        );
      }
    } else {
      console.error("Le formulaire n'est pas valide");
    }
  }
  

  onCancel(): void {
    this.router.navigate(['/dashboard/offers']);
  }
}