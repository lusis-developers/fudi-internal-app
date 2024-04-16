# Internal-app

Este proyecto es una aplicación web desarrollada con Vue 3 y Vite. Se utiliza para gestionar restaurantes, sus bancos y sus respectivos items de menú en un sistema de administración.

## Configuración del entorno de desarrollo

Recomendamos el uso de [VSCode](https://code.visualstudio.com/) con la extensión [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) para un mejor soporte de TypeScript en archivos `.vue`. Asegúrate de desactivar la extensión Vetur si la tienes instalada.

Para instalar las dependencias del proyecto, ejecuta el siguiente comando:


```pnpm install```


Para iniciar el servidor de desarrollo, ejecuta:


```pnpm dev```


Para compilar y minificar para producción, ejecuta:



```pnpm build```


## Estructura del proyecto

El proyecto sigue una estructura de carpetas estándar de Vue. Los componentes se encuentran en la carpeta `src/components`, las vistas en `src/views` y las utilidades en `src/utils`. Las reglas de validación y los elementos del menú se definen en `src/utils/Validations.ts` y `src/utils/menuItems.ts` respectivamente.

Los estilos globales se definen en `src/styles/main.scss`.

## Funcionalidad principal

La funcionalidad principal del proyecto se centra en la gestión de restaurantes, su cuenta bancaria y elementos de su menú. Los formularios para la creación y edición de estos elementos se encuentran en `src/views/AdminView/BusinessForm` y `src/views/AdminView/EditBusinessForm`.

Las validaciones para los campos de los formularios se definen en `src/utils/Validations.ts` y se utilizan en los componentes de los formularios.

## Contribuir

Para contribuir al proyecto, asegúrate de seguir las convenciones de código existentes y de probar tu código antes de enviar un pull request. Si tienes alguna pregunta o problema, no dudes en abrir un issue.