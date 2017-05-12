import { Component } from '@angular/core';
import { WorkerModel } from '../../models/worker.model';
import { WorkerService } from '../../services/worker.service';

@Component({
    selector: 'worker-search-page',
    templateUrl: './worker.search.page.html',
    styleUrls: ['./worker.search.page.css']
})
export class WorkerSearchPage {
    workers: Array<WorkerModel>

    constructor(private workerService: WorkerService) { }

    ngOnInit() {
        this.workerService.search().then(data => {
            this.workers = data;
        }).catch(() => this.workers = []);
    }
}
