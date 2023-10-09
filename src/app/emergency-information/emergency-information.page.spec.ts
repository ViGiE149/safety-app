import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmergencyInformationPage } from './emergency-information.page';

describe('EmergencyInformationPage', () => {
  let component: EmergencyInformationPage;
  let fixture: ComponentFixture<EmergencyInformationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmergencyInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
