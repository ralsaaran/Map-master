var MapWithMarkers = function() {
	"use strict";
    var self = this;
    //google map object.
    var map;
    //info window for map markers.
    var markerInfoWindow;
    //locations to be marked on map.
    self.mapLocations = ko.observableArray([]);
    //searched text.
    self.searchQuery = ko.observable();
    //whether or not the drawer is visible.
    self.drawerVisible = ko.observable(true);
    //map styles
    var styles = [];

    this.initialize = function() {

        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 40.7413549,
                lng: -73.9980244
            },
            zoom: 13,
            styles: styles,
            mapTypeControl: false
        });

    	$.getJSON( "./js/styles.json", function( data ) {
    		styles = data;
		});

        // Set the map's style to the initial value of the selector.
        var styleSelector = document.getElementById('style-selector');
        map.setOptions({
            styles: styles[styleSelector.value]
        });

        // Apply new JSON when the user selects a different style.
        styleSelector.addEventListener('change', function() {
            map.setOptions({
                styles: styles[styleSelector.value]
            });
        });

        markerInfoWindow = new MapInfoWindow();
        initializeLocations();
    };

    var initializeLocations = function() {
        self.mapLocations = ko.observableArray([{
            name: 'Wrigley Field',
            address: '1060 W Addison St, Chicago, IL 60613',
            location: {
                lat: 41.947454,
                lng: -87.656134
            },
            isVisible: ko.observable(true)
        }, {
            name: 'John Hancock Observatory',
            address: '875 N Michigan Avenue, Chicago, IL 60611',
            location: {
                lat: 41.898883,
                lng: -87.623150
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Progressive Field',
            address: '2401 Ontario St, Cleveland, OH 44115',
            location: {
                lat: 41.495705,
                lng: -81.685273
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Comerica Park',
            address: '2100 Woodward Ave, Detroit, MI 48201',
            location: {
                lat: 42.3389,
                lng: -83.0485
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Dodger Stadium',
            address: '1000 Vin Scully Ave, Los Angeles, CA 90012',
            location: {
                lat: 34.073873,
                lng: -118.240777
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Safeco Field',
            address: '1250 1st Ave S, Seattle, WA 98134',
            location: {
                lat: 47.5914,
                lng: -122.3323
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Petco Park',
            address: '100 Park Blvd, San Diego, CA 92101',
            location: {
                lat: 32.707205,
                lng: -117.155795
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Angel Stadium',
            address: '2000 E Gene Autry Way, Anaheim, CA 92806',
            location: {
                lat: 33.800290,
                lng: -117.882749
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Yankee Stadium',
            address: '1 E 161st St, Bronx, NY 10451',
            location: {
                lat: 40.8296,
                lng: -73.9262
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Citizen\'s Bank Park',
            address: '1 Citizens Bank Way, Philadelphia, PA 19148, USA',
            location: {
                lat: 39.906,
                lng: -75.1666
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Nationals Park',
            address: '1500 S Capitol St SE, Washington, DC 20003',
            location: {
                lat: 38.8729,
                lng: -77.0075
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Citi Field',
            address: '123-01 Roosevelt Ave, Queens, NY 11368',
            location: {
                lat: 40.757,
                lng: -73.8458
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Met Life Stadium',
            address: '1 MetLife Stadium Dr, East Rutherford, NJ 07073',
            location: {
                lat: 40.8128,
                lng: -74.0742
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Tropicana Field',
            address: '1 Tropicana Dr, St. Petersburg, FL 33705',
            location: {
                lat: 27.768111,
                lng: -82.653269
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Great American Ballpark',
            address: '100 Joe Nuxhall Way, Cincinnati, OH 45202',
            location: {
                lat: 39.0979,
                lng: -84.5082
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Miller Park',
            address: '1 Brewers Way, Milwaukee, WI 53214',
            location: {
                lat: 43.0282,
                lng: -87.9713
            },
            isVisible: ko.observable(true)
        },{
            name: 'Lambeau Field',
            address: '1265 Lombardi Ave, Green Bay, WI 54304',
            location: {
                lat: 44.5013,
                lng: -88.0622
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Hubert H. Humphrey Metrodome',
            address: '900 S 5th St, Minneapolis, MN 55415',
            location: {
                lat: 44.9739,
                lng: -93.2581
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Rogers Centre',
            address: '1 Blue Jays Way, Toronto, ON M5V 1J1, Canada',
            location: {
                lat: 43.6414,
                lng: -79.3894
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Bahamas',
            address: 'Bahamas',
            location: {
                lat: 25.025885,
                lng: -78.035889
            },
            isVisible: ko.observable(true)
        }, {
            name: 'CN Tower',
            address: '301 Front St W, Toronto, ON M5V 2T6, Canada',
            location: {
                lat: 43.6426,
                lng: -79.3871
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Petra',
            address: 'Petra , Jordan',
            location: {
                lat: 30.328454,
                lng: 35.444362
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Mount Nebo',
            address: 'Mount Nebo, Jordan',
            location: {
                lat: 31.767658,
                lng: 35.725615
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Wadi Rum',
            address: 'Wadi Rum, Jordan',
            location: {
                lat: 29.534667,
                lng: 35.407909
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Dead Sea',
            address: 'Dead Sea, Jordan',
            location: {
                lat: 31.559029,
                lng: 35.473189
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Amman',
            address: 'Amman, Jordan',
            location: {
                lat: 31.951665,
                lng: 35.939358
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Key West',
            address: 'Key West, Florida',
            location: {
                lat: 24.555059,
                lng: -81.779987
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Blarney Castle',
            address: 'Blarney Castle, Ireland',
            location: {
                lat: 51.929092,
                lng: -8.570885
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Kilkenny Castle',
            address: 'Kilkenny Castle, Ireland',
            location: {
                lat: 52.650462,
                lng: -7.249298
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Waterford Crystal Factory',
            address: '28 The Mall, Waterford, Ireland',
            location: {
                lat: 52.259680,
                lng: -7.106475
            },
            isVisible: ko.observable(true)
        }, {
            name: 'Dublin',
            address: 'Dublin, Ireland',
            location: {
                lat: 53.349805,
                lng: -6.260310
            },
            isVisible: ko.observable(true)
        }]);

        var bounds = new google.maps.LatLngBounds();
        var lastIndex = self.mapLocations().length - 1;
        for (var i = 0; i <= lastIndex; i++) {
            var marker = createMarker(self.mapLocations()[i], i);
            self.mapLocations()[i].marker = marker;
            bounds.extend(self.mapLocations()[i].marker.position);

        }
        map.fitBounds(bounds);
		google.maps.event.addDomListener(window, 'resize', function() {
		  map.fitBounds(bounds); // `bounds` is a `LatLngBounds` object
		});
    };

    var setFlagImageURL = function(mapLocationObject, location) {
        $.ajax({
            type: 'GET',
            url: 'http://api.geonames.org/countryCode?lat=' + location.lat + '&lng=' + location.lng + '&username=jchaplin',
            async: true
        }).done(function(result) {
        	if(result)
                mapLocationObject.imageHTML = "<img src='http://geotree.geonames.org/img/flags18/" + result.trim() + ".png' alt='country flag' />";
        }).fail(function() {
                mapLocationObject.imageHTML = "<span> Unable to load flag image. </span>";
        });
    };

    //function to create map marker.
    var createMarker = function(mapItem, index) {
        var position = mapItem.location;
        var title = mapItem.name;
        var address = mapItem.address;

        var marker = new google.maps.Marker({
            position: position,
            title: title,
            address: address,
            animation: google.maps.Animation.DROP,
            id: index
        });

        setFlagImageURL(marker, position);

        //Opens the infowindow.
        marker.addListener('click', function() {
            markerInfoWindow.populateInfoWindow(marker);
        });

        marker.setMap(map);

        return marker;
    };

    // This function will loop through the markers array and display them all.
    this.showPlaces = function() {
        var bounds = new google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < self.mapLocations().length; i++) {
            self.mapLocations()[i].marker.setMap(map);
            bounds.extend(self.mapLocations()[i].marker.position);
        }
        map.fitBounds(bounds);
    };

    this.hideRemainingEntries = function(data, event) {
        //data is corresponding data object that was cliked from view
        var lastIndex = self.mapLocations().length - 1;
        for (var i = 0; i <= lastIndex; i++) {
            var item = self.mapLocations()[i];
            item.isVisible(false);
            item.marker.setMap(null);
        }
        data.isVisible(true);
        data.marker.setMap(map);
        markerInfoWindow.populateInfoWindow(data.marker);
    };

    this.toggleDrawerControls = function() {
        self.drawerVisible(!self.drawerVisible());
    };

    this.resetEntries = function() {
        var lastIndex = self.mapLocations().length - 1;
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i <= lastIndex; i++) {
            var item = self.mapLocations()[i];
            item.isVisible(true);
            item.marker.setMap(map);
            bounds.extend(item.marker.position);
        }
        map.fitBounds(bounds);
    };

    // This function will loop through the listings and hide them all.
    this.hidePlaces = function() {
        for (var i = 0; i < self.mapLocations().length; i++) {
            self.mapLocations()[i].marker.setMap(null);
        }
    };

    self.searchQuery.subscribe(function() {
        var places = self.mapLocations;
        var searchQuery = self.searchQuery().toLowerCase();
        var bounds = new google.maps.LatLngBounds();

        ko.utils.arrayForEach(self.mapLocations(), function(element) {
            var eltName = element.name.toLowerCase();

            if (eltName.indexOf(searchQuery) === -1) {
                element.isVisible(false);
                element.marker.setMap(null);
            } else {
                element.isVisible(true);
                element.marker.setMap(map);
                bounds.extend(element.marker.position);
            }
        });

        map.fitBounds(bounds);
    });

    this.initialize();
};


var MapInfoWindow = function() {
	"use strict";
    var infoWin = new google.maps.InfoWindow();
    var streetViewService = new google.maps.StreetViewService();

    this.populateInfoWindow = function(marker) {
        // Check to make sure the infoWin is not already opened on this marker.
        if (infoWin.marker !== marker) {
            // Clear the infoWin content to give the streetview time to load.
            infoWin.setContent('');
            infoWin.marker = marker;
            // Make sure the marker property is cleared if the infoWin is closed.
            infoWin.addListener('closeclick', function() {
                infoWin.marker = null;
            });
        }

        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
        	marker.setAnimation(google.maps.Animation.BOUNCE);
            window.setTimeout(function(){
				marker.setAnimation(null);
            }, 1400);
        }

        // Use streetview service to get the closest streetview image within
        // 50 meters of the markers position
        streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
        // Open the infowindow on the correct marker.
        infoWin.open(map, marker);
    };

    var radius = 50;
    // In case the status is OK, which means the pano was found, compute the
    // position of the streetview image, then calculate the heading, then get a
    // panorama from that and set the options
    var getStreetView = function(data, status) {
        if (status === google.maps.StreetViewStatus.OK) {
            var nearStreetViewLocation = data.location.latLng;
            var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, infoWin.marker.position);

            var flagImageHTML = infoWin.marker.imageHTML;
	        infoWin.setContent( flagImageHTML + '<strong>' + infoWin.marker.title + '</strong><div>' + infoWin.marker.address + '</div><div id="pano" class="streetViewContainer"></div>');

            var panoramaOptions = {
                position: nearStreetViewLocation,
                pov: {
                    heading: heading,
                    pitch: 30
                }
            };
            var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
        } else {
            infoWin.setContent('<strong>' + infoWin.marker.title + '</strong><div>' + infoWin.marker.address + '</div>' + '<div>No Street View Found</div>');
        }
    };
};

function initMap() {
    var mapWithMarkers = new MapWithMarkers();
    ko.applyBindings(mapWithMarkers);
}

function loadError() {
	alert("Unable to load libraries. Exiting application.");
}