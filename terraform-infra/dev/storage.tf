module "storage" {
  source = "../../terraform-modules/storage"

  product_name   = var.product_name
  environment    = var.environment
  purpose        = "app-storage"
  region         = var.region
  storage_class  = "STANDARD"
  lifecycle_days = 30
  kms_key        = module.kms.storage_key_id
}