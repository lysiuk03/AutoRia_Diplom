resource "aws_dynamodb_table" "metadata" {
  name             = join("-", ["ObjectMetadata", var.environment])
  billing_mode     = "PAY_PER_REQUEST"
  hash_key         = "id"
  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  attribute {
    name = "id"
    type = "S"
  }

  server_side_encryption {
    enabled     = true
    kms_key_arn = aws_kms_key.my_kms_key.arn
  }

}
# Записуємо дані облікових даних у DynamoDB для Docker Username
resource "aws_dynamodb_table_item" "docker_credentials_username" {
  table_name = aws_dynamodb_table.metadata.name
  hash_key   = "id" # Використовуємо ключ id, оскільки він визначений як hash_key у таблиці

  item = <<ITEM
{
  "id": {"S": "DOCKER_USERNAME"},
  "credential_type": {"S": "Username"},
  "value": {"S": "${var.docker_username}"}
}
ITEM
}

# Записуємо дані облікових даних у DynamoDB для Docker Password
resource "aws_dynamodb_table_item" "docker_credentials_password" {
  table_name = aws_dynamodb_table.metadata.name
  hash_key   = "id" # Використовуємо ключ id

  item = <<ITEM
{
  "id": {"S": "DOCKER_PASSWORD"},
  "credential_type": {"S": "Password"},
  "value": {"S": "${var.docker_password}"}
}
ITEM
}
