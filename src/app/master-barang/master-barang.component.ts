import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpEventType } from '@angular/common/http';

import * as wjcCore from '@grapecity/wijmo';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
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
  userform: FormGroup;

  submitted: boolean;
  
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
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.breadCrumbService.setItems([
      { label: 'Master Barang' }
    ]);
  }

  ngOnInit() {
   
    this.getDataBarang();
     this.userform = this.fb.group({
            'pcode': new FormControl('', Validators.required),
            'pcode_name': new FormControl('', Validators.required),
            'price': new FormControl('', Validators.required),
            'stock': new FormControl('', Validators.required)
        });
  }

  getDataBarang() {
    this.progressShow = true;
    this.masterBarangService.getAllBarang().subscribe(
      (dataBarang) => {
        this.dataBarang = dataBarang;
      },
      (error) => {
        this.progressShow = false;
        this.messageService.add({ severity: 'error', summary: 'Error Get data Employee' });
      },
      () => {
        this.progressShow = false;
      }
    );
  }

  deleteBarang(pcode: string, stock: string, stk: number = +stock) {
    this.confirmationService.confirm({
      message: 'Are You Sure Want to Delete ?',
      header: 'Delete Confirmation',
      icon: 'ui-icon-warning',
      accept: () => {
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
          () => {
            this.progressShow = false;
          }
        );
      }
    });
  }

  addBarang(value: string) {

    this.confirmationService.confirm({
      message: 'Are You Sure Want to Add ?',
      header: 'Add Confirmation',
      icon: 'ui-icon-warning',
      accept: () => {
        this.progressShow = true;
        this.masterBarangService.insertBarang(this.pcode, this.pcode_name, this.price, this.stock).subscribe(
          () => {
            this.getDataBarang();
            this.messageService.add({ severity: 'success', summary: 'Success Add Barang' });
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error Add data Barang' });
            this.progressShow = false;
          },
          () => {
            this.progressShow = false;
          }
        );
      }
    });
    //  if (pcode == null && pcode_name == null && price == null && stock == null) {
    //   this.messageService.add({ severity: 'error', summary: 'Input tidak boleh ada yang kosong' });
    // } else if (this.pcode == pcode) {
    //   this.messageService.add({ severity: 'error', summary: 'pcode sudah ada' });
    // } else {
    // }
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }

  updateData(stock: string, stk: number = +stock) {
    if (stk < 0) {
      this.messageService.add({ severity: 'error', summary: 'Stok tidak boleh minus' });
    } else {
      this.confirmationService.confirm({
        message: 'Are You Sure Want Update Data ?',
        header: 'Save Confirmation',
        icon: 'ui-icon-warning',
        accept: () => {
          this.progressShow = true;
          this.masterBarangService.updateBarang(this.dataBarang).subscribe(
            (data) => {
              this.dataBarang = data;
              this.messageService.add({ severity: 'success', summary: 'Success Update Barang' });
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error Update data Barang' });
              this.progressShow = false;
            },
            () => {
              this.progressShow = false;
            }
          );
        }
      });
    }
  }



}
