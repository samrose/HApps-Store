use hdk::{
    holochain_core_types::{
        entry::Entry,
        cas::content::{Address, AddressableContent},
        json::RawString,
    },
    error::{ZomeApiResult, ZomeApiError},
};

use crate::entry;

/***
Getter Functions
***/

pub fn handle_get_all_apps() -> ZomeApiResult<Vec<utils::GetLinksLoadElement<entry::App>>> {
    let all_apps_anchor_addr = Entry::App(
        "category_anchor".into(),
        RawString::from("*").into(),
    ).address();
    utils::get_links_and_load_type(&all_apps_anchor_addr, "contains")
}

pub fn handle_get_app(app_hash:Address) -> ZomeApiResult<entry::App> {
    utils::get_as_type(app_hash)
}

pub fn handle_get_dna(app_hash: Address) -> ZomeApiResult<entry::DnaBundle> {
    Ok(utils::get_links_and_load_type::<_, entry::DnaBundle>(&app_hash, "has")?
        .first()
        .ok_or(ZomeApiError::Internal("No DNA bundles linked to app address".into()))?
        .entry.clone())
}

pub fn handle_get_ui(app_hash: Address) -> ZomeApiResult<entry::UiBundle> {
    Ok(utils::get_links_and_load_type::<_, entry::UiBundle>(&app_hash, "has")?
        .first()
        .ok_or(ZomeApiError::Internal("No ui bundles linked to app address".into()))?
        .entry.clone())
}

/*
Functions needed to be handeled by the HCHC
*/
pub fn handle_create_app(uuid:String, title:String, description:String, thumbnail:String) -> ZomeApiResult<Address> {
    let app_entry = Entry::App(
        "app".into(),
        entry::App {
            uuid: uuid.to_string(),
            title: title.to_string(),
            author: hdk::AGENT_ADDRESS.to_string().into(),
            description: description.to_string(),
            thumbnail:thumbnail.to_string(),
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

pub fn handle_add_dna(app_hash: Address, dna_bundle: String) -> ZomeApiResult<Address> {
    let bundle_entry = Entry::App(
        "dna_code_bundle".into(),
        entry::DnaBundle {
            dna_bundle: dna_bundle.to_string(),
        }.into()
    );
    let bundle_addr = hdk::commit_entry(&bundle_entry)?;
    hdk::link_entries(&app_hash, &bundle_addr, "has")?;
    Ok(bundle_addr)
}

pub fn handle_add_ui(app_hash: Address,ui_bundle:String) -> ZomeApiResult<Address> {
    let bundle_entry = Entry::App(
        "ui_code_bundle".into(),
        entry::UiBundle {
            ui_bundle: ui_bundle.to_string(),
        }.into()
    );
    let bundle_addr = hdk::commit_entry(&bundle_entry)?;
    hdk::link_entries(&app_hash, &bundle_addr, "has")?;
    Ok(bundle_addr)
}
