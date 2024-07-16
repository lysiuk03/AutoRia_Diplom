# PostgreSQL з Docker

Ця гілка надає інструкції для налаштування та запуску бази даних PostgreSQL за допомогою Docker та Docker Compose. 

## Попередні умови

Переконайтеся, що у вас встановлено Docker та Docker Compose.

## Зміст

- `Dockerfile.postgres`: Файл для створення образу PostgreSQL зі ініціалізацією.
- `docker-compose.postgres.yaml`: Файл для запуску PostgreSQL за допомогою Docker Compose.
- `postgres_init/init-db.sh`: Скрипт ініціалізації бази даних.

## Налаштування

Створіть файл `.env` у кореневій директорії проекту зі наступним вмістом:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_database
```

 - **Примітка:** Замініть `your_password` та `your_database` на ваші власні значення. За бажанням `postgres` теж може бути іншим

## Запуск за допомогою Docker Compose

1. Клонуйте дану гілку репозиторія та перейдіть до папки
    ```bash
    git clone -b postgres https://github.com/lysiuk03/AutoRia_Diplom.git
    cd AutoRia_Diplom
    ```

2. Підніміть сервіс PostgreSQL:

    ```bash
    docker-compose -f docker-compose.postgres.yaml up -d
    ```

3. Для зупинки сервісу використовуйте:

    ```bash
    docker-compose -f docker-compose.postgres.yaml down
    ```

## Ручний запуск за допомогою Dockerfile

1. Побудуйте Docker-образ:

    ```bash
    docker build -f Dockerfile.postgres -t my-postgres-image . --no-cache
    ```

2. Запустіть контейнер:

    ```bash
    docker run --name postgres -d -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=your_database -p 5432:5432 my-postgres-image
    ```

    - **Примітка:** Замініть `your_password` та `your_database` на ваші власні значення. За бажанням `postgres` теж може бути іншим

## Ініціалізація бази даних

Скрипт `postgres_init/init-db.sh` створює базу даних з якої буде працювати Backend  даного проєкту

