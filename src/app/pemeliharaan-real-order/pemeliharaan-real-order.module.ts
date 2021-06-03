import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {CalendarModule} from 'primeng/calendar';
import {RadioButtonModule} from 'primeng/radiobutton';

import { AppSharedModule } from '../shared/app-shared.module';
import { PemeliharaanRealOrderComponent } from './pemeliharaan-real-order.component';
import { PemeliharaanRealOrderService } from './pemeliharaan-real-order.service';

@NgModule({
  imports: [
    AppSharedModule,
    CalendarModule,
    RadioButtonModule,
    RouterModule.forChild([
      { path: "", component: PemeliharaanRealOrderComponent }
    ])
  ],
  declarations: [PemeliharaanRealOrderComponent],
  providers: [PemeliharaanRealOrderService]
})
export class PemeliharaanRealOrderModule { }
