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

  //variabel filter
  jobTitle: SelectItem[];
  selectedJobTitle: string="";
  employee: any;
  selectedEmployee: string[] = [];

  
  //vairabel data
  dataEmployee: any[] = [];

  progressShow: boolean;


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
    this.getListJobTitle();

  }

  getListJobTitle() {
    this.jobTitle = this.utilService.getListJobTitle();
    // this.selectedJobTitle = this.jobTitle[0];
    // this.onChangeJobTitle(this.selectedJobTitle);
  }


  getUser(nama: String) {
    // let nama = this.authService.getUser();
    this.masterEmployeeService.getName(nama).subscribe(
      (result) => {
        if (result == null || result == "") {
          this.messageService.add({ severity: 'error', summary: 'Data tidak ditemukan!' });
          this.nameUser = "-";
          console.log("Failed");
        } else {
          this.messageService.add({ severity: 'success', summary: 'Data Ditemukan!' });
          this.nameUser = result.toString();
          console.log("Success");
        }
      }
    )
  }

  onClick(userId: String) {
    this.progressShow = true;
    if (userId == null || userId == "" || userId.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Input tidak boleh kosong!' });
      this.getUser(userId = '');
      this.progressShow = false;
    } else {
      this.getUser(userId);
      this.progressShow = false;
    }
    
  }

  onChangeJobTitle(jobTitleId: String) {
    this.progressShow = true;
    this.masterEmployeeService.getEmployee(jobTitleId).subscribe(
      (result) => {
        this.employee = result;
        this.progressShow = false;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error get Employee' });
        this.progressShow = false;
      }
    )
  }

  getDataByJobTitle() {
    this.progressShow = true;
    this.masterEmployeeService.getDataEmployeeByJobTitle(this.selectedJobTitle).subscribe(
      (dataEmp) => {
        this.dataEmployee = dataEmp;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error' });
        this.progressShow = false;
      },
      () => {
        this.progressShow = false;
      }
    );
  }

  getData() {
    this.progressShow = true;
    this.masterEmployeeService.getDataEmployeeByEmpId(this.selectedEmployee).subscribe(
      (dataEmp) => {
        this.dataEmployee = dataEmp;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error' });
        this.progressShow = false;
      },
      () => {
        this.progressShow = false;
      }
    );
  }

  delete(empId: string) {
    this.confirmationService.confirm({
      message: ' Are you sure want to Delete',
      header: 'Delete Confirmation',
      icon: 'ui-icon-warning',
      accept: () => {
        this.progressShow = true;
        this.masterEmployeeService.DeleteByEmpId(empId).subscribe(
          () => {
            this.getData();
            this.messageService.add({ severity: 'success', summary: 'Success' });
          },
          (error) => {
            if (error.status == 200) {
              this.messageService.add({ severity: 'success', summary: 'Success' });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error' });
            }
            this.progressShow = false;
          },
          () => {
            this.progressShow = false;
          }
        );
      }
    });
    
  }

  saveData() {
    this.confirmationService.confirm({
      message: ' Are you sure want to save Data',
      header: 'Save Confirmation',
      icon: 'ui-icon-warning',
      accept: () => {
       
      }
    });
  }

}
