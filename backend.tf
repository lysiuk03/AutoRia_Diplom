terraform {
  backend "s3" {
    bucket = "wheeldeal-eks-terraform-bucket"
    key    = "eks/eks/terraform.tfstate"
    region = "eu-north-1"
  }
}
