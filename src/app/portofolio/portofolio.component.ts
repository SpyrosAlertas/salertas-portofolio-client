import { Component, OnInit } from '@angular/core';

import { faHammer } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-portofolio',
  templateUrl: './portofolio.component.html',
  styleUrls: ['./portofolio.component.css'],
})
export class PortofolioComponent implements OnInit {
  faHammer = faHammer;

  constructor() {}

  ngOnInit(): void {}
}
