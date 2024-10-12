resource "aws_iam_user" "master_cluster" {
  name = var.user_arn
}

resource "aws_iam_access_key" "master_cluster_access_key" {
  user = aws_iam_user.master_cluster.name
}

# Додаємо політики для доступу до EKS, EC2, VPC, ECR, S3 та IAM
resource "aws_iam_user_policy_attachment" "master_cluster_attach" {
  user       = aws_iam_user.master_cluster.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}

resource "aws_iam_user_policy_attachment" "master_cluster_eks_access" {
  user       = aws_iam_user.master_cluster.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
}

resource "aws_iam_user_policy_attachment" "master_cluster_vpc_access" {
  user       = aws_iam_user.master_cluster.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonVPCFullAccess"
}
#/*
resource "aws_iam_user_policy_attachment" "master_cluster_admin_access" {
  user       = aws_iam_user.master_cluster.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}
#*/
resource "aws_iam_user_policy_attachment" "master_cluster_ecr_access" {
  user       = aws_iam_user.master_cluster.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

# Доступ до S3 для Terraform бекенду
resource "aws_iam_user_policy_attachment" "master_cluster_s3_access" {
  user       = aws_iam_user.master_cluster.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}



resource "local_file" "access_key_file" {
  filename = "${path.module}/${var.user_arn}_access_key.txt"
  content  = aws_iam_access_key.master_cluster_access_key.id
}

resource "local_file" "secret_key_file" {
  filename = "${path.module}/${var.user_arn}_secret_key.txt"
  content  = aws_iam_access_key.master_cluster_access_key.secret
}


