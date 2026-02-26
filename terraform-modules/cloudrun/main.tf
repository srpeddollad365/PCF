resource "google_service_account" "cloudrun_sa" {
  project      = var.project_id
  account_id   = "${var.product_name}-${var.environment}-run-sa"
  display_name = "Cloud Run SA ${var.environment}"
}

resource "google_cloud_run_v2_service" "service" {
  name     = "${var.product_name}-${var.environment}-api"
  location = var.region
  project  = var.project_id

  template {
    service_account = google_service_account.cloudrun_sa.email

    containers {
      image = var.image

      env {
        name  = "ENV"
        value = var.environment
      }
    }

    scaling {
      max_instance_count = var.max_instances
    }
  }

  ingress = var.ingress
}