import { Component } from '@angular/core';
import { FleetModel } from '../../models/fleet.model';
import { FleetService } from '../../services/fleet.service';

@Component({
    selector: 'fleet-search-page',
    templateUrl: './fleet.search.page.html'
})
export class FleetSearchPage {
    fleet: Array<FleetModel>

    constructor(private fleetService: FleetService) { }

    ngOnInit() {
        this.fleetService.search().then(data => {
            this.fleet = data;
        }).catch(() => this.fleet = []);
    }
}
