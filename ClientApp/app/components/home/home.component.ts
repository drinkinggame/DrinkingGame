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
        this.glasses$ = this.beerService.messageSubject;
    }

    ngOnInit(): void {
        //var zone = this.ngZone;
        this.beerService.messageSubject.subscribe(data => {
            //console.log(data);
            //console.log('d');
            //this.glasses = Array.from(data);
            this.ngZone.run(() => {
                setTimeout(() => {
                    this.glasses = data;
                }, 10);
            });
            //setTimeout(() => {
            //    //this.glasses = data;
            //    this.ngZone.run(() => {
            //        this.glasses = Array.from(data);
            //    });
            //}, 10);
            ////console.log(data);
            ////console.log('d');
            //this.glasses = data;

        });

    }

    private glasses: any;// = [{ height: 10 }];
    private glasses$: any;// = [{ height: 10 }];

    drink() {
        console.log('drink');
        this.beerService.drink();
    }

    reset() {
        if (prompt("what's the password?") == "Welcome") {
            this.beerService.reset();
        }
    }
}
