# 👥 Sistema de Gerenciamento de Usuários

Aplicação fullstack de gerenciamento de usuários desenvolvida com Next.js, Prisma e NextAuth.

## 🚀 Como Executar

### Pré-requisitos

- Node.js 20 ou superior
- pnpm (gerenciador de pacotes)
- Docker (opcional, para execução containerizada)

### Opção 1: Executar Localmente

#### 1. Instalar Dependências

```bash
pnpm install
```

#### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sua-chave-secreta-aqui"
```

#### 3. Configurar Banco de Dados

**Opção A: Usando o Script Automatizado (Recomendado)**
```bash
# Tornar o script executável
chmod +x setup-db.sh

# Executar configuração do banco
./setup-db.sh
```

**Opção B: Configuração Manual**
```bash
# Gerar o Prisma Client
npx prisma generate

# Executar migrações
npx prisma migrate dev

# Popular o banco de dados (opcional)
pnpm run seed
```

#### 4. Executar a Aplicação

**Modo Desenvolvimento:**
```bash
pnpm dev
```

**Modo Produção:**
```bash
pnpm build
pnpm start
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Opção 2: Executar com Docker

#### Build da Imagem

```bash
docker build -t user-management-app .
```

#### Executar Container

```bash
docker run -p 3000:3000 user-management-app
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## 📝 Scripts Disponíveis

```bash
pnpm dev       # Inicia servidor de desenvolvimento
pnpm build     # Compila a aplicação para produção
pnpm start     # Inicia servidor de produção
pnpm lint      # Executa o linter
pnpm seed      # Popula o banco de dados
```

## �️ Comandos Úteis do Prisma

```bash
# Visualizar banco de dados
npx prisma studio

# Resetar banco de dados
npx prisma migrate reset

# Criar nova migração
npx prisma migrate dev --name nome_da_migracao
```

## 🔑 Funcionalidades

- ✅ Autenticação de usuários (login/cadastro)
- ✅ Gerenciamento de perfis
- ✅ Dashboard administrativo
- ✅ CRUD completo de usuários
- ✅ Validação de CEP integrada
- ✅ Tema claro/escuro
- ✅ API REST

## � Tecnologias

- **Next.js 16** - Framework React para produção
- **React 19** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Prisma** - ORM para banco de dados
- **NextAuth** - Autenticação
- **SQLite** - Banco de dados
- **Tailwind CSS** - Estilização
- **Zod** - Validação de schemas
- **React Hook Form** - Gerenciamento de formulários

## 📄 Licença

Este projeto é privado e de uso restrito.
