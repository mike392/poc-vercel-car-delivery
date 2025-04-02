terraform {
  backend "gcs" {
    bucket = "poc-car-delivery-bucket-name"
    prefix = "terraform/state"
  }
}