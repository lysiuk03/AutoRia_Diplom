#
#
# VPC
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "${var.default_name_instance}-vpc"
  cidr = var.vpc_cidr

  azs                     = data.aws_availability_zones.azs.names
  public_subnets          = var.public_subnets
  map_public_ip_on_launch = true

  enable_dns_hostnames = true

  tags = {
    Name        = "${var.default_name_instance}-vpc"
    Terraform   = "true"
    Environment = "dev"
  }

  public_subnet_tags = {
    Name = "${var.default_name_instance}-subnet"
  }
}
#
# SG
module "sg" {
  source = "terraform-aws-modules/security-group/aws"

  name        = "${var.default_name_instance}-sg"
  description = "Security Group for ${var.default_name_instance} Server"
  vpc_id      = module.vpc.vpc_id

  ingress_with_cidr_blocks = var.ingress_rules

  egress_with_cidr_blocks = [
    {
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_blocks = "0.0.0.0/0"
    }
  ]

  tags = {
    Name = "${var.default_name_instance}-sg"
  }
}
#
# EC2
module "ec2_instance" {
  depends_on = [module.vpc]
  source     = "terraform-aws-modules/ec2-instance/aws"

  name                        = "${var.full_company_name}-${var.default_name_instance}-Instance"
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.instance_type
  key_name                    = "${var.default_name_instance}-key"
  monitoring                  = true
  vpc_security_group_ids      = [module.sg.security_group_id]
  subnet_id                   = module.vpc.public_subnets[0]
  associate_public_ip_address = true
  user_data                   = file("initialization.sh")
  availability_zone           = data.aws_availability_zones.azs.names[0]

  iam_instance_profile = aws_iam_instance_profile.ec2_instance_profile.name

  root_block_device = [{
    volume_type           = "gp3"
    volume_size           = 30
    delete_on_termination = true
  }]
  tags = {
    Name        = "${var.default_name_instance}-Server"
    Terraform   = "true"
    Environment = "dev"
  }
}
#
