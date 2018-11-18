import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentViewComponent } from './present-view.component';

describe('PresentViewComponent', () => {
  let component: PresentViewComponent;
  let fixture: ComponentFixture<PresentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
