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
  dataBarang: any[] = [];
  pcode: string;
  pcode_name: string;
  price: string;
  stock: string;

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

  deleteBarang(pcode: string, stock: string, stk: number=+stock){
    this.confirmationService.confirm({
      message: 'Are You Sure Want to Delete ?',
      header: 'Delete Confirmation',
      icon: 'ui-icon-warning',
      accept:()=>{
        this.progressShow = true;
        this.masterBarangService.deleteBarangByPcode(pcode).subscribe(
          (data) => {
             if (stk >= 0) {
               this.messageService.add({ severity: 'success', summary: 'Delete barang berhasil' });
            } else {
               this.messageService.add({ severity: 'error', summary: 'Stock Masih ada' });
               this.progressShow = false;
            }
            this.dataBarang = data;
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error Delete data Barang' });   
            this.progressShow = false;
          },
          () =>{
            this.progressShow = false;
          }
        );
      }
    });
  }

  addBarang() {
    this.confirmationService.confirm({
      message: 'Are You Sure Want to Add ?',
      header: 'Add Confirmation',
      icon: 'ui-icon-warning',
      accept:()=>{
        this.progressShow = true;
        this.masterBarangService.insertBarang(this.pcode, this.pcode_name, this.price, this.stock).subscribe(
          () => {
            this.getDataBarang();
            this.messageService.add({ severity: 'success', summary: 'Success Add Barang' });
          },
          (error)=>{     
            if (error.status == 500) {
              this.messageService.add({ severity: 'error', summary: 'pcode sudah ada' });
              this.messageService.add({ severity: 'error', summary: 'Error Delete data Barang' });
              this.progressShow = false;
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error Delete data Barang' });
              this.progressShow = false;
            }
          },
          () => {
            this.progressShow = false;
          }
        );
      }
    });
  }

}
