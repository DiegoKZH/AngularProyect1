# Etapa 1: Build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

# Copiar archivos de proyecto
COPY ["Proyect1.csproj", "./"]

# Restaurar dependencias
RUN dotnet restore "Proyect1.csproj"

# Copiar todo el código
COPY . .

# Build
RUN dotnet build "Proyect1.csproj" -c Release -o /app/build

# Etapa 2: Publish
FROM build AS publish
RUN dotnet publish "Proyect1.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Etapa 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app

COPY --from=publish /app/publish .

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["dotnet", "Proyect1.dll"]
