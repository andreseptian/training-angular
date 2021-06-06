import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpEventType } from '@angular/common/http';

import * as wjcCore from '@grapecity/wijmo';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BreadcrumbService } from '../breadcrumb.service';

import { UtilService } from '../shared/util.service';
import { environment } from 'src/environments/environment.prod';
import { MasterBarangService } from './master-barang.service';
import { AuthService } from '../auth/auth.service';
import { CollectionView, DateTime} from '@grapecity/wijmo'

import { InputDate, InputTime, ComboBox, AutoComplete, InputNumber, InputColor } from '@grapecity/wijmo.input';



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
  stock: number;


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
        this.messageService.add({ severity: 'error', summary: 'Error Get data Barang' });
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
        if (stk == 0) {
          this.progressShow = true;
          this.masterBarangService.deleteBarangByPcode(pcode).subscribe(
            (data) => {
              this.dataBarang = data;
              this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Delete data Barang berhasil' });
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Error Delete Barang' });
              this.progressShow = false;
            },
            () => {
              this.progressShow = false;
            }
          );
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Stok masih ada!' });
          this.progressShow = false;
        }
      }
    });
  }

  addBarang() {
    this.confirmationService.confirm({
      message: 'Are You Sure Want to Add ?',
      header: 'Add Confirmation',
      icon: 'ui-icon-warning',
      accept: () => {
        if (this.stock < 0) {
          this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Stok tidak boleh minus!' })
        } else {
          this.progressShow = true;
          this.masterBarangService.insertBarang(this.pcode, this.pcode_name, this.price, this.stock).subscribe(
            (data) => {
              this.dataBarang = data;
              this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Success! Add Barang' });
            },
            (error) => {
              if (error.status != 200) {
                this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Duplicate Pcode!' });
              } else {
                this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Error Add data Barang' });
              }
              this.progressShow = false;
            },
            () => {
              this.progressShow = false;
            }
          );
        }
      }
    });
  }


  updateData(stock: string, stk: number = +stock) {
    this.confirmationService.confirm({
      message: 'Are You Sure Want Update Data ?',
      header: 'Save Confirmation',
      icon: 'ui-icon-warning',
      accept: () => {

        if (stk < 0) {
          this.messageService.add({ severity: 'error', summary: 'Stok tidak boleh minus' });
        } else {
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
      }
    });

    //  let stockBrg = this.dataBarang;
    //     for (let i in stockBrg) {
    //       let stck = cell;
    //       var stk: number = +stck;
    //       if (stk < 0) {
    //         this.messageService.add({ severity: 'error', summary: 'Error Update data Barang' });
    //       } else {
    //         this.progressShow = true;
    //         this.masterBarangService.updateBarang(this.dataBarang).subscribe(
    //           (data) => {
    //             this.dataBarang = data;
    //             this.messageService.add({ severity: 'success', summary: 'Success Update Barang' });
    //           },
    //           (error) => {
    //             this.messageService.add({ severity: 'error', summary: 'Error Update data Barang' });
    //             this.progressShow = false;
    //           },
    //           () => {
    //             this.progressShow = false;
    //           }
    //         );
    //       }
    //     }

  }

}
