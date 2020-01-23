import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from './booking.service';
import {Booking} from './create-booking/booking.model';
import {IonItemSliding, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  private bookingsSub: Subscription;

  constructor(private bookingService: BookingService, private router: Router, private loadingController: LoadingController) { }

  ngOnInit() {
    this.bookingsSub = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  onCancelBooking(bookingId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.loadingController.create({message: 'Cancelling booking...'}).then(loadingEl => {
      loadingEl.present();
      this.bookingService.cancelBooking(bookingId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.bookingsSub) {
      this.bookingsSub.unsubscribe();
    }
  }
}
