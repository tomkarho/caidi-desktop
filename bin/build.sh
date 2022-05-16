#!/bin/sh

echo "Installing dependencies"
npm install

echo "Building application"
npm run build

echo "Packaging build artifacts"
npm run package