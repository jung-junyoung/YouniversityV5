const loadGoogleMapsScript = (apiKey) => {
  if (document.getElementById('googleMaps')) return;

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
  script.id = 'googleMaps';
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
};

export default loadGoogleMapsScript;