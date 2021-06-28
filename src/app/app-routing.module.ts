import { ResourcesSearchComponent } from './components/resources-search/resources-search.component';
import { UserComponent } from './components/user/user.component';
import { ResourcesKeywordsComponent } from './components/resources-keywords/resources-keywords.component';
import { ResourcesPublicComponent } from './components/resources-public/resources-public.component';
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
    component: HomeComponent
  },
  {
    path: 'resources',
    component: ResourcesComponent
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
    path: 'keyword/:keyword',
    component: ResourcesKeywordsComponent
  },
  {
    path: 'search/:search',
    component: ResourcesSearchComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },


  // RUTAS DE ADMIN
  {
    path: 'admin/resources',
    component: ResourcesPublicComponent
  },
  {
    path: 'admin/resource-form',
    component: ResourceFormComponent
  },
  {
    path: 'admin/users',
    component: UserComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
