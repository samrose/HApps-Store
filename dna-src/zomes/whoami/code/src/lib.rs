#![feature(try_from)]

#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate holochain_core_types_derive;

use hdk::{
    error::ZomeApiResult,
    holochain_core_types::{cas::content::Address, entry::Entry, json::JsonString, error::HolochainError},
    holochain_wasm_utils::api_serialization::get_links::GetLinksResult,
};

pub mod whoami_fn;


define_zome! {
    entries: [ ]

    genesis: || { Ok(()) }

    functions: [
        get_user: {
            inputs:| |,
            outputs: |result: ZomeApiResult<whoami_fn::UserData>|,
            handler: whoami_fn::handle_get_agent
        }
    ]

    traits: {
        hc_public [get_user]
    }
}
