import { UserService } from './../../services/user.service';
import { Subscription } from 'rxjs';
import { ResourceService } from './../../services/resource.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { Category } from './../../models/category.interface';
import { CategoryService } from './../../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('nav', { static: false }) slider: NgImageSliderComponent;

  subscription: Subscription;
  resources = [];
  resourcesCreationDate = [];
  search = "";
  resourcesCount = 0;
  usersCount = 0;
  multimediaCount = 0;

  imageObject: Array<object> = [{
    image: 'https://i.ibb.co/CJ5XxkT/14.jpg',
    thumbImage: 'https://i.ibb.co/CJ5XxkT/14.jpg',
    alt: 'Cultura',
    title: 'title of image'
  }, {
    image: 'http://www.bioblog.com.br/wp-content/uploads/2017/02/o-que-e-biologia.jpg', // Support base64 image
    thumbImage: 'http://www.bioblog.com.br/wp-content/uploads/2017/02/o-que-e-biologia.jpg', // Support base64 image
    title: 'Biologia', //Optional: You can use this key if want to show image with title
    alt: 'Image alt', //Optional: You can use this key if want to show image with alt
    order: 1 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
  }, {
    image: 'http://www.bioblog.com.br/wp-content/uploads/2017/02/o-que-e-biologia.jpg',
    thumbImage: 'http://www.bioblog.com.br/wp-content/uploads/2017/02/o-que-e-biologia.jpg',
    alt: 'Biologia',
    title: 'title of image'
  }, {
    image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
    thumbImage: 'https://www.prensalibre.com/wp-content/uploads/2020/01/Metas-2020-Alimentaci%C3%B3n-Saludable.jpg?quality=82', // Support base64 image
    title: 'Alimentacion', //Optional: You can use this key if want to show image with title
    alt: 'Image alt', //Optional: You can use this key if want to show image with alt
    order: 1 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
  }, {
    image: 'assets/img/slider/1.jpg',
    thumbImage: 'https://hospitalveugenia.com/wp-content/uploads/2015/10/Videos-de-salud-Vimeo-Hospital-Victoria-Eugenia-Sevilla-1280x720.jpg',
    alt: 'Salud',
    title: 'title of image'
  }, {
    image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
    thumbImage: 'https://www.galdon.com/wp-content/uploads/2013/05/profesion-informatica-galdon-software-1024x576.jpg', // Support base64 image
    title: 'Informatica', //Optional: You can use this key if want to show image with title
    alt: 'Image alt', //Optional: You can use this key if want to show image with alt
    order: 1 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
  }
  ];


  constructor(public resourceService: ResourceService, public userService: UserService, public router: Router) { }

  ngOnInit() {
    this.countResources();
    this.countUsers();
    this.countMultimedia();
    this.subscription = this.resourceService.findAllresourcesOrderByCreatedAt().subscribe(resources => {
      resources.forEach(resource => {
        this.resourcesCreationDate.push({
          id: resource.id,
          image: resource.banner,
          thumbImage: resource.banner,
          title: resource.title,
          alt: resource.title
        })
      });
    })
  }

  showResourcesByCategory(category: string) {
    this.router.navigate(['category', category]);
  }

  clickImageCreationDate(event) {
    this.router.navigate(['resource', this.resourcesCreationDate[event].id]);
  }

  searchResources() {
    if (this.search.length > 0) {
      this.router.navigate(['search', encodeURI(this.search)]);
    }
  }

  countResources() {
    this.subscription = this.resourceService.findAllResources().subscribe(resources => {
      this.resourcesCount = resources.length;
    })
  }
  countUsers() {
    this.subscription = this.userService.findAllUsers().subscribe(users => {
      this.usersCount = users.length
    })
  }

  countMultimedia() {
    this.subscription = this.resourceService.findAllMultimedia().subscribe(resources => {
      this.multimediaCount = resources.length;
    })
  }

}

