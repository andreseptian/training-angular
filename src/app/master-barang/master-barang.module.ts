import { NgModule } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../shared/app-shared.module';
import { MasterBarangComponent } from './master-barang.component';
import { MasterBarangService } from './master-barang.service';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { InputDate, InputTime, ComboBox, AutoComplete, InputNumber, InputColor } from '@grapecity/wijmo.input';


@NgModule({
  declarations: [MasterBarangComponent],
  providers: [MasterBarangService, MessageService],
  imports: [
    WjGridModule,
    WjInputModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    AppSharedModule,
    RouterModule.forChild([
      { path: "", component: MasterBarangComponent }
    ])
  ]
})
export class MasterBarangModule {

}
