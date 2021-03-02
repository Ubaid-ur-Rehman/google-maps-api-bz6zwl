import { Component, OnInit, Inject } from "@angular/core";
import { ViewChild } from "@angular/core";
import { Element } from "@angular/compiler";
import { ElementRef } from "@angular/core";
import { DOCUMENT } from "@angular/common";
declare var google: any;

@Component({
  selector: "app-google",
  templateUrl: "./google.component.html",
  styleUrls: ["./google.component.css"]
})
export class GoogleComponent implements OnInit {
  private map: google.maps.Map;

  @ViewChild("mapRef") mapRef: ElementRef;
  constructor(
    @Inject(DOCUMENT) private document,
    private elementRef: ElementRef
  ) {}

  ngAfterViewInit() {
    var s = this.document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://maps.googleapis.com/maps/api/js?key=";
    this.elementRef.nativeElement.appendChild(s);
    let bounds = {
      MaxLat: 53.94834527105579,
      MaxLng: 26.06990825955708,
      MinLat: 49.74438095249758,
      MinLng: 5.239830134557084
    };

    let position = new google.maps.LatLngBounds(
      new google.maps.LatLng(bounds.MinLat, bounds.MinLng),
      new google.maps.LatLng(bounds.MaxLat, bounds.MaxLng)
    );
    this.map.fitBounds(position);
    console.log(this.map.getBounds());
  }
  ngOnInit() {
    var self = this;
    setTimeout(function() {
      self.showMap();
    }, 2000);
  }

  showMap() {
    console.log(this.mapRef.nativeElement);
    const location = { lat: 28.5355, lng: 77.391 };
    var options = {
      center: location,
      zoom: 8
    };

    const map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarket(map, location);
  }
  addMarket(pos, map) {
    return new google.maps.Marker({
      position: pos,
      map: map
    });
  }
}
