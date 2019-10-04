import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { AuthenticationService } from '../../data-services/authentication.service';
import { TranslateService } from "@ngx-translate/core";
import { LANGUAGES } from '../../../shared/enums';

@Component({
  selector: 'stats-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  public languages = LANGUAGES;

  constructor(
    private readonly route: Router,
    private readonly authService: AuthenticationService,
    private readonly translateService: TranslateService
  ) { }

  ngOnInit() {
  }

  public get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public languageChange(lang: any): void {
    console.log(lang.target.value);

    this.translateService.use(lang.target.value);
  }

  public get defaultLang(): string {
    return this.translateService.getDefaultLang();
  }

  public isDefaultLang(lang: any): boolean {
    return lang === this.defaultLang;
  }

}
