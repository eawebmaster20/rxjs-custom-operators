import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { from, of } from 'rxjs';
import { simulateNetworkLatency } from './utilities/rxjs-custom-operators/simulateNetworkLatency';
import { countEmissions } from './utilities/rxjs-custom-operators/trackObservableEmmisions';
import { filterByIndex } from './utilities/rxjs-custom-operators/filterNthEmmitions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  originalData=[1, 2, 3, {info:'be rest assured, the operators are custom'}]
  transformedData: any[] = [];
  sourceObs = of(1, 2, 3, {info:'be rest assured, the operators are custom'}, 'Bra lash');
  constructor(){
    this.sourceObs.pipe(
      simulateNetworkLatency(1000),
      countEmissions(),
      filterByIndex(index => index % 2 === 0)
    )
    .subscribe({
      next: (value) =>{ 
        console.log(value[0]);
        this.transformedData.push(value);
      },
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Completed')
    });
  }
}
