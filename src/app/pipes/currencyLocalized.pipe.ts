import { formatCurrency, getCurrencySymbol } from "@angular/common";
import { Pipe, PipeTransform, Inject, LOCALE_ID } from "@angular/core";

@Pipe({
  name: 'currencyLocalized'
})
export class CurrencyLocalizedPipe implements PipeTransform {

  constructor(
    @Inject(LOCALE_ID) private locale: string
  ) {}

  transform(value: number | string): string | null {
    const numberValue = typeof value === 'string' ? parseFloat(value) : value;
    const currencyCode: string = this.getLocale(this.locale);

    return formatCurrency(numberValue, this.locale, getCurrencySymbol(currencyCode, 'narrow'), currencyCode, '1.2-2');
  }

  getLocale = (locale: string): string => ({
    'pt': 'BRL',
    'en': 'USD',
    'es': 'EUR'
  }[locale] || 'Not Found');
}
