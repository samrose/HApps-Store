// use hdk::error::ZomeApiError;
use hdk::holochain_core_types::error::HolochainError;
use hdk::{
    // self,
    // holochain_wasm_utils::api_serialization::get_entry::{
    //     GetEntryOptions,
    // },
    // holochain_core_types::hash::HashString,
    holochain_core_types::json::JsonString,
    // holochain_core_types::entry::Entry,
    // holochain_core_types::entry::entry_type::EntryType,
    AGENT_ADDRESS,
    AGENT_ID_STR,
};

pub fn handle_get_agent()-> JsonString{
    #[derive(Serialize, Deserialize, Debug, DefaultJson)]
    struct UserData {
        hash: String,
        name: String,
    };
    let data= UserData {
        hash:AGENT_ADDRESS.to_string(),
        name:AGENT_ID_STR.to_string()
    };
    data.into()
}
