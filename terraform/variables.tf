variable "project_id" {
  description = "Google Cloud Project ID"
  type        = string
  default     = "poc-car-delivery"
}

variable "region" {
  description = "Firestore region (e.g., us-central1)"
  type        = string
  default     = "us-central1"
}