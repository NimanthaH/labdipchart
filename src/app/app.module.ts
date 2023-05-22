import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';

import { LabdipChartComponent } from './labdip-chart/labdip-chart.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { EnvServiceProvider } from './services/env.service.provider';


import { LabdipChartKeyinDialogComponent } from './labdip-chart/labdip-chart-keyin-dialog/labdip-chart-keyin-dialog.component';
import { MaterialModule } from 'src/material.module';
import { ThreadShadeComponent } from './thread-shade/thread-shade.component';
import { SettingsComponent } from './settings/settings.component';
import { LabdipChildTableComponent } from './thread-shade/labdip-child-table/labdip-child-table.component';
import { ThreadShadeChildTableComponent } from './thread-shade/thread-shade-child-table/thread-shade-child-table.component';
import { LabdipTreadshadeResultChildTableComponent } from './thread-shade/labdip-treadshade-result-child-table/labdip-treadshade-result-child-table.component';
import { InterceptorService } from './services/interceptor.service';
import { HomeComponent } from './home/home.component';
import { ThredTypesComponent } from './settings/thred-types/thred-types.component';
import { AddnewUpdateDialogComponent } from './settings/thred-types/addnew-update-dialog/addnew-update-dialog.component';
import { ConfigureColumnsComponent } from './settings/configure-columns/configure-columns.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LabdipChartComponent,
    LabdipChartKeyinDialogComponent,
    ThreadShadeComponent,
    SettingsComponent,
    LabdipChildTableComponent,
    ThreadShadeChildTableComponent,
    LabdipTreadshadeResultChildTableComponent,
    HomeComponent,
    ThredTypesComponent,
    AddnewUpdateDialogComponent,
    ConfigureColumnsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:InterceptorService, multi:true},EnvServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
