## Start

1) npm i

To run React app:
2) npm start

To run Markup app:
2) npm run markup:start

## Build markup
npm run markup:build

## Deploy

1) npm run build
2) Compress build directory to build.zip
2) scp build.zip inventory@192.168.88.181:/home/inventory/inventory_react/current
3) ssh inventory@192.168.88.181
4) cd ./inventory_react/current
5) sudo rm -rf build
6) unzip build.zip
7) rm build.zip

