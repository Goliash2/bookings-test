import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Place} from '../../places/place.model';
import {ModalController} from '@ionic/angular';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('bookForm', {static: false}) bookForm: NgForm;
  startDate: string;
  endDate: string;
  loaded = false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.dateFrom);
    const availableTo = new Date(this.selectedPlace.dateTo);
    if (this.selectedMode === 'random') {
      this.startDate = new Date(
          (availableFrom.getTime() +
              Math.random() *
              (availableTo.getTime() -
                  7 * 24 * 60 * 60 * 1000 -
                  availableFrom.getTime()
              ))
      ).toISOString();
      this.endDate = new Date(new Date(this.startDate).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
      console.log(this.startDate, this.endDate);
    }
  }

  ionViewDidEnter() {
    this.loaded = true;
    console.log(this.loaded);
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace() {
    if (!this.bookForm.valid || !this.datesValid()) {
      return;
    }
    this.modalCtrl.dismiss({bookingData: {
      firstName: this.bookForm.value['first-name'],
        lastName: this.bookForm.value['last-name'],
        guestNumber: +this.bookForm.value['guest-number'],
        startDate: new Date(this.bookForm.value['date-from']),
        endDate: new Date(this.bookForm.value['date-to'])
      }}, 'confirm');
  }

  datesValid() {
    if (this.loaded) {
      const startRes = new Date(this.bookForm.value['date-from']);
      const endRes = new Date(this.bookForm.value['date-to']);
      return endRes > startRes;
    } else {
      return false;
    }
  }

  // getCurrentDate() {
  //   return new Date();
  // }
  //
  // getDatePlusYear() {
  //   const today = new Date();
  //   return today.setDate(today.getDate() + 365);
  // }

}
