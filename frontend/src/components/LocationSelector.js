import React, { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const LocationSelector = ({ onSelectLocation, locationInit }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0], // Default center if no locationInit provided
      zoom: 2, // Default zoom level
    });

    // Set the initial map bounds to focus on a specific location
    if (locationInit) {
      map.fitBounds(locationInit);
    }

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    map.addControl(geocoder, 'top-left');

    map.on('load', () => {
      // Add a marker for the default center
      const marker = new mapboxgl.Marker()
        .setLngLat([0, 0])
        .addTo(map);

      geocoder.on('result', (e) => {
        const { lng, lat } = e.result.geometry.coordinates;
        if (isWithinBounds([lng, lat], locationInit)) {
          setSelectedLocation([lat, lng]);
          marker.setLngLat([lng, lat]);
          map.flyTo({
            center: [lng, lat],
            zoom: 10, // Set the zoom level for the selected location
          });
        } else {
          alert("Selected location is outside the specified bounds");
        }
      });

      map.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        if (isWithinBounds([lng, lat], locationInit)) {
          setSelectedLocation([lat, lng]);
          marker.setLngLat([lng, lat]);
        } else {
          alert("Selected location is outside the specified bounds");
        }
      });
    });

    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isWithinBounds = (location, bounds) => {
    const [[minLon, minLat], [maxLon, maxLat]] = bounds;
    const [lon, lat] = location;
    return lon >= minLon && lon <= maxLon && lat >= minLat && lat <= maxLat;
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      onSelectLocation(selectedLocation);
    } else {
      alert("Please select a location on the map");
    }
  };

  // const handleChangeLocation = () => {
  //   setSelectedLocation(null); // Reset selected location
  // };

  return (
    <Box sx={{ width: 500, margin: 'auto', paddingTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        Where would you like to make the currency exchange?
      </Typography>
      
      <Typography color="secondary" gutterBottom>
      (*) We recommend choosing a location where people frequently gather, such as a coffee shop.
      </Typography>
      <Box sx={{ marginTop: 2, textAlign: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          (*) Confirm Selection
        </Button>
        {/* {selectedLocation && (
          <Button variant="contained" color="secondary" onClick={handleChangeLocation} sx={{ marginLeft: 2 }}>
            Change Location
          </Button>
        )} */}
      </Box>
      <Box id="map-container" style={{ height: 400 }}></Box>
      
    </Box>
  );
};

export default LocationSelector;
