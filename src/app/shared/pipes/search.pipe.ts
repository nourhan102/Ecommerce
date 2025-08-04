import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(date: any[], text: any) : any {
    return date.filter( (item)=>item.title.toLowerCase().includes(text.toLowerCase()) )
    
  }

 
}
