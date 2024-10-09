#!/bin/bash

cat <<EOF >  /home/ubuntu/docker-compose.jenkins.yaml
version: '3.8'
services:
  jenkins:
    image: jj975/q1:jenkins.v.5.0
    privileged: true
    user: root
    ports:
      - 8080:8080
      - 50000:50000
    container_name: jenkins
    volumes:
      #- ./jenkins_conf:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
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

# Логін до Docker
sudo docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"

sudo docker-compose  -f /home/ubuntu/docker-compose.jenkins.yaml  up -d 
#sleep 180
#sudo reboot 
