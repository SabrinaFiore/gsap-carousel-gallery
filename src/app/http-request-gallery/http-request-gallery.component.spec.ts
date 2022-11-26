import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpRequestGalleryComponent } from './http-request-gallery.component';

describe('HttpRequestGalleryComponent', () => {
  let component: HttpRequestGalleryComponent;
  let fixture: ComponentFixture<HttpRequestGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpRequestGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpRequestGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
