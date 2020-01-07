import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place = [
      new Place(
          'pl1',
          'Lodenice Bosan',
          'In the heart of Prague',
          'https://bosan.cz/assets/img/bosan.jpg',
          149.99
      ),
    new Place(
        'pl2',
        'San Island',
        'With some spiders and otters included',
        'https://bosan.cz/data/photos/5d42e051439f3e2b3862cbd4/5d5c5785af43524e762e6fc1_small.JPG',
        59.99
    ),
    new Place(
        'pl3',
        'Whitewater crazy place',
        'Wet also in dry suit',
        'https://bosan.cz/assets/img/kanal1.jpg',
        59.99
    )
  ];

  get places() {
    return [...this._places];
  }

  constructor() { }
}
