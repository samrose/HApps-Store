#![feature(try_from)]

#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate utils;
// #[macro_use]
// extern crate serde_json;
#[macro_use]
extern crate holochain_core_types_derive;

pub mod ratings_fn;
pub mod entry;

use crate::entry::Ratings;
use utils::GetLinksLoadElement;
use hdk::error::ZomeApiResult;
use hdk::{
    holochain_core_types::{
        hash::HashString,
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
                inputs:| rate:String, review:String, reviewedHash:HashString |,
                outputs: | result: ZomeApiResult<HashString> |,
                handler: ratings_fn::handle_creating_ratings
            }
            get_ratings: {
                inputs:| reviewedHash:HashString |,
                outputs: |result: ZomeApiResult<Vec<GetLinksLoadElement<Ratings>>>|,
                handler: ratings_fn::handle_get_reviews_by_hash
            }
        }
    }
}
