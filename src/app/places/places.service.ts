import { Injectable } from '@angular/core';
import { Place } from './place.model';
import {AuthService} from '../auth/auth.service';
import {BehaviorSubject} from 'rxjs';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

interface PlaceData {
    dateFrom: string;
    dateTo: string;
    description: string;
    imageUrl: string;
    price: number;
    title: string;
    userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private innerPlaces = new BehaviorSubject<Place[]>([]) ;

  get places() {
    return this.innerPlaces.asObservable();
  }

  constructor(private authService: AuthService, private httpClient: HttpClient) {}

  fetchPlaces() {
      return this.httpClient
          .get<{[key: string]: PlaceData }>('https://bookings-test-190d2.firebaseio.com/offered-places.json')
          .pipe(map(resData => {
              const places = [];
              for (const  key in resData) {
                  if (resData.hasOwnProperty(key)) {
                      places.push(
                          new Place(
                              key,
                              resData[key].title,
                              resData[key].description,
                              resData[key].imageUrl,
                              resData[key].price,
                              new Date(resData[key].dateFrom),
                              new Date(resData[key].dateTo),
                              resData[key].userId
                          )
                      );
                  }
              }
              return places;
          }),
              tap(places => {
                  this.innerPlaces.next(places);
              })
          );
  }

    getPlace(id: string) {
        return this.httpClient
            .get<PlaceData>(`https://bookings-test-190d2.firebaseio.com/offered-places/${id}.json`)
            .pipe(
                map(placeData => {
                    return new Place(
                        id,
                        placeData.title,
                        placeData.description,
                        placeData.imageUrl,
                        placeData.price,
                        new Date(placeData.dateFrom),
                        new Date(placeData.dateTo),
                        placeData.userId
                    );
                })
            );
    }

  addPlace(
      title: string,
      description: string,
      imageUrl: string,
      price: number,
      dateFrom: Date,
      dateTo: Date
  ) {
      let generatedId: string;
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
      return this.httpClient
        .post<{name: string}>('https://bookings-test-190d2.firebaseio.com/offered-places.json', { ...newPlace, id: null})
        .pipe(
            switchMap(resData => {
                generatedId = resData.name;
                return this.places;
            }),
            take(1),
            tap(places => {
                newPlace.id = generatedId;
                this.innerPlaces.next(places.concat(newPlace));
            })
        );
    // return this.places.pipe(take(1), delay(1000), tap(places => { // Faking loading with delay...
    //     this.innerPlaces.next(places.concat(newPlace));
    // }));
  }

  updatePlace(
      placeId: string,
      title: string,
      description: string,
      imageUrl: string,
      price: number,
      dateFrom: Date,
      dateTo: Date
  ) {
      let updatedPlaces: Place[];
      return this.places.pipe(
          take(1),
          switchMap(places => {
              const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
              updatedPlaces = [...places];
              const oldPlace = updatedPlaces[updatedPlaceIndex];
              updatedPlaces[updatedPlaceIndex] = new Place(
                  oldPlace.id,
                  title,
                  description,
                  imageUrl,
                  +price,
                  new Date(dateFrom),
                  new Date(dateTo),
                  oldPlace.userId
              );
              return this.httpClient.put(
                  `https://bookings-test-190d2.firebaseio.com/offered-places/${placeId}.json`,
                  {...updatedPlaces[updatedPlaceIndex], id: null}
              );
          }),
          tap(() => {
              this.innerPlaces.next(updatedPlaces);
          })
      );
  }

  // editPlace(
  //     id: string,
  //     title: string,
  //     description: string,
  //     imageUrl: string,
  //     price: number,
  //     dateFrom: Date,
  //     dateTo: Date
  // ) {
  //   const editedPlace = new Place(
  //       id,
  //       title,
  //       description,
  //       imageUrl,
  //       price,
  //       dateFrom,
  //       dateTo,
  //       this.authService.userId
  //   );
  //   return this.places.pipe(filter(p => p.target.id === editedPlace.id), delay(1000), tap(places => { // Faking loading with delay...
  //     this.innerPlaces.next(places.concat(newPlace));
  //   }));
  // }
}
