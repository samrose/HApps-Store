// TODO: Get the categories of the a app hash/address
use hdk::{
    self,
    holochain_core_types::{
        hash::HashString,
        entry::Entry,
        error::HolochainError,
        json::JsonString,
        cas::content::AddressableContent,
    },
    error::{ZomeApiResult},
};

// reimplemening here for now...
#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct App {
    pub uuid:String,
    pub title:String,
    pub author:String,
    pub description:String,
    pub thumbnail:String,
}


// links a tag and app bidirectionally 
// links a catagory and an app bidirectionally
pub fn handle_adding_category(category:String, tag:String, hash:HashString) -> ZomeApiResult<()> {
    let category_anchor_entry = Entry::App(
        "category_anchor".into(),
        category.into()
    );
    let category_anchor_addr = hdk::commit_entry(&category_anchor_entry)?;

    let tag_anchor_entry = Entry::App(
        "tag_anchor".into(),
        tag.into()
    );
    let tag_anchor_addr = hdk::commit_entry(&tag_anchor_entry)?;

    utils::link_entries_bidir(&hash, &category_anchor_addr, "", "")?;
    utils::link_entries_bidir(&hash, &tag_anchor_addr, "", "")?;
    Ok(())
}


pub fn handle_get_apps_by_category(category: String) -> ZomeApiResult<Vec<utils::GetLinksLoadElement<App>>> {
    let category_anchor_entry = Entry::App(
        "category_anchor".into(),
        category.into()
    );

    utils::get_links_and_load_type(&category_anchor_entry.address(), "")
}
