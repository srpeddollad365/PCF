# Iam Usage
module "iam" {
  source = "../../terraform-modules/iam"

  project_id = var.project_id

  project_roles = {
    "roles/storage.objectViewer" = [
      "innova_d365_app/storage_reader_R@company.com"
    ]

    "roles/cloudsql.viewer" = [
      "innova_d365_app/sql_reader_R@company.com"
    ]
  }
}


#Logging Usage
module "logging" {
  source = "../../terraform-modules/logging"

  project_id   = var.project_id
  region       = var.region
  environment  = var.environment
  product_name = var.product_name
}