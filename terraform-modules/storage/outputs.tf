output "storage_key_id" {
  value = google_kms_crypto_key.storage_key.id
}

output "bucket_name" {
  value = google_storage_bucket.bucket.name
}