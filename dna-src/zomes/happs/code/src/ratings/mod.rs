/// This file holds everything that represents the "post" entry type.
// use boolinator::*;
use hdk::{
    self,
    entry_definition::ValidatingEntryType,
    holochain_core_types::dna::entry_types::Sharing,
    holochain_json_api::{error::JsonError, json::JsonString},
};

pub mod handlers;

/// We declare the structure of our entry type with this Rust struct.
/// It will be checked automatically by the macro below, similar
/// to how this happens with functions parameters and zome_functions!.
///
/// So this is our normative schema definition:
#[derive(Clone, Serialize, Deserialize, Debug, DefaultJson)]
pub struct Ratings {
    pub rate: String,
    pub review: String,
    pub author: String,
    pub timestamp: String,
}

pub fn rating_definition() -> ValidatingEntryType {
    entry!(
        name: "ratings",
        description: "Ratings for a given hash",
        sharing: Sharing::Public,

        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_validation_data: hdk::EntryValidationData<Ratings>| {
            Ok(())
        },

        links: [
            from!(
                "app",
                link_type: "rating_tag",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_validation_data: hdk::LinkValidationData| {
                    Ok(())
                }
            )
        ]
    )
}
