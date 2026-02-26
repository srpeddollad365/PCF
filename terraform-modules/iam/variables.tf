variable "project_id" {
  description = "Project ID"
}

variable "project_roles" {
  description = "Project-level role bindings"
  type        = map(list(string))
  default     = {}
}

variable "service_account_roles" {
  description = "Service account role bindings"
  type = map(object({
    service_account = string
    roles           = list(string)
  }))
  default = {}
}

variable "bucket_roles" {
  description = "Bucket IAM role bindings"
  type = map(object({
    bucket  = string
    roles   = list(string)
    members = list(string)
  }))
  default = {}
}