<h2 align="center">Prueba Clay Technologies</h3>

## Descripción
Este proyecto es una prueba técnica diseñada para demostrar habilidades en el desarrollo de software. La aplicación permite mostrar idiomas desde la API de acuerdo a los parametros establecidos.

> Este projecto uso como framework principal [Next](https://docs.nestjs.com/) en conjunto con [Tailwind](https://tailwindcss.com/) y [Shadcn](https://ui.shadcn.com/), además se recomienda uso de [pnpm](https://pnpm.io/es/installation#usando-pnpm). 

## Instalación
Para configurar y correr la aplicación localmente, sigue estos pasos:
```bash
$ pnpm install
```

## Ambientes
Primero debemos crear el env, para ello copiamos el de ejemplo:
```bash
cp .env.example .env
```
Para manejar las migraciones de la base de datos, usa los siguientes comandos:


## Ejecución de la aplicación
Puedes correr la aplicación en modo desarrollo utilizando los comandos:
```bash

# Modo watch (reinicio automático)
$ pnpm dev
```
La ruta de acceso es:
```
# ruta de acceso
$ http://localhost:3000

```


## Pruebas (WIP)

```bash
# Ejecutar pruebas unitarias
$ pnpm run test

# Ver la cobertura de pruebas
$ pnpm run test:cov
```

## Revisión funcionalidades

1. La applicación es accesible desde http://localhost:3000 además dispone de dos rutas adiconales para comprobar que se puede ajusta los textos a cada ruta.


```
http://localhost:3000
http://localhost:3000/dashaboard
http://localhost:3000/dashboard/profile
```

## Alcances (WIP)
- La aplicación tiene un SSR donde se desactiva el cache para fines practicos. 
- La aplicación almacena de manera local el idioma seleccionado actualmente, si llega a cambiar de ruta y la nueva ruta no dispone el idioma actual puede fallar, simplemente se debe cambiar a los idiomas disponibles.



## Author

- Paul Beltrán - [Github](https://github.com/pbeltranes) - [Lindked](https://www.linkedin.com/in/paul-beltran-espinosa/)