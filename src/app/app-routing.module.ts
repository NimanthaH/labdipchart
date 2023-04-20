import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LabdipChartComponent } from './labdip-chart/labdip-chart.component';
import { SettingsComponent } from './settings/settings.component';
import { ThreadShadeComponent } from './thread-shade/thread-shade.component';


const routes: Routes = [
  { path:"*",component:HomeComponent},
  { path: "home", component:HomeComponent},
  { path: "labdipChart", component: LabdipChartComponent },
  { path: "threadShade", component: ThreadShadeComponent },
  { path: "settings", component: SettingsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
