import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { UnitService } from '../common/services/unit.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public auth: AuthService,
    private unitService: UnitService,
    private router: Router,
    private cookie: CookieService
  ) { }

  typeArray: any = ['All', 'Minion', 'Tower', 'Hero'];
  qualityArray: any = ['All', 'Common', 'Rare', 'Epic'];
  factionArray: any = ['All', 'Medieval', 'Undead'];
  typeValue: any = 'All';
  qualityValue: any = 'All';
  factionValue: any = 'All';
  filterData: any;
  modalData: any = '';
  ngOnInit(): void {
    this.auth.autoLogout();
    if (sessionStorage.getItem('isLoggedIn') == 'true') {
      this.auth.isLoggedIn = true;
    }
    this.cookie.deleteAll('/units');
    this.unitService.getUnitDetails().subscribe((res) => {
      this.unitService.unitData = res;
      this.filterData = res;
    }, (errors) => {
      this.auth.logOut();
    });
  }

  filterUpdated() {
    this.filterData = this.unitService.unitData;
    if (this.typeValue != 'All') {
      this.filterData = this.filterData.filter((value: any) => value.type == this.typeValue);
    }
    if (this.qualityValue != 'All') {
      this.filterData = this.filterData.filter((value: any) => value.quality == this.qualityValue);
    }
    if (this.factionValue != 'All') {
      this.filterData = this.filterData.filter((value: any) => value.faction == this.factionValue);
    }
  }

  resetFilters() {
    this.typeValue = 'All';
    this.qualityValue = 'All';
    this.factionValue = 'All';
    this.filterData = this.unitService.unitData;
  }

  salesVis() {
    this.router.navigate(['/sales']);
  }

  ngOnDestroy() {
    clearInterval(this.auth.setInt);
  }
}
