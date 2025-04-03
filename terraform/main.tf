provider "google" {
  project     = var.project_id
  region      = var.region
  credentials = file("/tmp/gcp-key.json")
}

# Enable Firebase Services
resource "google_project_service" "firebase" {
  project = var.project_id
  service = "firebase.googleapis.com"
}

resource "google_project_service" "firestore" {
  project = var.project_id
  service = "firestore.googleapis.com"
}

resource "google_storage_bucket" "state_bucket" {
  name     = "poc-car-delivery-bucket-name"
  location = "EU"

  uniform_bucket_level_access = true
  versioning {
    enabled = true
  }

  lifecycle {
    prevent_destroy = true               # Prevent accidental deletion of the bucket (optional)
  }
}

# Enable Firestore in Native Mode
#resource "google_firestore_database" "firestore_db" {
#  project     = var.project_id
#  name        = "(default)"
#  location_id = var.region
#  type        = "FIRESTORE_NATIVE"
#}

# Enable Firebase Authentication
resource "google_project_service" "auth" {
  project = var.project_id
  service = "identitytoolkit.googleapis.com"
}

# Enable Firebase Hosting
resource "google_project_service" "firebase_hosting" {
  project = var.project_id
  service = "firebasehosting.googleapis.com"
}

resource "google_firebaserules_ruleset" "firestore_rules" {
  project = var.project_id

  source {
    files {
      name    = "firestore.rules"
      content = file("${path.module}/firestore.rules")
    }
  }
}

resource "google_firestore_document" "admin_list" {
  project     = var.project_id
  database    = "(default)"
  collection  = "settings"
  document_id = "adminList"

  fields = {
    emails = ["email1@example.com", "email2@example.com"]
  }
}
