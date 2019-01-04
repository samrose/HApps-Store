#![feature(try_from)]

#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
// #[macro_use]
// extern crate serde_json;
#[macro_use]
extern crate holochain_core_types_derive;
#[macro_use]
extern crate serde_json;

pub mod ratings_fn;
pub mod entry;

use hdk::{
    holochain_core_types::{
        hash::HashString,
        json::JsonString,
    }
};

define_zome! {
    entries: [
     entry::definition()
    ]

    genesis: || { Ok(()) }

    functions: {
        main (Public) {
            create_ratings: {
                inputs:| rate:String,review:String,reviewedHash:HashString |,
                outputs: |result: serde_json::Value|,
                handler: ratings_fn::handle_creating_ratings
            }
            get_ratings: {
                inputs:| reviewedHash:HashString |,
                outputs: |result: serde_json::Value|,
                handler: ratings_fn::handle_get_reviews_by_hash
            }
        }
    }
}
