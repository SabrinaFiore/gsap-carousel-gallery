import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HttpRequestGalleryComponent } from './http-request-gallery/http-request-gallery.component';
import { productService } from './service/product-service.service';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    HttpRequestGalleryComponent
  ],
  imports: [
    BrowserModule,
    NgxUsefulSwiperModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [productService],
  bootstrap: [AppComponent]
})
export class AppModule { }
