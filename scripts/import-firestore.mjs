import fs from "node:fs";
import { parse } from "csv-parse/sync";
import admin from "firebase-admin";

const collection_map = "Map";

const csv_file = "data/cso_outfall.csv";

const field_map_cso = {
  "STATUS": "Cso_stable",
  "NAME": "Street_name",
};

function csoBoolean(value) {
  const v = String(value).trim().toLowerCase();
  if (v == "controlled") return true; 
  if (v == "uncontrolled") return false; 
  return false;
}

function toNumber(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return null; 
  return n; 
}

function mapNormalizeRow(row) {
  const out = {};
  const lat = toNumber(row["LATITUDE"]);
  const long = toNumber(row["LONGITUDE"]);

  for (const [csvKey, fsKey] of Object.entries(field_map_cso)) {
    out[fsKey] = row[csvKey];
  }

  if(lat != null && long != null) {
    out.Location = new admin.firestore.GeoPoint(lat, long);
  }
  out.Cso_stable = csoBoolean(row["STATUS"]);
  out.Street_name = row["NAME"];
  out.Rain = Math.random() < 0.5; 
  out.Cso_possibility = (out.Rain === true && out.Cso_stable === false);
  return out;
}

function initAdmin() {
  if (admin.apps.length) return admin.app();
  return admin.initializeApp();
}

async function main() {
  if (!fs.existsSync(csv_file)) {
    throw new Error(`CSV not found: ${csv_file}`);
  }

  const csv_text = fs.readFileSync(csv_file, "utf-8");
  const rows = parse(csv_text, { columns: true, skip_empty_lines: true });

  initAdmin();
  const db = admin.firestore();
  
  for (const row of rows) {
    const data = mapNormalizeRow(row);
    const rawId = row["LABEL"];
    const id = String(rawId).replaceAll("/", "_")
    await db.collection(collection_map).doc(id).set(data);
  }

  console.log(`Imported ${rows.length} rows into ${collection_map}`);
  
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
