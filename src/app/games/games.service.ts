import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Card } from './match-match/card.model';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private serverURL: string = environment.serverURL;

  constructor(private http: HttpClient) {}

  getMatchMatchCards(): Observable<Card[]> {
    return this.http.get(this.serverURL + '/games/match-match/cardnames').pipe(
      map((data: string[]) => {
        let cards: Card[] = [];
        data.forEach((idata) => {
          cards.push(new Card(idata));
        });
        return cards;
      })
    );
  }
}
