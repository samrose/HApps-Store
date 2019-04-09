use hdk::{
	holochain_core_types::{
	    dna::entry_types::Sharing,
	    json::RawString,
	},
	entry_definition::ValidatingEntryType,

};

pub mod handlers;


pub fn category_anchor_entry() -> ValidatingEntryType {
	entry!(
	    name: "category_anchor",
	    description: "",
	    sharing: Sharing::Public,

	    validation_package: || {
	        hdk::ValidationPackageDefinition::Entry
	    },

	    validation: |_validation_data: hdk::EntryValidationData<RawString>| {
	        Ok(())
	    },

	    links: [
	        to!(
	            "app",
	            tag: "contains",

	            validation_package: || {
	                hdk::ValidationPackageDefinition::Entry
	            },

	            validation: |_validation_data: hdk::LinkValidationData| {
	                Ok(())
	            }
	        ),
	        from!(
	            "app",
	            tag: "in",

	            validation_package: || {
	                hdk::ValidationPackageDefinition::Entry
	            },

	            validation: |_validation_data: hdk::LinkValidationData| {
	                Ok(())
	            }
	        )
	    ]
	)
}

pub fn tag_anchor_entry() -> ValidatingEntryType {
	entry!(
	    name: "tag_anchor",
	    description: "",
	    sharing: Sharing::Public,

	    validation_package: || {
	        hdk::ValidationPackageDefinition::Entry
	    },

	    validation: |_validation_data: hdk::EntryValidationData<RawString>| {
	        Ok(())
	    },

	    links: [
	        to!(
	            "app",
	            tag: "contains",

	            validation_package: || {
	                hdk::ValidationPackageDefinition::Entry
	            },

	            validation: |_validation_data: hdk::LinkValidationData| {
	                Ok(())
	            }
	        ),
	        from!(
	            "app",
	            tag: "in",

	            validation_package: || {
	                hdk::ValidationPackageDefinition::Entry
	            },

	            validation: |_validation_data: hdk::LinkValidationData| {
	                Ok(())
	            }
	        )
	    ]
	)	
}