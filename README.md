/// Aplicación Bancaria (Bankist App) ///

Esta es una aplicación de simulación bancaria desarrollada en JavaScript moderno (ES Modules) para demostrar el manejo de arrays, la lógica de negocio compleja y la gestión del estado de la aplicación. El proyecto utiliza Parcel 2 como bundler para optimizar y empaquetar los archivos.

/// Características Principales ///

Autenticación: Sistema simple de inicio de sesión basado en nombres de usuario y PIN.

Gestión de Saldos: Cálculo dinámico del saldo y resúmenes de ingresos/egresos basado en el historial de movimientos.

Transferencias: Lógica de transferencia de dinero entre cuentas con validación de saldo.

Préstamos: Funcionalidad para solicitar un préstamo basada en una regla de negocio específica (un depósito mínimo).

Cierre de Cuenta: Lógica para cerrar la cuenta verificando el nombre de usuario y el PIN.

Temporizador de Sesión: Cierre de sesión automático por inactividad.

/// Tecnologías Utilizadas ///

JavaScript (ES6+): Lógica principal, manipulación de arrays (map, reduce, filter, find) y control de flujo.

HTML/CSS: Estructura y estilos de la interfaz de usuario.

Parcel 2 (Beta): Usado para empaquetar el código, transformar el JS moderno para los navegadores y habilitar el Hot Module Replacement (HMR).

Jest: Framework de pruebas unitarias para validar la lógica de negocio.

/// Cómo Empezar ///

Para poner en marcha el proyecto en tu máquina local, sigue estos pasos:

1. Requisitos

Asegúrate de tener instalado Node.js y npm (Node Package Manager) en tu sistema.

2. Instalación

Navega a la carpeta del proyecto (/starter) e instala las dependencias:

npm install


3. Ejecución y Desarrollo

El proyecto utiliza Parcel para el entorno de desarrollo. Este comando iniciará un servidor local y recargará automáticamente el navegador al detectar cambios en el código:

npm start 

4. Ejecución de Pruebas Unitarias

Para verificar la fiabilidad de la lógica de negocio (creación de nombres de usuario, cálculo de balance y transferencias), ejecuta Jest:

npm test


/// Estructura del Proyecto ///

El código está organizado para separar responsabilidades:

/starter
├──            (login, transferir, prestar).
├── bankLogic.js         # Funciones Puras para cálculos (saldo, iniciales, sumarios).
├── script.js              # Lógica de la interfaz de usuario, Event Listeners y lógica principal del negocio
├── index.html             # Estructura principal de la aplicación.
├── style.css              # Estilos.
└── tests/
    └── bankLogic.test.js      # Pruebas para las funciones de negocio.


📝 Pruebas Unitarias Implementadas

He implementado una sólida cobertura de pruebas para:

createUsernames: Validación de mayúsculas, minúsculas y múltiples espacios.

calculateBalance: Verificación de saldo en casos mixtos, vacíos y solo negativos.

transferMoney: Validación de saldo suficiente, cuenta de destino y confirmación de mutación correcta en los arrays de movements (casos de éxito y fallo).
