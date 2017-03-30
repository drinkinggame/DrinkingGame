import { Component, OnInit, NgZone } from '@angular/core';
import { BeerService } from './../../beer.service'

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    constructor(
        private beerService: BeerService,
        private ngZone: NgZone) {
    }

    ngOnInit(): void {
        this.beerService.messageSubject.subscribe(data => {
            this.ngZone.run(() => {
                setTimeout(() => {
                    this.glasses = data;
                }, 10);
            });
        });

    }

    private glasses: any;

    drink() {
        this.beerService.drink();
    }

    reset() {
        if (prompt("what's the password?") == "Welcome") {
            this.beerService.reset();
        }
    }
}
