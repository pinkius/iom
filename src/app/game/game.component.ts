import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Variable } from '@angular/compiler/src/render3/r3_ast';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})



export class GameComponent implements OnInit {
  public resources = new Map<string, Resource>();
  resourceTypes = ['Algae', 'Algae Planter'];
 
  ngOnInit(): void {
    
    this.resources.set('Algae',  {count: 0, increments: null});
    this.resources.set('Algae Planter', {count: 1, increments: [{resourceName: 'Algae', incrementAmount: 1}]});
    console.log(this.resources);
    this.startEventTimer();
  }

  eventTimerThreadId;

  getResourceAmount(resourceName: string): number {
    if (this.resources.get(resourceName)) {
      return this.resources.get(resourceName).count;
    } else {
      return 0;
    }
  }

  startEventTimer() {
    this.eventTimerThreadId = setInterval(() => {
      this.resources.forEach((item) => {
        item.increments?.forEach((increment) => {
          this.resources.get(increment.resourceName).count += increment.incrementAmount * item.count;
        });
      });
    }, 1000);
  }

  public buyAlgaePlanter() {
    //console.log("Buying an algae planter");
    this.resources.get('Algae Planter').count++;
  }


  constructor() {
  }
}

interface Increment {
  resourceName: string;
  incrementAmount: number;
}
interface Resource {
  count: number;
  increments: Increment[];
}
