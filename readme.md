# Backend Base Monorepo

Este proyecto es una base para desarrollar diferentes servicios REST que incluyen varias APIs, similar a un monorepo. El proyecto está dividido en dos principales directorios: `commons` y `api`.

## Estructura de Proyecto

```
├── scripts/
│   ├── build.sh
│   ├── dev.up.sh
├── .gitignore
├── commons/
│   ├── .editorconfig
│   ├── .env
│   ├── .eslintrc.js
│   ├── .gitignore
│   ├── .prettierignore
│   ├── .prettierrc
│   ├── jest.config.js
│   ├── package.json
│   ├── src/
│   │   ├── config/
│   │   ├── ...
│   ├── tsconfig.build.json
│   ├── tsconfig.eslint.json
│   ├── tsconfig.json
├── api/
│   ├── .editorconfig
│   ├── .env
│   ├── .eslintrc.js
│   ├── .gitignore
│   ├── .prettierignore
│   ├── .prettierrc
│   ├── coverage/
│   │   ├── ...
│   ├── jest.config.js
│   ├── moleculer.config.ts
│   ├── package.json
│   ├── src/
│   │   ├── services/
│   │   │   ├── api.service.ts
│   │   │   ├── handlers/
│   │   │   │   ├── projectStatusHandler.ts
│   │   ├── base.service.ts
│   ├── tsconfig.build.json
│   ├── tsconfig.eslint.json
│   ├── tsconfig.json
├── package.json
├── Procfile
├── readme.md
├── tsconfig.json
```

## Descripción de Carpetas y Archivos

- [`__scripts__/`]: Contiene scripts para construir y configurar el entorno de desarrollo.

  - [`build.sh`]: Script para construir el proyecto completo.
  - `dev.up.sh`: Script para configurar el entorno de desarrollo.

- [`commons/`]: Contiene configuraciones y código compartido entre los diferentes servicios.

  - `.editorconfig`: Configuración de editor.
  - [`.env`]: Variables de entorno.
  - `.eslintrc.js`: Configuración de ESLint.
  - [`.gitignore`]: Archivos y carpetas a ignorar por Git.
  - `.prettierignore`: Archivos y carpetas a ignorar por Prettier.
  - `.prettierrc`: Configuración de Prettier.
  - [`jest.config.js`]: Configuración de Jest.
  - [`package.json`]: Dependencias y scripts del proyecto.
  - [`src/`]: Código fuente compartido.
  - [`tsconfig.build.json`]: Configuración de TypeScript para la construcción.
  - [`tsconfig.eslint.json`]: Configuración de TypeScript para ESLint.
  - [`tsconfig.json`]: Configuración de TypeScript.

- [`*-api/`]: Contiene el servicio principal de la API de finanzas.

  - `.editorconfig`: Configuración de editor.
  - [`.env`]: Variables de entorno.
  - `.eslintrc.js`: Configuración de ESLint.
  - [`.gitignore`]: Archivos y carpetas a ignorar por Git.
  - `.prettierignore`: Archivos y carpetas a ignorar por Prettier.
  - `.prettierrc`: Configuración de Prettier.
  - `coverage/`: Reportes de cobertura de pruebas.
  - [`jest.config.js`]: Configuración de Jest.
  - [`moleculer.config.ts`]: Configuración de Moleculer.
  - [`package.json`]: Dependencias y scripts del proyecto.
  - [`src/`]: Código fuente del servicio.
    - `services/`: Servicios de la API.
      - [`api.service.ts`]: Servicio principal de la API.
      - `handlers/`: Manejadores de eventos.
        - `projectStatusHandler.ts`: Manejador del estado del proyecto.
    - [`base.service.ts`]: Servicio base(expone endpoints).
  - [`tsconfig.build.json`]: Configuración de TypeScript para la construcción.
  - [`tsconfig.eslint.json`]: Configuración de TypeScript para ESLint.
  - [`tsconfig.json`]: Configuración de TypeScript.

- [`package.json`]: Dependencias y scripts del proyecto raíz.
- [`Procfile`]: Archivo de configuración para Heroku.
- [`readme.md`]: Documentación del proyecto.
- [`tsconfig.json`]: Configuración de TypeScript para el proyecto raíz.

## Instrucciones de Uso

1. Clona este repositorio en tu máquina local:

   ```
   git clone https://github.com/RodrigoChumpitaz/template-service
   ```

2. Navega hasta la carpeta del proyecto:

   ```
   cd ./template-service
   ```

3. Instala las dependencias necesarias:

   ```
   npm install
   yarn install
   ```

4. Levanta los servicios dentro de la carpeta ./\*-api:

   ```
   npm run dev:up
   yarn dev:up
   ```

   Esto iniciará todos los servicios REST disponibles.

## Solución a Problemas de Permisos

En caso de que encuentres problemas de permisos al intentar acceder a las carpetas del proyecto, sigue estos pasos:

1. Verifica que tienes los permisos adecuados para acceder a las carpetas del proyecto.

2. Si estás en un entorno Unix/Linux, puedes utilizar el comando `chmod` para cambiar los permisos de las carpetas:

   ```
   chmod -R 755 carpeta-del-proyecto
   ```

   Esto establecerá los permisos adecuados para que puedas acceder a las carpetas.

3. Si estás en un entorno Windows, asegúrate de ejecutar el comando con privilegios de administrador. También puedes intentar cambiar los permisos de las carpetas manualmente desde las propiedades del archivo.

Recuerda que estos pasos son generales y pueden variar dependiendo de tu sistema operativo y configuración específica.

Espero que esta guía te sea útil para comenzar a desarrollar tus servicios REST. ¡Buena suerte!

## Scripts

Este proyecto cuenta con varios scripts que te ayudarán en diferentes tareas de desarrollo. A continuación, se describen los scripts disponibles:

- `build.sh`: Este script se encarga de construir el proyecto completo. Puedes ejecutarlo utilizando el siguiente comando:

  ```
  ./scripts/build.sh
  ```

- `dev.up.sh`: Este script configura el entorno de desarrollo. Puedes ejecutarlo utilizando el siguiente comando:

  ```
  ./scripts/dev.up.sh
  ```

Estos scripts se encuentran en la carpeta `scripts/` del proyecto y te facilitarán la construcción y configuración del entorno de desarrollo.
Recuerda que puedes ejecutar estos scripts desde la raíz del proyecto utilizando la terminal de tu sistema operativo.

## Licencia

Este proyecto se encuentra bajo la Licencia MIT. Puedes encontrar más detalles en el archivo [LICENSE](./LICENSE).

## Creador

Este proyecto fue creado por Rodrigo Chumpitaz. Puedes encontrar más información sobre el creador en su perfil de GitHub: [Rodrigo Chumpitaz](https://github.com/RodrigoChumpitaz).
