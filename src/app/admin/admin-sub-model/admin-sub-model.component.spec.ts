import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubModelComponent } from './admin-sub-model.component';

describe('AdminSubModelComponent', () => {
  let component: AdminSubModelComponent;
  let fixture: ComponentFixture<AdminSubModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSubModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
