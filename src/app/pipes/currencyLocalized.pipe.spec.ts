import { registerLocaleData } from '@angular/common';
import { CurrencyLocalizedPipe } from 'src/app/pipes/currencyLocalized.pipe';
import localePt from '@angular/common/locales/pt';
import { FormBuilder } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('CurrencyLocalizedPipe', () => {
  let pipe: CurrencyLocalizedPipe;

  registerLocaleData(localePt, 'pt');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: LOCALE_ID, useValue: 'pt' },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    pipe = new CurrencyLocalizedPipe("pt");
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a number to BRL currency format', () => {
    const value = 850000000.5;
    const result = pipe.transform(value);
    expect(result).toBe('R$ 850.000.000,50');
  });
});
