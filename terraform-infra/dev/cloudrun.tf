module "cloudrun" {
  source = "../../terraform-modules/cloudrun"

  project_id   = var.project_id
  product_name = var.product_name
  environment  = var.environment
  region       = var.region
  image        = "${var.region}-docker.pkg.dev/${var.project_id}/repo/app:latest"
  max_instances = 2
}