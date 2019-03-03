// TODO: Get the categories of the a app hash/address
use hdk::{
    self,
    holochain_core_types::{
        entry::Entry,
        json::{RawString},
        cas::content::{Address, AddressableContent},
    },
    error::{ZomeApiResult},
};

use crate::happs::{AppResponse, get_linked_apps};


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

pub fn handle_get_apps_by_category(category: String) -> ZomeApiResult<Vec<utils::GetLinksLoadElement<AppResponse>>> {
    let category_anchor_entry = Entry::App(
        "category_anchor".into(),
        RawString::from(category).into()
    );
    get_linked_apps(&category_anchor_entry.address(), "contains")
}

pub fn handle_get_apps_by_tag(tag: String) -> ZomeApiResult<Vec<utils::GetLinksLoadElement<AppResponse>>> {
    let tag_anchor_entry = Entry::App(
        "tag_anchor".into(),
        RawString::from(tag).into()
    );
    get_linked_apps(&tag_anchor_entry.address(), "contains")
}
