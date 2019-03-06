import { MapsAPILoader } from '@agm/core';
import { Directive, ElementRef, EventEmitter, NgZone, Output } from '@angular/core';

@Directive({
  selector: '[amGmapsAutocomplete]'
})
export class GmapsAutocompleteDirective {
  @Output() placeChanged: EventEmitter<google.maps.LatLng> = new EventEmitter<google.maps.LatLng>();

  constructor(private el: ElementRef, private mapsLoader: MapsAPILoader, private ngZone: NgZone) {
    this.mapsLoader.load().then(() => { // Wait until the GMaps library is loaded
      const autocomplete = new google.maps.places.Autocomplete(el.nativeElement);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          console.log(el);
          this.ngZone.run(() => this.placeChanged.emit(place.geometry.location));
        }
      });
    });
  }

}
