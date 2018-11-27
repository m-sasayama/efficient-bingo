import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentPanelComponent } from './present-panel.component';

describe('PresentPanelComponent', () => {
  let component: PresentPanelComponent;
  let fixture: ComponentFixture<PresentPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
