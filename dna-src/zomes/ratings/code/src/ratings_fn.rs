use hdk::{
    holochain_core_types::{
        hash::HashString,
        json::JsonString,
        entry::Entry,
        entry::entry_type::EntryType,
        error::HolochainError,
    },
    api::AGENT_ADDRESS,
};
use hdk::error::ZomeApiError;
use crate::entry;
use serde_json;

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
struct AddressResponse {
    address: HashString
}
#[derive(Serialize, Deserialize, Debug, DefaultJson)]
struct MultiAddressResponse {
    addresses: Vec<HashString>
}
pub fn handle_creating_ratings(rate:String,review:String,reviewedHash:HashString) -> JsonString {
    let ratings_entry = Entry::new(EntryType::App("ratings".into()),
        entry::Ratings {
            rate: rate.to_string(),
            review: review.to_string(),
            author: AGENT_ADDRESS.to_string().into(),
            timestamp: "TODO:(Add Date)".to_string(),
        }
    );
    match hdk::commit_entry(&ratings_entry) {
        Ok(address) => {
            let reviewedHash : HashString = reviewedHash;
            let link_result = hdk::link_entries(
                &reviewedHash,
                &address,
                "rating_tag"
            );

            if link_result.is_err() {
                return link_result.into()
            }

            AddressResponse{address}.into()
        }
        Err(hdk_error) => hdk_error.into(),
    }
}

pub fn handle_get_reviews_by_hash(_reviewedHash: HashString) -> JsonString{
    match hdk::get_links(&_reviewedHash, "rating_tag") {

        Ok(result) => {
            let addresses = result.addresses().clone();
            let mut ratings_list:Vec<serde_json::Value> = Vec::new();
            for address in addresses.iter() {
                // ratings_list.push(get_review(address));
                let k:String=get_review(address.clone()).into();
                ratings_list.push(serde_json::from_str(&k).unwrap());
            }
            // JsonString::from(ratings_list)
            // let rate:Vec<serde_json::Value> = ratings_list
            // .iter()
            // .map(|r|{
            //     serde_json::from_str(r.into()).unwrap()
            // }).collect();
            ratings_list.into()
         }
        Err(hdk_error) => hdk_error.into(),
    }
}

pub fn get_review(post_address:HashString)-> JsonString {
    let result : Result<Option<Entry>,ZomeApiError> = hdk::get_entry(post_address);
    match result {
        Ok(Some(entry)) => {
            entry.value().to_owned()
        },
        Ok(None) => {}.into(),
        Err(err) => err.into(),
    }
}
