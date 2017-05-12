'use strict';

//adapted from http://gmaps-samples-v3.googlecode.com/svn/trunk/overlayview/custommarker.html
function CustomMarker(latlng, map, imageSrc, status) {
    this.latlng_ = latlng;
    this.imageSrc = imageSrc;
    this.status = status;
    // Once the LatLng and text are set, add the overlay to the map.  This will
    // trigger a call to panes_changed which should in turn call draw.
    this.setMap(map);
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function () {
    // Check if the div has been created.
    var div = this.div_;
    if (!div) {
        // Create a overlay text DIV
        div = this.div_ = document.createElement('div');
        // Create the DIV representing our CustomMarker
        var className = "customMarker";
        switch (this.status) {
            case 'Idle':
                className += ' idle';
                break;
            case 'Working':
                className += ' working';
                break;
            case 'Offline':
                className += ' offline';
                break;
        }
        div.className = className;

        var img = document.createElement("img");
        img.src = this.imageSrc;
        div.appendChild(img);
        // google.maps.event.addDomListener(div, "click", function (event) {
        //     google.maps.event.trigger(me, "click");
        // });

        // Then add the overlay to the DOM
        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
    }

    // Position the overlay 
    var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
    if (point) {
        div.style.left = point.x + 'px';
        div.style.top = point.y + 'px';
    }
};

CustomMarker.prototype.remove = function () {
    // Check if the overlay was on the map and needs to be removed.
    if (this.div_) {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    }
};

CustomMarker.prototype.getPosition = function () {
    return this.latlng_;
};

CustomMarker.prototype.setPosition = function (latLng) {
    // Position the overlay 
    var point = this.getProjection().fromLatLngToDivPixel(latLng);
    if (point) {
        this.div_.style.left = point.x + 'px';
        this.div_.style.top = point.y + 'px';
    }
}

CustomMarker.prototype.setStatus = function (status) {
    var className = "customMarker";
    switch (status) {
        case 'Idle':
            className += ' idle';
            break;
        case 'Working':
            className += ' working';
            break;
        case 'Offline':
            className += ' offline';
            break;
    }
    this.div_.className = className;
}

function setPosition(latLng) {

}

module.exports = CustomMarker;