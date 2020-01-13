import { Component, OnInit } from '@angular/core';
import {PlacesService} from '../places.service';
import {Place} from '../place.model';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  loadedOffers: Place[];

  constructor(private placesService: PlacesService, private menuCtrl: MenuController) { }

  ngOnInit() {
    this.loadedOffers = this.placesService.places;
  }
  openMenu() {
    this.menuCtrl.toggle();
  }
  onEdit(offerId: string) {
    console.log('editing item: ' + offerId);
  }

}
