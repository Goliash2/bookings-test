import {Component, OnDestroy, OnInit} from '@angular/core';
import {Place} from '../../place.model';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {PlacesService} from '../../places.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  place: Place;
  form: FormGroup;
  private placeSub: Subscription;

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private placesService: PlacesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('places/tabs/offers');
        return;
      }
      this.placeSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
        this.place = place;
        this.form = new FormGroup({
          title: new FormControl(this.place.title, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          description: new FormControl(this.place.description, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(180)]
          }) ,
          price: new FormControl(this.place.price, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.min(1)]
          }),
          dateFrom: new FormControl(this.place.dateFrom.toISOString(), {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          dateTo: new FormControl(this.place.dateTo.toISOString(), {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          imageUrl: new FormControl(this.place.imageUrl, {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.pattern('^((http|ftp|https):\\/\\/)?([\\w_-]+(?:(?:\\.[\\w_-]+)+))([\\w.,@?^=%&:\\/~+#-]*[\\w@?^=%&\\/~+#-])?$')]
          })
        });
      });
      console.log(this.place);
    });
  }

  onEditOffer() {
    if (!this.form.valid) {
      return;
    }
    console.log('editing offer...');
  }

  ngOnDestroy(): void {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

}
