import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { FunHallBookingComponent } from "./components/fun-hall-booking/fun-hall-booking.component";
import { MaintenanceComponent } from "./components/maintenance/maintenance.component";
import { EventsCalendarComponent } from "./components/events-calendar/events-calendar.component";
import { FundRaisingComponent } from "./components/fund-raising/fund-raising.component";
import { ElectionsComponent } from "./components/elections/elections.component";
import { FestivalsComponent } from "./components/festivals/festivals.component";
import { RolesComponent } from "./components/roles/roles.component";
import { ComplaintsComponent } from "./components/complaints/complaints.component";
import { AmenitiesComponent } from "./components/amenities/amenities.component";
import { AuthComponent } from "./components/auth/auth.component";

// Material Imports
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatModules } from "./material.module";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FunHallBookingComponent,
    MaintenanceComponent,
    EventsCalendarComponent,
    FundRaisingComponent,
    ElectionsComponent,
    FestivalsComponent,
    RolesComponent,
    ComplaintsComponent,
    AmenitiesComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
