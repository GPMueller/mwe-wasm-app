Web App using C++ compiled to WASM
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

Host
---------------------------------------------------------

For example,

```
python -m SimpleHTTPServer
```

And then open `localhost:8000`.