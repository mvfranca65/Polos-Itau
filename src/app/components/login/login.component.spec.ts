import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PolosService } from 'src/app/services/polos/polos.service';
import { LoginComponent } from './login.component';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: any;
  let mockPolosService: any;

  beforeEach(async () => {
    mockRouter = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };

    mockPolosService = {
      postUser: jasmine.createSpy('postUser').and.returnValue(of(true))
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: PolosService, useValue: mockPolosService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with a name control', () => {
    expect(component.loginForm.contains('name')).toBe(true);
  });

  it('should make the name control required', () => {
    const control = component.loginForm.get('name');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the name control invalid if less than 3 characters', () => {
    const control = component.loginForm.get('name');
    control?.setValue('ab');
    expect(control?.valid).toBeFalsy();
  });

  it('should call postUser with the correct value and navigate to /itau/home', () => {
    const nameValue = 'Test User';
    component.loginForm.controls['name'].setValue(nameValue);
    component.onSubmit();

    expect(mockPolosService.postUser).toHaveBeenCalledWith(nameValue);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/itau/home');
  });
});