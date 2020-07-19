import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

import {
  faGraduationCap,
  faCertificate,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  serverURL: string = environment.serverURL;

  faGraduationCap = faGraduationCap;
  faCertificate = faCertificate;
  faFileAlt = faFileAlt;

  constructor() {}

  ngOnInit(): void {}
}
