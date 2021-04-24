import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstanceDialogComponent } from './create-instance-dialog.component';

describe('CreateInstanceDialogComponent', () => {
  let component: CreateInstanceDialogComponent;
  let fixture: ComponentFixture<CreateInstanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInstanceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInstanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
