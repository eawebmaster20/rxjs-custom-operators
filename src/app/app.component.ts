import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { of } from 'rxjs';
import { simulateNetworkLatency } from './utilities/rxjs-custom-operators/simulateNetworkLatency';
import { countEmissions } from './utilities/rxjs-custom-operators/trackObservableEmmisions';
import { filterByIndex } from './utilities/rxjs-custom-operators/filterNthEmmitions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rxjs-custorm-operators';
  source$ = of(1, 2, 3, {info:'be rest assured, the operators are custom'}, 'Bra larsh');
  constructor(){
    this.source$.pipe(
      simulateNetworkLatency(1000),
      countEmissions(),
      filterByIndex(index => index % 2 === 0)
    )
    .subscribe({
      next: (value) =>{ 
        console.log(value[0])
        console.log( 'Emmited: '+ value[1] + 'values so far')
      },
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Completed')
    });
  }
}
