{
  description = "Nix Flake for centrifuge webiste";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
    nix-filter.url = "github:numtide/nix-filter";
  };

  outputs = { self, nixpkgs, flake-utils, nix-filter }:
    flake-utils.lib.eachDefaultSystem (system:
      with import nixpkgs { inherit system; }; {
        defaultPackage = pkgs.callPackage ./yarn-project.nix { } {
          src = nix-filter.lib {
            root = ./.;
            include = (map nix-filter.lib.inDirectory [
              ".yarn"
              "config"
              "content"
              "lambda"
              "plugins"
              "src"
              "static"
              "utils"
            ]) ++ [
              ".yarnrc.yml"
              "gatsby-browser.js"
              "gatsby-config.js"
              "gatsby-node.js"
              "gatsby-ssr.js"
              "graphql-types.ts"
              "package.json"
              "postcss.config.js"
              "tsconfig.json"
              "webpack.functions.js"
              "yarn.lock"
            ];
          };
          overrideAttrs = old: {
            buildInputs = old.buildInputs
              ++ (with pkgs; [ python3 vips pkg-config ]);
            preConfigure = ''
              echo "RUNNING PRE-CONFIGURE"
              yarn install --immutable --immutable-cache --mode=skip-build
              echo "DEPENDENCIES INSTALLED WITHOUT BUILD"
              patchShebangs node_modules
              ls node_modules node_modules/.bin
            '';
            buildPhase = "yarn gatsby build --prefix-paths";
            installPhase = "mv public $out";
          };
        };

        devShell = pkgs.mkShell { buildInputs = [ yarn ipfs ]; };
      });
}
