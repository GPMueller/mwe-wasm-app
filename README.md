Web App using WASM
=========================================================


Build
---------------------------------------------------------

For example,

```
mkdir -p build
cd build
cmake .. -DCMAKE_TOOLCHAIN_FILE=/usr/local/emsdk/emscripten/1.38.29/cmake/Modules/Platform/Emscripten.cmake
make -j
cd ..
```