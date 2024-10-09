# IAM роль для EC2
resource "aws_iam_role" "ec2_instance_role" {
  name = "${var.full_company_name}-${var.default_name_instance}-Role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

# Політика доступу до DynamoDB і KMS
resource "aws_iam_role_policy" "dynamodb_kms_policy" {
  role = aws_iam_role.ec2_instance_role.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:Scan",
        "dynamodb:Query"
      ],
      "Resource": "arn:aws:dynamodb:${var.region}:*:table/ObjectMetadata-${var.environment}"
    },
    {
      "Effect": "Allow",
      "Action": [
        "kms:Decrypt"
      ],
      "Resource": "arn:aws:kms:${var.region}:${data.aws_caller_identity.current.account_id}:key/${aws_kms_key.my_kms_key.key_id}"
    }
  ]
}
EOF
}

# Профіль для EC2 інстансу
resource "aws_iam_instance_profile" "ec2_instance_profile" {
  name = "${var.full_company_name}-${var.default_name_instance}-InstanceProfile"
  role = aws_iam_role.ec2_instance_role.name
}
