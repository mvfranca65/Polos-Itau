import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/interfaces/userData.interface';
import { PolosService } from 'src/app/services/polos/polos.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData!: UserData;

  constructor(private polosService: PolosService, private router: Router) { }

  ngOnInit(): void {
    this.setUserData();
  }

  setUserData() {
    this.userData = this.polosService.getUser();
    if (!this.userData.name) this.router.navigate(['']);
  }
}

