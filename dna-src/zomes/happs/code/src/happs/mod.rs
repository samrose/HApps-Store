use hdk::holochain_core_types::{
    dna::entry_types::Sharing,
    error::HolochainError,
    json::JsonString,
    cas::content::Address,
};
use hdk::{
    self,
    entry_definition::ValidatingEntryType,
};

pub mod handlers;
pub use handlers::get_linked_apps;

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
#[serde(rename_all = "camelCase")]
pub struct AppEntry {
    pub title: String,
    pub author: String,
    pub description: String,
    pub thumbnail_url: String,
    pub homepage_url: String,
    pub dna_url: String,
    pub ui_url: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
#[serde(rename_all = "camelCase")]
pub struct AppResponse {
    pub title: String,
    pub author: String,
    pub description: String,
    pub thumbnail_url: String,
    pub homepage_url: String,
    pub dna_url: String,
    pub ui_url: String,
    pub upvotes: i32,
}

impl AppResponse {
    pub fn new(entry: AppEntry, upvotes: i32) -> Self {
        return Self {
            title: entry.title,
            author: entry.author,
            description: entry.description,
            thumbnail_url: entry.thumbnail_url,
            homepage_url: entry.homepage_url,
            dna_url: entry.dna_url,
            ui_url: entry.ui_url,
            upvotes: upvotes,
        }
    }
}

// const ADMIN_AUTHOR: &str = "alice-----------------------------------------------------------------------------AAAIuDJb4M";

pub fn app_definitions() -> ValidatingEntryType{
    entry!(
        name: "app",
        description: "Details of the app",
        sharing: Sharing::Public,
        native_type: AppEntry,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_app: AppEntry, _validation_data: hdk::ValidationData| {
            {
                Ok(())
            }
        },

        links: [
            to!(
                "%agent_id",
                tag: "author_is",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_base: Address, _target: Address, _validation_data: hdk::ValidationData| {
                    Ok(())
                }
            ),
            to!(
                "%agent_id",
                tag: "upvote",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_base: Address, _target: Address, _validation_data: hdk::ValidationData| {
                    Ok(())
                }
            ),
            from!(
                "%agent_id",
                tag: "published",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_base: Address, _target: Address, _validation_data: hdk::ValidationData| {
                    Ok(())
                }
            )
        ]
    )
}
