provider "google" {
  project = var.project_id
  region  = var.region
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

# Enable Firestore in Native Mode
resource "google_firestore_database" "firestore_db" {
  project     = var.project_id
  name        = "(default)"
  location_id = var.region
  type        = "FIRESTORE_NATIVE"
}

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
  collection  = "settings"
  document_id = "adminList"

  fields = jsonencode({
    emails = ["m.barsukou@gmail.com", "admin2@example.com"]
  })
}
