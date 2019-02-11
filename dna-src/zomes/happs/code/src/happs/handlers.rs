use hdk::{
    AGENT_ADDRESS,
    holochain_core_types::{
        entry::Entry,
        cas::content::{Address, AddressableContent},
        json::RawString,
    },
    error::{ZomeApiResult, ZomeApiError},
};

use crate::happs;
/***
Getter Functions
***/

pub fn handle_get_all_apps() -> ZomeApiResult<Vec<utils::GetLinksLoadElement<(happs::App, i32)>>> {
    let all_apps_anchor_addr = Entry::App(
        "category_anchor".into(),
        RawString::from("*").into(),
    ).address();

    let get_result: Vec<utils::GetLinksLoadElement<happs::App>> = utils::get_links_and_load_type(&all_apps_anchor_addr, "contains")?;
    
    Ok(get_result.into_iter().map(|elem| {
        let upvotes = hdk::get_links(&elem.address, "upvote").unwrap().addresses().len();
        utils::GetLinksLoadElement{
            address: elem.address,
            entry: (elem.entry, upvotes as i32)
        }
    }).collect())
}

pub fn handle_get_app(app_hash:Address) -> ZomeApiResult<happs::App> {
    utils::get_as_type(app_hash)
}

/*
Functions needed to be handeled by the HCHC
*/
pub fn handle_create_app(title: String, description: String, thumbnail_url: String, homepage_url: String, dna_url: String, ui_url: String) -> ZomeApiResult<Address> {
    let agent_data: serde_json::Value = serde_json::from_str(&hdk::AGENT_ID_STR.to_string()).map_err(|_| {
        ZomeApiError::Internal("Error: Agent string not valid json".to_string())
    })?;

    let app_entry = Entry::App(
        "app".into(),
        happs::App {
            title,
            author: agent_data["nick"].as_str().unwrap().into(),
            description,
            thumbnail_url,
            homepage_url,
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

pub fn handle_upvote_app(address: Address) -> ZomeApiResult<()> {
    hdk::link_entries(&address, &AGENT_ADDRESS, "upvote")?;
    Ok(())
}
