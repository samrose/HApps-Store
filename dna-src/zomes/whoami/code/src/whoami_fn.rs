use hdk::{
    AGENT_ADDRESS,
    AGENT_ID_STR,
    error::ZomeApiResult,
    holochain_json_api::{
        error::JsonError,
        json::JsonString,
    },
};

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct UserData {
    hash: String,
    name: String,
}

pub fn handle_get_agent() -> ZomeApiResult<UserData> {
    Ok(UserData {
        hash: AGENT_ADDRESS.to_string(),
        name: AGENT_ID_STR.to_string()
    })
}
