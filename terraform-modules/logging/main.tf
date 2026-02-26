# Application Log Bucket
resource "google_logging_project_bucket_config" "application_logs" {
  project        = var.project_id
  location       = var.region
  bucket_id      = "${var.product_name}-${var.environment}-app-logs"
  retention_days = var.retention_days
}

#Security Log Bucket
resource "google_logging_project_bucket_config" "security_logs" {
  project        = var.project_id
  location       = var.region
  bucket_id      = "${var.product_name}-${var.environment}-security-logs"
  retention_days = var.retention_days
}

#Audit Log Bucket
resource "google_logging_project_bucket_config" "audit_logs" {
  project        = var.project_id
  location       = var.region
  bucket_id      = "${var.product_name}-${var.environment}-audit-logs"
  retention_days = var.retention_days
}

#Error Log Sink
resource "google_logging_project_sink" "error_sink" {
  name        = "${var.product_name}-${var.environment}-error-sink"
  project     = var.project_id
  destination = "logging.googleapis.com/projects/${var.project_id}/locations/${var.region}/buckets/${google_logging_project_bucket_config.security_logs.bucket_id}"

  filter = "severity>=ERROR"

  unique_writer_identity = true
}