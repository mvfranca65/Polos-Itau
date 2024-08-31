import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PolosItau } from 'src/app/interfaces/polos.interface';
import { PolosService } from 'src/app/services/polos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = ['Nome', 'Negócios', 'Valor', 'Situação', 'Ação'];
  dataSource = new MatTableDataSource<PolosItau>([]); // Iniciar com um array vazio para evitar erros de tipagem

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private polosService: PolosService, private router: Router) {}

  ngOnInit(): void {
    this.getAllPolos(); // Carrega os dados assim que o componente é inicializado
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort; // Configura a ordenação após a view ser inicializada
    this.dataSource.paginator = this.paginator; // Configura a paginação após a view ser inicializada
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

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      console.log(`Sorted ${sortState.direction}ending`);
    } else {
      console.log('Sorting cleared');
    }
  }
}
