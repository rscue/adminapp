import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { AssignmentService } from '../../services/assignment.service';
import { WorkersSignalr } from '../../services/workers.signalr';
import { WorkerService } from '../../services/worker.service';
import { WorkerModel } from '../../models/worker.model';

declare var google: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePageComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers: { [id: string]: any } = {};
  workers: Array<WorkerModel>;

  constructor(public assignmentService: AssignmentService, private workerSignalr: WorkersSignalr, private workerService: WorkerService) {
    this.assignmentService.getAssignmentsSummary();
    this.workerService.search().then(workers => {
      this.workers = workers;
      this.addMarkers();
    });

    this.workerSignalr.updateWorkerLocation.subscribe(value => {
      const marker = this.markers[value.id];
      if (marker) {
        const location = new google.maps.LatLng(value.location.latitude, value.location.longitude);
        marker.setPosition(location);
      }
    });

    this.workerSignalr.updateWorkerStatus.subscribe(value => {
      const marker = this.markers[value.id];
      if (marker) {
        marker.setStatus(value.status);
      }
    });
  }

  ngAfterViewInit() {
    this.workerSignalr.start();
  }

  ngOnDestroy() {
    this.workerSignalr.stop();
  }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    const location = new google.maps.LatLng(-34.41341, -58.55984);
    this.map = new google.maps.Map(this.mapElement.nativeElement,
      {
        center: location,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false
      });
  }

  addMarkers() {
    const bounds = new google.maps.LatLngBounds();
    this.workers.forEach(element => {
      if (element.location && element.status) {
        const location = new google.maps.LatLng(element.location.latitude, element.location.longitude);
        // let marker = new CustomMarker(location, this.map, element.avatarUri, element.status);
        // this.markers[element.id] = marker;
        // bounds.extend(marker.getPosition())
      }
    });
    this.map.fitBounds(bounds);
  }

  setBounds() {
    const bounds = new google.maps.LatLngBounds();
    for (const key in this.markers) {
      if (this.markers.hasOwnProperty(key)) {
        const marker = this.markers[key];
        bounds.extend(marker.getPosition());
      }
    }
    this.map.fitBounds(bounds);
  }
}
