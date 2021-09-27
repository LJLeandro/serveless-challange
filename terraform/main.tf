terraform {
  required_version = "1.0.3"
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile

  default_tags {
    tags = {
      Project   = "Serverless - Teste Stefanini"
      CreatedAt = "2021-09-05"
      ManagedBy = "Terraform"
      Owner     = "Lucas José Leandro"
      Env       = var.env
    }
  }
}
