import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordLimitter'
})
export class WordLimitterPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let val=value.split(' ')
    let newVal = val.splice(0,200).join(' ')
    return newVal
  }

}
