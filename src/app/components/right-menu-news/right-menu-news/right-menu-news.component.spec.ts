import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightMenuNewsComponent } from './right-menu-news.component';

describe('RightMenuNewsComponent', () => {
  let component: RightMenuNewsComponent;
  let fixture: ComponentFixture<RightMenuNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightMenuNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightMenuNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
