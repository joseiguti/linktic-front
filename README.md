
# Documentación del Frontend - Linktic

## 1. Ejecución local

Para ejecutar la aplicación frontend localmente, es recomendable usar `docker-compose`, ya que simplifica el proceso de instalación de dependencias y la ejecución del proyecto.

### Pasos:

1. Clonar el repositorio.
2. Ejecutar los siguientes comandos:

```bash
docker compose down -v
docker compose up --build
```

Este comando construirá la imagen y levantará todos los servicios necesarios para que la aplicación frontend funcione.

## 2. Variables de Entorno (.env)

Asegúrate de configurar correctamente el archivo `.env` con las siguientes variables:

- **API_URL**: La URL base de la API con la que se interactúa.
- **API_KEY**: Clave de autenticación si es requerida.

Ejemplo de archivo `.env`:

```
VITE_API_URL=http://localhost:8080/api
VITE_API_KEY=123456
```

Estas variables son necesarias para que el frontend pueda interactuar correctamente con el backend y los servicios de la API.

## 3. Imagen y recursos

El proyecto está configurado para cargar imágenes y otros recursos estáticos desde el directorio `/public` dentro del proyecto. Asegúrate de que todos los recursos (imágenes, estilos, etc.) se encuentren en este directorio para que puedan ser accesibles desde la aplicación.

## 4. Docker y Despliegue

### Docker Compose

El uso de `docker-compose` es clave para correr el frontend de manera sencilla. Además, puedes integrarlo en pipelines de CI/CD para automatizar el despliegue.

Si estás utilizando DigitalOcean o alguna otra plataforma de despliegue, asegúrate de tener el `docker-compose.yml` correctamente configurado y sigue los pasos adecuados para el despliegue continuo, tal como se hace con el backend.
