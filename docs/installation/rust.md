----
title: "Rust"
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Rust SDK Installation Instructions (All platforms)

Create a new project with `cargo init --bin` and add the following to your `Cargo.toml` file.

```toml
[dependencies.dittolive-ditto]
version = "1.0.13"
```

```bash
cargo build
```

## Suggested App Filesystem Structure

```
AppRoot/AppExecutable (i.e. `std::env::current_exe()`) + optional statically linked libdittoffi.a (default)
AppRoot/libdittoffi.dll (aka `@executable_path/../libdittoffi.dylib`) - Suggested location for distribution of libdittoffi dynamic library 
AppRoot/ditto_data/.. - Location of locally Ditto Data stores
```



## Cargo/Config.toml 


## Common Issues

### I get an error: "error: could not find native static library `dittoffi`, perhaps an -L flag is missing". What should I do?

#### Diagnosis
The Ditto SDK build.rs script failed to download an appropriate ditto binary for your target platform. Check your internet connection is live and Ditto version number is correct. Inspect the downloaded library in the cargo build cache (defaul is `target/<profile>/build/dittolive-ditto-sys-<hash>/out/libdittoffi.{a,dylib,so,dll}`) using your platforms utilties such as `file`, `otool`, `readelf` or similar. Try updating to the latest release of `dittolive-ditto`. You can also manually download the binary yourself.

#### Solutions

1. Try updating to a more recent version of `dittolive-ditto` .
2. Manually download the library yourself and verify it completes successfully.
3. Force the build script to look for the library in a specific directory by exporting `DITTOFFI_SEARCH_PATH` during compilation and execution. 
