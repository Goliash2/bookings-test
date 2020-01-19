import { Component, OnInit } from '@angular/core';
import {Place} from '../../place.model';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {PlacesService} from '../../places.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place: Place;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private placesService: PlacesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('places/tabs/offers');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
      console.log(this.place);
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
        dateFrom: new FormControl(this.place.dateFrom, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        dateTo: new FormControl(this.place.dateTo, {
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
  }

  onEditOffer() {
    if (!this.form.valid) {
      return;
    }
    console.log('editing offer...');
  }

}
