import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ResourceFormComponent } from './components/resource-form/resource-form.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { ResourcesComponent } from './components/resources/resources.component';
import { ResourceComponent } from './components/resource/resource.component';
import { HomeComponent } from './components/home/home.component';
import { ResourcesCategoryComponent } from './components/resources-category/resources-category.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResourcesPublicComponent } from './components/resources-public/resources-public.component';

@NgModule({
  declarations: [
    AppComponent,
    ResourceFormComponent,
    ResourcesComponent,
    ResourceComponent,
    HomeComponent,
    ResourcesCategoryComponent,
    ResourcesPublicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
