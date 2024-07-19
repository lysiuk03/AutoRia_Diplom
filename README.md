# Гілка Grafana Cluster

Цей проект є модифікацією репозиторію [Cyber1993/grafanaall](https://github.com/Cyber1993/grafanaall.git). Модифікації включають налаштування кластеру для моніторингу з використанням Grafana та Prometheus.
## Завантаження

Команда для клонування вмісту даної гілки репозиторія та перейдіть до папки
  ```bash
  git clone -b grafana-cluster https://github.com/lysiuk03/AutoRia_Diplom.git
  cd AutoRia_Diplom
  ```

## Запуск

Для запуску необхідно використовувати Docker Compose. Ви можете використовувати команду:

```powershell
docker-compose.exe -f .\docker-compose.grafana.yaml up -d
```
```shell
docker-compose -f ./docker-compose.grafana.yaml up -d
```

Або скористатися скриптом `run.sh` для кластеризації:

```sh
./run.sh
```

## Структура проекту

- **docker-compose.grafana.yaml**: Файл Docker Compose для налаштування та запуску сервісів.
- **run.sh**: Скрипт для запуску кластеру.
- **configs**: Каталог з конфігураційними файлами для Grafana та Prometheus.

## Конфігураційні файли

- **configs/alertmanager.yml**: Конфігурація Alertmanager. Замініть згідно коментарів токен і чат-ID.
- **configs/grafana/dashboards**: Налаштування панелей для Grafana.
  - **cadvisor.json**: Панель Cadvisor для моніторингу контейнерів.
  - **node-exporter.json**: Панель Node-Exporter для моніторингу ОС.
  - **providers.yml**: Джерело даних для Grafana про панелі.
- **configs/grafana/datasources/prometheus.yml**: Джерело даних для Prometheus.
- **configs/prometheus**: Конфігурації для Prometheus.
  - **alert_rules.yml**: Конфігурація тригерів сповіщень.
  - **prometheus.yml**: Конфігурація для Prometheus.
