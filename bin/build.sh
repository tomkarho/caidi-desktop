#!/bin/sh

echo "Installing dependencies"
npm install

echo "Building application"
npm run build

echo "Creating build artifacts"
npm run package

echo "Packaging Linux version"
LINUX_FOLDER=caidi-linux
rm -rf $LINUX_FOLDER
mkdir $LINUX_FOLDER

cp -r dist/linux-unpacked $LINUX_FOLDER/
cp dist/*.AppImage $LINUX_FOLDER/
cp dist/*.snap $LINUX_FOLDER/

tar -zcf caidi-linux.tgz $LINUX_FOLDER/
rm -rf $LINUX_FOLDER

echo "Packaging windows version"
WINDOWS_FOLDER=caidi-windows
rm -rf $WINDOWS_FOLDER
mkdir $WINDOWS_FOLDER

cp -r dist/win-unpacked $WINDOWS_FOLDER/
cp dist/*.exe $WINDOWS_FOLDER/

7z a caidi-windows.7z $WINDOWS_FOLDER/
rm -rf $WINDOWS_FOLDER