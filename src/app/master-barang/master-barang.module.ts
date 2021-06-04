import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../shared/app-shared.module';
import { MasterBarangComponent} from './master-barang.component';
import { MasterBarangService } from './master-barang.service';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [MasterBarangComponent],
  providers: [MasterBarangService, MessageService],
  imports: [
    ToastModule,
    AppSharedModule,
    RouterModule.forChild([
    {path : "", component: MasterBarangComponent}
    ])
  ]
})
export class MasterBarangModule { }
