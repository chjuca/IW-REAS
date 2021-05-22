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

  constructor(public resourceService: ResourceService, public router: Router) { }

  ngOnInit() {
    this.subscription = this.resourceService.findAllResources().subscribe(resources => { this.resources = resources })
  }

  showResource(resource: Resources) {
    this.router.navigate(['resource', resource.id]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
