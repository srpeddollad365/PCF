module "kms" {
  source = "../../terraform-modules/kms"

  project_id   = var.project_id
  region       = var.region
  environment  = var.environment
  product_name = var.product_name
}