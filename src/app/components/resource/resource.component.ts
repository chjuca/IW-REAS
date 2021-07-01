import { CommentsService } from './../../services/comments.service';
import { Comments } from './../../models/comments.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from './../../services/resource.service';
import { Subscription } from 'rxjs';
import { Resources } from './../../models/resources.interface';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  resource = {} as Resources;
  idResource: string;
  subscription: Subscription;
  url = "nothing here";
  //========== COMMENTS ==========
  comment = {} as Comments;
  comments = [];
  constructor(public resourceService: ResourceService, public commentService: CommentsService, public router: Router, public route: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit() {
    this.getUrl()
    console.log(this.url)
    this.route.paramMap.subscribe(params => {

      if (params.has('id')) {
        this.idResource = params.get('id');
      }
    });
    this.subscription = this.resourceService.findResourceByID(this.idResource).subscribe(resource => {
      this.resource = resource;
      this.resource.id = this.idResource;
    });
    this.subscription = this.commentService.getCommentsByResource(this.idResource).subscribe(comments => {
      this.comments = comments;
    })
  }

  addComment() {
    this.commentService.addComment(this.comment, this.resource.id);
    this.comment = {};
  }

  clickKeyword(item) {
    this.router.navigate(['keyword', item]);
  }

  getUrl(){
    this.url = window.location.href;
    console.log(this.url)
  }
  /*
    open(contenido) {
      this.modalService.open(contenido, { centered: true });
      console.log("El método accede")
    }*/


}
