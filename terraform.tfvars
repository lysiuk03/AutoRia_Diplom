#aws_access_key  = ""
#aws_secret_key  = ""
region          = "eu-central-1"
vpc_cidr        = "10.123.0.0/16"
azs             = ["eu-central-1a", "eu-central-1b"]
public_subnets  = ["10.123.1.0/24", "10.123.2.0/24"]
private_subnets = ["10.123.3.0/24", "10.123.4.0/24"]
intra_subnets   = ["10.123.5.0/24", "10.123.6.0/24"]
#instance_type   = "t3.micro"
instance_type = "t3.large"

company_name          = "WheelDeal"
full_company_name     = "WheelDeal-Industries"
default_name_instance = "node"
ingress_rules = [
  { from_port = 22, to_port = 22, protocol = "tcp", cidr_blocks = "0.0.0.0/0" },
  { from_port = 8080, to_port = 8080, protocol = "tcp", cidr_blocks = "0.0.0.0/0" },
]
