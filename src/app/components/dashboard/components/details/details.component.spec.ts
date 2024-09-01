import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { DetailsComponent } from './details.component';
import { PolosService } from 'src/app/services/polos/polos.service';
import { PolosItau, AddressItau } from 'src/app/interfaces/polos.interface';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let mockPolosService: any;
  let mockRouter: any;
  let mockActivatedRoute: any;

  const mockPoloData: PolosItau = {
    id: 1,
    name: 'Polo Teste',
    business: 'Business Test',
    valuation: 1000000,
    cnpj: 12345678000199,
    active: true,
    cep: '12345-678',
  };

  const mockAddress: AddressItau = {
    cep: '12345-678',
    street: 'Rua Teste',
    neighborhood: 'Bairro Teste',
    state: 'SP',
    city: 'São Paulo'
  };

  beforeEach(async () => {
    mockPolosService = {
      getPolo: jasmine.createSpy('getPolo').and.returnValue(of(mockPoloData))
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    mockActivatedRoute = {
      snapshot: {
        params: { id: '1' }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      imports: [
        ReactiveFormsModule, 
        MatFormFieldModule, 
        MatInputModule, 
        MatSelectModule, 
        NoopAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: PolosService, useValue: mockPolosService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should initialize the form', () => {
    expect(component.poloForm).toBeDefined();
    expect(component.poloForm.contains('cep')).toBe(true);
    expect(component.poloForm.contains('street')).toBe(true);
    expect(component.poloForm.contains('neighborhood')).toBe(true);
    expect(component.poloForm.contains('state')).toBe(true);
    expect(component.poloForm.contains('city')).toBe(true);
    expect(component.poloForm.contains('name')).toBe(true);
    expect(component.poloForm.contains('business')).toBe(true);
    expect(component.poloForm.contains('valuation')).toBe(true);
    expect(component.poloForm.contains('cnpj')).toBe(true);
    expect(component.poloForm.contains('active')).toBe(true);
  });

  it('should patch address data into the form', () => {
    component.setAddress(mockAddress);
    expect(component.poloForm.value.cep).toEqual(mockAddress.cep);
    expect(component.poloForm.value.street).toEqual(mockAddress.street);
  });

  it('should format currency on blur', () => {
    component.poloForm.controls['valuation'].setValue('1234.5');
    component.formatCurrency();
    expect(component.poloForm.controls['valuation'].value).toBe('1234.50');
  });

  it('should navigate back to home on cancel', () => {
    component.onCancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/itau/home']);
  });

  it('should not submit the form if invalid', () => {
    spyOn(console, 'log');
    component.poloForm.controls['name'].setValue('');
    component.onSubmit();
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should format the valuation control value to 2 decimal places', () => {
    component.poloForm.controls['valuation'].setValue('1234.5');
    component.formatCurrency();
    expect(component.poloForm.controls['valuation'].value).toBe('1234.50');
  });

  it('should correctly parse the value string to a number', () => {
    const value = 'R$ 1.234,56';
    const parsedValue = component['parseValue'](value);
    expect(parsedValue).toBe(1.23456);
  });
});
