import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Subscription } from 'rxjs';

import { faMedal, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';

import { environment } from 'src/environments/environment';

import { Card } from './card.model';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-match-match',
  templateUrl: './match-match.component.html',
  styleUrls: ['./match-match.component.css'],
  animations: [
    trigger('flipState', [
      state(
        'true',
        style({
          transform: 'rotateY(180deg)',
        })
      ),
      state(
        'false',
        style({
          transform: 'rotateY(0)',
        })
      ),
      transition('false => true', animate('750ms ease-out')),
      transition('true => false', animate('250ms ease-in')),
    ]),
    trigger('startGame', [
      state(
        'void',
        style({
          transform: 'translateY(-500px)',
          opacity: 0,
        })
      ),
      state(
        '*',
        style({
          transform: 'translateY(0px)',
          opacity: 1,
        })
      ),
      transition(':enter', animate('750ms ease-in')),
    ]),
  ],
})
export class MatchMatchComponent implements OnInit {
  cards: Card[] = [];
  selectedA: number;
  time: number = 0;
  successes: number = 0;
  failures: number = 0;
  timer: number = undefined;
  isFinished: boolean = false;
  alertType: string = undefined;
  alertMessage: string = undefined;
  alertMessageSub: Subscription = undefined;
  alertClosed: boolean = false;
  faMedal: IconDefinition = faMedal;
  isLoadingData: boolean = true;
  serverError: boolean = false;

  serverURL: string = environment.serverURL;

  constructor(
    private gamesService: GamesService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.gameInitialization();
  }

  onNewGame(): void {
    if (this.alertMessageSub) {
      this.alertMessageSub.unsubscribe();
      this.alertMessageSub = undefined;
    }
    this.gameInitialization();
  }

  onStopGame(): void {
    this.cards.forEach((card) => (card.isFlipped = true));
    this.isFinished = true;
    this.alertType = 'danger';
    if (this.alertMessageSub) {
      this.alertMessageSub.unsubscribe();
    }
    this.alertMessageSub = this.translate
      .stream('GAMES.MATCHMATCH.ALERTMESSAGE.STOPPED')
      .subscribe((res) => (this.alertMessage = res));
    this.alertClosed = false;
    clearInterval(this.timer);
  }

  onRestartGame(): void {
    if (this.alertMessageSub) {
      this.alertMessageSub.unsubscribe();
      this.alertMessageSub = undefined;
    }
    this.cards.forEach((card) => {
      card.isFlipped = false;
      card.isFound = false;
    });
    this.time = 0;
    this.successes = 0;
    this.failures = 0;
    this.selectedA = undefined;
    clearInterval(this.timer);
    this.timer = undefined;
    this.isFinished = false;
    this.alertType = undefined;
    this.alertMessage = undefined;
    this.alertClosed = false;
  }

  onGetHelp(): void {
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.time++;
      }, 1000);
    }
    if (this.selectedA) {
      this.cards[this.selectedA].isFlipped = false;
      this.selectedA = undefined;
    }
    let hintA: number;
    let i: number = 0;
    while (i < this.cards.length) {
      if (this.cards[i].isFound === false) {
        hintA = i;
        break;
      }
      ++i;
    }
    ++i;
    while (this.cards[i].cardName !== this.cards[hintA].cardName) {
      ++i;
    }
    this.cards[i].isFlipped = this.cards[hintA].isFlipped = true;
    this.cards[i].isFound = this.cards[hintA].isFound = true;
    if (!this.alertMessageSub) {
      this.alertType = 'warning';
      this.alertMessageSub = this.translate
        .stream('GAMES.MATCHMATCH.ALERTMESSAGE.HELPED')
        .subscribe((res) => (this.alertMessage = res));
      this.alertClosed = false;
    }

    for (i = 0; i < this.cards.length && this.cards[i].isFound == true; i++) {}

    if (i === this.cards.length) {
      this.isFinished = true;
      clearInterval(this.timer);
    }
  }

  get successPercentage(): string {
    return (this.successes === 0
      ? 0
      : this.failures === 0
      ? 100
      : (this.successes / (this.successes + this.failures)) * 100
    ).toString();
  }

  isFlipped(index: number): boolean {
    return this.cards[index].isFlipped;
  }

  isFound(index: number): boolean {
    return this.cards[index].isFound;
  }

  onSelectCard(index: number): void {
    if (!this.timer && !this.isFinished) {
      this.timer = setInterval(() => {
        this.time++;
      }, 1000);
    }

    if (this.cards[index].isFound || this.cards[index].isFlipped) return;

    if (this.selectedA === undefined) {
      this.selectedA = index;
      this.cards[this.selectedA].isFlipped = true;
    } else {
      if (
        index !== this.selectedA &&
        this.cards[index].cardName === this.cards[this.selectedA].cardName
      ) {
        this.cards[index].isFound = this.cards[this.selectedA].isFound = true;
        this.cards[index].isFlipped = this.cards[
          this.selectedA
        ].isFlipped = true;
        ++this.successes;
        let i: number;
        for (i = 0; i < this.cards.length && this.cards[i].isFound; i++) {}
        if (i === this.cards.length) {
          clearInterval(this.timer);
          this.isFinished = true;
          if (!this.alertMessage) {
            this.alertType = 'success';
            this.alertMessageSub = this.translate
              .stream('GAMES.MATCHMATCH.ALERTMESSAGE.WON')
              .subscribe((res) => (this.alertMessage = res));
            this.alertClosed = false;
          }
        }
      } else {
        this.cards[index].isFlipped = true;
        ++this.failures;
        setTimeout(
          (index, selectedA) => {
            if (!this.cards[selectedA].isFound && !this.isFinished)
              this.cards[selectedA].isFlipped = false;
            if (!this.cards[index].isFound && !this.isFinished) {
              this.cards[index].isFlipped = false;
            }
          },
          1250,
          index,
          this.selectedA
        );
      }
      this.selectedA = index = undefined;
    }
  }

  // Helper Private Methods
  private gameInitialization(): void {
    this.isLoadingData = true;
    this.serverError = false;
    let tmpCards: Card[] = [];
    this.cards = [];
    this.gamesService.getMatchMatchCards().subscribe(
      (data) => {
        tmpCards = data;
      },
      () => {
        this.isLoadingData = false;
        this.serverError = true;
      },
      () => {
        tmpCards.forEach((tmpCard) => {
          this.cards.push(new Card(tmpCard.cardName));
          this.cards.push(new Card(tmpCard.cardName));
        });
        this.isLoadingData = false;
        this.cards = this.cards.sort(() => Math.random() - 0.5);
      }
    );
    this.time = 0;
    this.successes = 0;
    this.failures = 0;
    this.selectedA = undefined;
    clearInterval(this.timer);
    this.timer = undefined;
    this.isFinished = false;
    this.alertType = undefined;
    this.alertMessage = undefined;
    this.alertClosed = false;
  }

  ngOnDestroy(): void {
    if (this.alertMessageSub) {
      this.alertMessageSub.unsubscribe();
    }
  }
}
