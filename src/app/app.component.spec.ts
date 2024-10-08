import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { simulateNetworkLatency } from './utilities/rxjs-custom-operators/simulateNetworkLatency';
import { countEmissions } from './utilities/rxjs-custom-operators/trackObservableEmmisions';
import { multiplyBy } from './utilities/rxjs-custom-operators/multiply';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  test('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  test(`should have the 'rxjs-custorm-operators' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('rxjs-custorm-operators');
  });

  test('should render title in the template', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Original Data:');
  });

  test('should accumulate transformed data', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.sourceObs = of(1, 2, 3, { info: 'be rest assured, the operators are custom' }, 'Bra lash');

    fixture.detectChanges();

    app.sourceObs.pipe(
      simulateNetworkLatency(0),  
      multiplyBy(3),              
      countEmissions(),           
    ).subscribe({
      next: (value) => {
        app.transformedData.push(value);
      },
      error: (error) => console.error('Error:', error),
      complete: () => {
        fixture.detectChanges(); 

        const transformedDataItems = fixture.debugElement.queryAll(By.css('.data-section ul:last-of-type li'));
        expect(transformedDataItems.length).toBe(3); 
        expect(transformedDataItems[0].nativeElement.textContent).toContain('1');
        expect(transformedDataItems[1].nativeElement.textContent).toContain('2');
        expect(transformedDataItems[2].nativeElement.textContent).toContain('3');
        done();
      }
    });
  });
});
