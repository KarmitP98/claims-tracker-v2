import {Component, Injectable} from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanDeactivate,
	Router,
	RouterStateSnapshot,
	UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanDeactivate<Component> {
	
	constructor(private afa: AngularFireAuth, private router: Router) {}
	
	canActivate(
	  route: ActivatedRouteSnapshot,
	  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return new Promise(resolve => {
			this.afa.authState.subscribe(auth => {
				if (auth?.uid) {
					resolve(true);
				}
				resolve(this.router.navigate(['login']));
			});
		});
	}
	
	public canDeactivate(component: Component, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return new Promise(resolve => {
			this.afa.authState.subscribe(auth => {
				resolve(!!auth?.uid);
			});
		});
	}
	
	
}
