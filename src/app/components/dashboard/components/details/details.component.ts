import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressItau, PolosItau } from 'src/app/interfaces/polos.interface';
import { PolosService } from 'src/app/services/polos.service';

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
      rua: ['', Validators.required],
      bairro: ['', Validators.required],
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
      nome: ['', Validators.required],
      business: ['', Validators.required],
      valuation: ['', Validators.required],
      cnpj: ['', Validators.required],
      ativo: [null, Validators.required]
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
      rua: address.street,
      bairro: address.neighborhood,
      estado: address.state,
      cidade: address.city
    };

    this.poloForm.patchValue(getAddress);
  }

  setCompanyDetails(response: PolosItau) {
    const getCompany = {
      nome: response.name,
      business: response.business,
      valuation: response.valuation,
      cnpj: response.cnpj,
      ativo: response.active
    };

    this.poloForm.patchValue(getCompany);
  }

  onSubmit(): void {
    if (this.poloForm.valid) {
      console.log('Form Submitted', this.poloForm.value);
      // Aqui você pode implementar a lógica para salvar os dados
    }
  }
}
