import { Component, OnInit } from '@angular/core';
import { FleetModel } from '../../models/fleet.model';
import { FleetService } from '../../services/fleet.service';

@Component({
    selector: 'app-fleet-search-page',
    templateUrl: './fleet.search.page.html'
})
export class FleetSearchPageComponent implements OnInit {
    fleet: Array<FleetModel>;

    constructor(private fleetService: FleetService) { }

    ngOnInit() {
        this.fleetService.search().then(data => {
            this.fleet = data;
        }).catch(() => this.fleet = []);
    }
}
