#!/bin/bash

echo "Removing node_modules directories..."

# Remove node_modules in the root
rm -rf ../node_modules

# Remove node_modules in commons
rm -rf ../commons/node_modules

# Remove node_modules in api
rm -rf ../api/node_modules

echo "Installing dependencies in commons..."
cd ../commons && yarn install

echo "Building commons..."
yarn build

echo "Installing dependencies in api..."
cd ../api && yarn install

echo "Setup complete."