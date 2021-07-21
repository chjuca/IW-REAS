import { CommentsService } from './../../services/comments.service';
import { Comments } from './../../models/comments.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from './../../services/resource.service';
import { Subscription } from 'rxjs';
import { Resources } from './../../models/resources.interface';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { CalificationService } from 'src/app/services/calification.service.service';
import { Calification } from 'src/app/models/calificationinterace';
import { User } from 'src/app/models/user.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';




@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  //=====USERDATA========/
  loged: boolean = false;
  userInfo = {} as User;
  resourceCalification = 0;
  resourceCalificationArr = []
  calification = {} as Calification;
  resourceCalificationArrleft = []
  resource = {} as Resources;
  idResource: string;
  subscription: Subscription;
  idVideo = "";
  url = "nothing here";
  califications = [];
  downloadURL: string = "";
  downloaded: boolean;
  //========== COMMENTS ==========
  comment = {} as Comments;
  comments = [];

  constructor(private authenticationService: AuthenticationService, public resourceService: ResourceService, public commentService: CommentsService, public calificationService: CalificationService, public router: Router, public route: ActivatedRoute, private modalService: NgbModal, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (localStorage.getItem('user') != null) {
      const user = JSON.parse(localStorage.getItem('user'))
      this.subscription = this.authenticationService.getRolFromEmail(user["email"]).subscribe(usuario => {
        console.log(usuario)
        this.userInfo = usuario
      })
      this.calification.user = user["email"];
      this.comment.user = user["email"];
      this.loged = true;
    } else {
      this.loged = false;
    }
    this.getUrl()

    this.route.paramMap.subscribe(params => {

      if (params.has('id')) {
        this.idResource = params.get('id');
      }
    });
    this.subscription = this.resourceService.findResourceByID(this.idResource).subscribe(resource => {
      this.resource = resource;
      this.resource.id = this.idResource;
      this.getDownloadURI(this.resource)
    });
    this.subscription = this.commentService.getCommentsByResource(this.idResource).subscribe(comments => {
      this.comments = comments;
    });
    this.subscription = this.calificationService.getCalificationByResuorce(this.idResource).subscribe(calification => {
      this.califications = calification;
      this.getCalificationValue(this.califications);

    });

  }

  URL() {
    let id = this.resource.url.split("=")[1];
    return this._sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + id);
  }

  addComment() {
    this.commentService.addComment(this.comment, this.resource.id);
    this.comment = {};
  }

  clickKeyword(item) {
    this.router.navigate(['keyword', item]);
  }

  getUrl() {
    this.url = window.location.href;

  }

  getDownloadURI(resource: Resources) {
    if (resource.resourceName != null) {

      var storage = firebase.storage();
      var gsReference = storage.refFromURL('gs://recursos-educativos-utpl.appspot.com/resources').child(resource.resourceName)
      gsReference.getDownloadURL().then((url) => {
        this.downloadURL = url;
      }).catch(function (error) {
        switch (error.code) {
          case 'storage/object-not-found':
            console.log("File doesn't exist");

          case 'storage/unauthorized':
            console.log("User doesn't have permission to access the object");

          case 'storage/canceled':
            console.log("User canceled the upload");

          case 'storage/unknown':
            console.log("Unknown error occurred, inspect the server response");
        }
      });
    } else {
      console.log("No se puede descargar")
    }
  }

  openDownloadTab() {
    if (this.downloadURL != "") {
      window.open(this.downloadURL)
    } else {
      this.downloaded = false;
      console.log("No se puede descargar")
    }

  }

  saveCalification() {
    console.log(this.userInfo["rol"])
    var rates = document.getElementsByName('rate');
    var rate_value;
    rates.forEach(element => {
      const example = element as HTMLInputElement;
      if (example.checked) {
        rate_value = (example.value);
      }
    });
    this.calification.value = rate_value;
    this.calificationService.addCalification(this.calification, this.resource);
  }

  getCalificationValue(califications1: Calification[]) {
    if (califications1.length == 0) {
      this.resourceCalification = 0
    } else {

      var calificationValue = 0;
      califications1.forEach(calification => {
        var a = parseInt((calification["value"]))
        calificationValue = calificationValue + a

      }
      );
      this.resourceCalification = calificationValue / califications1.length
      var leftStars = 5 - this.resourceCalification;
      this.resourceCalificationArr = Array(Math.ceil(this.resourceCalification)).fill(0);
      this.resourceCalificationArrleft = Array(Math.floor(leftStars)).fill(0);
    }

  }
  publicResource(resource: Resources) {
    this.resourceService.publicResource(resource);
    this.router.navigate(['home']);
  }

  editResource(resource: Resources) {
    this.router.navigate(['resource', resource.id, 'edit']);
  }

  deleteResource(resource: Resources) {
    this.resourceService.deleteResource(resource);
    this.router.navigate(['admin','resources']);
  }

}
