{ pkgs }:
let
  name = "hc-install";

  script = pkgs.writeShellScriptBin name
  ''
  cd dna-src
  rm -f dist/dna-src.dna.json
  mkdir -p dist
  hc package --output dist/dna-src.dna.json --strip-meta
  '';
in
{
 buildInputs = [ script ];
}
