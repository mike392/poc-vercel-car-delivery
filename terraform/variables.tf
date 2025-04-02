variable "project_id" {
  description = "Google Cloud Project ID"
  type        = string
}

variable "region" {
  description = "Firestore region (e.g., us-central1)"
  type        = string
  default     = "us-central1"
}