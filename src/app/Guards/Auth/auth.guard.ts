import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthenticationService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     // Check if the user is logged in
     if (this.authService.loadCurrentUser()=="none") {
      // Redirect to the login page if not logged in
      return this.router.navigate(['/loginPage']);
    }

    // Check the user's role
    const requiredRoles = route.data['roles'] as string[];
    const userRole = this.authService.loadCurrentUser();

    // Check if the user has the required role
    if (requiredRoles.includes(userRole)) {
      return true;
    }

    // Redirect to the login page if the user doesn't have the required role
    return this.router.parseUrl('/loginPage');
  }
  
}
