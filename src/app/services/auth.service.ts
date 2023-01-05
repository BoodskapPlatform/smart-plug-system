import { DomainModel } from 'src/app/models/DomainModel';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from "@angular/router";

@Injectable()
export class AuthService implements CanActivate {

    constructor(private router: Router) {}

     canActivate(
        route : ActivatedRouteSnapshot,
        state: RouterStateSnapshot
     ) {
        if (localStorage.getItem('userObj') != null) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}