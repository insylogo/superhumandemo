import { Component, OnInit, HostListener } from '@angular/core';
import { SlideshowService } from './slideshow.service';
import { Image } from './models/image';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
  animations: [
    // trigger('slideInOut', [
    // transition(':enter', [
    //   style({transform: 'translateX(-100%)'}),
    //   animate('200ms ease-in', style({transform: 'translateX(0%)'}))
    // ]),
    // transition(':leave', [
    //   animate('200ms ease-in', style({transform: 'translateX(-100%)'}))
    // ])
  //])
  ]
})
export class SlideshowComponent implements OnInit {

  private images:Image[] = [];
  private currentImageIndex:number = 0;
  private currentPage:number = 1;

  private get currentImageUrl ():string {
    if (!this.canShowImage())
      return '';

    let img = this.images[this.currentImageIndex].urls;

     return img.regular;
  }
 private get prevImage ():string {
    if (this.currentImageIndex == 0 || !this.canShowImage())
      return '';

    let img = this.images[this.currentImageIndex-1].urls;
    return img.thumb;
  }
  private get nextImage ():string {
    if (!this.canShowImage())
      return '';

    let img = this.images[this.currentImageIndex+1].urls;
    return img.thumb;
  }

  private canShowImage():boolean{
    return this.images.length > 0 
        && this.images[this.currentImageIndex] !== undefined;
  }
  
  next() {
    if (this.currentImageIndex == (this.images.length-1)) {
      this.currentPage++;
      this.svc.getImages(this.currentPage)
              .subscribe(o => this.images = this.images.concat(o));
    }
    this.currentImageIndex++;
  }

  prev() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  constructor(private svc:SlideshowService) { }

  ngOnInit() {
     this.svc.getImages(this.currentPage).subscribe(o => this.images = o);
  }
  @HostListener('document:keypress', ['$event'])
  onKeydown (event:KeyboardEvent) {
    switch(event.key) {
      case 'left':
          this.prev();
          return;
      case 'right':
          this.next();
          return;
      default:
          return;
    }
  }
}
