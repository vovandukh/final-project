import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newsText'
})
export class NewsTextPipe implements PipeTransform {

  transform(value: string ): string {
    let toArray
      let newArray = []
     if(value){
       toArray = value.split('.');
      for(let i = 0; i <= toArray.length ; i++){
          newArray.push('<p class="text">'+toArray[i] + toArray [i + 1] + toArray[i + 2]+'</p>');
          i+=3
      }
    }
    return  newArray.join(' ')
  }

}
