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

build:		$(DNANAME)/$(DNA)

# Build the DNA; Specifying a custom --output requires the path to exist
# However, if the name of the directory within which `hc` is run matches the
# DNA's name, then this name is used by default, and the output directory is
# created automatically.
$(DNANAME)/$(DNA):
	cd $(DNANAME) \
	  && hc package --strip-meta

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

# test-e2e -- Uses dist/hApp-store.dna.json; install test JS dependencies, and run end-to-end Diorama tests
#
# Depends on dynamodb, if using sim1h DHT.
test-e2e: export AWS_ACCESS_KEY_ID     ?= HoloCentral
test-e2e: export AWS_SECRET_ACCESS_KEY ?= ...
test-e2e:	$(DNANAME)/$(DNA)
	export |grep AWS
	@echo "Setting up Scenario test Javascript..."; \
	    ( cd hApp-store/test && npm install );
	@echo "Starting dynamodb-memory..."; \
	    dynamodb-memory &
	@echo "Starting HoloFuel Scenario tests..."; \
	    RUST_BACKTRACE=1 cd hApp-store && hc test \


# Generic targets; does not require a Nix environment
.PHONY: clean
clean:
	rm -rf \
	    dist \
	    test/node_modules \
	    .cargo \
	    target \
	    $(DNANAME)/zomes/happs/code/target \
	    $(DNANAME)/zomes/whoami/code/target
