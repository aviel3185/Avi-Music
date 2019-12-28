import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(users: User[], isAdmin: boolean): any {
    return isAdmin ? users.filter(user => user.isAdmin) : users.filter(user => !user.isAdmin);
  }

}
