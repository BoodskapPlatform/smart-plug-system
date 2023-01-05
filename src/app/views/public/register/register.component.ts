import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    protected router:Router
  ) { }


  public pageNavigator(url:String) {
    this.router.navigate(['/'+url]);
  }

  ngOnInit(): void {
  }

}
