import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventsComponent } from './create-events/create-events.component';
import { PrizeDashboardComponent } from './prize-dashboard/prize-dashboard.component';
import { WinnerPopupComponent } from './winner-popup/winner-popup.component';

const routes: Routes = [
  { path: 'createEvent', component: CreateEventsComponent },
  { path: 'prizeDashboard', component: PrizeDashboardComponent },
  { path: 'winnerpopup', component: WinnerPopupComponent },
  { path: '', redirectTo: 'createEvent', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
