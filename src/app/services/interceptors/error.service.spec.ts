import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './error.service';

describe('ErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should handle server-side error', () => {
    spyOn(window, 'alert');

    httpClient.get('/test').subscribe({
      next: () => fail('should have failed with a server-side error'),
      error: () => {
        expect(window.alert).toHaveBeenCalled();
      },
    });

    const req = httpMock.expectOne('/test');
    req.flush('Server-side error', { status: 500, statusText: 'Internal Server Error' });
  });
});
