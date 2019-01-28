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
pub struct App {
    pub uuid:String,
    pub title:String,
    pub author:String,
    pub description:String,
    pub thumbnail:String,
}
#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct DnaBundle {
    pub dna_bundle: String,
}
#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct UiBundle {
    pub ui_bundle: String,
}

const ADMIN_AUTHOR: &str = "alice-----------------------------------------------------------------------------AAAIuDJb4M";

pub fn app_definitions() -> ValidatingEntryType{
    entry!(
        name: "app",
        description: "Details of the app",
        sharing: Sharing::Public,
        native_type: App,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_app: App, validation_data: hdk::ValidationData| {
            {
                let header = validation_data.package.chain_header.ok_or("No header found so could not validate")?;
                match header.sources().contains(&Address::from(ADMIN_AUTHOR)) {
                    true => Ok(()),
                    false => Err(
                        format!("Permission denied. Author \"{:?}\" is not allowed to commit an app entry. Only \"{}\"", 
                        header.sources(), 
                        ADMIN_AUTHOR)
                    )
                }
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

pub fn dna_bundle_definitions()-> ValidatingEntryType{
    entry!(
        name: "dna_code_bundle",
        description: "dna code bundle for the app",
        sharing: Sharing::Public,
        native_type: DnaBundle,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_app: DnaBundle, _validation_data: hdk::ValidationData| {
            Ok(())
        },

        links: [
            from!(
                "app",
                tag: "has",

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

pub fn ui_bundle_definitions()-> ValidatingEntryType{
    entry!(
        name: "ui_code_bundle",
        description: "ui code bundle for the app",
        sharing: Sharing::Public,
        native_type: UiBundle,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_app: UiBundle, _validation_data: hdk::ValidationData| {
            Ok(())
        },

        links: [
            from!(
                "app",
                tag: "has",

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
