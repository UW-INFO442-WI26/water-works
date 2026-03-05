const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");

admin.initializeApp();

async function geocodeAndUpdate(snap, userId) {
  const data = snap.data();
  const address = data.homeAddress;

  if (!address) {
    console.log("No homeAddress found, skipping.");
    return null;
  }

  // Skip if location already exists and address hasn't changed
  if (data.location) {
    console.log("Location already set, skipping.");
    return null;
  }

  try {
    const encoded = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${process.env.GEOCODING_API_KEY}`;

    const res = await fetch(url);
    const json = await res.json();

    if (json.status !== "OK" || !json.results.length) {
      console.error(`Geocoding failed for "${address}": ${json.status}`);
      return null;
    }

    const { lat, lng } = json.results[0].geometry.location;
    const geoPoint = new admin.firestore.GeoPoint(lat, lng);

    await snap.ref.update({ location: geoPoint });
    console.log(`Set location for user ${userId}: (${lat}, ${lng})`);
  } catch (err) {
    console.error("Error geocoding address:", err);
  }

  return null;
}

exports.geocodeOnUserCreate = onDocumentCreated("users/{userId}", async (event) => {
  return geocodeAndUpdate(event.data, event.params.userId);
});

exports.geocodeOnUserUpdate = onDocumentUpdated("users/{userId}", async (event) => {
  const before = event.data.before.data();
  const after = event.data.after.data();

  // Only re-geocode if homeAddress was just added or changed
  if (before.homeAddress === after.homeAddress) {
    console.log("homeAddress unchanged, skipping.");
    return null;
  }

  // Clear existing location so geocodeAndUpdate runs
  const snapWithoutLocation = {
    data: () => ({ ...after, location: null }),
    ref: event.data.after.ref,
  };

  return geocodeAndUpdate(snapWithoutLocation, event.params.userId);
});