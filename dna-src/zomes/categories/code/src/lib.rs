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

pub mod categories_fn;

define_zome! {
    entries: []

    genesis: || { Ok(()) }

    functions: {
        main (Public) {
            add_category: {
                inputs:| category:String,tag:String, hash:hdk::holochain_core_types::hash::HashString |,
                outputs: | result: JsonString |,
                handler: categories_fn::handle_adding_category
            }
            get_apps_by_category: {
                inputs:| category:String |,
                outputs: | result: JsonString |,
                handler: categories_fn::handle_get_apps_by_category
            }
        }
    }
}
