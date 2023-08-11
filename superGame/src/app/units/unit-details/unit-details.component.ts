import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitService } from '../../common/services/unit.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { authGuard } from 'src/app/common/shared/auth.guard';
import { AuthService } from 'src/app/common/services/auth.service';
@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.scss']
})
export class UnitDetailsComponent implements OnInit {
  unitId: any;
  unit: any;
  unitArray: any;
  qualityArray: any = ['Common', 'Rare', 'Epic'];
  qualityValue: any = '';
  healthValue: any = 0;
  attackValue: any = 0;
  maxTargetValue: any = 0;
  spawnCoolDownValue: any = 0;
  spawnCostValue: any = 0;
  errorMsg: any = '';
  unitData: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private unitService: UnitService,
    private fb: FormBuilder,
    private http: HttpClient,
    private cookie: CookieService,
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.auth.autoLogout();
    this.unitData = this.unitService.getUnitDetails().subscribe((res) => {
      this.unitService.unitData = res;
      this.unitId = this.activatedRoute.snapshot.paramMap.get('id');
      this.unit = this.unitService.unitData.find((x: any) => x.id == this.unitId);
      this.qualityValue = this.unit.quality;
      this.healthValue = this.unit.health;
      this.attackValue = this.unit.attack;
      this.maxTargetValue = this.unit.maxTargetCount;
      this.spawnCostValue = this.unit.spawnCost;
      this.spawnCoolDownValue = this.unit.spawnCooldownInSeconds;
    },
      (errors) => {
        this.router.navigate(['/units']);
      })
  }

  editCard(e: any) {
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
      e.preventDefault();
    }
  }

  closeModal() {
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }

  update() {
    let payload = {
      'id': this.unit.id,
      'quality': this.qualityValue,
      'health': this.healthValue,
      'attack': this.attackValue,
      'maxTargetCount': this.maxTargetValue,
      'spawnCost': this.spawnCostValue,
      'spawnCooldownInSeconds': this.spawnCoolDownValue
    };
    let headerObj: HttpHeaders = new HttpHeaders({
      "Authorization": this.cookie.get('tokenType') + " " + this.cookie.get('auth')
    })
    const options = { headers: headerObj }
    this.http.patch('https://test.indusgame.com/units/' + this.unit.id, payload, options).subscribe((data) => {
      this.unit.quality = this.qualityValue;
      this.unit.health = this.healthValue;
      this.unit.attack = this.attackValue;
      this.unit.maxTargetCount = this.maxTargetValue;
      this.unit.spawnCost = this.spawnCostValue;
      this.unit.spawnCooldownInSeconds = this.spawnCoolDownValue;
      this.errorMsg = '';
      this.closeModal();
    }, (errors) => {
      if (errors.status == 400) {
        this.errorMsg = errors?.error?.hint;
      }
    });
  }

  ngOnDestroy() {
    clearInterval(this.auth.setInt);
  }
}
