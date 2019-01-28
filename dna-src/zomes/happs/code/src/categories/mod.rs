use hdk::{
	holochain_core_types::{
		cas::content::Address,
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
	    native_type: RawString,

	    validation_package: || {
	        hdk::ValidationPackageDefinition::Entry
	    },

	    validation: |_name: RawString, _ctx: hdk::ValidationData| {
	        Ok(())
	    },

	    links: [
	        to!(
	            "app",
	            tag: "contains",

	            validation_package: || {
	                hdk::ValidationPackageDefinition::Entry
	            },

	            validation: |_base: Address, _target: Address, _ctx: hdk::ValidationData| {
	                Ok(())
	            }
	        ),
	        from!(
	            "app",
	            tag: "in",

	            validation_package: || {
	                hdk::ValidationPackageDefinition::Entry
	            },

	            validation: |_base: Address, _target: Address, _ctx: hdk::ValidationData| {
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
	    native_type: RawString,

	    validation_package: || {
	        hdk::ValidationPackageDefinition::Entry
	    },

	    validation: |_name: RawString, _ctx: hdk::ValidationData| {
	        Ok(())
	    },

	    links: [
	        to!(
	            "app",
	            tag: "contains",

	            validation_package: || {
	                hdk::ValidationPackageDefinition::Entry
	            },

	            validation: |_base: Address, _target: Address, _ctx: hdk::ValidationData| {
	                Ok(())
	            }
	        ),
	        from!(
	            "app",
	            tag: "in",

	            validation_package: || {
	                hdk::ValidationPackageDefinition::Entry
	            },

	            validation: |_base: Address, _target: Address, _ctx: hdk::ValidationData| {
	                Ok(())
	            }
	        )
	    ]
	)	
}