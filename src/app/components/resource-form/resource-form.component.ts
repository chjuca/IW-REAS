import { ResourceService } from './../../services/resource.service';
import { Resources } from './../../models/resources.interface';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResourceFormComponent implements OnInit {
  @ViewChild('inputFile', { static: false }) myInputVariable: ElementRef;

  // LISTS
  languages = ['Español', 'Inglés', 'Portugués', 'Alemán']
  keywords = [];
  // LISTS


  resource = {} as Resources;
  resources = [];
  event: any;
  uploadPercent = 0;

  constructor(public resourceService: ResourceService) { }

  ngOnInit() {
  }

  addResource() {
    this.resource.keywords = this.keywords;
    this.resourceService.onUpload(this.resource, this.event);
    this.resourceService.uploadPercent.subscribe(uploadPercent => {
      this.uploadPercent = uploadPercent;
      if (this.uploadPercent == 100) {
        this.resource = {} as Resources;
        this.keywords = [];
        this.myInputVariable.nativeElement.value = '';
      }
    })
  }

  setEvent(e: any) {
    this.event = e;
  }

  validateForm(): boolean {
    if (this.resource.title && this.resource.description && this.resource.language && (this.keywords.length > 0)) {
      if (this.event) {
        return false
      } else {
        return true;
      }
    }
    else {
      return true;
    }
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
