import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  transform(timeInSeconds: number): string {
    if (isNaN(timeInSeconds)) return '';

    const h = Math.floor(timeInSeconds / 3600);
    const m = Math.floor((timeInSeconds % 3600) / 60);
    const s = Math.floor((timeInSeconds % 3600) % 60);

    const hDisplay = h > 0 ? (h < 10 ? '0' + h : h) + ' : ' : '';
    const mDisplay = (m > 0 ? (m < 10 ? '0' + m : m) : '00') + ' : ';
    const sDisplay = s > 0 ? (s < 10 ? '0' + s : s) : '00';

    return hDisplay + mDisplay + sDisplay;
  }
}
