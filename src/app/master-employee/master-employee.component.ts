import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpEventType } from '@angular/common/http';

import * as wjcCore from '@grapecity/wijmo';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BreadcrumbService } from '../breadcrumb.service';

import { UtilService } from '../shared/util.service';
import { environment } from 'src/environments/environment.prod';
import { MasterEmployeeService } from './master-employee.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-master-employee',
  templateUrl: './master-employee.component.html',
  styleUrls: ['./master-employee.component.css']
})
export class MasterEmployeeComponent implements OnInit {

  nameUser: String = "";
  // userId: String;

  constructor(
    private breadCrumbService: BreadcrumbService,
    private utilService: UtilService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private masterEmployeeService: MasterEmployeeService,
    private authService: AuthService
  ) {
    this.breadCrumbService.setItems([
      { label: 'Master Employee' }
    ]);
   }

  ngOnInit() {
    // this.nameUser = "Andre Septian";
    // this.nameUser = this.authService.getUser();
    // this.getUser();

  }

  getUser(nama: String) {
    // let nama = this.authService.getUser();
    this.masterEmployeeService.getName(nama).subscribe(
      (result) => {
        if (result == null) {
          this.nameUser = "-";
          console.log("Failed");
        } else {
          this.nameUser = result.toString();
          console.log("Success");
        }
      }
    )
  }

  onClick(userId: String) {
    if (userId == null || userId == "" || userId.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Input tidak boleh kosong!' });
      this.getUser(userId='');
    } else {
      this.getUser(userId);
    }
    
  }



}
