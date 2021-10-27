import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  public brands = [
    {imagePath:'assets/images/brands/brand-1-bg.webp'},
    {imagePath:'assets/images/brands/brand-2-bg.webp'},
    {imagePath:'assets/images/brands/brand-3-bg.jpg'},
    {imagePath:'assets/images/brands/brand-4-bg.webp'},
    {imagePath:'assets/images/brands/brand-5-bg.webp'},
    {imagePath:'assets/images/brands/brand-6-bg.webp'},
    {imagePath:'assets/images/brands/brand-7-bg.webp'},
    {imagePath:'assets/images/brands/brand-8-bg.webp'},
    {imagePath:'assets/images/brands/brand-9-bg.webp'},
    {imagePath:'assets/images/brands/brand-10-bg.webp'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
