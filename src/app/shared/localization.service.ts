import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  language: string = null;

  constructor(private translate: TranslateService) {}

  initLocalization(): void {
    if (this.language === null) {
      this.translate.setDefaultLang('en-us');
      this.language = navigator.language.toLowerCase();
      this.translate.use(this.language);
    }
  }
}
