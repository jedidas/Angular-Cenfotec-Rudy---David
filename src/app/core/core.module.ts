import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationService } from './data-services/authentication.service';
import { LocalstorageService } from './services/localstorage.service';
import { AppRoutingModule } from '../app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule, SharedModule, AppRoutingModule,
  ],
  exports: [
    CommonModule, HeaderComponent
  ],
  providers: [
    AuthenticationService, LocalstorageService,
    {
      provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
    }
  ]
})
export class CoreModule { }
