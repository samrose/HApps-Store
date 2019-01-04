use hdk::{
    holochain_core_types::{
        json::JsonString,
        entry::Entry,
        entry::entry_type::EntryType,
        hash::HashString,
    },
    api::AGENT_ADDRESS,
    api::debug,
};
use hdk::error::ZomeApiError;
use crate::entry;

/***
Getter Functions
***/

pub fn handle_getting_all_apps()->JsonString{
    match hdk::get_links(&AGENT_ADDRESS, "app_tag") {
        Ok(result) => {
            let addresses = result.addresses().clone();
            let mut app_list:Vec<serde_json::Value> = Vec::new();
            for address in addresses.iter() {
                let address_entry:String=get_entry(address.clone()).into();
                let entry_n_hash:String = json!({"Entry":address_entry,"Hash":address}).to_string();
                app_list.push(serde_json::from_str(&entry_n_hash).unwrap());
            }
            app_list.into()
         }
        Err(hdk_error) => hdk_error.into(),
    }
}

pub fn handle_getting_app(app_hash:HashString)->JsonString{
    get_entry(app_hash.clone()).into()
}

pub fn handle_getting_dna(app_hash:HashString) -> JsonString{
    match hdk::get_links(&app_hash, "dna_bundle_tag") {
        Ok(result) => {
            let addresses = result.addresses().clone();
            get_entry(addresses[0].clone()).into()
         }
        Err(hdk_error) => hdk_error.into(),
    }
}

pub fn handle_getting_ui(app_hash:HashString) -> JsonString{
    match hdk::get_links(&app_hash, "ui_bundle_tag") {
        Ok(result) => {
            let addresses = result.addresses().clone();
            get_entry(addresses[0].clone()).into()
         }
        Err(hdk_error) => hdk_error.into(),
    }
}

/*
Functions needed to be handeled by the HCHC
*/
pub fn handle_creating_app(uuid:String,title:String,description:String,thumbnail:String)->JsonString{
    let app_entry = Entry::new(EntryType::App("app".into()),
        entry::App {
            uuid: uuid.to_string(),
            title: title.to_string(),
            author: AGENT_ADDRESS.to_string().into(),
            description: description.to_string(),
            thumbnail:thumbnail.to_string(),
        }
    );
    //TODO: Link to an anchor nt AGENT_ADDRESS
    commit_n_link(app_entry,"app_tag".into(),&AGENT_ADDRESS).into()
}

pub fn handle_adding_DNA(app_hash:HashString,dna_bundle:String)->JsonString{
    let bundle_entry = Entry::new(EntryType::App("dna_code_bundle".into()),
        entry::DNA_Bundle {
            dna_bundle: dna_bundle.to_string(),
        }
    );
    commit_n_link(bundle_entry,"dna_bundle_tag".into(),&app_hash).into()
}

pub fn handle_adding_UI(app_hash:HashString,ui_bundle:String)->JsonString{
    let bundle_entry = Entry::new(EntryType::App("ui_code_bundle".into()),
        entry::UI_Bundle {
            ui_bundle: ui_bundle.to_string(),
        }
    );
    commit_n_link(bundle_entry,"ui_bundle_tag".into(),&app_hash).into()
}
