import { Injectable } from '@angular/core';
import {Booking} from './create-booking/booking.model';
import {IonItemSliding} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private innerBookings: Booking[] = [
    {
      id: 'xyz',
      placeId: 'p1',
      placeTitle: 'Lodenice Bosan',
      guestNumber: 2,
      userId: 'a'
    }
  ];

  constructor() { }

  get bookings() {
    return [...this.innerBookings];
  }
}
