import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressItau, PolosItau } from 'src/app/interfaces/polos.interface';
import { PolosService } from 'src/app/services/polos/polos.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  poloData!: PolosItau;
  poloForm!: FormGroup;

  constructor(
    private route: ActivatedRoute, 
    private polosService: PolosService, 
    private fb: FormBuilder, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPolo(this.route.snapshot.params['id']);
    this.initForm();
  }

  initForm() {
    this.poloForm = this.fb.group({
      cep: ['', Validators.required],
      street: ['', Validators.required],
      neighborhood: ['', Validators.required],
      state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      city: ['', Validators.required],
      name: ['', Validators.required],
      business: ['', Validators.required],
      valuation: ['', Validators.required],
      cnpj: ['', Validators.required],
      active: [null, Validators.required]
    });
  }

  getPolo(id: string) {
    this.polosService.getPolo(id).subscribe((response: PolosItau) => {
      this.poloData = response;
      this.setCompanyDetails(response);
    });
  }

  onCancel(): void {
    this.router.navigate(['/itau/home']);
  }

  setAddress(address: AddressItau) {
    const getAddress = {
      cep: address.cep,
      street: address.street,
      neighborhood: address.neighborhood,
      state: address.state,
      city: address.city
    };

    this.poloForm.patchValue(getAddress);
  }

  setCompanyDetails(response: PolosItau) {
    const getCompany = {
      name: response.name,
      business: response.business,
      valuation: response.valuation,
      cnpj: response.cnpj,
      active: response.active
    };

    this.poloForm.patchValue(getCompany);
  }

  onValuationInput(event: any): void {
    const formattedValue = this.parseValue(event.target.value);
    this.poloForm.controls['valuation'].setValue(formattedValue, { emitEvent: false });
  }

  formatCurrency(): void {
    const value = this.poloForm.controls['valuation'].value;
    this.poloForm.controls['valuation'].setValue(parseFloat(value).toFixed(2));
  }

  private parseValue(value: string): number {
    return parseFloat(value.replace(/[^0-9.-]+/g, ''));
  }

  onSubmit(): void {
    if (this.poloForm.valid) {
      console.log('Form Submitted', this.poloForm.value);
    }
  }
}
