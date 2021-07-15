import { Resources } from './../../models/resources.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ResourceService } from './../../services/resource.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resources-search',
  templateUrl: './resources-search.component.html',
  styleUrls: ['./resources-search.component.css']
})
export class ResourcesSearchComponent implements OnInit {

  resources = [];
  subscription: Subscription;
  current = []
  result = []
  search: string;
  decodeSearch: string;
  filter: string;

  constructor(public resourceService: ResourceService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('search')) {
        this.search = params.get('search');
        this.decodeSearch = decodeURI(this.search);
      }
    });
    this.result = [];
    this.current = []
    this.resources = [];
    this.subscription = this.resourceService.findAllResourcesByTitle(decodeURI(this.search)).subscribe(resources => {
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

  onItemChange(value) {
    this.getResourcesByFilter(value);
  }

  getResourcesByFilter(filter) {
    this.result = [];
    this.current = []
    this.resources = [];
    if (filter === "type") {
      this.subscription = this.resourceService.findAllResourcesByType(decodeURI(this.search)).subscribe(resources => {
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
    if (filter === "category") {
      this.subscription = this.resourceService.findAllResourcesByCategory(decodeURI(this.search)).subscribe(resources => {
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
    if (filter === "tags") {
      this.subscription = this.resourceService.findAllResourcesByKeyword(decodeURI(this.search)).subscribe(resources => {
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
    if (filter === "name") {
      this.subscription = this.resourceService.findAllResourcesByTitle(decodeURI(this.search)).subscribe(resources => {
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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.result = [];
    this.current = []
    this.resources = [];
  }

}
