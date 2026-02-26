output "storage_key_id" {
  value = google_kms_crypto_key.storage_key.id
}

output "sql_key_id" {
  value = google_kms_crypto_key.sql_key.id
}