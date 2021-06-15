import { Component, OnInit, ViewChild  } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'app-category-resources',
  templateUrl: './category-resources.component.html',
  styleUrls: ['./category-resources.component.css']
})
export class CategoryResourcesComponent implements OnInit {
  @ViewChild('nav', {static: false}) slider: NgImageSliderComponent;

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
  constructor() { }

  ngOnInit() {
  }

}
