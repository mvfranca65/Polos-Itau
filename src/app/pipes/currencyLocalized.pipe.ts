import { Pipe, PipeTransform, Inject, LOCALE_ID } from "@angular/core";

@Pipe({
  name: 'currencyLocalized'
})
export class CurrencyLocalizedPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transform(value: number | string, currencyCode: string = 'BRL'): string {
    if (typeof value === 'number') {
      return value.toLocaleString(this.locale, { style: 'currency', currency: currencyCode });
    }
    
    return value;
  }
}
