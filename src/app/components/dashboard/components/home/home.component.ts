import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PolosItau } from 'src/app/interfaces/polos.interface';
import { PolosService } from 'src/app/services/polos/polos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = ['Nome', 'Negocios', 'Valor', 'Situacao', 'Acao'];
  dataSource = new MatTableDataSource<PolosItau>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private polosService: PolosService, private router: Router) {}

  ngOnInit(): void {
    this.getAllPolos();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAllPolos(): void {
    this.polosService.getAllPolos()
      .subscribe((response: PolosItau[]) => {
        this.insertValuesTable(response);
      });
  }

  insertValuesTable(values: PolosItau[]): void {
    this.dataSource.data = values;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  seeDetails(id: number): void {
    this.router.navigate([`itau/detalhes/${id}`]);
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.insertValuesTable(data);
      return;
    }

    const sorted = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compareToOrder(a.name, b.name, isAsc);
        case 'business':
          return this.compareToOrder(a.business, b.business, isAsc);
        case 'valuation':
          return this.compareToOrder(a.valuation, b.valuation, isAsc);
        case 'situation':
          return this.compareToOrder(this.convertBoolToString(a.active), this.convertBoolToString(b.active), isAsc);
        default:
          return 0;
      }
    });

    this.insertValuesTable(sorted);
  }

  compareToOrder(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  convertBoolToString(situation: boolean): string {
    return situation ? 'Sim' : 'Não';
  }
}
