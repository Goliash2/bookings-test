import { Component, OnInit } from '@angular/core';
import {BookingService} from './booking.service';
import {Booking} from './create-booking/booking.model';
import {IonItemSliding} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  loadedBookings: Booking[];

  constructor(private bookingService: BookingService, private router: Router) { }

  ngOnInit() {
    this.loadedBookings = this.bookingService.bookings;
  }

  onCancelBooking(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    // cancel will be here
    this.router.navigate(['/', 'bookings', 'edit', offerId]);
  }
}
