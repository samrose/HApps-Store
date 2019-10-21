{ pkgs ? import ./pkgs.nix {} }:

with pkgs;

let
  emacs-with-htmlize = emacsWithPackages (epkgs: with epkgs; [
    htmlize
  ]);
  inherit (darwin.apple_sdk.frameworks) CoreServices Security;
in

{
  hApp-store = buildDNA {
    name = "hApp-store";
    src = gitignoreSource ./.;

    nativeBuildInputs = []
    ++ (callPackage ./dynamodb {}).buildInputs
    ++ lib.optionals stdenv.isDarwin [ CoreServices ];
  };
}
