import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css']
})
export class DomainsComponent implements OnInit {

  domains_list:any;

  constructor(
    protected router : Router
  ) { }

  logout(){
    localStorage.removeItem("sessionObj");
    localStorage.removeItem("userObj");
    this.router.navigate(["/login"]);
  }

  ngOnInit(): void {
    if(localStorage.getItem("sessionObj") != null){
      let domainObj = JSON.parse(localStorage.getItem("sessionObj") as any);
      this.domains_list = domainObj.partDomains;
       console.log(this.domains_list);
    };
  }

}
