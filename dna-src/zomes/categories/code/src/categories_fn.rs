// TODO: Get the categories of the a app hash/address
use hdk::{
    self,
    holochain_core_types::{
        entry::Entry,
        error::HolochainError,
        json::{JsonString, RawString},
        cas::content::{Address, AddressableContent},
    },
    error::{ZomeApiResult},
};

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct App {
    pub uuid:String,
    pub title:String,
    pub author:String,
    pub description:String,
    pub thumbnail:String,
}

pub fn handle_add_app_to_category(app_address: Address, category: String) -> ZomeApiResult<()> {
    let category_anchor_entry = Entry::App(
        "category_anchor".into(),
        RawString::from(category).into()
    );
    let category_anchor_addr = hdk::commit_entry(&category_anchor_entry)?;
    utils::link_entries_bidir(&app_address, &category_anchor_addr, "in", "contains")?;
    Ok(())
}

pub fn handle_add_app_to_tag(app_address: Address, tag: String) -> ZomeApiResult<()> {
    let tag_anchor_entry = Entry::App(
        "tag_anchor".into(),
        RawString::from(tag).into()
    );
    let tag_anchor_addr = hdk::commit_entry(&tag_anchor_entry)?;
    utils::link_entries_bidir(&app_address, &tag_anchor_addr, "in", "contains")?;
    Ok(())
}


pub fn handle_get_apps_by_category(category: String) -> ZomeApiResult<Vec<utils::GetLinksLoadElement<App>>> {
    let category_anchor_entry = Entry::App(
        "category_anchor".into(),
        RawString::from(category).into()
    );

    utils::get_links_and_load_type(&category_anchor_entry.address(), "contains")
}

pub fn handle_get_apps_by_tag(tag: String) -> ZomeApiResult<Vec<utils::GetLinksLoadElement<App>>> {
    let tag_anchor_entry = Entry::App(
        "tag_anchor".into(),
        RawString::from(tag).into()
    );

    utils::get_links_and_load_type(&tag_anchor_entry.address(), "contains")
}
