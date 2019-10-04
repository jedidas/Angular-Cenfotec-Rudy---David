import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CONFIG } from './config';

@Component({
  selector: 'stats-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'App';
  constructor( private translateService: TranslateService ){
    this.translateService.setDefaultLang(CONFIG.defaultLang);
  }
}
