import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Chart, registerables, plugins } from 'chart.js';
import { UnitService } from '../common/services/unit.service';
import { AuthService } from '../common/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  chart: any;
  packData: any;
  saleData: any;
  packArray: any = {};
  saleArray: any = {};
  costArray: any = {};
  janArray: any = {};
  febArray: any = {};
  marArray: any = {};
  packNames: any = [];
  monthArray: any = ['ALL', 'JAN', 'FEB', 'MAR'];
  chartValue: any = 'Quantity';
  isChartOpen: boolean = false;
  dateValue1: any = '2023-01-01';
  dateValue2: any = '2023-03-31';
  prevDateValue1: any;
  prevDateValue2: any;
  totSales: any = [];
  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    public auth: AuthService,
    private router: Router,
    private unitService: UnitService
  ) { this.onResize() }
  @HostListener('window:resize', ['$event'])
  onResize() {
    let x = document.getElementById('barChart');
    if (x != null) {
      x.style.cssText = 'width: 500px !important';
    }
  }
  ngOnInit(): void {
    this.auth.autoLogout();
    let headerObj: HttpHeaders = new HttpHeaders({
      "Authorization": this.cookie.get('tokenType') + " " + this.cookie.get('auth')
    })
    const options = { headers: headerObj };
    this.unitService.getPacks().subscribe((data) => {
      this.packData = data;
      this.packData.forEach((ele: any) => {
        this.packArray[ele.id] = 0;
        this.costArray[ele.id] = 0;
        this.packNames.push(ele.id);
        let k = parseInt(ele.productId.split('_')[1]) - 0.01;
        this.saleArray[ele.id] = k;
      });
      this.unitService.getSales().subscribe((res) => {
        this.saleData = res;
        this.showCharts(true);
        this.showLabelChart();
      });
    });
  }

  //  bar chart
  showCharts(daySales?: boolean) {
    if (this.prevDateValue1 != this.dateValue1 || this.prevDateValue2 != this.dateValue2) {
      this.prevDateValue1 = this.dateValue1;
      this.prevDateValue2 = this.dateValue2;
      this.packData.forEach((ele: any) => {
        this.packArray[ele.id] = 0;
        this.packNames.push(ele.id);
      });
      this.saleData.forEach((x: any, index: any) => {
        let saleV = x.packs;
        let cost: any = 0;
        if (x.date >= this.dateValue1 && x.date <= this.dateValue2) {
          saleV.forEach((m: any) => {
            this.packArray[m.id] += m.quantity;
            // if (x.date.split('-')[1] == '01') {
            //   this.janArray[m.id] += m.quantity;
            // }
            // else if (x.date.split('-')[1] == '02') {
            //   this.febArray[m.id] += m.quantity;
            // }
            // else {
            //   this.marArray[m.id] += m.quantity;
            // }
            cost += this.saleArray[m.id] * m.quantity;
          });
          if (daySales) {
            this.totSales.push(cost);
          }
        }
      });
      this.packNames.forEach((x: any) => {
        this.costArray[x] = (this.packArray[x] * this.saleArray[x]).toFixed(2);
      });
    }
    let chartArray: any;
    Chart.register(...registerables);
    const modalDiv = <HTMLCanvasElement>document.getElementById("barChart");
    let ctxB: any;
    if (modalDiv != null) {
      ctxB = modalDiv.getContext('2d');
    }
    if (this.isChartOpen) {
      this.chart.destroy();
    }
    this.chart = new Chart(ctxB, {
      type: 'bar',
      data: {
        labels: Object.keys(this.packArray),
        datasets: [
          {
            label: 'Total Quantity Sold',
            data: Object.values(this.packArray),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)'
            ],
            borderWidth: 1,
          },
          {
            label: 'Net Sale of pack in $',
            data: Object.values(this.costArray),
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          }
        ]
      }
    });
    this.isChartOpen = true;
  }
  // line chart
  showLabelChart() {
    Chart.register(...registerables);
    const modalDiv = <HTMLCanvasElement>document.getElementById("lineChart");
    let ctxP: any;
    if (modalDiv != null) {
      ctxP = modalDiv.getContext('2d');
    }
    let myLineChart = new Chart(ctxP, {
      type: 'line',
      data: {
        labels: Array.from({ length: 31 }, (_, i) => i + 1),
        datasets: [{
          label: "JANUARY",
          data: this.totSales.slice(0, 31),
          backgroundColor: [
            'rgba(105, 0, 132, .2)',
          ],
          borderColor: [
            'rgba(200, 99, 132, .7)',
          ],
          borderWidth: 2
        },
        {
          label: "FEBRUARY",
          data: this.totSales.slice(31, 59),
          backgroundColor: [
            'rgba(0, 137, 132, .2)',
          ],
          borderColor: [
            'rgba(0, 10, 130, .7)',
          ],
          borderWidth: 2
        },
        {
          label: "MARCH",
          data: this.totSales.slice(59, 90),
          backgroundColor: [
            'rgba(0, 250, 220, .2)',
          ],
          borderColor: [
            'rgba(0, 213, 132, .7)',
          ],
          borderWidth: 2
        }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

  update() {
    this.showCharts(false);
  }

  back() {
    this.router.navigate(['/units']);
  }

  ngOnDestroy() {
    clearInterval(this.auth.setInt);
  }
}
