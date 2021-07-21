import { Category } from './../../models/category.interface';
import { Subscription } from 'rxjs';
import { CategoryService } from './../../services/category.service';
import { ResourceService } from './../../services/resource.service';
import { Resources } from './../../models/resources.interface';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { timer } from 'rxjs';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResourceFormComponent implements OnInit {
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
  evenBanner: any;
  uploadPercent = 0;
  author = '';
  subcategory = '';
  success = false;

  constructor(public resourceService: ResourceService, public categoryService: CategoryService) { }

  ngOnInit() {
    this.subscription = this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  addResource() {
    this.resource.keywords = this.keywords;
    this.resource.authors = this.authors;
    this.resourceService.onUpload(this.resource, this.event, this.evenBanner);
    if (this.resource.type != "Video") {
      this.resourceService.uploadPercent.subscribe(uploadPercent => {
        this.uploadPercent = uploadPercent;
        if (this.uploadPercent == 100) {
          this.resource = {} as Resources;
          this.keywords = [];
          this.authors = [];
          this.category = {};
          this.myInputVariable.nativeElement.value = '';

          this.showAlert()
        }
      })
    } else {
      this.resource = {} as Resources;
      this.keywords = [];
      this.authors = [];
      this.category = {};
      this.myInputVariable.nativeElement.value = '';

      this.showAlert()
    }
  }

  setEvent(e: any) {
    this.event = e;
  }
  setEventBanner(e: any) {
    this.evenBanner = e;
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
