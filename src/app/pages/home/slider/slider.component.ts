import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SubscribersService } from 'src/app/shared/services/subscribers/subscribers.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],

})

export class SliderComponent implements OnInit {
  public subscribeForm!: FormGroup;
  public invalid = {}
  public image = [
    'assets/images/slide-1-bg.jpg',
    'assets/images/slide-2-bg.jpg',
    'assets/images/slide-3-bg.jpg'
  ]

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "swipeToSlide": false,
    "dots": true,
    "speed": 2500,
    "arrows": false,
    "infinite": true,
    "autoplay": true,
    "responsive": [
      {
        breakpoint: 700,
        dots: false,
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };



  constructor(private fb: FormBuilder, private toast: ToastrService, private subscribeService: SubscribersService) { }


  ngOnInit(): void {
    this.initSubscribeForm()
  }

  initSubscribeForm() {
    this.subscribeForm = this.fb.group({
      email: ['', Validators.email]
    })
  }

  getSubscribe(event: any) {
    if (this.subscribeForm.valid == false || !this.subscribeForm.controls.email.value ) {
      this.toast.error('Invalid Email');
      event.target.children[0].style = 'border: 1px solid red';
    } else {
      this.subscribeService.createSubscribers(this.subscribeForm.value).then(() => {
        this.toast.success('Thanks for subscribing')
        event.target.children[0].style = '1px solid rgb(222, 222, 222)';
        this.initSubscribeForm()
      })
    }
  }
  slickInit(e: any) {
  }
  breakpoint(e: any) {
  }
  afterChange(e: any) {
  }
  beforeChange(e: any) {
  }



}
