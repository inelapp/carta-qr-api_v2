echo "Building..."

# Navega a la raíz del proyecto
cd "$(dirname "$0")/.."

# Elimina los directorios node_modules
echo "Removing node_modules directories..."
rm -rf node_modules

echo "Installing all dependencies..."
yarn install

# Elimina los directorios node_modules en commons y api
rm -rf commons/node_modules
rm -rf api/node_modules

# Navega a los proyectos commons y api
echo "Installing dependencies and building in commons..."
cd commons && yarn install && yarn build

echo "Installing dependencies in api..."
cd ../api && yarn install && yarn build

echo "Build complete."
