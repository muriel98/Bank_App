/// Aplicación Bancaria ///

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


/// Pruebas Unitarias Implementadas ///

He implementado una sólida cobertura de pruebas para:

createUsernames: Validación de mayúsculas, minúsculas y múltiples espacios.

calculateBalance: Verificación de saldo en casos mixtos, vacíos y solo negativos.

transferMoney: Validación de saldo suficiente, cuenta de destino y confirmación de mutación correcta en los arrays de movements (casos de éxito y fallo).

---------------------------------------------------------------------------------------------------------------------------------------------------------------

/// Banking Application ///

This is a simulated banking application developed in modern JavaScript (ES Modules) to demonstrate array handling, complex business logic, and application state management. The project uses Parcel 2 as a bundler to optimize and package the files.

/// Main Features ///

Authentication: Simple login system based on usernames and PINs.

Balance Management: Dynamic calculation of balance and income/expense summaries based on transaction history.

Transfers: Money transfer logic between accounts with balance validation.

Loans: Functionality to request a loan based on a specific business rule (minimum deposit required).

Account Closure: Logic to close the account verifying username and PIN.

Session Timer: Automatic logout due to inactivity.

/// Technologies Used ///

JavaScript (ES6+): Main logic, array manipulation (map, reduce, filter, find) and control flow.

HTML/CSS: Structure and styling of the user interface.

Parcel 2 (Beta): Used to bundle the code, transform modern JS for browsers, and enable Hot Module Replacement (HMR).

Jest: Unit testing framework to validate business logic.

/// How to Get Started ///

To run the project on your local machine, follow these steps:

Requirements

Make sure you have Node.js and npm (Node Package Manager) installed on your system.

Installation

Navigate to the project folder (/starter) and install the dependencies:

npm install

Run and Development

The project uses Parcel for the development environment. This command will start a local server and automatically reload the browser when changes in the code are detected:

npm start

Run Unit Tests

To verify the reliability of the business logic (creating usernames, calculating balance, and transfers), run Jest:

npm test

/// Project Structure ///

The code is organized to separate responsibilities:

/starter
├── (login, transfer, loan).
├── bankLogic.js # Pure Functions for calculations (balance, initials, summaries).
├── script.js # User interface logic, Event Listeners, and main business logic
├── index.html # Main structure of the application.
├── style.css # Styles.
└── tests/
└── bankLogic.test.js # Tests for business functions.

/// Implemented Unit Tests ///

I have implemented a solid test coverage for:

createUsernames: Validation of uppercase, lowercase, and multiple spaces.

calculateBalance: Verification of balance in mixed cases, empty arrays, and only negative values.

transferMoney: Validation of sufficient balance, destination account, and correct mutation of movements arrays (success and failure cases).


