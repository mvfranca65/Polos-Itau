import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { DetailsComponent } from './details.component';
import { PolosService } from 'src/app/services/polos/polos.service';
import { PolosItau, AddressItau } from 'src/app/interfaces/polos.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyLocalizedPipe } from 'src/app/pipes/currencyLocalized.pipe';

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
      declarations: [DetailsComponent, CurrencyLocalizedPipe],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [
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

  it('should get polo data on init and set company details', () => {
    component.ngOnInit();
    expect(mockPolosService.getPolo).toHaveBeenCalledWith('1');
    expect(component.poloData).toEqual(mockPoloData);
  });

  it('should patch address data into the form', () => {
    component.setAddress(mockAddress);
    expect(component.poloForm.value.cep).toEqual(mockAddress.cep);
    expect(component.poloForm.value.street).toEqual(mockAddress.street);
  });

  it('should parse value correctly in onValuationInput', () => {
    const event = { target: { value: 'R$ 1.234,56' } };
    component.onValuationInput(event);
    expect(component.poloForm.controls['valuation'].value).toBe(1.23456);
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
});
