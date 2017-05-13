import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { WorkerModel } from '../../models/worker.model';
import { WorkerService } from '../../services/worker.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { AvatarModalPageComponent } from '../avatar/avatar.modal';

@Component({
  selector: 'app-worker-form-page',
  templateUrl: './worker.form.page.html'
})
export class WorkerFormPageComponent implements OnInit {
  worker: WorkerModel;
  loading: boolean;
  @ViewChild('avatarModal') modal: AvatarModalPageComponent;
  @ViewChild('logoImg') logoImg: ElementRef;
  @ViewChild('errMsg') errorMsg: ElementRef;
  shouldSaveImage: boolean;

  constructor(private workerService: WorkerService, private router: Router, private route: ActivatedRoute) {
    this.worker = new WorkerModel();
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        if (params['id']) {
          this.loading = true;
          return this.workerService.get(params['id']);
        } else {
          return new Promise((resolve) => { resolve(new WorkerModel()); });
        }
      })
      .subscribe((worker: WorkerModel) => {
        this.loading = false;
        this.worker = worker;
      });
  }

  save(isValid: boolean) {
    this.errorMsg.nativeElement.textContent = '';
    if (isValid) {
      this.worker.submitted = true;
      if (!this.worker.id) {
        this.add();
      } else {
        this.update();
      }
    }
  }

  private add() {
    this.workerService.add(this.worker).then((model) => {
      if (this.shouldSaveImage) {
        this.workerService.saveAvatar(this.logoImg.nativeElement.src, model.id)
          .then(() => this.router.navigate(['workers-list']));
      } else {
        this.router.navigate(['workers-list']);
      }
    }).catch(code => {
      this.worker.submitted = false;
      if (code === 'EMAIL_EXISTS') {
        this.errorMsg.nativeElement.textContent = 'El correo electrónico ya existe';
      }
    });
  }

  private update() {
    this.workerService.update(this.worker).then(() => {
      this.router.navigate(['workers-list']);
    }).catch(() => this.worker.submitted = false);
  }

  changeAvatar(image) {
    this.logoImg.nativeElement.src = image;
    if (!this.worker.id) {
      this.shouldSaveImage = true;
    } else {
      this.workerService.saveAvatar(image, this.worker.id).then((uri) => this.worker.avatarUri = uri);
    }
  }
}
