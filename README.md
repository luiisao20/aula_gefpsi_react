# 🎓 Aula Virtual GEFPSI

Una plataforma de educación virtual moderna construida con **React**, **TypeScript** y **Supabase**, diseñada para facilitar la enseñanza y aprendizaje en línea con una experiencia de usuario intuitiva y responsive.

---

## ✨ Características

- ✅ **Autenticación segura** con Supabase
- ✅ **Interfaz moderna y responsive** con Material-UI y Tailwind CSS
- ✅ **Gestión de datos en tiempo real** con React Query
- ✅ **Formularios validados** con Formik y Yup
- ✅ **Selección de fechas intuitiva** con React DatePicker
- ✅ **Gestión de estado global** con Zustand
- ✅ **Routing dinámico** con React Router v7
- ✅ **Optimización con Vite** para desarrollo rápido

---

## 🛠️ Tecnologías

### Frontend
- **React 19** - Librería UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router v7** - Enrutamiento
- **React Query** - Gestión de datos server
- **Zustand** - State management

### UI & Styling
- **Material-UI v7** - Componentes UI
- **Tailwind CSS v4** - Utilidades CSS
- **Emotion** - CSS-in-JS
- **Flowbite** - Componentes adicionales
- **React Icons** - Iconografía

### Validación & Formularios
- **Formik** - Manejo de formularios
- **Yup** - Esquemas de validación

### Backend & Base de Datos
- **Supabase** - Backend as a Service (PostgreSQL, Auth, Real-time)
- **Axios** - Cliente HTTP

### Utilidades
- **DayJS** - Manipulación de fechas
- **React DatePicker** - Selector de fechas

---

## 📁 Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables
├── views/           # Páginas principales
├── presentation/    # Componentes de presentación
├── actions/         # Acciones y lógica de negocio
├── core/            # Configuración y utilidades core
├── interfaces/      # Tipos e interfaces TypeScript
├── assets/          # Imágenes y recursos estáticos
├── App.tsx          # Componente raíz
└── main.tsx         # Punto de entrada

public/              # Archivos estáticos públicos
dist/                # Build output (generado)
```

---

## 🚀 Instalación y Configuración

### Requisitos
- **Node.js** v18 o superior
- **npm** o **yarn**

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/luiisao20/aula_gefpsi_react.git
   cd aula-virtual
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crear archivo `.env.local` en la raíz del proyecto:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173`

---

## 📦 Scripts Disponibles

```bash
# Desarrollo con hot-reload
npm run dev

# Build para producción
npm run build

# Preview de la build
npm run preview

# Linting del código
npm run lint
```

---

## 🔧 Configuración

### Variables de Entorno

Crear archivo `.env` con las siguientes variables:

```env
# Supabase
VITE_SUPABASE_URL=<tu-url-supabase>
VITE_SUPABASE_ANON_KEY=<tu-anon-key>
```

### TypeScript

El proyecto incluye configuración TypeScript optimizada:
- `tsconfig.json` - Configuración base
- `tsconfig.app.json` - Configuración para la aplicación
- `tsconfig.node.json` - Configuración para herramientas de build

---

## 🎨 Personalización

### Temas y Estilos

El proyecto utiliza **Tailwind CSS** y **Material-UI** para estilos. Puedes personalizar:

- **Tailwind**: Modificar `tailwind.config.js` (si existe)
- **Material-UI**: Temas en los archivos de componentes
- **Emotion**: Estilos CSS-in-JS en componentes individuales

---

## 🔐 Seguridad

- ✅ Autenticación manejada por Supabase
- ✅ Variables de entorno protegidas (no commitear `.env`)
- ✅ CORS configurado en Supabase
- ✅ Validación de formularios en cliente y servidor

---

## 📝 Convenciones de Código

- **TypeScript**: Usar tipos explícitos siempre que sea posible
- **Componentes**: Usar nombres PascalCase
- **Archivos**: Usar camelCase para archivos JS/TS
- **Imports**: Mantener importaciones ordenadas (librerías externas → locales)

---

## 🐛 Debugging

### Habilitar logs en desarrollo

```typescript
// En tu código
console.log('Debug info:', data);
```

### DevTools React

Instalar extensión de React DevTools para inspeccionar componentes.

---

## 📚 Recursos Útiles

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Material-UI](https://mui.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios mayores:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## ✉️ Contacto

Para preguntas o sugerencias, contacta al equipo de desarrollo en:
- **GitHub**: [luiisao20](https://github.com/luiisao20)
- **Email**: Contacto disponible en el perfil de GitHub

---

**Última actualización**: Mayo 2026

