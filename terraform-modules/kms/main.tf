resource "google_kms_key_ring" "keyring" {
  name     = "${var.product_name}-${var.environment}-kms"
  location = var.region
  project  = var.project_id
}

resource "google_kms_crypto_key" "storage_key" {
  name            = "${var.product_name}-${var.environment}-storage-key"
  key_ring        = google_kms_key_ring.keyring.id
  rotation_period = "7776000s"
}

resource "google_kms_crypto_key" "sql_key" {
  name            = "${var.product_name}-${var.environment}-sql-key"
  key_ring        = google_kms_key_ring.keyring.id
  rotation_period = "7776000s"
}