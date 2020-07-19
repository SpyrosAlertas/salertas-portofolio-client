export class Card {
  constructor(
    public cardName: string,
    public isFlipped: boolean = false,
    public isFound: boolean = false
  ) {}
}
