import { Router } from '@angular/router';
import { UserDataService } from './../../../services/userdata.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public _subscription_user_data:any;
  public userObj:any;

  constructor(
      private router: Router,
      private _userDataService: UserDataService,
    ) {
  }


  ngOnDestroy() {
    this._subscription_user_data.unsubscribe();
  }

  ngOnInit(): void {
    this._subscription_user_data = this._userDataService.userDataChange$.subscribe(value => {
      this.userObj= value;
    });
  }
}
