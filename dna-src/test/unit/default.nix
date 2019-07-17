{ pkgs }:
let
  name = "hc-test-unit";

  script = pkgs.writeShellScriptBin name
  ''
  RUST_BACKTRACE=1 cargo test \
      --manifest-path dna-src/zomes/happs/code/Cargo.toml \
      -- --nocapture
  '';
in
{
 buildInputs = [ script ];
}
