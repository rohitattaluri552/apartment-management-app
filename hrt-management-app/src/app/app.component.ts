import { Component } from "@angular/core";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  menuItems = [
    { routeLink: "/dashboard", icon: "dashboard", title: "Dashboard" },
    { routeLink: "/fun-hall", icon: "event_seat", title: "Fun Hall Booking" },
    { routeLink: "/maintenance", icon: "payment", title: "Maintenance" },
    { routeLink: "/events", icon: "event", title: "Events Calendar" },
    {
      routeLink: "/fundraising",
      icon: "volunteer_activism",
      title: "Fund Raising",
    },
    { routeLink: "/elections", icon: "how_to_vote", title: "Elections" },
    { routeLink: "/festivals", icon: "celebration", title: "Festivals" },
    { routeLink: "/roles", icon: "admin_panel_settings", title: "Roles" },
    { routeLink: "/complaints", icon: "report_problem", title: "Complaints" },
    { routeLink: "/amenities", icon: "pool", title: "Amenities" },
  ];

  constructor(public authService: AuthService) {}

  logout() {
    this.authService.signOut();
  }
}
