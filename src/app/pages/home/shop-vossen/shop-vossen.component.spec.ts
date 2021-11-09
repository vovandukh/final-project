import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopVossenComponent } from './shop-vossen.component';

describe('ShopVossenComponent', () => {
  let component: ShopVossenComponent;
  let fixture: ComponentFixture<ShopVossenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopVossenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopVossenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
