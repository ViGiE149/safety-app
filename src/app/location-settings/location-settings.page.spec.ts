import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationSettingsPage } from './location-settings.page';

describe('LocationSettingsPage', () => {
  let component: LocationSettingsPage;
  let fixture: ComponentFixture<LocationSettingsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LocationSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
