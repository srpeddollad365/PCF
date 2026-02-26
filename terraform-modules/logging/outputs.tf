output "log_buckets" {
  value = [
    google_logging_project_bucket_config.application_logs.bucket_id,
    google_logging_project_bucket_config.security_logs.bucket_id,
    google_logging_project_bucket_config.audit_logs.bucket_id
  ]
}