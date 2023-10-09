import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailSupportPage } from './email-support.page';

describe('EmailSupportPage', () => {
  let component: EmailSupportPage;
  let fixture: ComponentFixture<EmailSupportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmailSupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
