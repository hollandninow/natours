/* eslint-disable */
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiaG9sbGFuZG4iLCJhIjoiY2xhNnp1anYxMDFsaDNwbzJrc3JubTFuYiJ9.M5YUbgOLbt5tMOQWmhemBw';

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/hollandn/cla70h2e5000i14k3ckeglxbr',
    zoom: 9, // starting zoom
    projection: 'mercator',
    scrollZoom: false,
    // interactive: false,
  });

  map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
