# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# copy csproj and restore as distinct layers
WORKDIR /src
COPY WebBack.sln ./
COPY WebBack/*.csproj ./WebBack/
RUN dotnet restore

# copy everything else and build app
COPY . .

WORKDIR /src/WebBack
RUN dotnet publish -o /app

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "WebBack.dll"]