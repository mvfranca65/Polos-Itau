import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'currencyBr'
})
export class CurrencyBrPipe implements PipeTransform {

  transform(value: number | string): string {
    if (typeof value === 'number') {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    
    return value;
  }
  
}
