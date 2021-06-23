import { Resources } from './../../models/resources.interface';
import { Router } from '@angular/router';
import { ResourceService } from './../../services/resource.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resources-public',
  templateUrl: './resources-public.component.html',
  styleUrls: ['./resources-public.component.css']
})
export class ResourcesPublicComponent implements OnInit {

  resources = [];
  subscription: Subscription;
  current = []
  result = []

  constructor(public resourceService: ResourceService, public router: Router) { }

  ngOnInit() {
    this.result = [];
    this.current = []
    this.resources = [];
    this.subscription = this.resourceService.findAllResourcesIsNoPublic().subscribe(resources => {
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
          this.current.push({ description: "" });
        }
      }
      this.result.push(this.current);
    })
  }

  showResource(resource: Resources) {
    this.router.navigate(['resource', resource.id]);
  }

  publicResource(resource: Resources) {
    this.resourceService.publicResource(resource);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.result = [];
    this.current = []
    this.resources = [];
  }

}
