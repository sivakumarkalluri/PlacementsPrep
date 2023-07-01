import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDExamsComponent } from './crudexams.component';

describe('CRUDExamsComponent', () => {
  let component: CRUDExamsComponent;
  let fixture: ComponentFixture<CRUDExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRUDExamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CRUDExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
