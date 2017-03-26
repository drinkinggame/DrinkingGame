import { Component, OnInit, NgZone, Input } from '@angular/core';

@Component({
    selector: 'beer',
    template: `Glasses: {{glasses | json}}`
})
export class BeerComponent {
    @Input() glasses;
}
