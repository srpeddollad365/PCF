resource "google_project_iam_binding" "project_bindings" {
  for_each = var.project_roles

  project = var.project_id
  role    = each.key

  members = [
    for group in each.value :
    "group:${group}"
  ]
}

resource "google_service_account_iam_binding" "sa_bindings" {
  for_each = var.service_account_roles

  service_account_id = each.value.service_account
  role               = each.value.roles[0]

  members = [
    for group in each.value.roles :
    "group:${group}"
  ]
}

resource "google_storage_bucket_iam_binding" "bucket_bindings" {
  for_each = var.bucket_roles

  bucket = each.value.bucket
  role   = each.value.roles[0]

  members = [
    for member in each.value.members :
    "group:${member}"
  ]
}