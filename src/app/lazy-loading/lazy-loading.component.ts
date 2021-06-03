import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';

@Component({
  selector: 'app-lazy-loading',
  templateUrl: './lazy-loading.component.html',
  styleUrls: ['./lazy-loading.component.css']
})
export class LazyLoadingComponent implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: 'Empty Page' },
    ]);
  }

  ngOnInit() {
  }

}
