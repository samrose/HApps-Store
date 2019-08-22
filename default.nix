{ pkgs ? import ./pkgs.nix {} }: with pkgs;

{
  hApp-store = buildDNA {
    name = "hApp-store";
    src = gitignoreSource ./dna-src;
  };
}
