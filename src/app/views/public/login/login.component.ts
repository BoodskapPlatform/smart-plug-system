import { UserDataService } from './../../../services/userdata.service';
import { DomainModel } from 'src/app/models/DomainModel';
import { HttpService } from './../../../utils/http.services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
 
  public submitted = false;
  public isLoading = false;

  constructor(
    protected router: Router, 
    protected httpService: HttpService,
    private _userDataService: UserDataService
    ) {}

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  public login() {

    this.submitted = true;
    this.isLoading = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.httpService.loginAPI(this.loginForm.value).subscribe({
        next: (res) => {
          if(res){
              if(res.partDomains.length === 1){

                this._userDataService.userDataChange(res);
                this.router.navigate(["/dashboard"]);

              }else if(res.partDomains.length > 1){

                localStorage.setItem("sessionObj",JSON.stringify(res));
                this.router.navigate(["/domains"]);

              }else{
                console.log("Domain not found!");
              }
          }
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.isLoading = false;
          console.log("Completed!!!");
        }
      });
  }

  public switchDomain(domainObj:DomainModel){
    this.httpService.postCall(
      `/domain/login/switch/${domainObj["token"]}/${domainObj["domainKey"]}`,
      this.loginForm.value).subscribe(
      {
        next: (res) => {
          if(res != null){
            // localStorage.setItem("userObj",JSON.stringify(res));
            this._userDataService.userDataChange(res);
            this.router.navigate(["/dashboard"]);
          }else{
            console.error(res);
          }
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.log("Completed!!!");
        }
      }
    );
  }

  public pageNavigator(url:String) {
    this.router.navigate(['/'+url]);
  }

  ngOnInit(): void {
    if(localStorage.getItem("sessionObj") != null){
        this.router.navigate(["/domains"]);
    };
  }
}
