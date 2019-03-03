use hdk::{
    AGENT_ADDRESS,
    holochain_core_types::{
        entry::Entry,
        cas::content::{Address, AddressableContent},
        json::RawString,
    },
    error::{ZomeApiResult, ZomeApiError},
};

use crate::happs::{self, AppResponse};
/***
Getter Functions
***/


// returns tuple of number of upvotes and if this agent upvoted
fn get_upvotes(app_address: &Address) -> ZomeApiResult<(i32, bool)> {
    let result = hdk::get_links(app_address, "upvote")?;
    let upvoters = result.addresses();
    Ok((upvoters.len() as i32, upvoters.contains(&AGENT_ADDRESS)))
}


pub fn get_linked_apps(base_addr: &Address, tag: &str) -> ZomeApiResult<Vec<utils::GetLinksLoadElement<happs::AppResponse>>> {
    let get_result: Vec<utils::GetLinksLoadElement<happs::AppEntry>> = utils::get_links_and_load_type(base_addr, tag)?;
    
    Ok(get_result.into_iter().map(|elem| {
        let (upvotes, upvoted_my_me) = get_upvotes(&elem.address).unwrap();
        utils::GetLinksLoadElement{
            address: elem.address,
            entry: happs::AppResponse::new(elem.entry, upvotes as i32, upvoted_my_me)
        }
    }).collect())
}

pub fn handle_get_all_apps() -> ZomeApiResult<Vec<utils::GetLinksLoadElement<happs::AppResponse>>> {
    let all_apps_anchor_addr = Entry::App(
        "category_anchor".into(),
        RawString::from("*").into(),
    ).address();
    get_linked_apps(&all_apps_anchor_addr, "contains")
}

pub fn handle_get_app(app_hash: Address) -> ZomeApiResult<happs::AppResponse> {
    let (upvotes, upvoted_my_me) = get_upvotes(&app_hash)?;
    let entry = utils::get_as_type(app_hash)?;
    Ok(AppResponse::new(entry, upvotes, upvoted_my_me))
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
        happs::AppEntry {
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
