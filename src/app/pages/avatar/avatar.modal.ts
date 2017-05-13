import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import Cropper from 'cropperjs';

@Component({
    selector: 'app-avatar-modal',
    templateUrl: './avatar.modal.html',
    styleUrls: ['./avatar.modal.css']
})
export class AvatarModalPageComponent implements AfterViewInit {
    public visible = false;
    private visibleAnimate = false;
    cropper: Cropper;
    image: HTMLImageElement;
    inputImage: HTMLInputElement;
    @Input() imageSrc: string;
    @Output() croppedImage = new EventEmitter();
    cropperOptions: {};

    public show(): void {
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true);
        this.setupCropper();
    }

    setupCropper() {
        this.cropperOptions = {
            aspectRatio: 1 / 1,
            zoomable: true,
            rotatable: true,
            movable: true,
            scalable: true,
        };
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
    }

    public hide(): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
    }

    ngAfterViewInit() {
        this.image = <HTMLImageElement>document.getElementById('image');
        this.inputImage = <HTMLInputElement>document.getElementById('inputImage');
        this.image.src = this.imageSrc;
    }

    public save(): void {
        const image = this.cropper.getCroppedCanvas({ height: 160, width: 160 }).toDataURL();
        this.hide();
        this.croppedImage.emit(image);
        this.image.src = image;
        this.cropper.destroy();
        this.cropper = new Cropper(this.image, this.cropperOptions);
    }
}
