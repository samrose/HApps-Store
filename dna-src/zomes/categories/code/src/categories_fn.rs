// TODO: Get the categories of the a app hash/address
use hdk::{
    holochain_core_types::{
        hash::HashString,
        json::JsonString,
        entry::Entry,
        error::HolochainError,
    }
};
use hdk::error::{
    ZomeApiError,
};
use std::convert::TryFrom;
use crate::holochain_core_types_derive;
use serde_json::{Value,Error};



pub fn handle_adding_category(category:String, tag:String, hash:HashString)->JsonString{
    let category_base : Value = anchor(category.clone(),"".into()).unwrap();
    let category_base_string :String = category_base["value"].clone().to_string();
    let category_base_hash:HashString = category_base_string[3..49].to_string().into();
    let tag_base : Value = anchor(category.clone(),tag).unwrap();
    let tag_base_string :String = tag_base["value"].clone().to_string();
    let tag_base_hash : HashString = tag_base_string[3..49].to_string().into();
    link_address(hash.clone(),&tag_base_hash,"tag_category".into());
    link_address(tag_base_hash,&hash,"app_category".into());
    link_address(hash.clone(),&category_base_hash,"category".into()).to_string().into()
}

pub fn handle_get_apps_by_category(category:String)->JsonString{
    let check_anchor_exist = anchor_exists(category.clone(),"".to_string()).unwrap();
    if(check_anchor_exist["value"]=="true"){
        hdk::debug("testing");
        let category_base : Value = anchor(category.clone(),"".into()).unwrap();
        let category_base_string :String = category_base["value"].clone().to_string();
        let category_base_hash:HashString = category_base_string[3..49].to_string().into();
        get_all_links(category_base_hash,"category".to_string())
    } else{
        return "ERROR: This category doesn't exist...".into()
    }
}
