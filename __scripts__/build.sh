echo "Building..."

# Navega a la raíz del proyecto
cd "$(dirname "$0")/.."

# Elimina los directorios node_modules solo si es necesario (opcional)
echo "Removing root node_modules directory..."
rm -rf node_modules

# Instala todas las dependencias en la raíz usando Yarn Workspaces
echo "Installing all dependencies with Yarn workspaces..."
yarn install

# Construye los proyectos individualmente
echo "Building commons..."
cd commons && yarn build

echo "Building qrmenu..."
cd ../qrmenu && yarn build

echo "Build complete."