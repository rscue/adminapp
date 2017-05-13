import { Component, OnInit } from '@angular/core';
import { WorkerModel } from '../../models/worker.model';
import { WorkerService } from '../../services/worker.service';

@Component({
    selector: 'app-worker-search-page',
    templateUrl: './worker.search.page.html',
    styleUrls: ['./worker.search.page.css']
})
export class WorkerSearchPageComponent implements OnInit {
    workers: Array<WorkerModel>;

    constructor(private workerService: WorkerService) { }

    ngOnInit() {
        this.workerService.search().then(data => {
            this.workers = data;
        }).catch(() => this.workers = []);
    }
}
