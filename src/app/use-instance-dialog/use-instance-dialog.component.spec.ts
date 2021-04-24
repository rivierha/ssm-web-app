import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseInstanceDialogComponent } from './use-instance-dialog.component';

describe('UseInstanceDialogComponent', () => {
  let component: UseInstanceDialogComponent;
  let fixture: ComponentFixture<UseInstanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseInstanceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseInstanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
