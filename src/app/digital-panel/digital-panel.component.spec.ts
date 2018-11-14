import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalPanelComponent } from './digital-panel.component';

describe('DigitalPanelComponent', () => {
  let component: DigitalPanelComponent;
  let fixture: ComponentFixture<DigitalPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
