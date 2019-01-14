#![feature(try_from)]
#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate holochain_core_types_derive;
extern crate utils;

use hdk::{
    error::ZomeApiResult,
    holochain_core_types::{
        cas::content::Address
    },
};

pub mod entry;
pub mod happs_fn;

define_zome! {
    entries: [
        entry::app_definitions(),
        entry::dna_bundle_definitions(),
        entry::ui_bundle_definitions()
    ]

    genesis: || { Ok(()) }

    functions: {
        main (Public) {
            create_app: {
                inputs:| uuid:String,title:String,description:String,thumbnail:String |,
                outputs: |result: ZomeApiResult<Address>|,
                handler: happs_fn::handle_create_app
            }
            get_all_apps: {
                inputs:| |,
                outputs: |result: ZomeApiResult<Vec<utils::GetLinksLoadElement<entry::App>>>|,
                handler: happs_fn::handle_get_all_apps
            }
            get_app: {
                inputs:|app_hash:hdk::holochain_core_types::hash::HashString|,
                outputs: |result: ZomeApiResult<entry::App>|,
                handler: happs_fn::handle_get_app
            }
            add_dna: {
                inputs:| app_hash:hdk::holochain_core_types::hash::HashString,dna_bundle:String |,
                outputs: |result: ZomeApiResult<Address>|,
                handler: happs_fn::handle_add_dna
            }
            get_dna: {
                inputs:| app_hash:hdk::holochain_core_types::hash::HashString|,
                outputs: |result: ZomeApiResult<entry::DnaBundle>|,
                handler: happs_fn::handle_get_dna
            }
            add_ui: {
                inputs:| app_hash:hdk::holochain_core_types::hash::HashString,ui_bundle:String |,
                outputs: |result: ZomeApiResult<Address>|,
                handler: happs_fn::handle_add_ui
            }
            get_ui: {
                inputs:| app_hash:hdk::holochain_core_types::hash::HashString|,
                outputs: |result: ZomeApiResult<entry::UiBundle>|,
                handler: happs_fn::handle_get_ui
            }
        }
    }
}
