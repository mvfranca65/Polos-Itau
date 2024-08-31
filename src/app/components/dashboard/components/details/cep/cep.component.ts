import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddressItau } from 'src/app/interfaces/polos.interface';
import { PolosService } from 'src/app/services/polos.service';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.scss']
})
export class CepComponent implements OnInit {

  @Input() cep!: string;
  @Output() notify: EventEmitter<AddressItau> = new EventEmitter<AddressItau>();

  cepForm!: FormGroup;

  constructor(private fb: FormBuilder, private polosService: PolosService, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.initForm(this.cep);
    this.getAddress(this.cep);
    this.changeCep();
  }

  changeCep() {
    this.cepForm.get('cep')?.valueChanges.subscribe(value => {
      if (this.cepForm.get('cep')?.valid) this.getAddress(value);
    });  
  }

  initForm(cep: string): void {
    this.cepForm = this.fb.group({
      cep: [cep, Validators.required]
    });
  }

  getAddress(cep: string) {
    this.polosService.getAddress(cep)
      .then((address: AddressItau) => this.notify.emit(address))
      .catch(error => this.showError('Não foi possivel encontrar o CEP informado'));
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

}
