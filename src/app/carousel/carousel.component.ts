import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { CarouselModel } from './models/carouselModel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @ViewChild('carouselContainer', { static: true}) carouselContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('carousel', { static: true}) carousel!: ElementRef<HTMLDivElement>;

  @Input() data!: CarouselModel[];

  baseZIndex = 50;
  scaleRatio = 10;
  middleIndex!: number;

  isAnimating = false;
  prevSlideFinished = false;

  constructor() { }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    this.initCarousel();
  }

  ngOnInit(): void {
  }

  initCarousel(): void {
    if (this.carousel && this.carousel.nativeElement) {
      gsap.to(this.carousel.nativeElement.children, {
        duration: 0,
        top: '30%',
        left: '30%',
        transform: 'translate(-50%,  -50%)'
      });

      this.middleIndex = Math.ceil(this.carousel.nativeElement.childNodes.length / 2);
      const midElement = this.carousel.nativeElement.children[this.middleIndex - 1];
      gsap.to(midElement, {
        duration: 0,
        zIndex: this.baseZIndex,
        width: '650px'
      });
      this.positionLeftNodes(this.middleIndex);
      this.positionRightNodes(this.middleIndex)
    }
  }

  positionLeftNodes(middleIndex: number) {
    let countingForewards = 0;
    let tempZIndex = 0;

    for (let i = middleIndex -1; i >= 0; i--) {
      tempZIndex -= 1;
      countingForewards++;

      const leftNodes = this.carousel.nativeElement.children[i -1];
      if (leftNodes) {
        gsap.to(leftNodes, {
          duration: 0,
          zIndex: tempZIndex,
          x: -(80 * countingForewards),
          scale: `0.${this.scaleRatio - countingForewards}`
        })
      }
    }
  }

  positionRightNodes(middleIndex: number) {
    const carouselLenght = this.carousel.nativeElement.children.length;
    let countingForewards = 0;
    let tempZIndex = this.baseZIndex;

    for (let i = middleIndex; i < carouselLenght; i++) {
      countingForewards++,
      tempZIndex -= 1;
      const rightNodes = this.carousel.nativeElement.children[i] as HTMLDivElement;
      if (rightNodes) {
        gsap.to(rightNodes, {
          duration: 0,
          zIndex: tempZIndex,
          x: 80 * countingForewards,
          scale: `0.${this.scaleRatio - countingForewards}`
        });
      }
    }
  }

  get noMoreElements(): boolean {
    return (this.carousel.nativeElement.children[this.middleIndex + 1] === undefined)
  }

  next() {
    this.isAnimating = true;
    this.prevSlideFinished = false;

    if (this.middleIndex > 1) {
      this.moveLeftSideAlongWithMainElement();
      this.moveRemainngRightSide();
    }
  }

  moveLeftSideAlongWithMainElement():void {
    for (let i = 0; i < this.middleIndex; i++) {
      const element = this.carousel.nativeElement.children[i] as HTMLDivElement;
      const prevElement = this.carousel.nativeElement.children[i -1] as HTMLDivElement;

      // getting current stylevalues
      // getProperty() provides an easy way to get the current value of any property and if it's a DOM element,
      // you can even have it convert into a particular unit!
      const currentTranslateXValue =  Number(gsap.getProperty(element, 'translateX'));
      const currZIndex = Number(gsap.getProperty(element, 'zIndex'));
      const currentScale = Number(gsap.getProperty(element, 'scale'));

      // we found main element, move this to right side and decrese z-index
      if (currZIndex === this.baseZIndex) {
        console.log("[debug] currZIndex", currZIndex)
        gsap.to(element, {
          duration: 0.3,
          // zIndex: typeof currZIndex === 'number' && currZIndex -1
          zIndex: currZIndex && currZIndex -1 ,
          x: 80,
          scale: '0.9'
        })
        // gsap update previous zindex
        gsap.to(prevElement, {
          duration: 0.3,
          zIndex: this.baseZIndex
        });
        this.middleIndex = i;
      } else {
        console.log("[debug] ELSE")
        // move all the remain elements to left
        gsap.to(element, {
          duration: 0.3,
          zIndex: currZIndex && currZIndex +1,
          x: currentTranslateXValue && currentTranslateXValue + 80,
          scale: currentScale && parseFloat((currentScale + 0.1).toFixed(1))
        })
      }
    }
  }

  moveRemainngRightSide() {
    const length = this.carousel.nativeElement.children.length;

    for (let i = this.middleIndex; i < length; i++) {
      // getting current stylevalues
      // getProperty() provides an easy way to get the current value of any property and if it's a DOM element,
      // you can even have it convert into a particular unit!
      const element = this.carousel.nativeElement.children[i] as HTMLDivElement;
      const currentTranslateXValue =  Number(gsap.getProperty(element, 'translateX'));
      const currZIndex = Number(gsap.getProperty(element, 'zIndex'));
      const currentScale = Number(gsap.getProperty(element, 'scale'));

      gsap.to(element, {
        duration: 0.3,
        zIndex: currZIndex && currZIndex -1,
        x: currentTranslateXValue && currentTranslateXValue + 80,
        scale: currentScale && parseFloat((currentScale - 0.1).toFixed(1)),
        onComplete: () => {(this.isAnimating = false)}
      })
    }
  }

  moveLeftSideAlongWithMainElementPrev() {
    console.log("[debug] moveLeftSideAlongWithMainElementPrev")

    for (let i = this.middleIndex; i >= 0; i--) {
      console.log("[debug] moveLeftSideAlongWithMainElementPrev ")
      const element = this.carousel.nativeElement.children[i] as HTMLDivElement;
      const nextElement = this.carousel.nativeElement.children[i +1] as HTMLDivElement;

      const currentTranslateXValue =  Number(gsap.getProperty(element, 'translateX'));
      const currZIndex = Number(gsap.getProperty(element, 'zIndex'));
      const currentScale = Number(gsap.getProperty(element, 'scale'));

      // we found main element, move this to left side and assign negative z index
      if (currZIndex === this.baseZIndex) {
        console.log("[debug] currZIndex", currZIndex)
        gsap.to(element, {
          duration: 0.3,
          zIndex: -1,
          x: currentTranslateXValue && currentTranslateXValue - 80,
          scale: currentScale && parseFloat((currentScale - 0.1).toFixed(1))
        })
        console.log(currentTranslateXValue && currentTranslateXValue - 80)
        // update next element z-index to be main
        gsap.to(nextElement, {
          duration: 0.3,
          zIndex: this.baseZIndex,
          x: currentTranslateXValue && currentTranslateXValue,
          scale: currentScale && parseFloat((currentScale.toFixed(1)))
        })
        console.log(currentTranslateXValue && currentTranslateXValue)
        this.middleIndex = i + 1;
      } else {
        gsap.to(element, {
          duration: 0.3,
          zIndex: currZIndex && currZIndex - 1,
          x: currentTranslateXValue && currentTranslateXValue - 80,
          onComplete: () => {
            this.isAnimating = false;
            if (this.noMoreElements) {
              this.prevSlideFinished = true;
            } else {
              this.prevSlideFinished = false;
            }
          }
        })
      }
    }
  }

  moveRemainingRightSidePrev() {
    console.log("[debug] moveRemainingRightSidePrev")
    let tempZIndex = this.baseZIndex;
    const length = this.carousel.nativeElement.children.length;

    for (let i = this.middleIndex + 1; i < length; i++) {
      const element = this.carousel.nativeElement.children[i] as HTMLDivElement;
      const currentTranslateXValue =  Number(gsap.getProperty(element, 'translateX'));
      const currentScale = Number(gsap.getProperty(element, 'scale'));
      tempZIndex--;

      gsap.to(element, {
        duration: 0.3,
        zIndex: tempZIndex,
        x: currentTranslateXValue && currentTranslateXValue - 80,
        scale: currentScale && parseFloat((currentScale + 0.1).toFixed(1))
      })
    }
  }

  prev() {
    this.isAnimating = true;
    this.moveLeftSideAlongWithMainElementPrev();
    this.moveRemainingRightSidePrev();
  }
}
