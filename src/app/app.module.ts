import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/dashboard/components/header/header.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ErrorInterceptor } from './services/interceptors/error.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomPaginatorIntlEn } from '../assets/custom/custom-paginator-intl-en';
import { CustomPaginatorIntlEs } from '../assets/custom/custom-paginator-intl-es';
import { CustomPaginatorIntlPt } from '../assets/custom/custom-paginator-int-pt';


@NgModule({
  declarations: [
    AppComponent,    
    LoginComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule, 
    MatPaginatorModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useFactory: (locale: string) => {
        switch (locale) {
          case 'en':
            return new CustomPaginatorIntlEn();
          case 'es':
            return new CustomPaginatorIntlEs();
          default:
            return new CustomPaginatorIntlPt();
        }
      },
      deps: [LOCALE_ID]
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi : true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
