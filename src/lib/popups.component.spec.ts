import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopsContainerComponent } from './pops-container.component';

describe('PopsContainerComponent', () => {
  let component: PopsContainerComponent;
  let fixture: ComponentFixture<PopsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
