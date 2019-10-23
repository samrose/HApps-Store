#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate holochain_json_derive;

use hdk::{
    error::ZomeApiResult,
    holochain_json_api::{error::JsonError, json::JsonString},
};

pub mod whoami_fn;

define_zome! {
    entries: [ ]

    init: || { Ok(()) }

    validate_agent: |validation_data : EntryValidationData::<AgentId>| {
        Ok(())
    }

    functions: [
        get_user: {
            inputs:| |,
            outputs: |result: ZomeApiResult<whoami_fn::UserData>|,
            handler: whoami_fn::handle_get_agent
        }
    ]

    traits: {
        hc_public [get_user]
    }
}
