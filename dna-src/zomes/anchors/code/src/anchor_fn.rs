use hdk::{
    holochain_core_types::{
        json::JsonString,
        entry::Entry,
        entry::entry_type::EntryType,
        hash::HashString,
    }
};
use hdk::error::ZomeApiError;

use crate::entry;

// TODO : used references insted of passing clones

pub fn handle_creating_anchor(anchor_type:String,anchor_text:String)->JsonString{

    let anchor_type_base:Entry = Entry::new(EntryType::App("anchor".into()),
        entry::Anchor {
            anchor_type:anchor_type.to_string(),
            anchor_text:"".to_string(),
        }
    );

    let root_anchor_entry:Entry = Entry::new(EntryType::App("anchor".into()),
        entry::Anchor {
            anchor_type:"anchor_type".to_string(),
            anchor_text:"".to_string(),
        }
    );

    let anchor:Entry = Entry::new(EntryType::App("anchor".into()),
        entry::Anchor {
            anchor_type:anchor_type.to_string(),
            anchor_text:anchor_text.to_string(),
        }
    );

    match hdk::entry_address(&anchor) {
        Ok(anchor_hash) => {
            match hdk::get_entry(anchor_hash.clone()){
                Ok(Some(entry))=> anchor_hash.into(),
                Ok(None) => {
                    let anchor_type_base_address:HashString = match hdk::entry_address(&anchor_type_base) {
                        Ok(anchor_type_base_address) => {
                            let root_anchor_entry_address:HashString = match hdk::get_entry(anchor_type_base_address.clone()){
                                Ok(Some(entry))=>anchor_type_base_address.into(),
                                Ok(None) =>{
                                    match hdk::entry_address(&root_anchor_entry) {
                                        Ok(root_anchor_entry_address) => {
                                            match hdk::get_entry(root_anchor_entry_address.clone()){
                                                Ok(Some(e)) => root_anchor_entry_address.into(),
                                                Ok(None) =>  commit_root_entry(&root_anchor_entry),
                                                Err(hdk_error) => hdk_error.to_string().into()
                                            }},
                                         Err(hdk_error) => hdk_error.to_string().into()
                                    }
                                },
                                Err(e)=>{
                                    match hdk::entry_address(&root_anchor_entry) {
                                        Ok(root_anchor_entry_address) => match hdk::get_entry(root_anchor_entry_address.clone()){
                                                Ok(Some(e)) => root_anchor_entry_address.into(),
                                                Ok(None) =>  commit_root_entry(&root_anchor_entry),
                                                Err(hdk_error) => hdk_error.to_string().into()
                                            },
                                         Err(hdk_error) => hdk_error.to_string().into()
                                    }
                                }
                            };
                            // hdk::debug("DEBUG:: anchor_type_base");
                            // hdk::debug(root_anchor_entry_address.clone());

                            commit_n_link(anchor_type_base,anchor_type,&root_anchor_entry_address)
                        },
                        Err(hdk_error) => hdk_error.to_string().into(),
                    };
                    // hdk::debug("DEBUG:: anchor");
                    // hdk::debug(anchor_type_base_address.clone());

                    // commit_n_link(anchor,"".into(),&anchor_type_base_address).into()
                    commit_n_link(anchor,anchor_text,&anchor_type_base_address).into()
                },
                Err(hdk_error) => hdk_error.into()
            }
        },
        Err(hdk_error) => hdk_error.into(),
    }
}


pub fn handle_check_anchor_exist(anchor_type:String,anchor_text:String) -> JsonString{
    let anchor:Entry = Entry::new(EntryType::App("anchor".into()),
        entry::Anchor {
            anchor_type:anchor_type.to_string(),
            anchor_text:anchor_text.to_string(),
        }
    );

    match hdk::entry_address(&anchor) {
        Ok(anchor_address) => match hdk::get_entry(anchor_address){
                Ok(Some(e)) => {
                    // hdk::debug("DEBUG:: Found Entry");
                    // hdk::debug(e.to_string());
                    "true".into()},
                Ok(None) =>  "false".into(),
                Err(hdk_error) => "false".into()
            },
         Err(hdk_error) => hdk_error.to_string().into()
    }
}

pub fn handle_get_anchor_links(anchor_type:String)->JsonString{

    // hdk::debug(anchor_type.clone());
    let anchor:Entry = Entry::new(EntryType::App("anchor".into()),
        entry::Anchor {
            anchor_type:anchor_type.to_string(),
            anchor_text:"".to_string(),
        }
    );

    match hdk::entry_address(&anchor) {
        Ok(anchor_address) => {
            match hdk::get_links(&anchor_address, "") {
                Ok(result) => {
                    let addresses = result.addresses().clone();
                    hdk::debug(addresses.clone());
                    let mut list:Vec<serde_json::Value> = Vec::new();
                    for address in addresses.iter() {
                        let address_entry:String=get_entry(address.clone()).into();
                        let entry_n_hash:String = json!({"Entry":address_entry,"Hash":address}).to_string();
                        list.push(serde_json::from_str(&entry_n_hash).unwrap());
                    }
                    list.into()
                 }
                Err(hdk_error) => hdk_error.into(),
            }
        },
        Err(hdk_error) => hdk_error.to_string().into()
    }

}


/***
Custom Function
***/

pub fn get_entry(post_address:HashString)-> JsonString {
    let result : Result<Option<Entry>,ZomeApiError> = hdk::get_entry(post_address);
    match result {
        Ok(Some(entry)) => {
            entry.value().to_owned()
        },
        Ok(None) => {}.into(),
        Err(err) => err.into(),
    }
}

pub fn commit_n_link(entry:Entry,entry_tag:String,base_hash:&HashString) -> HashString{
    // hdk::debug("entry_tag: ");
    // hdk::debug(entry_tag.clone());
    match hdk::commit_entry(&entry) {
        Ok(address) => {
            let link_result = hdk::link_entries(
                &base_hash,
                &address,
                entry_tag
            );
            if link_result.is_err(){
                // hdk::debug(":::::::::::::HOLOCHAIN ERROR:::::::::::::");
                return "HOLOCHAIN_ERROR".into()
            }
            address.into()
        }
        Err(hdk_error) => hdk_error.to_string().into()
    }
}

fn commit_root_entry(root_anchor_entry : &Entry)->HashString{
    match hdk::commit_entry(root_anchor_entry) {
        Ok(address) => address.into(),
        Err(hdk_error) => hdk_error.to_string().into()
    }
}
