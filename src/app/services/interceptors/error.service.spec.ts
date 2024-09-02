import { TestBed } from '@angular/core/testing';
import { ErrorInterceptor } from './error.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
        }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    snackBar = TestBed.inject(MatSnackBar);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should intercept HTTP requests and handle errors', () => {
    httpClient.get('/test').subscribe(
      () => fail('should have failed with a 500 error'),
      () => {}
    );

    const req = httpMock.expectOne('/test');

    req.flush(null, { status: 500, statusText: 'Internal Server Error' });

    expect(req.request.method).toBe('GET');
  });
});
