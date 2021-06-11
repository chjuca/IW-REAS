import { Resources } from './../../models/resources.interface';
import { ResourceService } from './../../services/resource.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  resources = [];
  subscription: Subscription;
  current = []
  result = []


  constructor(public resourceService: ResourceService, public router: Router) { }

  ngOnInit() {
    this.result = [];
    this.current = []
    this.resources = [];
    this.subscription = this.resourceService.findAllResources().subscribe(resources => {
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

}
