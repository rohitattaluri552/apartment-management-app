import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <mat-card *ngFor="let item of menuItems">
          <mat-card-header>
            <mat-icon mat-card-avatar>{{item.icon}}</mat-icon>
            <mat-card-title>{{item.title}}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>{{item.description}}</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button [routerLink]="item.route">View</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `
})
export class DashboardComponent {
  menuItems = [
    {
      title: 'Fun Hall Booking',
      description: 'Book the community hall for your events',
      icon: 'event_seat',
      route: '/fun-hall'
    },
    {
      title: 'Maintenance',
      description: 'View and pay maintenance fees',
      icon: 'payment',
      route: '/maintenance'
    },
    {
      title: 'Events Calendar',
      description: 'Check upcoming society events',
      icon: 'event',
      route: '/events'
    },
    {
      title: 'Fund Raising',
      description: 'Contribute to society initiatives',
      icon: 'volunteer_activism',
      route: '/fundraising'
    },
    {
      title: 'Elections',
      description: 'Society committee elections',
      icon: 'how_to_vote',
      route: '/elections'
    },
    {
      title: 'Festivals',
      description: 'Festival celebrations and events',
      icon: 'celebration',
      route: '/festivals'
    }
  ];
}