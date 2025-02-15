import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';

import { CustomerListComponent } from './pages/customers/customer-list/customer-list.component';
import { CustomerFormComponent } from './pages/customers/customer-form/customer-form.component';
import { OfferListComponent } from './pages/offers/offer-list/offer-list.component';
import { ListSubscriptionComponent } from './pages/subscriptions/subscription-list/subscription-list.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { OfferFormComponent } from './pages/offers/offer-form/offer-form.component';
import { SubscriptionFormComponent } from './pages/subscriptions/subscription-form/subscription-form.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  {
    path: 'dashboard',
    component: DashboardComponent, // Composant de layout contenant sidebar, header, etc.
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },  // Contenu initial (Bienvenue, stats, etc.)
      { path: 'customers', component: CustomerListComponent },
      { path: 'customers/add', component: CustomerFormComponent },
      { path: 'customers/edit/:id', component: CustomerFormComponent },
      { path: 'offers', component: OfferListComponent },
      { path: 'offers/add', component: OfferFormComponent },
      { path: 'offers/edit/:id', component: OfferFormComponent },
      { path: 'offers', component: OfferListComponent },
      { path: 'subscriptions', component: ListSubscriptionComponent },
      { path: 'subscriptions', component: ListSubscriptionComponent },
    { path: 'subscriptions/add', component: SubscriptionFormComponent },
    { path: 'users', component: UserListComponent },
    { path: 'users/add', component: UserFormComponent },
      { path: 'logout', component: LogoutComponent },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];
