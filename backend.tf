terraform {
  backend "s3" {
    bucket = "master-terraform-bucket"
    key    = "eks/eks/terraform.tfstate"
    region = "eu-north-1"
  }
}
