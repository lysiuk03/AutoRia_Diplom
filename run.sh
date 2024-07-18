apt update
apt install docker.io -y
docker swarm init
docker stack deploy -c docker-compose.grafana.yaml monitoring