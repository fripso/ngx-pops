import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupsContainerComponent } from './popups-container.component';

describe('PopupsContainerComponent', () => {
  let component: PopupsContainerComponent;
  let fixture: ComponentFixture<PopupsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
