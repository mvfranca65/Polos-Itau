import { CurrencyBrPipe } from 'src/app/pipes/currencyBr.pipe';

describe('CurrencyBrPipe', () => {
  let pipe: CurrencyBrPipe;

  beforeEach(() => {
    pipe = new CurrencyBrPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a number to BRL currency format', () => {
    const value = 850000000.5;
    const result = pipe.transform(value);
    expect(result).toBe('R$ 850.000.000,50');
  });

  it('should return the value as is if it is a string', () => {
    const value = 'Not a number';
    const result = pipe.transform(value);
    expect(result).toBe(value);
  });
});
