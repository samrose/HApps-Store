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

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
#[serde(rename_all = "camelCase")]
pub struct App {
    pub title: String,
    pub author: String,
    pub description: String,
    pub thumbnail_url: String,
    pub dna_url: String,
    pub ui_url: String,
}

// const ADMIN_AUTHOR: &str = "alice-----------------------------------------------------------------------------AAAIuDJb4M";

pub fn app_definitions() -> ValidatingEntryType{
    entry!(
        name: "app",
        description: "Details of the app",
        sharing: Sharing::Public,
        native_type: App,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_app: App, _validation_data: hdk::ValidationData| {
            {
                // let header = validation_data.package.chain_header;
                // match header.provenances().contains(&(Address::from(ADMIN_AUTHOR), "".into())) {
                //     true => Ok(()),
                //     false => Err(
                //         format!("Permission denied. Author \"{:?}\" is not allowed to commit an app entry. Only \"{}\"", 
                //         header.provenances(), 
                //         ADMIN_AUTHOR)
                //     )
                // }
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
