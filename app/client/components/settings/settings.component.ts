import { Component, ElementRef, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from 'app/client/interfaces/user';
import { AuthService } from 'app/client/services/auth.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public adminCtrl = new FormControl();
  users: User[] = [];
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.init();
  }

  async init() {
    this.users = await this.auth.getUsers();
  }
  remove(admin: User) {
    admin.isAdmin = false;
    this.users = [...this.users];
  }
  selectedOption(e: MatAutocompleteSelectedEvent) {
    const itemIndex = this.users.indexOf(e.option.value);
    this.users[itemIndex].isAdmin = true;
    this.users = [...this.users];
  }


}
