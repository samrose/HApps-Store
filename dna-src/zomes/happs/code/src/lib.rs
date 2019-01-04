#![feature(try_from)]
#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate serde_json;
#[macro_use]
extern crate holochain_core_types_derive;

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
                outputs: |result: serde_json::Value|,
                handler: happs_fn::handle_creating_app
            }
            get_allApps: {
                inputs:| |,
                outputs: |result: serde_json::Value|,
                handler: happs_fn::handle_getting_all_apps
            }
            get_app: {
                inputs:|app_hash:hdk::holochain_core_types::hash::HashString|,
                outputs: |result: serde_json::Value|,
                handler: happs_fn::handle_getting_app
            }
            adding_DNA: {
                inputs:| app_hash:hdk::holochain_core_types::hash::HashString,dna_bundle:String |,
                outputs: |result: serde_json::Value|,
                handler: happs_fn::handle_adding_DNA
            }
            getting_dna: {
                inputs:| app_hash:hdk::holochain_core_types::hash::HashString|,
                outputs: |result: serde_json::Value|,
                handler: happs_fn::handle_getting_dna
            }
            adding_UI: {
                inputs:| app_hash:hdk::holochain_core_types::hash::HashString,ui_bundle:String |,
                outputs: |result: serde_json::Value|,
                handler: happs_fn::handle_adding_UI
            }
            getting_ui: {
                inputs:| app_hash:hdk::holochain_core_types::hash::HashString|,
                outputs: |result: serde_json::Value|,
                handler: happs_fn::handle_getting_ui
            }
        }
    }
}
