# Starter Configs

A comprehensive Next.js 15 starter template with modern development practices, internationalization, theming, and a complete component library showcase.

## 🚀 Features

### Core Technologies

- **Next.js 15** with App Router
- **TypeScript** with strict mode and explicit return types
- **Tailwind CSS v4** for styling
- **shadcn/ui** components (New York style)

### Developer Experience

- **ESLint** with comprehensive rules and auto-formatting
- **Prettier** integration with consistent code style
- **Husky + lint-staged** for Git hooks
- **Conventional Commits** with commitlint
- **Path aliases** for clean imports

### Features & Integrations

- **Internationalization** (English/Portuguese) with next-intl
- **Theme System** (Light/Dark/System) with next-themes
- **Form Management** with React Hook Form + Zod validation
- **API Client** with Axios and runtime environment variable injection
- **Data Fetching** with TanStack Query
- **Layout Components** (HStack, VStack, Wrap, For, Show)

### Production Ready

- **Docker** multi-stage builds with standalone output
- **GitHub Actions** CI/CD with container building
- **Environment Variables** runtime injection for Docker
- **Component Architecture** following Atomic Design principles

## 📋 Prerequisites

- Node.js 18+ (we recommend Node.js 22)
- pnpm (preferred package manager)
- Docker (for containerization)

## 🛠 Getting Started

### Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd starter-configs
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.development
   # Edit .env.development with your configuration
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build production app
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint checks
- `pnpm lint:fix` - Auto-fix ESLint issues
- `pnpm docker:build` - Build Docker image
- `pnpm docker:run` - Run Docker container with development env
- `pnpm docker:run:prod` - Run Docker container with production env

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── atoms/             # Basic building blocks (typography, layout)
│   ├── molecules/         # Composite components (forms, controls)
│   └── ui/                # shadcn/ui components (auto-generated)
├── features/              # Feature-based organization
│   ├── common/
│   │   ├── client/        # Client-side code (hooks, providers)
│   │   ├── server/        # Server actions
│   │   └── shared/        # Shared utilities and components
│   └── demo/              # Demo feature showcase
└── i18n/                  # Internationalization configuration
```

### Component Architecture

Following **Atomic Design** principles:

- **Atoms**: Basic components (`src/components/atoms/`)
- **Molecules**: Composite components (`src/components/molecules/`)
- **Organisms**: Complex components (`src/features/*/client/components/organisms/`)
- **Templates/Pages**: Page layouts and screens

## 🌍 Internationalization

### Supported Languages

- English (`en`) - Default
- Portuguese (`pt`)

### Usage

```tsx
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations();
  return <h1>{t('welcome.title')}</h1>;
}
```

### Adding Translations

1. Add keys to `messages/en.json` and `messages/pt.json`
2. Use translation keys in components with `t('your.key')`

## 🎨 Theming

Built-in theme system with:

- **Light mode**
- **Dark mode**
- **System preference** detection

### Usage

```tsx
import { useTheme } from 'next-themes';

function MyComponent() {
  const { theme, setTheme } = useTheme();
  return <button onClick={() => setTheme('dark')}>Switch to Dark Mode</button>;
}
```

## 📝 Forms & Validation

All forms use **React Hook Form** + **Zod** with built-in translation support:

```tsx
import { FormInput, FormSelect } from '@/components/molecules/forms';

// Form components support both direct props and translation keys
<FormInput
  control={form.control}
  name="title"
  labelKey="form.title.label" // Translation key
  placeholder={t('form.title.placeholder')} // Direct translation
/>;
```

## 🔧 Environment Variables

### Development (`.env.development`)

```env
API_URL=https://your-api-endpoint.com
```

### Docker Runtime

```bash
docker run -e API_URL=https://production-api.com your-image
```

The app uses **server actions** for runtime environment variable access, supporting both build-time and runtime injection.

## 🐳 Docker

### Build Image

```bash
docker build -t starter-configs .
```

### Run Container

```bash
docker run -p 3000:3000 -e API_URL=https://your-api.com starter-configs
```

### Multi-stage Build

- **Builder stage**: Installs dependencies and builds app
- **Runner stage**: Minimal production image with standalone output

## 🚀 Deployment

### GitHub Actions

Automated CI/CD with:

- **Lint and build** checks
- **Container building** and pushing to GitHub Container Registry
- **Multi-environment support** (main/dev branches)

### Container Registry

Images are pushed to:

- `ghcr.io/username/starter-configs:latest` (main branch)
- `ghcr.io/username/starter-configs-dev:latest` (dev branch)

## 📚 Demo Features

The app includes a comprehensive demo showcasing:

- **Sidebar Navigation** with collapsible layout
- **Layout Components** (HStack, VStack, Wrap, For, Show)
- **Form Management** with validation and internationalization
- **Data Tables** with pagination and search
- **Theme Switching** and language toggling
- **API Integration** with environment variable injection

Visit `/` to explore all features interactively.

## 🛡 Code Quality

### ESLint Configuration

- TypeScript strict checking with explicit return types
- React/JSX best practices with prop sorting
- Import organization via `simple-import-sort`
- Code complexity limits and cognitive complexity rules
- Prettier integration

### Git Workflow

- **Conventional commits** enforced via commitlint
- **Pre-commit hooks** run lint and format checks
- Supported types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 📖 Path Aliases

Configured aliases for clean imports:

```tsx
import { Button } from '@/components/ui/button';
import { cn } from '@/features/common/shared/lib/utilities';
import { useApiClient } from '@/features/common/client/hooks';
import { VStack } from '@/components/atoms';
```

All imports from `src/` can use the `@/` prefix for absolute imports.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/new-feature`)
3. Follow conventional commit format
4. Ensure all tests and lints pass
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using Next.js 15, TypeScript, and modern development practices.
