import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HeaderComponent } from './header.component';
import { PolosService } from 'src/app/services/polos/polos.service';
import { UserData } from 'src/app/interfaces/userData.interface';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockPolosService: any;
  let mockRouter: any;

  const mockUserData: UserData = {
    name: 'Marcos França',
    position: 'Diretor',
  };

  beforeEach(async () => {
    mockPolosService = {
      getUser: jasmine.createSpy('getUser').and.returnValue(mockUserData)
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: PolosService, useValue: mockPolosService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set userData on init', () => {
    component.ngOnInit();
    expect(component.userData).toEqual(mockUserData);
    expect(mockPolosService.getUser).toHaveBeenCalled();
  });

  it('should navigate to the root path if userData.name is not set', () => {
    mockPolosService.getUser.and.returnValue({ name: '' });
    component.setUserData();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });

  it('should not navigate if userData.name is set', () => {
    component.setUserData();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
