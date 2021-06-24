import { Resources } from './../../models/resources.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ResourceService } from './../../services/resource.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resources-keywords',
  templateUrl: './resources-keywords.component.html',
  styleUrls: ['./resources-keywords.component.css']
})
export class ResourcesKeywordsComponent implements OnInit {

  resources = [];
  subscription: Subscription;
  current = []
  result = []
  keyword: string;

  constructor(public resourceService: ResourceService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('keyword')) {
        this.keyword = params.get('keyword');
      }
    });
    this.result = [];
    this.current = []
    this.resources = [];
    this.subscription = this.resourceService.findAllResourcesByKeyword(this.keyword).subscribe(resources => {
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.result = [];
    this.current = []
    this.resources = [];
  }



}
