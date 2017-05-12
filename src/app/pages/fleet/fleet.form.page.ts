import { Component } from '@angular/core';
import { FleetModel } from '../../models/fleet.model';
import { FleetService } from '../../services/fleet.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'fleet-form-page',
    templateUrl: './fleet.form.page.html'
})
export class FleetFormPage {
    fleet: FleetModel;
    loading: boolean;

    constructor(private fleetService: FleetService, private router: Router, private route: ActivatedRoute) {
        this.fleet = new FleetModel();
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {
                if (params['id']) {
                    this.loading = true;
                    return this.fleetService.get(params['id']);
                } else {
                    return new Promise((resolve) => { resolve(new FleetModel()) });
                }
            })
            .subscribe((fleet: FleetModel) => {
                this.loading = false;
                this.fleet = fleet
            });
    }

    save(isValid: boolean) {
        if (isValid) {
            this.fleet.submitted = true;
            if (!this.fleet.id) {
                this.add();
            } else {
                this.update();
            }
        }
    }

    private add() {
        this.fleetService.add(this.fleet).then(() => {
            this.router.navigate(['fleet-list']);
        }).catch(() => this.fleet.submitted = false);
    }

    private update() {
        this.fleetService.update(this.fleet).then(() => {
            this.router.navigate(['fleet-list']);
        }).catch(() => this.fleet.submitted = false);
    }
}
