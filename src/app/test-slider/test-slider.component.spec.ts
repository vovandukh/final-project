import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSliderComponent } from './test-slider.component';

describe('TestSliderComponent', () => {
  let component: TestSliderComponent;
  let fixture: ComponentFixture<TestSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
