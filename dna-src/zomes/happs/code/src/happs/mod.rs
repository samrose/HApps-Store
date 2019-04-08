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
    pub address: Address,
    pub title: String,
    pub author: String,
    pub description: String,
    pub thumbnail_url: String,
    pub homepage_url: String,
    pub dna_url: String,
    pub ui_url: String,
    pub upvotes: i32,
    pub upvoted_by_me: bool,
}

impl AppResponse {
    pub fn new(entry: AppEntry, address: Address, upvotes: i32, upvoted_by_me: bool) -> Self {
        return Self {
            address,
            title: entry.title,
            author: entry.author,
            description: entry.description,
            thumbnail_url: entry.thumbnail_url,
            homepage_url: entry.homepage_url,
            dna_url: entry.dna_url,
            ui_url: entry.ui_url,
            upvotes: upvotes,
            upvoted_by_me
        }
    }
}

// const ADMIN_AUTHOR: &str = "alice-----------------------------------------------------------------------------AAAIuDJb4M";

pub fn app_definitions() -> ValidatingEntryType{
    entry!(
        name: "app",
        description: "Details of the app",
        sharing: Sharing::Public,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_validation_data: hdk::EntryValidationData<AppEntry>| {
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

                validation: |_validation_data: hdk::LinkValidationData| {
                    Ok(())
                }
            ),
            to!(
                "%agent_id",
                tag: "upvote",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_validation_data: hdk::LinkValidationData| {
                    Ok(())
                }
            ),
            from!(
                "%agent_id",
                tag: "published",

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
