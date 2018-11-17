import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoViewComponent } from './bingo-view.component';

describe('BingoViewComponent', () => {
  let component: BingoViewComponent;
  let fixture: ComponentFixture<BingoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BingoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
