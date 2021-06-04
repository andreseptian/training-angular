import { NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../shared/app-shared.module';
import { MasterEmployeeComponent} from './master-employee.component';
import { MasterEmployeeService } from './master-employee.service';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    ToastModule,
    AppSharedModule,
    RouterModule.forChild([
    {path : "", component: MasterEmployeeComponent}
    ])
  ],
  declarations: [MasterEmployeeComponent],
  providers: [MasterEmployeeService, MessageService]

})
export class MasterEmployeeModule { }
