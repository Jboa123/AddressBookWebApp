import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSavedAddressesComponent } from './view-saved-addresses.component';

describe('ViewSavedAddressesComponent', () => {
  let component: ViewSavedAddressesComponent;
  let fixture: ComponentFixture<ViewSavedAddressesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSavedAddressesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSavedAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
