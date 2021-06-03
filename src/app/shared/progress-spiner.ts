import { Component, NgModule, Injectable, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockUIModule, ProgressSpinnerModule } from 'primeng/primeng';

@Component({
    selector: 'p-cust-progress-spiner',
    template: `
        <div *ngIf="visible" class="center-div">
            <p-progressSpinner strokeWidth="4" animationDuration="1.0s" ></p-progressSpinner>
        </div>
        <p-blockUI [blocked]="blockedPage"></p-blockUI>
    `,
    styles: [
        `
            .center-div{
                position: fixed; 
                z-index: 99999;
                margin: auto;
                top: 50%;
                left: 50%;
                margin-left: -32px;
                margin-top: -32px;
                text-align: center;
                visibility: visible;
            }
        `
    ]
})

@Injectable()
export class CustProgressSpiner{
    //variable block dan spinner
    @Input()
    blockedPage: boolean = false;

    @Input()
    visible: boolean = false;

    constructor() {}
}

@NgModule({
    imports: [
        CommonModule, BlockUIModule, ProgressSpinnerModule
    ],
    declarations: [
        CustProgressSpiner
    ],
    exports: [
        CustProgressSpiner
    ],
    providers: [
        CustProgressSpiner
    ]
})
export class CustProgressSpinerModule { }