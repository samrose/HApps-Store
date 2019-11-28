#
# Test and build hApp-store Project
#
# This Makefile is primarily instructional; you can simply enter the Nix environment for
# holochain-rust development (supplied by holo=nixpkgs; see pkgs.nix) via `nix-shell` and run `hc
# test` directly, or build a target directly (see default.nix), eg. `nix-build -A hApp-store`.
#
SHELL		= bash
DNANAME		= hApp-store
DNA		= dist/$(DNANAME).dna.json

# External targets; Uses a nix-shell environment to obtain Holochain runtimes, run tests, etc.
# See CONTRIBUTING.md for details of how to develop against a local copy of holochain-rust, eg.:
# 
#     nix-shell -I holochain-rust=../holochain-rust
# 
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

build:		$(DNANAME)/$(DNA)

# Build the DNA; Specifying a custom --output requires the path to exist
# However, if the name of the directory within which `hc` is run matches the
# DNA's name, then this name is used by default, and the output directory is
# created automatically.
$(DNANAME)/$(DNA):
	cd $(DNANAME) \
	  && hc package

.PHONY: test-unit test-e2e test-stress test-sim2h test-node
test:		test-unit test-e2e

# test-unit -- Run Rust unit tests via Cargo
test-unit:
	cd $(DNANAME) \
	  && RUST_BACKTRACE=1 cargo test \
	    --manifest-path zomes/whoami/code/Cargo.toml \
	    -- --nocapture \
	  && RUST_BACKTRACE=1 cargo test \
	    --manifest-path zomes/happs/code/Cargo.toml \
	    -- --nocapture

# End-to-end test of DNA.  Runs a sim2h_server on localhost:9000; the default expected by `hc test`
test-e2e:	$(DNANAME)/$(DNA) test-sim2h test-node
	@echo "Starting Scenario tests..."; \
	    cd $(DNANAME) && RUST_BACKTRACE=1 hc test \
	        | test/node_modules/faucet/bin/cmd.js

test-node:
	@echo "Setting up Scenario/Stress test Javascript..."; \
	    cd $(DNANAME)/test && npm install

test-sim2h:
	@echo "Starting sim2h_server on localhost:9000 (may already be running)..."; \
	    sim2h_server -p 9000 &

# Generic targets; does not require a Nix environment
.PHONY: clean
clean:
	rm -rf \
	    $(DNANAME)/dist \
	    test/node_modules \
	    .cargo \
	    target \
	    $(DNANAME)/zomes/*/code/target
