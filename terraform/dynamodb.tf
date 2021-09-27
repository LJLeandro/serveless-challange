resource "aws_dynamodb_table" "this" {
  name         = local.namespaced_service_name
  hash_key     = "Id"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "Id"
    type = "N"
  }
}