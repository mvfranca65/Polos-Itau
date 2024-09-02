import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/interfaces/userData.interface';
import { PolosService } from 'src/app/services/polos/polos.service';
import { MatDialog } from '@angular/material/dialog';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('languageLabel') languageLabel!: ElementRef;

  userData!: UserData;

  constructor(private polosService: PolosService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.setUserData();
  }

  setUserData() {
    this.userData = this.polosService.getUser();
    if (!this.userData.name) this.router.navigate(['']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SettingsModalComponent, {
      width: '400px',
      data: { language: this.languageLabel.nativeElement.textContent.trim() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // A lógica para alterar o idioma pode ser implementada aqui
        console.log('Idioma escolhido:', result);
      }
    });
  }
}

