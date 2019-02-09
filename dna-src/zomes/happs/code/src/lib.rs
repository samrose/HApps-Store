#![feature(try_from)]
#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate holochain_core_types_derive;
extern crate utils;

use utils::GetLinksLoadElement;
use hdk::{
    error::ZomeApiResult,
    holochain_core_types::{cas::content::Address, json::JsonString, error::HolochainError},
};

mod happs;
mod ratings;
mod categories;

use crate::happs::App;
use crate::ratings::Ratings;

define_zome! {
    entries: [
        happs::app_definitions(),
        happs::dna_bundle_definitions(),
        happs::ui_bundle_definitions(),
        ratings::rating_definition(),
        categories::category_anchor_entry(),
        categories::tag_anchor_entry()
    ]

    genesis: || { Ok(()) }

    functions: [
        create_app: {
            inputs:| uuid:String,title:String,description:String,thumbnail:String |,
            outputs: |result: ZomeApiResult<Address>|,
            handler: happs::handlers::handle_create_app
        }
        get_all_apps: {
            inputs:| |,
            outputs: |result: ZomeApiResult<Vec<utils::GetLinksLoadElement<happs::App>>>|,
            handler: happs::handlers::handle_get_all_apps
        }
        get_app: {
            inputs:|app_hash: Address|,
            outputs: |result: ZomeApiResult<happs::App>|,
            handler: happs::handlers::handle_get_app
        }
        add_dna: {
            inputs:| app_hash: Address,dna_bundle:String |,
            outputs: |result: ZomeApiResult<Address>|,
            handler: happs::handlers::handle_add_dna
        }
        get_dna: {
            inputs:| app_hash: Address|,
            outputs: |result: ZomeApiResult<happs::DnaBundle>|,
            handler: happs::handlers::handle_get_dna
        }
        add_ui: {
            inputs:| app_hash: Address,ui_bundle:String |,
            outputs: |result: ZomeApiResult<Address>|,
            handler: happs::handlers::handle_add_ui
        }
        get_ui: {
            inputs:| app_hash: Address|,
            outputs: |result: ZomeApiResult<happs::UiBundle>|,
            handler: happs::handlers::handle_get_ui
        }
        create_ratings: {
            inputs:| rate:String, review:String, reviewed_hash: Address |,
            outputs: | result: ZomeApiResult<Address> |,
            handler: ratings::handlers::handle_creating_ratings
        }
        get_ratings: {
            inputs:| reviewed_hash: Address |,
            outputs: |result: ZomeApiResult<Vec<GetLinksLoadElement<Ratings>>>|,
            handler: ratings::handlers::handle_get_reviews_by_hash
        }
        add_app_to_category: {
            inputs:|app_address: Address, category: String|,
            outputs: | result: ZomeApiResult<()> |,
            handler: categories::handlers::handle_add_app_to_category
        }
        add_app_to_tag: {
            inputs:|app_address: Address, tag: String|,
            outputs: | result: ZomeApiResult<()> |,
            handler: categories::handlers::handle_add_app_to_tag
        }
        get_apps_by_category: {
            inputs:|category: String|,
            outputs: |result: ZomeApiResult<Vec<utils::GetLinksLoadElement<App>>>|,
            handler: categories::handlers::handle_get_apps_by_category
        }
        get_apps_by_tag: {
            inputs:|tag: String|,
            outputs: |result: ZomeApiResult<Vec<utils::GetLinksLoadElement<App>>>|,
            handler: categories::handlers::handle_get_apps_by_tag
        }
    ]

    capabilities: {
        public (Public) [get_apps_by_tag, get_apps_by_category, add_app_to_tag, add_app_to_category, get_ratings, create_ratings, get_ui, add_ui, get_dna, add_dna, get_app, get_all_apps, create_app]
    }
}
