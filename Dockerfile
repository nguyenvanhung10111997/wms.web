# Stage 1: Base Image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Stage 2: Build Image
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_18.x | bash \
    && apt-get install nodejs -yq

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-with-spa
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_18.x | bash \
    && apt-get install nodejs -yq
	
FROM build-with-spa AS build
WORKDIR /src

# Copy csproj files and restore dependencies
COPY ["wms.web/ClientApp/package.json", "wms.web/"]
COPY ["wms.web/wwwroot", "wms.web/"]
COPY ["wms.infrastructure/wms.infrastructure.csproj", "wms.infrastructure/"]
COPY ["wms.web/wms.web.csproj", "wms.web/"]


# Restore project dependencies
RUN dotnet restore "wms.web/wms.web.csproj"

# Copy the remaining files and build the application
COPY . .
WORKDIR "/src/wms.web"
RUN dotnet build "wms.web.csproj" -c Release -o /app/build

# Stage 3: Publish Image
FROM build AS publish
RUN dotnet publish "wms.web.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 4: Final Image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "wms.web.dll"]