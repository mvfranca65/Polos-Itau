import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PolosService } from './polos.service';
import { UserData } from '../../interfaces/userData.interface';
import { PolosItau, AddressItau } from '../../interfaces/polos.interface';
import getAddress from 'cep-promise';

describe('PolosService', () => {
  let service: PolosService;
  let httpMock: HttpTestingController;

  const mockPoloData: PolosItau = {
    id: 1,
    name: 'Polo Teste',
    business: 'Business Test',
    valuation: 1000000,
    cnpj: 12345678000199,
    active: true,
    cep: '12345-678',
  };

  const mockUserData: UserData = {
    name: '',
    position: 'Diretor Itaú BBA'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PolosService]
    });

    service = TestBed.inject(PolosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user data', () => {
    const userData = service.getUser();
    expect(userData).toEqual(mockUserData);
  });

  it('should update user name', () => {
    service.postUser('Marcos França');
    expect(service.getUser().name).toBe('Marcos França');
  });

  it('should fetch all polos', () => {
    service.getAllPolos().subscribe((polos) => {
      expect(polos.length).toBe(1);
      expect(polos).toEqual([mockPoloData]);
    });

    const req = httpMock.expectOne(`${service['path']}/itau_teste`);
    expect(req.request.method).toBe('GET');
    req.flush([mockPoloData]);
  });

  it('should fetch a single polo by id', () => {
    service.getPolo('1').subscribe((polo) => {
      expect(polo).toEqual(mockPoloData);
    });

    const req = httpMock.expectOne(`${service['path']}/itau_teste/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPoloData);
  });

  it('should fetch address by cep', async () => {
    const mockAddress: AddressItau = {
      cep: '12345-678',
      street: 'Rua Teste',
      neighborhood: 'Bairro Teste',
      state: 'SP',
      city: 'São Paulo'
    };

    spyOn(service, 'getAddress').and.returnValue(Promise.resolve(mockAddress));

    const result = await service.getAddress('12345-678');
    expect(result).toEqual(mockAddress);
  });

  it('should handle error when fetching address fails', async () => {
    spyOn(service, 'getAddress').and.returnValue(Promise.reject('Erro'));

    try {
      await service.getAddress('12345-678');
      fail('Expected getAddress to throw');
    } catch (error) {
      expect(error).toBe('Erro');
    }
  });
});
