import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {ContactDetailComponent} from './contact-detail/contact-detail.component';


const routes: Routes = [
  { path: 'homePage', component: HomePageComponent },
  { path: 'detail/:id', component: ContactDetailComponent },
  { path: 'edit/:id', component: ContactDetailComponent, data : {edit : true} },
  { path: 'create', component: ContactDetailComponent, data : {create : true} },
  { path: '', redirectTo: '/homePage', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
