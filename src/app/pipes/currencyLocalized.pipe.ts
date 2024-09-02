import { formatCurrency, getCurrencySymbol } from "@angular/common";
import { Pipe, PipeTransform, Inject, LOCALE_ID } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Pipe({
  name: 'currencyLocalized'
})
export class CurrencyLocalizedPipe implements PipeTransform {

  constructor(
    @Inject(LOCALE_ID) private locale: string
  ) {}

  transform(value: number | string): string | null {
    const numberValue = typeof value === 'string' ? parseFloat(value) : value;
    let currencyCode: string;

    switch (this.locale) {
      case 'en':
        currencyCode = 'USD';
        break;
      case 'es':
        currencyCode = 'EUR';
        break;
      default:
        currencyCode = 'BRL';
        break;
    }

    return formatCurrency(numberValue, this.locale, getCurrencySymbol(currencyCode, 'narrow'), currencyCode, '1.2-2');
  }

  getLocale = (locale: string) => ({
    'pt': 'pt-BR',
    'en': 'en-US',
    'es': 'es-ES'
  }[locale] || 'Not Found');
}
