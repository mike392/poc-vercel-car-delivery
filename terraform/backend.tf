terraform {
  backend "gcs" {
    bucket = google_storage_bucket.state_bucket.name        
    prefix = "terraform/state"
  }
}