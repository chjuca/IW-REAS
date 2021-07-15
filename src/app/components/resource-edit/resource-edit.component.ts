import { Router, ActivatedRoute } from '@angular/router';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { CategoryService } from './../../services/category.service';
import { ResourceService } from './../../services/resource.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Resources } from 'src/app/models/resources.interface';
import { Category } from 'src/app/models/category.interface';
import { MatChipInputEvent } from '@angular/material';
import { timer } from 'rxjs';

@Component({
  selector: 'app-resource-edit',
  templateUrl: './resource-edit.component.html',
  styleUrls: ['./resource-edit.component.css']
})
export class ResourceEditComponent implements OnInit {
  @ViewChild('inputFile', { static: false }) myInputVariable: ElementRef;

  subscription: Subscription;

  // LISTS
  languages = ['Español', 'Inglés', 'Portugués', 'Alemán']
  keywords = [];
  authors = [];
  categories = [];
  subcategories = [];
  types = ['Video', 'Documento', 'Aplicacion', 'Paper']
  // LISTS


  resource = {} as Resources;
  category = {} as Category;
  resources = [];
  event: any;
  uploadPercent = 0;
  author = '';
  subcategory = '';
  success = false;
  idResource: string;


  constructor(public resourceService: ResourceService, public categoryService: CategoryService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {

      if (params.has('id')) {
        this.idResource = params.get('id');
      }
    });
    this.subscription = this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
    this.subscription = this.resourceService.findResourceByID(this.idResource).subscribe(resource => {
      this.resource = resource;
      this.resource.id = this.idResource;
      this.keywords = this.resource.keywords;
      this.authors = this.resource.authors;
    });
  }


  updateResource() {
    this.resourceService.updateResource(this.resource)
  }

  validateForm(): boolean {
    if (this.resource.title && this.resource.description && this.resource.language && (this.keywords.length > 0)) {
      if (this.event) {
        return false
      } else {
        if (this.resource.url) {
          return false;
        } else {
          return true;
        }
      }
    }
    else {
      return true;
    }
  }

  addAuthor() {
    this.authors.push(this.author);
    this.author = '';
  }

  removeAuthor(author: string) {
    for (let i = 0; i < this.authors.length; i++) {
      if (this.authors[i] === author) {
        this.authors.splice(i, 1);
      }
    }
  }

  selectCategoryChange() {
    this.subscription = this.categoryService.getTitulationsByCategory(this.category.id).subscribe(subcategories => {
      this.subcategories = subcategories;
    });
  }

  showAlert() {
    this.success = true
    timer(3000).subscribe(x => {
      this.success = false
    })
  }

  // PARA LAS KEYWORD

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;

  add(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value) {
      this.keywords.push(value);
    }
    // Reset the input value
    if (event.input) {
      event.input.value = '';
    }
  }

  remove(value: string): void {
    const index = this.keywords.indexOf(value);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  // FIN PARAAAAA LAS KEYWORD

}
