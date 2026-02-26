output "vpc_name" {
  value = module.network.network_name
}

output "storage_bucket" {
  value = module.storage.bucket_name
}

output "cloudsql_instance" {
  value = module.cloudsql.instance_name
}

output "cloud_run_url" {
  value = module.cloudrun.service_url
}