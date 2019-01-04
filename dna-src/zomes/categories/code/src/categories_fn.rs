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

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
 struct Anchor {
     anchor_type: String,
     anchor_text: String,
 }

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
struct Anchor_return{
    ok:String,
    value:String,
    error:String,
}

pub fn handle_adding_category(category:String, tag:String, hash:HashString)->JsonString{
    // Requires the Anchors Zome
    // hdk::debug("Category_base:: ");

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
    // if ()
    let check_anchor_exist = anchor_exists(category.clone(),"".to_string()).unwrap();
    if(check_anchor_exist["value"]=="true"){
        hdk::debug("testing");
        let category_base : Value = anchor(category.clone(),"".into()).unwrap();
        let category_base_string :String = category_base["value"].clone().to_string();
        let category_base_hash:HashString = category_base_string[3..49].to_string().into();
        get_all_links(category_base_hash,"category".to_string())
    }else{
        return "ERROR: This category doesn't exist...".into()
    }
    // "whatever".into()
}



/*Anchor Calls*/
pub fn anchor(anchor_type:String,anchor_text:String)->Result<Value, Error>{
    let anchor = Anchor {
        anchor_type,
        anchor_text
    };
    let call_return_value : String = match hdk::call("anchors","main","create_anchor",anchor.into()){
        Ok(return_value)=>{
        return_value.to_string()
        },
        Err(e)=>e.into(),
    };
    Ok(serde_json::from_str(&call_return_value)?)
}

pub fn anchor_exists(anchor_type:String,anchor_text:String)->Result<Value, Error>{
    let anchor = Anchor {
        anchor_type,
        anchor_text
    };
    let call_return_value : String = match hdk::call("anchors","main","exists",anchor.into()){
        Ok(return_value)=>{
        return_value.to_string()
        },
        Err(e)=>e.into(),
    };
    Ok(serde_json::from_str(&call_return_value)?)
}


/*Coustom HC Functions*/
pub fn get_all_links(base_hash:HashString,tag:String)->JsonString{
    match hdk::get_links(&base_hash, tag) {

        Ok(result) => {
            let addresses = result.addresses().clone();
            let mut list:Vec<serde_json::Value> = Vec::new();
            for address in addresses.iter() {
                // ratings_list.push(get_review(address));
                let k:String=get(address.clone()).into();
                list.push(serde_json::from_str(&k).unwrap());
            }
            // JsonString::from(ratings_list)
            // let rate:Vec<serde_json::Value> = ratings_list
            // .iter()
            // .map(|r|{
            //     serde_json::from_str(r.into()).unwrap()
            // }).collect();
            list.into()
         }
        Err(hdk_error) => hdk_error.into(),
    }
}

pub fn get(post_address:HashString)-> JsonString {
    let result : Result<Option<Entry>,ZomeApiError> = hdk::get_entry(post_address);
    match result {
        Ok(Some(entry)) => {
            entry.value().to_owned()
        },
        Ok(None) => {}.into(),
        Err(err) => err.into(),
    }
}

pub fn link_address(address:HashString,link_to_address:&HashString,entry_tag:String) -> HashString{
    // hdk::debug("entry_tag: ");
    // hdk::debug(entry_tag.clone());
    let linked_address:HashString = match hdk::link_entries(&link_to_address,&address,entry_tag){
        Ok(link_result)=>address.into(),
        Err(hdk_error)=>hdk_error.to_string().into(),
    };
    hdk::debug(linked_address.clone());
    linked_address
}
