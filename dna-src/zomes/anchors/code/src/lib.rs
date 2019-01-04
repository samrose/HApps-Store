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
pub mod anchor_fn;

define_zome! {
    entries: [
        entry::definition()
    ]

    genesis: || { Ok(()) }

    functions: {
        main (Public) {
            create_anchor: {
                inputs:| anchor_type:String,anchor_text:String |,
                outputs: | result: serde_json::Value |,
                handler: anchor_fn::handle_creating_anchor
            }
            exists: {
                inputs:| anchor_type:String,anchor_text:String |,
                outputs: | result: serde_json::Value |,
                handler: anchor_fn::handle_check_anchor_exist
            }
            get_anchor: {
                inputs:| anchor_type:String |,
                outputs: | result: serde_json::Value |,
                handler: anchor_fn::handle_get_anchor_links
            }
        }
    }
}
