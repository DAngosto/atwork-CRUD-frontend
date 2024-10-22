import { Component, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TableColumn } from '../../model/table-column';

@Component({
  selector: 'app-table-skeleton',
  standalone: true,
  imports: [TableModule, SkeletonModule],
  templateUrl: './table-skeleton.component.html',
  styleUrl: './table-skeleton.component.scss',
})
export class TableSkeletonComponent {
  public columns = input.required<TableColumn[]>();
  public items: {}[] = Array(10).fill({});
}
