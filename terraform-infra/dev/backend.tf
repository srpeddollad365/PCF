terraform {
  required_version = ">= 1.6.0"

  backend "gcs" {
    bucket  = "billing-tfstate-storage-dev"
    prefix  = "terraform/state"
  }
}