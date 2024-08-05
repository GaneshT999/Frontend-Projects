import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableUpdateComponent } from './mat-table-update.component';

describe('MatTableUpdateComponent', () => {
  let component: MatTableUpdateComponent;
  let fixture: ComponentFixture<MatTableUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTableUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTableUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
