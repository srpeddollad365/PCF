resource "google_storage_bucket" "bucket" {
  name                        = "${var.product_name}-${var.environment}-${var.purpose}"
  location                    = var.region
  uniform_bucket_level_access = true
  public_access_prevention    = "enforced"
  storage_class               = var.storage_class

  versioning {
    enabled = true
  }

  encryption {
    default_kms_key_name = var.kms_key
  }

  lifecycle_rule {
    action {
      type = "Delete"
    }
    condition {
      age = var.lifecycle_days
    }
  }
}