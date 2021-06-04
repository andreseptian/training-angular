import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpEventType } from '@angular/common/http';

import * as wjcCore from '@grapecity/wijmo';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BreadcrumbService } from '../breadcrumb.service';

import { UtilService } from '../shared/util.service';
import { environment } from 'src/environments/environment.prod';
import { MasterBarangService } from './master-barang.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-master-barang',
  templateUrl: './master-barang.component.html',
  styleUrls: ['./master-barang.component.css']
})
export class MasterBarangComponent implements OnInit {


    //Variable Data
  dataBarang:any[] = [];

  progressShow: boolean = false;

  constructor(
    private breadCrumbService: BreadcrumbService,
    private utilService: UtilService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private masterBarangService: MasterBarangService,
    private authService: AuthService
  ) {
  this.breadCrumbService.setItems([
      { label: 'Master Barang' }
    ]);
   }

  ngOnInit() {
    this.getDataBarang();
  }

  getDataBarang(){
    this.progressShow = true;
    this.masterBarangService.getAllBarang().subscribe(
      (dataBarang)=>{
        this.dataBarang = dataBarang;
      },
      (error)=>{
        this.progressShow = false;
        this.messageService.add({ severity: 'error', summary: 'Error Get data Employee' });
      },
      () =>{
        this.progressShow = false;
      }
    );
  }

}
