module "cloudsql" {
  source = "../../terraform-modules/cloudsql"

  product_name = var.product_name
  environment  = var.environment
  region       = var.region
  db_version   = "POSTGRES_15"
  db_tier      = "db-custom-2-7680"
  network_id   = module.network.network_id
  kms_key      = module.kms.sql_key_id
}