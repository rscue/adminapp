import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import Cropper from 'cropperjs';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-avatar-modal',
  templateUrl: './avatar.modal.html',
  styleUrls: ['./avatar.modal.css']
})
export class AvatarModalPageComponent implements AfterViewInit {
  public visible = false;
  public visibleAnimate = false;
  cropper: Cropper;
  image: HTMLImageElement;
  inputImage: HTMLInputElement;
  @Input() imageSrc: string;
  @Output() croppedImage = new EventEmitter();
  cropperOptions: {};

  constructor(private imageService: ImageService) { }

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true);
    this.setupCropper();
  }

  setupCropper() {
    this.imageService.get(this.imageSrc).then(img => {
      this.image.src = URL.createObjectURL(img);
      this.cropperOptions = {
        aspectRatio: 1 / 1,
        zoomable: true,
        rotatable: true,
        movable: true,
        scalable: true,
      };
      if (this.cropper) {
        this.cropper.destroy();
      }
      this.cropper = new Cropper(this.image, this.cropperOptions);

      this.inputImage.onchange = () => {
        let file;
        const files = this.inputImage.files;
        if (this.cropper && files && files.length) {
          file = files[0];

          if (/^image\/\w+/.test(file.type)) {
            this.image.src = URL.createObjectURL(file);
            this.cropper.destroy();
            this.cropper = new Cropper(this.image, this.cropperOptions);
            this.inputImage.value = null;
          } else {
            window.alert('Por favor elíja un archivo de imágen');
          }
        }
      };
    });
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  ngAfterViewInit() {
    this.image = <HTMLImageElement>document.getElementById('image');
    this.inputImage = <HTMLInputElement>document.getElementById('inputImage');
  }

  public save(): void {
    this.cropper.getCroppedCanvas({ height: 160, width: 160 }).toBlob(blob => {
      this.croppedImage.emit(blob);
    });
    this.hide();
  }
}
