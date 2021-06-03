import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../shared/app-shared.module';
import { MasterEmployeeComponent} from './master-employee.component';
import { MasterEmployeeService } from './master-employee.service';

@NgModule({
  imports: [
    AppSharedModule,
    RouterModule.forChild([
    {path : "", component: MasterEmployeeComponent}
    ])
  ],
  declarations: [MasterEmployeeComponent],
  providers : [MasterEmployeeService]
})
export class MasterEmployeeModule { }
