#!/usr/bin/env bash
# Shared utility functions — source this file, do not execute it directly.

# Print a formatted section header
print_header() {
  printf '\n\033[0;32m=== %s ===\033[0m\n' "$1"
}

# Print an error message to stderr
print_error() {
  printf '\033[0;31mError: %s\033[0m\n' "$1" >&2
}

# Print a warning to stdout
print_warn() {
  printf '\033[1;33mWarning: %s\033[0m\n' "$1"
}

# Verify a required command exists; return 1 if missing
require_cmd() {
  if ! command -v "$1" &>/dev/null; then
    print_error "Required command not found: $1"
    return 1
  fi
}
