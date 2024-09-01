import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { PolosService } from 'src/app/services/polos/polos.service';
import { PolosItau } from 'src/app/interfaces/polos.interface';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockPolosService: any;
  let mockRouter: any;

  const mockPolos: PolosItau[] = [
    { id: 1, name: 'Polo 1', business: 'Business 1', valuation: 1000000, active: true, cep: '12345-678', cnpj: 11111111111112 },
    { id: 2, name: 'Polo 2', business: 'Business 2', valuation: 2000000, active: false, cep: '23456-789', cnpj: 11111111111111 }
  ];

  beforeEach(async () => {
    mockPolosService = {
      getAllPolos: jasmine.createSpy('getAllPolos').and.returnValue(of(mockPolos))
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: PolosService, useValue: mockPolosService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all polos on init', () => {
    component.ngOnInit();
    expect(mockPolosService.getAllPolos).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockPolos);
  });

  it('should navigate to details page on seeDetails', () => {
    component.seeDetails(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['itau/detalhes/1']);
  });

  it('should sort data correctly by name', () => {
    component.dataSource.data = mockPolos;
    const sortEvent = { active: 'name', direction: 'asc' } as Sort;
    component.sortData(sortEvent);
    expect(component.dataSource.data[0].name).toBe('Polo 1');
  });

  it('should sort data correctly by business', () => {
    component.dataSource.data = mockPolos;
    const sortEvent = { active: 'business', direction: 'desc' } as Sort;
    component.sortData(sortEvent);
    expect(component.dataSource.data[0].business).toBe('Business 2');
  });

  it('should sort data correctly by valuation', () => {
    component.dataSource.data = mockPolos;
    const sortEvent = { active: 'valuation', direction: 'asc' } as Sort;
    component.sortData(sortEvent);
    expect(component.dataSource.data[0].valuation).toBe(1000000);
  });

  it('should sort data correctly by situation', () => {
    component.dataSource.data = mockPolos;
    const sortEvent = { active: 'situation', direction: 'asc' } as Sort;
    component.sortData(sortEvent);
    expect(component.dataSource.data[0].active).toBe(false);
  });
});

