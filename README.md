# PGC Newsletters

These newsletters are created using the [`mjml`](https://github.com/mjmlio/mjml) framework.

index.mjml acts as the main file as it references the other email sections:

## Installation

Install chezmoi, clone my dotfiles and apply them to your machine with a single command:

    sh -c "$(curl -fsLS chezmoi.io/get)" -- init --apply tfle

Any future updates that I make can be pulled and applied with: 

    chezmoi update

## Usage

## Reminders for future me

Adding dotfiles to the source directory (~/.local/share/chezmoi):

    chezmoi add ~/.config/nvim/init.vim

List all the dotfiles managed by chezmoi:

    chezmoi managed

Edit dotfiles like so:

    chezmoi edit ~/.config/nvim/init.vim

Changes are committed and pushed automatically (enabled in ~/.config/chezmoi/chezmoi.toml).
