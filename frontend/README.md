

## Getting Started

First, run the development server:

```bash
# Estructura de directorios esperada:
# /MoodLend
#   ├── frontend/
#   │   ├── package.json
#   │   └── ...
#   └── back_end/
#       ├── package.json
#       └── ...+



# Construir imagen enfocándose solo en el frontend
docker build \
  -f frontend/Dockerfile \  # Especificar Dockerfile del frontend
  -t nextjs-frontend \      # Nombre de la imagen
  .                         # Contexto de construcción en el directorio raíz

# Configuración de ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin <tu-account-id>.dkr.ecr.us-east-1.amazonaws.com

# Etiquetar imagen para ECR
docker tag nextjs-frontend:latest \
  <tu-account-id>.dkr.ecr.us-east-1.amazonaws.com/nextjs-frontend:latest

# Subir imagen a ECR
docker push <tu-account-id>.dkr.ecr.us-east-1>.amazonaws.com/nextjs-frontend:latest
```

