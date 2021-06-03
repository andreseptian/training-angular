import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpEventType } from '@angular/common/http';

import * as wjcCore from '@grapecity/wijmo';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BreadcrumbService } from '../breadcrumb.service';

import { UtilService } from '../shared/util.service';
import { environment } from 'src/environments/environment.prod';
import { PemeliharaanRealOrderService } from './pemeliharaan-real-order.service';
import { isUndefined, isNull } from 'util';



@Component({
  selector: 'app-pemeliharaan-real-order',
  templateUrl: './pemeliharaan-real-order.component.html',
  styleUrls: ['./pemeliharaan-real-order.component.css']
})
export class PemeliharaanRealOrderComponent implements OnInit {

  //Variabel Loading
  progressShow: boolean = false;

  //variable upd date module
  updDateModule: string;

  //variabel untuk filter
  salesData: SelectItem[];
  selectedSales: string;
  salesTipe: string = '-';
  transDate: string = '-';
  team: string = '-';
  gudang: string = '-';
  orderData: SelectItem;
  selectedOrderData: string;
  orderno2: string = '-';
  tanggalOrder: string = '-';
  tanggalValidasi: string = '-';
  outlet: string = '-';
  shipTo: string = '-';
  reasonReject: string = '-';
  noPo: string = '-';
  pembayaran: string = '-';
  tglPo: string = '-';
  noReferensi: string = '-';
  noMobil: string = '-';
  statOutlet: string = '-';
  keterangan: string = '-';
  tipe: string = '-';
  tipeOperation: string  = '-';
  tactical: string = '-';
  cod: string = '-';

  //Variable JSON
  dataRealOrder: any;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private utilService: UtilService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private pemeliharaanRealOrderService: PemeliharaanRealOrderService
  ) { 
    //-- BradCrumb Service : Fungsi untuk penambahan path di aplikasi
    this.breadcrumbService.setItems([
      { label: 'Pemeliharaan Real Order' }
    ]);
    wjcCore.setLicenseKey(environment.wijmoLicense);
  }

  ngOnInit() {
    this.getUpdateDateModule();
    this.getListSalesman();
  }

  clearData(){
    this.orderno2 = '-';
    this.tanggalOrder = '-';
    this.tanggalValidasi = '-';
    this.outlet = '-';
    this.shipTo = '-';
    this.reasonReject = '-';
    this.noPo = '-';
    this.pembayaran = '-';
    this.tglPo = '-';
    this.noReferensi = '-';
    this.noMobil = '-';
    this.statOutlet = '-';
    this.keterangan = '-';
    this.tipe = '-';
    this.tipeOperation  = '-';
    this.tactical = '-';
    this.cod = '-';
    this.dataRealOrder = [];
  }

  getUpdateDateModule(){
    this.pemeliharaanRealOrderService.getUpdModuleDate().subscribe(
      (result)=>{
        this.updDateModule = result[0];
      },
      (error)=>{
        this.messageService.add({ severity: 'error', summary: 'Error '+error.status+' : Load Data Update Module !' });
      }
    );
  }

  getListSalesman(){
    this.progressShow = true;
    this.pemeliharaanRealOrderService.getListSalesman().subscribe(
      (data)=>{
        this.salesData = data;
        this.selectedSales = data[0].value;
        this.onChangeSalesman(this.selectedSales);
        this.getListOrderBySalesman(this.selectedSales);
      },
      (error)=>{
        this.progressShow = false;
        this.messageService.add({ severity: 'error', summary: 'Error '+error.status+' : List Data Salesman !' });
      }
    );
  }

  onChangeSalesman(salesman: string){
    if(!isUndefined(salesman)){
      this.pemeliharaanRealOrderService.getDataSalesmanChoosen(salesman).subscribe(
        (data) => {
          this.salesTipe = data.salesTipe;
          this.transDate = data.transDate;
          this.team = data.team;
          this.gudang = data.gudang;
          this.getListOrderBySalesman(salesman);
        }, 
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error '+error.status+' : Load Data Choosen Salesman !' });
        }
      );
    }
  }

  getListOrderBySalesman(salesman: string){
    this.progressShow = true;
    if(!isUndefined(salesman)){
      this.pemeliharaanRealOrderService.getListOrderBySalesman(salesman).subscribe(
        (data) => {
          this.orderData = data;
          if(data.length > 0){
            this.selectedOrderData = data[0].value;
            this.getRealOrder(data[0].value);
          }else{
            this.clearData();
            this.progressShow = false;
          }
        }, 
        (error) => {
          this.progressShow = false;
          this.messageService.add({ severity: 'error', summary: 'Error '+error.status+' : List Real Order !' });
        }
      );
    }
  }

  getRealOrder(orderno: string){
    this.progressShow = true;
    if(!isUndefined(orderno) || !isNull(orderno)){
      this.pemeliharaanRealOrderService.getRealOrder(orderno).subscribe(
        (data) =>{
          this.orderno2 = data.orderno2;
          this.tanggalOrder = data.orderDate;
          this.tanggalValidasi = data.tglVal;
          this.outlet = data.custNo+' '+data.custName;
          this.shipTo = data.remark+' '+data.shipTo;
          this.reasonReject = data.alasanReject;
          this.noPo = data.noPo;
          this.pembayaran = data.payTypeName;
          this.tglPo = data.tglPo;
          this.noReferensi = data.noRef;
          this.noMobil = data.carNo;
          this.statOutlet = data.flagOut;
          this.keterangan = data.remark;
          this.tipe = data.flagNonCallName;
          this.tipeOperation = data.flagOprTypeName;
          this.tactical = data.tacticalName;
          this.cod = data.codName;

          //Get Detail Real Order
          this.pemeliharaanRealOrderService.getDetailRealOrder(orderno, this.selectedSales).subscribe(
            (data) =>{
              this.dataRealOrder = data;
            },
            (error)=>{
              this.messageService.add({ severity: 'error', summary: 'Error '+error.status+' : Get Data Detail Real Order !' });
              this.progressShow = false;
            },
            () => {
              this.progressShow = false;
            }
          );

        },
        (error)=>{
          this.messageService.add({ severity: 'error', summary: 'Error '+error.status+' : Get Data Order !' });
        }
      );
    }
  }

}
