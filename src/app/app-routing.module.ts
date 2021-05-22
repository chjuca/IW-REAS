import { ResourceComponent } from './components/resource/resource.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { ResourceFormComponent } from './components/resource-form/resource-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'resource-form',
    component: ResourceFormComponent
  },
  {
    path: '',
    component: ResourcesComponent
  },
  { path: 'resource/:id', component: ResourceComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
