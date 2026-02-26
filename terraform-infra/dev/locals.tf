locals {
  name_prefix = var.product_name

  common_labels = {
    env         = var.environment
    productname = var.product_name
    createdby   = var.created_by
    lastupdated = timestamp()
  }
}