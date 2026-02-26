resource "google_compute_network" "vpc" {
  name                    = "${var.product_name}-${var.environment}-vpc"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "subnet" {
  name          = "${var.product_name}-${var.environment}-subnet"
  region        = var.region
  ip_cidr_range = var.subnet_cidr
  network       = google_compute_network.vpc.id
}