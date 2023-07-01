import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnswerSheetComponent } from './user-answer-sheet.component';

describe('UserAnswerSheetComponent', () => {
  let component: UserAnswerSheetComponent;
  let fixture: ComponentFixture<UserAnswerSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAnswerSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAnswerSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
