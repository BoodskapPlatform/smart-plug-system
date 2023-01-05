import { UserDataService } from './../../../services/userdata.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secured.layout',
  templateUrl: './secured.layout.component.html',
  styleUrls: ['./secured.layout.component.css']
})
export class SecuredLayoutComponent implements OnInit {

  public _subscription_user_data:any;
  public userObj:any;

  constructor(
      private router: Router,
      private _userDataService: UserDataService
    ) {
  }

  logout(){
    localStorage.removeItem("userObj");
    this.router.navigate(["/login"])
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