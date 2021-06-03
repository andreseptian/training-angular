import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '../shared/app-shared.module';
import { RouterModule, Routes } from '@angular/router';
import { WijmoSampleComponent } from './wijmo-sample.component';

const routes: Routes = [
  { path: '', component: WijmoSampleComponent }
];

@NgModule({
  declarations: [WijmoSampleComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    RouterModule.forChild(routes)
  ]
})
export class WijmoSampleModule { }
