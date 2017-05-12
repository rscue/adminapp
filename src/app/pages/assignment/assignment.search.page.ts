import { Component } from '@angular/core';
import * as moment from 'moment';
import 'bootstrap-daterangepicker';
import 'select2';
import { AssignmentService } from '../../services/assignment.service';
import { AssignmentModel } from '../../models/assignment.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'assignmentSearch-page',
    templateUrl: './assignment.search.page.html'
})
export class AssignmentSearchPage {
    statuses: [{ code: string, label: string }];
    model: { statuses: Array<string>, startDateTime: Date, endDateTime: Date };
    assignments: Array<AssignmentModel>;
    loading: boolean;

    constructor(private assignmentService: AssignmentService, private route: ActivatedRoute) {
        this.model = { statuses: new Array(), startDateTime: null, endDateTime: null };
        this.assignments = new Array();
        moment.locale('es');
        this.setupStatuses();
    }

    ngOnInit() {
        this.model.startDateTime = new Date(new Date().setHours(0, 0, 0, 0));
        this.model.endDateTime = new Date(new Date().setHours(23, 59, 59, 999));
        this.route.queryParams
            .switchMap((params: Params) => {
                if (params['statuses']) {
                    this.loading = true;
                    return params['statuses'].split(',');
                } else {
                    return new Promise((resolve) => { resolve(new Array<string>()) });
                }
            })
            .subscribe((statuses: string) => {
                this.model.statuses.push(statuses);
            });
    }

    setupStatuses() {
        this.statuses = [
            { code: null, label: '' },
            { code: 'Created', label: 'Creada' },
            { code: 'Assigned', label: 'Asignada' },
            { code: 'InProgress', label: 'En progreso' },
            { code: 'Completed', label: 'Completado' },
            { code: 'Cancelled', label: 'Cancelada' },
        ];
    }

    ngAfterViewInit() {
        let self = this;
        $('#daterange-btn')['daterangepicker'](
            {
                ranges: {
                    'Hoy': [moment(self.model.startDateTime), moment(self.model.endDateTime)],
                    'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Los últimos 7 días': [moment().subtract(6, 'days'), moment()],
                    'Los últimos 30 días': [moment().subtract(29, 'days'), moment()],
                    'Este mes': [moment().startOf('month'), moment().endOf('month')],
                    'El mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                startDate: moment(self.model.startDateTime),
                endDate: moment(self.model.endDateTime),
                locale: {
                    applyLabel: 'Aceptar',
                    cancelLabel: 'Cancelar',
                    fromLabel: 'Desde',
                    toLabel: 'Hasta',
                    weekLabel: 'S',
                    customRangeLabel: 'Rango personalizado',
                }
            },
            function (start, end, label) {
                $('#daterange-btn span').html(label);
                self.model.startDateTime = start.toDate();
                self.model.endDateTime = end.toDate();
            }
        );

        $('#status').select2().on('select2:select', (e) => {
            this.model.statuses = $('#status').select2().val();
        });
        $('#status').val(this.model.statuses).trigger('change');
        this.search();
    }

    search() {
        this.assignmentService.search(this.model).then(data => {
            this.assignments = data;
        });
    }
}
