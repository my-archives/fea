ROOT_DIR = ..
LIB_DIR = ${ROOT_DIR}/lib
TEST_DIR = ${ROOT_DIR}/test
TOOLS_DIR = ${ROOT_DIR}/tools
UGLIFY_JS = ${TOOLS_DIR}/uglifyjs
JSHINT = ${TOOLS_DIR}/jshint

PREFIX = .
DIST_DIR = ${PREFIX}/dist

JS_ENGINE ?= `which node`
COMPILER = ${JS_ENGINE} ${UGLIFY_JS}/uglifyjs --unsafe
CHECKING = ${JS_ENGINE} ${JSHINT}/jshint

BASE_FILES = ${LIB_DIR}/fea.js \
	${LIB_DIR}/utils.js \
	${LIB_DIR}/aop.js \
	${LIB_DIR}/kernel.js \
	${LIB_DIR}/storage.js \
	${LIB_DIR}/module.js \
	${LIB_DIR}/sandbox.js \
	${LIB_DIR}/define.js \
	${LIB_DIR}/app.js

FEA = ${DIST_DIR}/fea.js
FEA_MIN = ${DIST_DIR}/fea.min.js

FEA_VER = $(shell cat version.txt)
VER = sed "s/@VERSION@/${FEA_VER}/"

DATE = $(shell git log -1 --pretty=format:%ad)
DATE_SED = sed "s/@DATE@/${DATE}/"

all: start fea min hint
	@@echo "Fea build complete."

start:
	@@echo "${JS_ENGINE}"

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

fea: ${FEA}

${FEA}: ${BASE_FILES} | ${DIST_DIR}
	@@echo "Building" ${FEA} ${FEA_VER} ${DATE}

	@@cat ${BASE_FILES} | \
		${DATE_SED} | \
		${VER} > ${FEA}

min: fea ${FEA_MIN}

${FEA_MIN}: ${FEA}
	@@if test ! -z ${JS_ENGINE}; then \
		echo "Minify Fea" ${FEA_MIN}; \
		${COMPILER} ${FEA} > ${FEA_MIN}; \
	else \
		echo "You must have NodeJs installed in order to minify Fea."; \
	fi

hint: fea
	@@if test ! -z ${JS_ENGINE}; then \
		echo "Checking Fea against JSHint..."; \
		${CHECKING}; \
	else \
		echo "You must have NodeJs installed in order to check Fea."; \
	fi

clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}

.PHONY: all fea clean hint min
