import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { CepComponent } from './cep.component';
import { PolosService } from 'src/app/services/polos/polos.service';
import { AddressItau } from 'src/app/interfaces/polos.interface';

describe('CepComponent', () => {
  let component: CepComponent;
  let fixture: ComponentFixture<CepComponent>;
  let mockPolosService: any;
  let mockSnackBar: any;

  const mockAddress: AddressItau = {
    cep: '04538-132',
    street: 'Avenida Brigadeira Faria Lima',
    neighborhood: 'Itaim Bibi',
    state: 'SP',
    city: 'São Paulo'
  };

  beforeEach(async () => {
    mockPolosService = {
      getAddress: jasmine.createSpy('getAddress').and.returnValue(Promise.resolve(mockAddress))
    };

    mockSnackBar = {
      open: jasmine.createSpy('open')
    };

    await TestBed.configureTestingModule({
      declarations: [CepComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: PolosService, useValue: mockPolosService },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CepComponent);
    component = fixture.componentInstance;
    component.cep = '04538-132';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with a cep control', () => {
    expect(component.cepForm.contains('cep')).toBe(true);
    expect(component.cepForm.get('cep')?.value).toBe('04538-132');
  });

  it('should call getAddress on init and when cep value changes to valid value', async () => {
    component.ngOnInit();
    expect(mockPolosService.getAddress).toHaveBeenCalledWith('04538-132');

    component.cepForm.get('cep')?.setValue('04538-133');
    expect(mockPolosService.getAddress).toHaveBeenCalledWith('04538-133');
  });

  it('should emit address when getAddress is successful', async () => {
    spyOn(component.notify, 'emit');

    await component.getAddress('04538-132');

    expect(component.notify.emit).toHaveBeenCalledWith(mockAddress);
  });
});
