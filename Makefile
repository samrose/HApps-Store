# 
# Test and build hApp-store Project
# 
SHELL		= bash
DNANAME		= hApp-store
DNA		= dist/$(DNANAME).dna.json

# External targets; Uses a nix-shell environment to obtain Holochain runtimes, run tests, etc.
.PHONY: all
all: nix-test

# nix-test, nix-install, ...
nix-%:
	nix-shell --pure --run "make $*"

# Internal targets; require a Nix environment in order to be deterministic.
# - Uses the version of `hc`, `holochain` on the system PATH.
# - Normally called from within a Nix environment, eg. run `nix-shell` from within holofuel
.PHONY:		rebuild install build test test-unit test-e2e
rebuild:	clean build

install:	build

build:		dna-src/$(DNA)

# Build the DNA; Specifying a custom --output requires the path to exist
dna-src/$(DNA):
	mkdir -p $(dir $(@))
	cd dna-src && hc package --output $(DNA) --strip-meta

test:		test-unit test-e2e

# test-unit -- Run Rust unit tests via Cargo
test-unit:
	cd dna-src && RUST_BACKTRACE=1 cargo test \
	        --manifest-path Cargo.toml \
	       -- --nocapture

# test-e2e -- Uses dist/hApp-store.dna.json; install test JS dependencies, and run end-to-end Diorama tests
test-e2e:	dna-src/$(DNA)
	cd dna-src && ( cd test && npm install ) && RUST_BACKTRACE=1 hc test

#	    | test/node_modules/faucet/bin/cmd.js


# Generic targets; does not require a Nix environment
.PHONY: clean
clean:
	rm -rf \
	    dist \
	    test/node_modules \
	    .cargo \
	    target \
	    dna-src/zomes/happs/code/target \
	    dna-src/zomes/whoami/code/target

