import { DomainModel } from 'src/app/models/DomainModel';
import { UserDataService } from './../../../services/userdata.service';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-public.layout',
  templateUrl: './public.layout.component.html',
  styleUrls: ['./public.layout.component.css']
})
export class PublicLayoutComponent implements OnInit {

  public _subscription_user_data:any;

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private _userDataService: UserDataService
  ) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = '#eeeeee';
  }

  ngOnInit(): void {
    if(localStorage.getItem("userObj") != null){
      this.router.navigate(["/dashboard"]);
    };
  }
}
