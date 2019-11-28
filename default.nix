{ pkgs ? import ./pkgs.nix {} }:

with pkgs;

let
  inherit (darwin.apple_sdk.frameworks) CoreServices Security;
in

{
  hApp-store = buildDNA {
    name = "hApp-store";
    src = gitignoreSource ./hApp-store;

    nativeBuildInputs = [
      zip
    ]
    ++ lib.optionals stdenv.isDarwin [ CoreServices ];
  };
}
