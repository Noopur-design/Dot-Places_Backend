const axios = require('axios');
const HttpError = require('../models/http-error');

async function getCoordsForAddress(address) {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
      {
        headers: {
         'User-Agent': 'Lisbon12/1.0 dev.lisbon07@gmail.com'
        },
        timeout: 5000
      }
    );


    const data = response.data;

    if (!data || data.length === 0) {
      const error = new HttpError(
        'Could not find location for the specified address.',
        422
      );
      throw error;
    }

    // Return the first result's coordinates
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon)
    };
    
  } catch (error) {
    if (error.response) {
      console.error('🌐 Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('📡 No response received:', error.request);
    } else {
      console.error('💥 Request setup error:', error.message);
    }

    throw new HttpError(
      'Error connecting to geocoding service. Please try again later.',
      500
    );
  }
}

module.exports = getCoordsForAddress;