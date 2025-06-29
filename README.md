# 🚀 SmartOLT Frontend

Frontend completo en React + Vite + TypeScript para gestionar ONUs, autenticación con JWT, estadísticas de red y reinicios remotos.

---

## 🧱 Tecnologías principales

- ⚛️ **React 18 + Vite**
- 🛠️ **Redux Toolkit** para manejo de sesión
- 🌀 **TailwindCSS** para estilos rápidos y modernos
- 🌐 **React Router v6** para rutas públicas y privadas
- 🔐 **JWT** guardado en LocalStorage
- 📦 **Axios** con `Authorization` global
- 🔔 **React Toastify** y SweetAlert2 para notificaciones
- 🐳 **Docker + Docker Compose** para contenedores
- 🧪 **TypeScript** para tipado estricto
- ✅ Validación básica de formularios

---

##  Instalación

```bash
git clone https://github.com/tuusuario/smartolt-frontend
cd smartolt-frontend
npm install


Variables de entorno
Crea un archivo .env:

VITE_API_BASE_URL=http://localhost:3000

Comandos disponibles

npm run dev       # Modo desarrollo
npm run build     # Build para producción
npm run preview   # Modo producción local

 Usar con Docker
Requisitos
Docker y Docker Compose instalados

Levantar entorno

docker-compose up --build

Acceder
Frontend: http://localhost:5173

Autenticación
Ruta pública: /login

Al iniciar sesión, el token JWT se guarda en localStorage
Rutas protegidas: /dashboard, /onus, /onus/:id, /restarts
PrivateRoute asegura que solo usuarios autenticados accedan

Endpoints consumidos

| Método | Ruta                   | Descripción                    |
| ------ | ---------------------- | ------------------------------ |
| POST   | /auth/login            | Iniciar sesión y obtener token |
| GET    | /api/onus              | Listado paginado de ONUs       |
| GET    | /api/onus/\:id         | Detalle de una ONU             |
| POST   | /api/onus/\:id/restart | Reiniciar ONU remota           |
| GET    | /api/dashboard/stats   | Métricas del sistema           |
| GET    | /api/restarts          | Historial de reinicios         |


 Estructura del proyecto

 src/
├── api/               # Axios configurado
├── components/        # Navbar, rutas protegidas
├── hooks/             # useAuth personalizado
├── pages/             # Vistas: Login, ONU, Dashboard
├── store/             # Redux Toolkit (authSlice)
├── styles/            # Tailwind CSS base
├── App.tsx            # Rutas
├── main.tsx           # Bootstrap


Autor
Desarrollado por Arq. Jhon Cuevas para la gestión de red OLT, impulsado y acelerado con GitHub Copilot.

