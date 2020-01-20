import { Injectable } from '@angular/core';
import { Place } from './place.model';
import {AuthService} from '../auth/auth.service';
import {BehaviorSubject} from 'rxjs';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private innerPlaces = new BehaviorSubject<Place[]>([
    new Place(
        'pl1',
        'Lodenice Bosan',
        'In the heart of Prague',
        'https://bosan.cz/assets/img/bosan.jpg',
        149.99,
        new Date('2020-01-19'),
        new Date('2021-12-12'),
        'abc'
    ),
    new Place(
        'pl2',
        'San Island',
        'With some spiders and otters included',
        'https://bosan.cz/data/photos/5d42e051439f3e2b3862cbd4/5d5c5785af43524e762e6fc1_small.JPG',
        59.99,
        new Date('2019-12-11'),
        new Date('2022-03-31'),
        'abc'
    ),
    new Place(
        'pl3',
        'Whitewater crazy place',
        'Wet also in dry suit',
        'https://bosan.cz/assets/img/kanal1.jpg',
        39.99,
        new Date('2020-03-11'),
        new Date('2025-05-17'),
        'abc'
    )
  ]) ;

  get places() {
    return this.innerPlaces.asObservable();
  }

  constructor(private authService: AuthService) { }

  getPlace(id: string) {
    return this.places.pipe(take(1), map(places => {
      return {...places.find(p => p.id === id)};
    }));
  }

  addPlace(
      title: string,
      description: string,
      imageUrl: string,
      price: number,
      dateFrom: Date,
      dateTo: Date
  ) {
    const newPlace = new Place(
        Math.random().toString(),
            title,
            description,
            imageUrl,
            price,
            dateFrom,
            dateTo,
            this.authService.userId
    );
    this.places.pipe(take(1)).subscribe(places => {
      this.innerPlaces.next(places.concat(newPlace));
    });
  }
}
