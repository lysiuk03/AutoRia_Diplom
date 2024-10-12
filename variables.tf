variable "aws_access_key" {
  description = "AWS access key"
  type        = string
}

variable "aws_secret_key" {
  description = "AWS secret key"
  type        = string
}

variable "region" {
  description = "AWS region"
  type        = string
}

variable "vpc_cidr" {
  description = "VPC CIDR"
  type        = string
}
variable "azs" {
  description = "azs"
  type        = list(string)
}

variable "public_subnets" {
  description = "Public Subnets CIDR"
  type        = list(string)
}

variable "private_subnets" {
  description = "Private subnets for the EKS cluster"
  type        = list(string)
}
variable "intra_subnets" {
  description = "Private subnets for the EKS cluster"
  type        = list(string)
}
variable "instance_type" {
  description = "Instance Type"
  type        = string
}

variable "company_name" {
  description = "The name of the company"
  type        = string
  default     = "my-instance"
}
variable "full_company_name" {
  description = "The full name of the company"
  type        = string
  default     = "My-instance"
}
variable "default_name_instance" {
  description = "The default name of the instance"
  type        = string
  default     = "node"
}
variable "ingress_rules" {
  description = "Ingress rules for the security group"
  type = list(object({
    from_port   = number
    to_port     = number
    protocol    = string
    cidr_blocks = string
  }))
}

variable "user_arn" {
  default = "master_cluster"
}

variable "user_arn_root" {
  default = "root"
}


