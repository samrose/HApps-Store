use hdk::{
    error::ZomeApiResult,
    holochain_core_types::{entry::Entry, link::LinkMatch},
    holochain_persistence_api::cas::content::Address,
    utils, AGENT_ADDRESS,
};

use crate::ratings::Ratings;

pub fn handle_creating_ratings(
    rate: String,
    review: String,
    reviewed_hash: Address,
) -> ZomeApiResult<Address> {
    let ratings_entry = Entry::App(
        "ratings".into(),
        Ratings {
            rate: rate.to_string(),
            review: review.to_string(),
            author: AGENT_ADDRESS.to_string(),
            timestamp: "TODO:(Add Date)".to_string(),
        }
        .into(),
    );

    let address = hdk::commit_entry(&ratings_entry)?;
    hdk::link_entries(&reviewed_hash, &address, "rating_tag", "")?;
    Ok(address)
}

pub fn handle_get_reviews_by_hash(reviewed_hash: Address) -> ZomeApiResult<Vec<Ratings>> {
    utils::get_links_and_load_type(
        &reviewed_hash,
        LinkMatch::Exactly("rating_tag"),
        LinkMatch::Any,
    )
}
