import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(songs: string[], ...args: string[]): any {
    const songQuery = args[0];
    return songQuery === '' ? songs : songs.filter(song => song.toLowerCase().includes(songQuery.toLowerCase()));
  }

}
