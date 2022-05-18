#!/bin/sh

echo "Installing dependencies"
npm install

echo "Building application"
npm run build

echo "Creating build artifacts"
npm run package

echo "Packaging Linux version"
VERSION_HASH=$(git rev-parse --short HEAD)
VERSION_NUMBER=$(git --no-pager log --oneline | wc -l)

LINUX_FOLDER="caidi-linux-$VERSION_HASH-$VERSION_NUMBER"
rm -rf $LINUX_FOLDER
mkdir $LINUX_FOLDER

cp -r dist/linux-unpacked $LINUX_FOLDER/
cp dist/*.AppImage $LINUX_FOLDER/
cp dist/*.snap $LINUX_FOLDER/

tar -zcf caidi-linux.tgz $LINUX_FOLDER/
rm -rf $LINUX_FOLDER

echo "Packaging windows version"
WINDOWS_FOLDER="caidi-windows-$VERSION_HASH-$VERSION_NUMBER"
rm -rf $WINDOWS_FOLDER
mkdir $WINDOWS_FOLDER

cp -r dist/win-unpacked $WINDOWS_FOLDER/
cp dist/*.exe $WINDOWS_FOLDER/

7z a caidi-windows.7z $WINDOWS_FOLDER/
rm -rf $WINDOWS_FOLDER