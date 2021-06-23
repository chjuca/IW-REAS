import { Resources } from './../../models/resources.interface';
import { ResourceService } from './../../services/resource.service';
import { Category } from './../../models/category.interface';
import { CategoryService } from './../../services/category.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resources-category',
  templateUrl: './resources-category.component.html',
  styleUrls: ['./resources-category.component.css']
})
export class ResourcesCategoryComponent implements OnInit {

  category: string;
  subscription: Subscription;
  titulationSelected = "";
  //======TITULATIONS========
  titulation = {} as Category;
  titulations = []
  resources = [];
  current = []
  result = []

  constructor(public categoryService: CategoryService, public resourceService: ResourceService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('category')) {
        this.category = params.get('category');
      }
    });
    this.subscription = this.categoryService.getTitulationsByCategory(this.category).subscribe(titulations => {
      this.titulations = titulations;
      this.titulationSelected = this.titulations[0].name;
      this.getResources();
    })
  }

  showTitulation() {
    this.getResources();
  }

  showResource(resource: Resources) {
    this.router.navigate(['resource', resource.id]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.result = [];
    this.current = []
    this.resources = [];
  }

  getResources() {
    console.log(this.titulationSelected);
    this.result = [];
    this.current = []
    this.resources = [];
    this.subscription = this.resourceService.findAllResourcesByCategory(this.titulationSelected).subscribe(resources => {
      this.result = [];
      this.current = []
      this.resources = [];
      resources.forEach(resource => {
        if (this.current.length == 3) {
          this.current.push(resource);
          this.result.push(this.current);
          this.current = []
        } else {
          this.current.push(resource);
        }
      });
      if (this.current.length != 0) {
        for (let i = this.current.length; i < 4; i++) {
          this.current.push({});
        }
      }
      this.result.push(this.current);
    })
    console.log(this.result)
  }

}
