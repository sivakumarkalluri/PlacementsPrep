import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditExamsComponent } from './admin-edit-exams.component';

describe('AdminEditExamsComponent', () => {
  let component: AdminEditExamsComponent;
  let fixture: ComponentFixture<AdminEditExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditExamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
