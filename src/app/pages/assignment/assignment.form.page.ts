import { Component } from '@angular/core';
import { AssignmentModel } from '../../models/assignment.model';
import { AssignmentService } from '../../services/assignment.service';
import { WorkerService } from '../../services/worker.service';
import { Router } from '@angular/router';
import 'select2';
import 'select2/dist/js/i18n/es';

@Component({
    selector: 'app-assignment-form-page',
    templateUrl: './assignment.form.page.html',
    styleUrls: ['./assignment.form.page.css']
})
export class AssignmentFormPageComponent {
    assignment: AssignmentModel;
    public vehicleTypes: Array<{ code: string, name: string }>;
    public hullSizes: Array<{ code: string, name: string }>;
    public workers: Array<{ id: string, name: string }>;

    constructor(private assignmentService: AssignmentService, private workerService: WorkerService, private router: Router) {
        this.assignment = new AssignmentModel();
        this.setupVehicleTypes();
        this.setupHullSizes();
        this.setupWorkers();
    }

    setupVehicleTypes() {
        this.vehicleTypes = [
            { code: 'MotorBoat', name: 'Lancha' },
            { code: 'Boat', name: 'Gomón' },
            { code: 'Yacht', name: 'Yate' },
            { code: 'SailingBoat', name: 'Velero' },
            { code: 'WaterBike', name: 'Moto de agua' },
            { code: 'Cruise', name: 'Crucero' },
        ];
    }

    setupHullSizes() {
        this.hullSizes = [
            { code: 'Small', name: 'Hasta 5mts' },
            { code: 'Medium', name: 'Entre 5mts y 8mts' },
            { code: 'Large', name: 'Mayor a 8mts' }
        ];
    }

    setupWorkers() {
        this.workers = new Array<{ id: string, name: string }>();
        this.workerService.search(['Idle']).then(workers => {
            workers.forEach(value => {
                this.workers.push({ id: value.id, name: `${value.name} ${value.lastName}` });
            });
        }).catch(() => {
            this.workers = new Array<{ id: string, name: string }>();
        });
    }

    save(isValid) {
        if (isValid) {
            this.assignment.submitted = true;
            this.assignmentService.addAssignment(this.assignment).then(() => {
                this.router.navigate(['assignment-list']);
            }).catch(() => {
                this.assignment.submitted = false;
            });
        }
    }
}
