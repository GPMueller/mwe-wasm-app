######### CMake Version ##############################################
cmake_minimum_required(VERSION 2.8.11)
######################################################################


######### Project Name ###############################################
project(webapp)
######################################################################


#############################################
### Set a default build type in case none is passed
if(NOT CMAKE_BUILD_TYPE AND NOT CMAKE_CONFIGURATION_TYPES)
    message(STATUS ">> backend: Setting build type to 'Release' as none was specified.")
    set(CMAKE_BUILD_TYPE Release CACHE STRING "Choose the type of build." FORCE)
    # Set the possible values of build type for cmake-gui
    set_property(CACHE CMAKE_BUILD_TYPE PROPERTY STRINGS "Debug" "Release" "MinSizeRel" "RelWithDebInfo")
elseif(CMAKE_BUILD_TYPE)
    message(STATUS ">> backend:  Did not need to set build type, using: ${CMAKE_BUILD_TYPE}")
else()
    message(STATUS ">> backend:  Did not need to set build type. Configuration types: ${CMAKE_CONFIGURATION_TYPES}")
endif()
#############################################


######## General settings ############################################
# include_directories(${PROJECT_SOURCE_DIR}/include )
######################################################################
set(CMAKE_DISABLE_SOURCE_CHANGES ON)
set(CMAKE_DISABLE_IN_SOURCE_BUILD ON)
######################################################################
# set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${PROJECT_SOURCE_DIR})
# set(CMAKE_BINARY_DIR ${CMAKE_SOURCE_DIR}/bin)
# set(PROJECT_BINARY_DIR ${CMAKE_SOURCE_DIR}/bin2)
# set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR})
# set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/lib)
# set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR})
######################################################################


######## Set export functions ########################################
### Place all functions which should be exported by emcc into this list
set( INTERFACE_EXPORT_FUNCTIONS
    '_print_hi'
    '_return_x'
)
### Replace ; in the list with , while transforming into a string
string( REPLACE ";" ", " INTERFACE_EXPORT_FUNCTIONS_STRING "${INTERFACE_EXPORT_FUNCTIONS}")
######################################################################


######## The backend library  ########################################
add_executable( backend
    ${PROJECT_SOURCE_DIR}/src/backend.cpp )

set_target_properties( backend PROPERTIES
    OUTPUT_NAME "libBackend"
    RUNTIME_OUTPUT_DIRECTORY ${PROJECT_SOURCE_DIR}/js
    CXX_STANDARD 17
    CXX_STANDARD_REQUIRED ON
    CXX_EXTENSIONS OFF )

target_include_directories( backend PUBLIC ${PROJECT_SOURCE_DIR}/core/include )
# target_include_directories( backend PUBLIC ${PROJECT_SOURCE_DIR}/include )
# target_include_directories( backend PUBLIC ${PROJECT_SOURCE_DIR}/thirdparty/glm/include )
# target_include_directories( backend PRIVATE ${PROJECT_SOURCE_DIR}/thirdparty/glad/include )

### Set specific flags for emcc
set_property( TARGET backend PROPERTY COMPILE_FLAGS
    "-O3 -g -s EXPORT_NAME=\"'Module_Backend'\" -s MODULARIZE=1 -s USE_WEBGL2=0 -s DISABLE_DEPRECATED_FIND_EVENT_TARGET_BEHAVIOR=1 -s ASSERTIONS=1 -s DISABLE_EXCEPTION_CATCHING=0 -s FORCE_FILESYSTEM=1" )

set_property( TARGET backend PROPERTY LINK_FLAGS
    "-O3 -g -s EXPORT_NAME=\"'Module_Backend'\" -s MODULARIZE=1 -s USE_WEBGL2=0 -s DISABLE_DEPRECATED_FIND_EVENT_TARGET_BEHAVIOR=1 -s ASSERTIONS=1 -s DISABLE_EXCEPTION_CATCHING=0 -s FORCE_FILESYSTEM=1 -s ALLOW_MEMORY_GROWTH=1 -s EXPORTED_FUNCTIONS=\"[${INTERFACE_EXPORT_FUNCTIONS_STRING}]\" -s EXTRA_EXPORTED_RUNTIME_METHODS=['cwrap, FS']" )
######################################################################