terraform {
  backend "s3" {
    bucket = "master-terraform-bucket"
    key    = "jenkins/terraform.tfstate"
    region = "eu-north-1"
  }
}
