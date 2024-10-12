#!/bin/bash

cat <<EOF >  /home/ubuntu/docker-compose.jenkins.yaml
version: '3.8'
services:
  jenkins:
    image: jj975/q1:jenkins.v.7.0
    privileged: true
    user: root
    ports:
      - 8080:8080
      - 50000:50000
    container_name: jenkins
    volumes:
      #- ./jenkins_conf:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
      - /home/ubuntu/:/aws
EOF
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

# Встановлюємо AWS CLI
sudo apt-get install -y unzip curl
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install


# Отримання зашифрованих даних з SSM
DOCKER_USERNAME=$(aws dynamodb get-item --table-name ObjectMetadata-non-prod --key '{"id": {"S": "DOCKER_USERNAME"}}' --query "Item.value.S" --output text)
DOCKER_PASSWORD=$(aws dynamodb get-item --table-name ObjectMetadata-non-prod --key '{"id": {"S": "DOCKER_PASSWORD"}}' --query "Item.value.S" --output text)
AWS_ACCESS_KEY=$(aws dynamodb get-item --table-name ObjectMetadata-non-prod --key '{"id": {"S": "AWS_ACCESS_KEY"}}' --query "Item.value.S" --output text)
AWS_SECRET_KEY=$(aws dynamodb get-item --table-name ObjectMetadata-non-prod --key '{"id": {"S": "AWS_SECRET_KEY"}}' --query "Item.value.S" --output text)

# Запис ключів AWS у файли
echo "$AWS_ACCESS_KEY" > /home/ubuntu/aws_access_key.txt
echo "$AWS_SECRET_KEY" > /home/ubuntu/aws_secret_key.txt
# Логін до Docker
sudo docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"

sudo docker-compose  -f /home/ubuntu/docker-compose.jenkins.yaml  up -d 
#sleep 180
#sudo reboot 
