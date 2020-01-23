import { Injectable } from '@angular/core';
import {Booking} from './create-booking/booking.model';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {delay, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private innerBookings = new BehaviorSubject<Booking[]>([]);

  constructor(private authService: AuthService) { }

  get bookings() {
    return this.innerBookings.asObservable();
  }

  addBooking(
      placeId: string,
      placeTitle: string,
      placeImage: string,
      firstName: string,
      lastName: string,
      guestNumber: number,
      dateFrom: Date,
      dateTo: Date
  ) {
    const newBooking = new Booking(
        Math.random().toString(),
        placeId,
        placeTitle,
        placeImage,
        firstName,
        lastName,
        guestNumber,
        this.authService.userId,
        dateFrom,
        dateTo
    );
    return this.bookings.pipe(take(1), delay(1000), tap(bookings => { // Faking loading with delay...
      this.innerBookings.next(bookings.concat(newBooking));
    }));
  }

  cancelBooking(bookingId: string) {
    return this.bookings.pipe(
        take(1),
        delay(1000),
        tap(bookings => { // Faking loading with delay...
      this.innerBookings.next(bookings.filter(b => b.id !== bookingId));
        })
    );
  }
}
