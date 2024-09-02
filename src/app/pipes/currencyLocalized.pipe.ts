import { Pipe, PipeTransform, Inject, LOCALE_ID } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Pipe({
  name: 'currencyLocalized'
})
export class CurrencyLocalizedPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string, private route: ActivatedRoute) {}

  transform(value: number | string, currencyCode: string = 'BRL'): string {
    const language = this.route.snapshot.url[0].path; // 'pt'
    const locale = this.getLocale(language);
    console.log('LANGUAGE => ', language);

    console.log("LOCALE => ", locale);

    if (typeof value === 'number') {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    
    return value;
  }

  getLocale = (locale: string) => ({
    'pt': 'pt-BR',
    'en': 'en-US',
    'es': 'es-ES'
  }[locale] || 'Not Found');
}
