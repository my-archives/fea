LIB_DIR = lib
TEST_DIR = test
TOOLS_DIR = tools

PREFIX = .
DIST_DIR = $(PREFIX)/dist

JS_ENGINE ?= `which node nodejs`

BASE_FILES = $(LIB_DIR)/fea.js\
			 $(LIB_DIR)/utils.js\
			 $(LIB_DIR)/kernel.js\
			 $(LIB_DIR)/storage.js\
			 $(LIB_DIR)/module.js\
			 $(LIB_DIR)/sandbox.js\
			 $(LIB_DIR)/define.js\
			 $(LIB_DIR)/app.js

FEA = $(DIST_DIR)/fea.js
FEA_MIN = $(DIST_DIR)/fea.min.js

FEA_VER = $(shell cat version.txt)
VER = sed "s/@VERSION@/$(FEA_VER)"

DATE = $(shell git log -1 --pretty=format:%ad)

all: start fea min lint clean
	@@echo $(DATE)
	@@echo "Fea build complete."

start:
	@@echo "$(JS_ENGINE)"

$(DIST_DIR):
	@@mkdir -p $(DIST_DIR)

fea: $(FEA)

$(FEA): $(BASE_FILES) | $(DIST_DIR)
	@@echo "Building" $(FEA)

min: fea $(FEA_MIN)

$(FEA_MIN): $(FEA)
	@@echo "Minify Fea."

lint: fea
	@echo "Checking Fea against JSLint..."

clean:
	@@echo "Removing Distribution directory:" $(DIST_DIR)
	@@rm -rf $(DIST_DIR)

.PHONY: all fea clean
