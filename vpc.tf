module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 4.0"
  #version = "4.0.0" # Перевірте останню версію на https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/latest

  name = "${var.company_name}-vpc"
  cidr = var.vpc_cidr

  azs                  = var.azs
  private_subnets      = var.private_subnets
  public_subnets       = var.public_subnets
  intra_subnets        = var.intra_subnets
  enable_dns_hostnames = true
  enable_nat_gateway   = true
  single_nat_gateway   = true

  public_subnet_tags = {
    "kubernetes.io/role/elb" = 1
  }

  private_subnet_tags = {
    "kubernetes.io/role/internal-elb" = 1
  }
}

