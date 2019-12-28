import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'app/client/services/auth.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  public SearchValue = '';
  public isAdmin: boolean;
  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.init();
  }

  async init() {
    this.isAdmin = await this.auth.isAdmin();
  }
}
