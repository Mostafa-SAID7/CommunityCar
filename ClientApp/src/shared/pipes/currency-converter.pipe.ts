import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConverter',
  standalone: true
})
export class CurrencyConverterPipe implements PipeTransform {
  // Simple currency conversion rates (in a real app, this would come from a service)
  private rates: { [key: string]: number } = {
    'USD': 1,
    'EUR': 0.85,
    'GBP': 0.73,
    'JPY': 110.0,
    'EGP': 30.9,
    'SAR': 3.75
  };

  transform(value: number, fromCurrency: string = 'USD', toCurrency: string = 'USD', decimals: number = 2): string {
    if (!value || !fromCurrency || !toCurrency) {
      return '';
    }

    if (fromCurrency === toCurrency) {
      return this.formatCurrency(value, toCurrency, decimals);
    }

    const fromRate = this.rates[fromCurrency.toUpperCase()];
    const toRate = this.rates[toCurrency.toUpperCase()];

    if (!fromRate || !toRate) {
      return this.formatCurrency(value, fromCurrency, decimals);
    }

    const convertedValue = (value / fromRate) * toRate;
    return this.formatCurrency(convertedValue, toCurrency, decimals);
  }

  private formatCurrency(value: number, currency: string, decimals: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  }
}