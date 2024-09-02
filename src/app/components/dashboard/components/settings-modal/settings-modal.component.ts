import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent implements OnInit {
  selectedLanguage: string = 'pt';

  constructor(
    public dialogRef: MatDialogRef<SettingsModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedLanguage = this.data.language;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    let route = '/pt/login';

    switch(this.selectedLanguage) {
      case 'en':
        route = '/en/login';
        break;
      case 'es':
        route = '/es/login';
        break;
      case 'pt':
      default:
        route = '/pt/login';
        break;
    }

    this.router.navigate([route]);
    this.dialogRef.close();
  }
}
