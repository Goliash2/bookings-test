import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesService} from '../places.service';
import {Place} from '../place.model';
import {MenuController} from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  filteredPlaces: Place[];
  private placesSub: Subscription;

  constructor(private placesService: PlacesService, private menuCtrl: MenuController, private authService: AuthService) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.filteredPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.loadedPlaces.slice(1);
    });
  }

  openMenu() {
    this.menuCtrl.toggle();
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'all') {
      this.filteredPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.filteredPlaces.slice(1);
    } else {
      this.filteredPlaces = this.loadedPlaces.filter(place => place.userId !== this.authService.userId);
      this.listedLoadedPlaces = this.filteredPlaces.slice(1);
    }
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
