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

  constructor(public categoryService: CategoryService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('category')) {
        this.category = params.get('category');
      }
    });
    this.subscription = this.categoryService.getTitulationsByCategory(this.category).subscribe(titulations => {
      this.titulations = titulations;
    })
  }


  showTitulation() {
    console.log(this.titulationSelected);
  }

}
