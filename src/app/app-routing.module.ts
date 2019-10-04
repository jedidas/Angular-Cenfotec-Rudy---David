import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: '', loadChildren: './modules/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: '', loadChildren: './modules/user/user.module#UserModule'
  },
  {
    path: '', loadChildren: './modules/category/category.module#CategoryModule'
  },
  {
    path: '', loadChildren: './modules/products/products.module#ProductsModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
