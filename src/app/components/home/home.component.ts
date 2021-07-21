import { UserService } from './../../services/user.service';
import { Subscription } from 'rxjs';
import { ResourceService } from './../../services/resource.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { Category } from './../../models/category.interface';
import { CategoryService } from './../../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('nav', { static: false }) slider: NgImageSliderComponent;

  subscription: Subscription;
  category = {} as Category;
  resources = [];
  categories = [];
  resourcesCreationDate = [];
  topRatedResources = [];
  search = "";
  resourcesCount = 0;
  usersCount = 0;
  multimediaCount = 0;

  constructor(public resourceService: ResourceService, public userService: UserService, public categoryService: CategoryService, public router: Router) { }

  ngOnInit() {
    this.countResources();
    this.countUsers();
    this.countMultimedia();
    this.subscription = this.resourceService.findAllresourcesOrderByCreatedAt().subscribe(resources => {
      resources.forEach(resource => {
        this.resourcesCreationDate.push({
          id: resource.id,
          image: resource.banner,
          thumbImage: resource.banner,
          title: resource.title,
          alt: resource.title
        })
      });
    })
    this.subscription = this.resourceService.findAllResourcesOrderByCalification().subscribe(resources => {
      console.log(resources.length)
      resources.forEach(resource => {
        this.topRatedResources.push({
          id: resource.id,
          image: resource.banner,
          thumbImage: resource.banner,
          title: resource.title,
          alt: resource.title
        })
      });
    })
    this.subscription = this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  showResourcesByCategory(category: string) {
    this.router.navigate(['category', category]);
  }

  clickImageCreationDate(event) {
    this.router.navigate(['resource', this.resourcesCreationDate[event].id]);
  }
  clickImageTopRatedResources(event) {
    this.router.navigate(['resource', this.topRatedResources[event].id]);
  }

  searchResources() {
    if (this.search.length > 0) {
      this.router.navigate(['search', encodeURI(this.search)]);
    }
  }

  countResources() {
    this.subscription = this.resourceService.findAllResources().subscribe(resources => {
      this.resourcesCount = resources.length;
    })
  }
  countUsers() {
    this.subscription = this.userService.findAllUsers().subscribe(users => {
      this.usersCount = users.length
    })
  }

  countMultimedia() {
    this.subscription = this.resourceService.findAllMultimedia().subscribe(resources => {
      this.multimediaCount = resources.length;
    })
  }

}

