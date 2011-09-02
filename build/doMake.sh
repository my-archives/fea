#! /bin/bash
make clean && make && echo "cp dist/* ../test/js/" && cp dist/* ../test/js/
