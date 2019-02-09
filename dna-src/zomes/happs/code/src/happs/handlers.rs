use hdk::{
    holochain_core_types::{
        entry::Entry,
        cas::content::{Address, AddressableContent},
        json::RawString,
    },
    error::{ZomeApiResult},
};

use crate::happs;
/***
Getter Functions
***/

pub fn handle_get_all_apps() -> ZomeApiResult<Vec<utils::GetLinksLoadElement<happs::App>>> {
    let all_apps_anchor_addr = Entry::App(
        "category_anchor".into(),
        RawString::from("*").into(),
    ).address();
    utils::get_links_and_load_type(&all_apps_anchor_addr, "contains")
}

pub fn handle_get_app(app_hash:Address) -> ZomeApiResult<happs::App> {
    utils::get_as_type(app_hash)
}


/*
Functions needed to be handeled by the HCHC
*/
pub fn handle_create_app(title: String, description: String, thumbnail_url: String, dna_url: String, ui_url: String) -> ZomeApiResult<Address> {
    let app_entry = Entry::App(
        "app".into(),
        happs::App {
            title,
            author: hdk::AGENT_ADDRESS.to_string().into(),
            description,
            thumbnail_url,
            dna_url,
            ui_url,
        }.into()
    );
    let app_addr = hdk::commit_entry(&app_entry)?;
    utils::link_entries_bidir(&app_addr, &hdk::AGENT_ADDRESS, "author_is", "published")?;

    let all_apps_anchor_addr = hdk::commit_entry(&Entry::App(
        "category_anchor".into(),
        RawString::from("*").into()
    ))?;
    utils::link_entries_bidir(&all_apps_anchor_addr, &app_addr, "contains", "in")?;

    Ok(app_addr)
}
