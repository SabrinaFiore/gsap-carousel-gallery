import { productService } from './../service/product-service.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CarouselModel } from '../carousel/models/carouselModel';

@Component({
  selector: 'app-http-request-gallery',
  templateUrl: './http-request-gallery.component.html',
  styleUrls: ['./http-request-gallery.component.scss']
})
export class HttpRequestGalleryComponent implements OnInit {
  @Input() images!: CarouselModel[];

  productCreate:any;
  request: any;
  err!: any;
  loading: boolean = true;

  selectedIndex = 0;

  constructor(private http: HttpClient,
    private productService: productService) { }

  ngOnInit(): void {
    this.onProductCreate();
  }

  onProductCreate(): void {
    this.productService.createProduct().subscribe((data: any[]) => {
      this.request = data;
      this.loading = false;
      // console.log("[debug] data FROM HTTP-REQUEST-GALLERY",this.request)
    })
  }

  goPrev() {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length -1
      console.log("[debug] IF this.selectedIndex", this.selectedIndex)
    }else {
      this.selectedIndex--;
      console.log("[debug] ELSE this.selectedIndex", this.selectedIndex)
    }
  }
  goNext() {
    console.log()
    if (this.selectedIndex === this.images.length -1) {
      this.selectedIndex = 0
      console.log("[debug] goNext IF this.selectedIndex", this.selectedIndex)
    }else {
      this.selectedIndex++;
      console.log("[debug] goNext ELSE this.selectedIndex", this.selectedIndex)
    }
  }
}
