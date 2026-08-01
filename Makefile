.PHONY: help dev build up down logs reinstall clean

# Target por defecto: muestra la ayuda si solo corres "make"
.DEFAULT_GOAL := help

# Muestra la lista de comandos disponibles con su descripción
help:
	@echo ""
	@echo "PlatoSmart Next.js — comandos disponibles:"
	@echo ""
	@echo "  make dev         Levanta el servidor de desarrollo local (pnpm dev)"
	@echo "  make build       Construye la imagen Docker de producción"
	@echo "  make up          Build + levanta el contenedor de producción en :3000"
	@echo "  make down        Detiene y elimina el contenedor de producción"
	@echo "  make logs        Muestra los logs del contenedor en vivo"
	@echo "  make reinstall   Borra node_modules, pnpm-lock.yaml y .next, reinstala con pnpm"
	@echo "  make clean       Igual que reinstall, y ademas borra la imagen Docker"
	@echo ""

# Levanta el servidor de desarrollo local con pnpm
dev:
	pnpm dev

# Construye la imagen Docker de producción
build:
	docker build -t platosmart-next .

# Construye (si hace falta) y levanta el contenedor de producción
up: build
	docker run -d -p 3000:3000 --name platosmart-next platosmart-next

# Detiene y elimina el contenedor de producción
down:
	docker stop platosmart-next || true
	docker rm platosmart-next || true

# Muestra logs del contenedor en producción
logs:
	docker logs -f platosmart-next

# Reinstalación limpia: borra node_modules, lockfile, .next y vuelve a instalar
reinstall:
	rm -rf node_modules pnpm-lock.yaml .next
	pnpm install

# Limpieza total, incluye también la imagen de Docker
clean: down
	rm -rf node_modules pnpm-lock.yaml .next
	docker rmi platosmart-next || true