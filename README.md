# SustainMap - Back

![NestJS](https://img.shields.io/badge/NestJS-v9.0.0-red?logo=nestjs)
![Node.js](https://img.shields.io/badge/Node.js-v20.0.0-green?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.1.6-blue?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-v11.0.0-orange?logo=firebase)

---


## **Resumen del Proyecto**

![udd40](https://bootcampvirtual.udd.cl/assets/img/logo4.png)
![matteroftrust](https://matteroftrust.org/wp-content/uploads/2019/01/mot_website_logo_small.png)

Este proyecto es la API backend de **SustainMap**, diseñada para proporcionar servicios RESTful eficientes y seguros. Está construida con **NestJS**, utilizando **TypeScript** para mantener un código modular y escalable, con soporte para autenticación y almacenamiento en tiempo real mediante **Firebase**.


### Funcionalidades principales:
1. API RESTful para gestionar datos del mapa interactivo.
2. Autenticación de usuarios con **Firebase Authentication**.
3. Integración con bases de datos y almacenamiento en la nube.
4. Arquitectura modular y altamente extensible.

### Objetivo:
Proveer un backend robusto y escalable que soporte el frontend de **SustainMap**, manteniendo buenas prácticas de desarrollo y rendimiento.

---
## **Requisitos Previos**

Antes de empezar, asegúrate de tener instaladas las siguientes herramientas:
- Node.js (versión recomendada: >=20.x)
- Firebase CLI

## **Instalación y Ejecución**

1. Clona este repositorio:
   ```bash
   git clone https://github.com/JonaDrar/suatinmap-back.git
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto con las siguientes claves:
     ```
      PORDEFINIR en el próximo sprint
     ```

4. Ejecuta el servidor de desarrollo:
   ```bash
   npm run start:dev
   ```

5. La API estará disponible en [http://localhost:3000](http://localhost:3000).

---

## **Reglas de Commits**

### Estructura del Mensaje de Commit
- Usa el formato: `tipo: descripción breve`
- Ejemplo: `feat: agregar autenticación con Firebase`

### Tipos de Commits
- **feat**: Para nuevas funcionalidades.
- **fix**: Para corregir errores.
- **docs**: Para cambios en la documentación.
- **style**: Cambios que no afectan la lógica (formato, espacios, etc.).
- **refactor**: Cambios de código que no corrigen errores ni añaden funcionalidades.
- **test**: Añadir o modificar pruebas.
- **chore**: Cambios en herramientas, configuración, o mantenimiento del proyecto.
- **perf**: Mejoras de rendimiento.
- **ci**: Cambios en integración continua.

### Reglas Adicionales
- Commits pequeños y específicos.
- Usa el idioma inglés o español de manera consistente.
- Referencia tickets o tareas si aplica (e.g., `feat: agregar endpoint para usuarios (#123)`).

---


## **Reglas de Merge Requests (MR)**

### Creación de MR
- Usa un título claro y descriptivo (e.g., `Agregar soporte para base de datos relacional`).
- Rellena la plantilla estándar del proyecto para detallar:
  - **Qué se ha hecho.**
  - **Por qué se ha hecho.**
  - **Cómo probarlo.**

### Revisión de MR
- Al menos un miembro del equipo debe aprobar la MR antes de hacer merge.
- Comprueba:
  - Código limpio y sin errores.
  - Uso correcto de Tipos en TypeScript.
  - No se suban secretos o configuraciones locales.
  - Documentación actualizada si aplica.

### Reglas para Hacer Merge
- Solo el autor del commit puede hacer merge.

### Estado del Proyecto
- La rama `main` debe estar siempre lista para producción.
- La rama `develop` contendrá los cambios aprobados para pruebas internas.

---


## **Uso de Ramas**

### Estructura de Ramas
- Usa el formato: `<tipo>/<descripción>`
- Tipos de ramas:
  - **feature**: Para nuevas funcionalidades.  
    Ejemplo: `feature/autenticacion-firebase`
  - **bugfix**: Para corregir errores.  
    Ejemplo: `bugfix/arreglo-validacion-datos`
  - **hotfix**: Cambios urgentes en producción.  
    Ejemplo: `hotfix/corregir-bug-login`
  - **chore**: Mantenimiento o tareas menores.  
    Ejemplo: `chore/actualizar-dependencias`

### Flujo de Trabajo
- La rama base para las ramas nuevas es `develop`.
- Una vez completada, haz un Merge Request hacia `develop`.

### Ramas Principales
- **main**: Versión lista para producción.  
  - Solo recibe merges desde `develop`.
- **develop**: Rama de desarrollo principal.  
  - Recibe merges desde ramas de tipo `feature`, `bugfix`, y `hotfix`.

### Reglas Adicionales
- Realiza un pull de `develop` antes de crear nuevas ramas.
- Mantén tus ramas sincronizadas con `develop` mientras trabajas para evitar conflictos.

---


## **Guías Adicionales**

### Estilo de Código
- Sigue las convenciones de ESLint configuradas en el proyecto.
- Usa el formato de código automatizado con `Prettier`.

---


## **Créditos**

Este proyecto es obra de **LatamCoders**, una célula de desarrollo colaborativa parte de la iniciativa **techXcellerators** de **UDD4.0**, el programa de bootcamps de la **Universidad del Desarrollo de Chile**, en colaboración con **MatterofTrust**.

### Sobre **techXcellerators**:
**techXcellerators** impulsa la transformación digital a través del desarrollo de talento en áreas tecnológicas clave, ofreciendo oportunidades reales para que estudiantes colaboren con empresas líderes en soluciones innovadoras.

---


## **Licencia**
Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
