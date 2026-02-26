variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "product_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "region" {
  type = string
}

variable "image" {
  description = "Container image"
  type        = string
}

variable "max_instances" {
  type    = number
  default = 2
}

variable "ingress" {
  type    = string
  default = "INGRESS_TRAFFIC_INTERNAL_ONLY"
}