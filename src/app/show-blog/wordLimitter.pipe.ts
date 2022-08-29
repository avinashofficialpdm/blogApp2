import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordLimitter'
  // ,pure:false
})
export class WordLimitterPipe implements PipeTransform {
  transform(blog: string): string {
    let val=blog.split(' ')
    let newVal = val.splice(0,200).join(' ')
    return newVal
  }
}
