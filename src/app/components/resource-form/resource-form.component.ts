import { ResourceService } from './../../services/resource.service';
import { Resources } from './../../models/resources.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit {

  // LISTS
  languages = ['Español', 'Inglés', 'Portugués', 'Alemán']
  // LISTS


  resource = {} as Resources;
  resources = [];
  event: any;

  constructor(public resourceService: ResourceService) { }

  ngOnInit() {
  }

  addResource() {
    this.resourceService.onUpload(this.resource, this.event);
  }

  setEvent(e: any) {
    this.event = e;
  }

}
