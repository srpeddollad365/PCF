module "network" {
  source = "../../terraform-modules/network"

  project_id   = var.project_id
  region       = var.region
  environment  = var.environment
  product_name = var.product_name
  subnet_cidr  = "10.20.0.0/24"
}
