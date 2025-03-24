import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FunHallBookingComponent } from './components/fun-hall-booking/fun-hall-booking.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { EventsCalendarComponent } from './components/events-calendar/events-calendar.component';
import { FundRaisingComponent } from './components/fund-raising/fund-raising.component';
import { ElectionsComponent } from './components/elections/elections.component';
import { FestivalsComponent } from './components/festivals/festivals.component';
import { RolesComponent } from './components/roles/roles.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { AmenitiesComponent } from './components/amenities/amenities.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'fun-hall', component: FunHallBookingComponent, canActivate: [AuthGuard] },
  { path: 'maintenance', component: MaintenanceComponent, canActivate: [AuthGuard] },
  { path: 'events', component: EventsCalendarComponent, canActivate: [AuthGuard] },
  { path: 'fundraising', component: FundRaisingComponent, canActivate: [AuthGuard] },
  { path: 'elections', component: ElectionsComponent, canActivate: [AuthGuard] },
  { path: 'festivals', component: FestivalsComponent, canActivate: [AuthGuard] },
  { path: 'roles', component: RolesComponent, canActivate: [AuthGuard] },
  { path: 'complaints', component: ComplaintsComponent, canActivate: [AuthGuard] },
  { path: 'amenities', component: AmenitiesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }