import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

import { TranslateService } from '@ngx-translate/core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import { LocalizationService } from '../shared/localization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  serverURL: string = environment.serverURL;

  isMenuCollapsed: boolean = true;

  faGithub = faGithub;
  faLinkedin = faLinkedin;

  constructor(
    private translate: TranslateService,
    private languageSelectionService: LocalizationService
  ) {}

  ngOnInit(): void {
    this.languageSelectionService.initLocalization();
  }

  setLanguage(newLanguage: string): void {
    this.languageSelectionService.language = newLanguage;
    this.translate.use(newLanguage);
  }

  getLanguage(): string {
    return this.languageSelectionService.language;
  }
}
