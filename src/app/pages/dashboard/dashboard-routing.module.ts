import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardPage} from './dashboard.page';

const routes: Routes = [
	{
		path: '',
		component: DashboardPage,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'claims'
			},
			{
				path: 'claims',
				loadChildren: () => import('./claims/claims.module').then(m => m.ClaimsPageModule)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardPageRoutingModule {}
