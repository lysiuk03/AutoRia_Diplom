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

variable "public_subnets" {
  description = "Subnets CIDR"
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
  default     = "Master"
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
  default = "jaws"
}

variable "user_arn_root" {
  default = "root"
}

variable "key_spec" {
  default = "SYMMETRIC_DEFAULT"
}

variable "enabled" {
  default = true
}

variable "kms_alias" {
  default = "demo"
}

variable "environment" {
  default = "non-prod"
}

variable "rotation_enabled" {
  default = true
}

variable "docker_username" {
  description = "Username for Docker login"
  type        = string
}

variable "docker_password" {
  description = "Password for Docker login"
  type        = string
}
