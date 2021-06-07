import { ResourcesCategoryComponent } from './components/resources-category/resources-category.component';
import { HomeComponent } from './components/home/home.component';
import { ResourceComponent } from './components/resource/resource.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { ResourceFormComponent } from './components/resource-form/resource-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent          // dividirse y maquetar
  },
  {
    path: 'resource-form',
    component: ResourceFormComponent
  },
  {
    path: 'resources',
    component: ResourcesComponent     // Cards agrupar en 3 o 4 por columna
  },
  {
    path: 'resource/:id',
    component: ResourceComponent
  },
  {
    path: 'category/:category',
    component: ResourcesCategoryComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
