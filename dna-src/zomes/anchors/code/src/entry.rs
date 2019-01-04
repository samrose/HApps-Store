use hdk::holochain_core_types::{
    dna::zome::entry_types::Sharing,
    error::HolochainError,
    json::JsonString,
};
use hdk::{
    self,
    entry_definition::ValidatingEntryType,
};
use serde_json;

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
pub struct Anchor {
    pub anchor_type:String,
    pub anchor_text:String,
}

pub fn definition()-> ValidatingEntryType{
    entry!(
        name: "anchor",
        description: "Helps create anchors",
        sharing: Sharing::Public,
        native_type: Anchor,
        validation_package: || {
            hdk::ValidationPackageDefinition::ChainFull
        },
        validation: |_anchor: Anchor, _ctx: hdk::ValidationData| {
            Ok(())
        }
    )
}
